const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Ruta para enviar formulario
app.post('/api/contact', async (req, res) => {
    const { name, email, phone, service, message } = req.body;

    // Validación básica
    if (!name || !email || !service || !message) {
        return res.status(400).json({ 
            success: false, 
            message: 'Por favor completa todos los campos requeridos' 
        });
    }

    try {
        // Email para el cliente
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

        // Email para Raúl
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

        // Enviar emails
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

// Ruta de prueba
app.get('/api/test', (req, res) => {
    res.json({ 
        status: 'Backend funcionando correctamente',
        timestamp: new Date()
    });
});

// Ruta raíz para verificar que el servidor está funcionando
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Raultrainner.html'));
});

// Para desarrollo local
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`✓ Servidor ejecutándose en puerto ${PORT}`);
        console.log(`✓ API disponible en http://localhost:${PORT}`);
    });
}

// Exportar para Vercel
module.exports = app;
