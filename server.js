const cors = require('cors');
const crypto = require('crypto');
const express = require('express');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const nodemailer = require('nodemailer');
require('dotenv').config();

const { initDb, run, get, all } = require('./src/db');

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';
const UPLOAD_DIR = path.join(__dirname, 'uploads');

fs.mkdirSync(UPLOAD_DIR, { recursive: true });

app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(express.static(path.join(__dirname)));
app.use('/uploads', express.static(UPLOAD_DIR));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
    filename: (_req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`;
        cb(null, name);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            cb(new Error('Solo se permiten imágenes.'));
            return;
        }
        cb(null, true);
    }
});

const slugify = (text) =>
    text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[\s\W-]+/g, '-')
        .replace(/^-+|-+$/g, '');

const createUniqueSlug = async (baseSlug) => {
    let slug = baseSlug || `post-${Date.now()}`;
    let counter = 1;
    while (await get('SELECT id FROM posts WHERE slug = ?', [slug])) {
        slug = `${baseSlug}-${counter}`;
        counter += 1;
    }
    return slug;
};

const signToken = (user) =>
    jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

const authRequired = async (req, res, next) => {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) {
        res.status(401).json({ error: 'Falta token de autenticación.' });
        return;
    }
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        const user = await get('SELECT id, name, email, role FROM users WHERE id = ?', [payload.id]);
        if (!user) {
            res.status(401).json({ error: 'Usuario no encontrado.' });
            return;
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token inválido o expirado.' });
    }
};

const optionalAuth = async (req, _res, next) => {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) {
        next();
        return;
    }
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        const user = await get('SELECT id, name, email, role FROM users WHERE id = ?', [payload.id]);
        if (user) {
            req.user = user;
        }
    } catch (error) {
        // Ignore invalid tokens for optional auth.
    }
    next();
};

const requireRole = (roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
        res.status(403).json({ error: 'Permisos insuficientes.' });
        return;
    }
    next();
};

const ensureAdminUser = async () => {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminEmail || !adminPassword) {
        console.warn('⚠️ ADMIN_EMAIL o ADMIN_PASSWORD no configurados.');
        return;
    }
    const existing = await get('SELECT id FROM users WHERE email = ?', [adminEmail]);
    if (existing) {
        return;
    }
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await run(
        'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
        ['Admin', adminEmail, passwordHash, 'admin']
    );
    console.log('✓ Usuario admin inicial creado.');
};

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: 'Email y contraseña requeridos.' });
        return;
    }
    const user = await get('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) {
        res.status(401).json({ error: 'Credenciales inválidas.' });
        return;
    }
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
        res.status(401).json({ error: 'Credenciales inválidas.' });
        return;
    }
    res.json({
        token: signToken(user),
        user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
});

app.get('/api/auth/me', authRequired, (req, res) => {
    res.json({ user: req.user });
});

app.post('/api/auth/users', authRequired, requireRole(['admin']), async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
        res.status(400).json({ error: 'Nombre, email y contraseña requeridos.' });
        return;
    }
    const existing = await get('SELECT id FROM users WHERE email = ?', [email]);
    if (existing) {
        res.status(409).json({ error: 'El email ya existe.' });
        return;
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const result = await run(
        'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
        [name, email, passwordHash, role || 'editor']
    );
    res.status(201).json({ id: result.lastID, name, email, role: role || 'editor' });
});

app.get('/api/posts', optionalAuth, async (req, res) => {
    const status = req.query.status || 'published';
    let query = `
        SELECT posts.*, users.name AS author_name
        FROM posts
        LEFT JOIN users ON posts.author_id = users.id
        WHERE posts.status = ?
        ORDER BY posts.published_at DESC, posts.created_at DESC
    `;
    let params = [status];

    if (req.user && req.query.all === 'true') {
        query = `
            SELECT posts.*, users.name AS author_name
            FROM posts
            LEFT JOIN users ON posts.author_id = users.id
            ORDER BY posts.updated_at DESC
        `;
        params = [];
    }

    const posts = await all(query, params);
    res.json({ posts });
});

app.get('/api/posts/:slug', optionalAuth, async (req, res) => {
    const slug = req.params.slug;
    const post = await get(
        `
        SELECT posts.*, users.name AS author_name
        FROM posts
        LEFT JOIN users ON posts.author_id = users.id
        WHERE posts.slug = ?
        `,
        [slug]
    );
    if (!post) {
        res.status(404).json({ error: 'Post no encontrado.' });
        return;
    }
    if (post.status !== 'published' && (!req.user || req.user.role !== 'admin')) {
        res.status(403).json({ error: 'No autorizado.' });
        return;
    }
    res.json({ post });
});

app.get('/api/admin/posts', authRequired, requireRole(['admin', 'editor']), async (_req, res) => {
    const posts = await all(
        `
        SELECT posts.*, users.name AS author_name
        FROM posts
        LEFT JOIN users ON posts.author_id = users.id
        ORDER BY posts.updated_at DESC
        `
    );
    res.json({ posts });
});

app.post('/api/posts', authRequired, requireRole(['admin', 'editor']), async (req, res) => {
    const {
        title,
        slug,
        excerpt,
        content,
        coverImageUrl,
        status,
        ogTitle,
        ogDescription,
        ogImageUrl
    } = req.body;
    if (!title || !content) {
        res.status(400).json({ error: 'Título y contenido requeridos.' });
        return;
    }
    const baseSlug = slugify(slug || title);
    const uniqueSlug = await createUniqueSlug(baseSlug);
    const now = new Date().toISOString();
    const publishDate = status === 'published' ? now : null;
    const result = await run(
        `
        INSERT INTO posts (
            title,
            slug,
            excerpt,
            content,
            cover_image_url,
            og_title,
            og_description,
            og_image_url,
            status,
            author_id,
            created_at,
            updated_at,
            published_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
            title,
            uniqueSlug,
            excerpt || null,
            content,
            coverImageUrl || null,
            ogTitle || null,
            ogDescription || null,
            ogImageUrl || null,
            status || 'draft',
            req.user.id,
            now,
            now,
            publishDate
        ]
    );
    res.status(201).json({ id: result.lastID, slug: uniqueSlug });
});

