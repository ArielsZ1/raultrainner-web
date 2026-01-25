# 🚀 Guía de Despliegue a Producción

Este documento explica cómo publicar tu sitio web en internet para que sea accesible públicamente.

## 📋 Opciones de Hosting

### Opción 1: Vercel (⭐ RECOMENDADA - Gratis)

**Ventajas:**
- Gratis para proyectos pequeños
- Despliegue automático desde GitHub
- HTTPS incluido
- Variables de entorno seguras

**Pasos:**

1. **Crear repositorio en GitHub**
   - Ve a https://github.com/new
   - Nombre: `raultrainner-web`
   - Crear repositorio

2. **Subir código a GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/TU_USUARIO/raultrainner-web.git
   git push -u origin main
   ```

3. **Conectar con Vercel**
   - Ve a https://vercel.com
   - Iniciar sesión con GitHub
   - "Import Project"
   - Seleccionar tu repositorio
   - Environment Variables:
     - ADMIN_EMAIL: tu email
     - EMAIL_USER: tu email Gmail
     - EMAIL_PASSWORD: contraseña de aplicación
   - Deploy

4. **Tu sitio estará en:** `https://raultrainner-web.vercel.app`

---

### Opción 2: Render (⭐ RECOMENDADA - Gratis)

**Ventajas:**
- Gratis
- Base de datos incluida
- Actualizaciones automáticas

**Pasos:**

1. **Crear cuenta en Render**
   - Ve a https://render.com
   - Sign Up

2. **Crear Web Service**
   - New → Web Service
   - Conectar GitHub
   - Seleccionar tu repositorio

3. **Configurar**
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Environment Variables (mismo que Vercel)

4. **Deploy**

---

### Opción 3: Railway (⭐ RECOMENDADA - Gratis)

**Pasos:**

1. Ve a https://railway.app
2. Login con GitHub
3. New Project → GitHub Repo
4. Selecciona tu repositorio
5. Agregar variables de entorno
6. Deploy

---

### Opción 4: Hostinger (💰 De pago - $2-4/mes)

Si prefieres control total:

1. Compra hosting en https://www.hostinger.com
2. Panel de control con cPanel
3. Subir archivos via FTP
4. Instalar Node.js
5. Configurar variables de entorno

---

## 🌐 Obtener un Dominio Propio

### Opciones gratis:
- **Render/Railway/Vercel:** Incluyen subdominio gratis

### Opciones de pago:
- **GoDaddy:** ~$10-15/año
- **Namecheap:** ~$8-12/año
- **Google Domains:** ~$12/año

### Después de comprar:
1. En tu registrador de dominio, busca "DNS"
2. Apunta los nameservers a Vercel/Render
3. Espertar 24-48 horas para que se propague

---

## 📧 Configuración del Email

### Usar Gmail (recomendado):
1. La contraseña de aplicación que ya generaste funciona
2. No hay costo adicional

### Usar dominio personalizado:
Opciones:
- Gmail + alias de dominio
- SendGrid (gratis hasta 100 emails/día)
- Mailgun (gratis hasta 5000 emails/mes)

---

## 🔒 Seguridad en Producción

✅ Checklist:

- [ ] HTTPS activo (automático en Vercel/Render)
- [ ] Variables de entorno no visibles
- [ ] .env NO subido a GitHub
- [ ] .gitignore contiene .env
- [ ] Validación de datos en servidor
- [ ] Logs de errores revisados

---

## 🚦 Pasos Finales Antes de Publicar

1. **Prueba completa**
   ```bash
   npm test  (si tienes tests)
   ```

2. **Optimizar imágenes**
   - Convertir a WebP
   - Reducir tamaño
   - Lazy loading

3. **Minificar CSS/JS**
   ```bash
   npm install -D minify
   ```

4. **SEO**
   - Meta tags completos
   - Sitemap.xml
   - robots.txt

5. **Analytics**
   - Google Analytics
   - Monitoreo de errores

6. **Backup**
   - Código en GitHub
   - Base de datos si aplica

---

## 📊 Monitoreo en Producción

Agregar servicios para monitoreo:

- **Sentry:** Errores en tiempo real
- **LogRocket:** Sesiones de usuarios
- **Uptime Robot:** Verificar que siga online
- **Google Search Console:** SEO

---

## 🔧 Mantenimiento

**Cada semana:**
- Revisar logs de errores
- Comprobar que emails se envían

**Cada mes:**
- Actualizar dependencias: `npm update`
- Revisar seguridad
- Analizar tráfico

**Cada 6 meses:**
- Auditoría de seguridad
- Optimización de performance
- Backup del código

---

## ✅ Checklist Final

Antes de lanzar público:

- [ ] Dominio comprado y apuntando correctamente
- [ ] HTTPS activo
- [ ] Formulario enviando emails correctamente
- [ ] WhatsApp link funcional
- [ ] Email real en footer
- [ ] Teléfono actualizado
- [ ] Todas las imágenes cargando
- [ ] Formulario responsive en móvil
- [ ] No hay console errors
- [ ] Política de privacidad incluida
- [ ] Términos de servicio (opcional)

---

## 🎉 ¡Listo!

Una vez completado, tu sitio estará online y accesible para clientes potenciales.

**URLs ejemplo:**
- Con Vercel: `https://raultrainner-web.vercel.app`
- Con dominio: `https://www.raullencina.com`

---

**¿Necesitas ayuda?** Contacta al soporte de tu proveedor de hosting.