app.put('/api/posts/:id', authRequired, requireRole(['admin', 'editor']), async (req, res) => {
    const postId = req.params.id;
    const existing = await get('SELECT * FROM posts WHERE id = ?', [postId]);
    if (!existing) {
        res.status(404).json({ error: 'Post no encontrado.' });
        return;
    }
    const {
        title,
        slug,
        excerpt,
        content,
        coverImageUrl,
        status,
        ogTitle,
        ogDescription,
        ogImageUrl
    } = req.body;
    const baseSlug = slug ? slugify(slug) : existing.slug;
    const finalSlug = baseSlug === existing.slug ? baseSlug : await createUniqueSlug(baseSlug);
    const now = new Date().toISOString();
    const publishDate =
        status === 'published' && !existing.published_at ? now : existing.published_at;

    await run(
        `
        UPDATE posts
        SET title = ?, slug = ?, excerpt = ?, content = ?, cover_image_url = ?,
            og_title = ?, og_description = ?, og_image_url = ?, status = ?,
            updated_at = ?, published_at = ?
        WHERE id = ?
        `,
        [
            title || existing.title,
            finalSlug,
            excerpt ?? existing.excerpt,
            content || existing.content,
            coverImageUrl ?? existing.cover_image_url,
            ogTitle ?? existing.og_title,
            ogDescription ?? existing.og_description,
            ogImageUrl ?? existing.og_image_url,
            status || existing.status,
            now,
            publishDate,
            postId
        ]
    );
    res.json({ id: postId, slug: finalSlug });
});

app.delete('/api/posts/:id', authRequired, requireRole(['admin']), async (req, res) => {
    const postId = req.params.id;
    await run('DELETE FROM posts WHERE id = ?', [postId]);
    res.json({ success: true });
});

app.post('/api/uploads', authRequired, requireRole(['admin', 'editor']), upload.single('image'), async (req, res) => {
    if (!req.file) {
        res.status(400).json({ error: 'No se recibió imagen.' });
        return;
    }
    await run(
        `
        INSERT INTO uploads (filename, original_name, mime_type, size, uploaded_by)
        VALUES (?, ?, ?, ?, ?)
        `,
        [
            req.file.filename,
            req.file.originalname,
            req.file.mimetype,
            req.file.size,
            req.user.id
        ]
    );
    res.status(201).json({ url: `/uploads/${req.file.filename}` });
});

app.post('/api/contact', async (req, res) => {
    const { name, email, phone, service, message } = req.body;

    if (!name || !email || !service || !message) {
        res.status(400).json({
            success: false,
            message: 'Por favor completa todos los campos requeridos'
        });
        return;
    }

    try {
        const clientMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: '✓ Hemos recibido tu mensaje - Raúl Lencina Personal Trainer',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2c3e50;">¡Hola ${name}!</h2>
                    <p>Gracias por contactarme. He recibido tu mensaje y me pondré en contacto contigo en menos de 24 horas.</p>
                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>Resumen de tu solicitud:</strong></p>
                        <p><strong>Nombre:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        ${phone ? `<p><strong>Teléfono:</strong> ${phone}</p>` : ''}
                        <p><strong>Servicio de interés:</strong> ${service}</p>
                        <p><strong>Mensaje:</strong></p>
                        <p>${message.replace(/\n/g, '<br>')}</p>
                    </div>
                    <p>Mientras tanto, puedes seguirme en mis redes sociales para consejos de fitness:</p>
                    <ul>
                        <li><a href="https://www.instagram.com/raullencina7">Instagram</a></li>
                        <li><a href="https://www.tiktok.com/@thejirafa07">TikTok</a></li>
                    </ul>
                    <p>¡Que comience tu transformación!</p>
                    <p style="color: #7f8c8d;">Raúl Lencina<br>Personal Trainer Certificado</p>
                </div>
            `
        };

        const adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL,
            subject: `🔔 Nuevo mensaje de contacto - ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #e74c3c;">📬 Nuevo mensaje de contacto</h2>
                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px;">
                        <p><strong>Nombre:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        ${phone ? `<p><strong>Teléfono:</strong> ${phone}</p>` : ''}
                        <p><strong>Servicio de interés:</strong> ${service}</p>
                        <hr>
                        <p><strong>Mensaje:</strong></p>
                        <p>${message.replace(/\n/g, '<br>')}</p>
                    </div>
                    <p style="margin-top: 20px; color: #7f8c8d;">
                        <strong>Responder a:</strong> ${email}
                    </p>
                </div>
            `
        };

        await transporter.sendMail(clientMailOptions);
        await transporter.sendMail(adminMailOptions);

        res.json({
            success: true,
            message: '¡Mensaje enviado con éxito! Me pondré en contacto contigo en menos de 24 horas.'
        });
    } catch (error) {
        console.error('Error al enviar email:', error);
        res.status(500).json({
            success: false,
            message: 'Error al enviar el mensaje. Intenta de nuevo más tarde.'
        });
    }
});

app.get('/api/test', (_req, res) => {
    res.json({
        status: 'Backend funcionando correctamente',
        timestamp: new Date()
    });
});

app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use((err, _req, res, _next) => {
    res.status(400).json({ error: err.message || 'Error inesperado.' });
});

const startServer = async () => {
    await initDb();
    await ensureAdminUser();

    if (process.env.NODE_ENV !== 'production') {
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`✓ Servidor ejecutándose en puerto ${PORT}`);
            console.log(`✓ API disponible en http://localhost:${PORT}`);
        });
    }
};

startServer();

module.exports = app;
