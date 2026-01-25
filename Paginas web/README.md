# 🏋️ Raúl Lencina - Personal Trainer
## Backend del Formulario de Contacto

---

## 📋 Requisitos Previos

- Node.js instalado (descargar desde https://nodejs.org/)
- Una cuenta de Gmail
- Una contraseña de aplicación de Gmail

---

## 🔧 Configuración Inicial

### Paso 1: Instalar dependencias

```bash
npm install
```

Este comando instalará:
- **express**: Framework web
- **nodemailer**: Para enviar emails
- **cors**: Para permitir solicitudes entre dominios
- **dotenv**: Para variables de entorno

### Paso 2: Obtener contraseña de aplicación de Gmail

1. Ir a https://myaccount.google.com/security
2. Activar la verificación en dos pasos (si no está activada)
3. Buscar "Contraseñas de aplicación"
4. Seleccionar "Correo" y "Windows"
5. Copiar la contraseña generada

### Paso 3: Configurar el archivo .env

1. Abrir el archivo `.env` en la carpeta del proyecto
2. Reemplazar los valores:

```env
ADMIN_EMAIL=tu_email_aqui@gmail.com
EMAIL_USER=tu_email_aqui@gmail.com
EMAIL_PASSWORD=contraseña_app_generada
PORT=3000
```

⚠️ **IMPORTANTE:** 
- No compartir este archivo públicamente
- Agregarlo a `.gitignore` si usas Git
- Esta contraseña es solo para esta aplicación

---

## 🚀 Ejecutar el servidor

### Modo desarrollo (con auto-reload):
```bash
npm run dev
```

### Modo producción:
```bash
npm start
```

El servidor debería mostrar:
```
✓ Servidor ejecutándose en puerto 3000
✓ API disponible en http://localhost:3000
```

---

## 🧪 Probar el backend

### Opción 1: A través del formulario
1. Abrir `Raultrainner.html` en el navegador
2. Llenar el formulario
3. Enviar

### Opción 2: Test de API
Visitar: `http://localhost:3000/api/test`

Debería retornar:
```json
{
  "status": "Backend funcionando correctamente",
  "timestamp": "2026-01-25T..."
}
```

---

## 📧 ¿Qué sucede cuando alguien envía el formulario?

1. **El cliente recibe:** Confirmación de que su mensaje fue recibido
2. **Tú recibas:** El mensaje completo con todos los detalles en tu email
3. **Validación:** Se valida que todos los campos requeridos estén completos
4. **Seguridad:** Los datos se envían de forma segura

---

## 📱 WhatsApp

Para agregar el link de WhatsApp actualizado, editar en `Raultrainner.html`:

Buscar:
```html
<a href="#" title="WhatsApp"><i class="fab fa-whatsapp"></i></a>
```

Reemplazar por:
```html
<a href="https://wa.me/YOUR_WHATSAPP_NUMBER?text=Hola%20Raúl%2C%20quisiera%20conocer%20más%20sobre%20tus%20servicios" target="_blank" title="WhatsApp"><i class="fab fa-whatsapp"></i></a>
```

Ejemplo: `https://wa.me/5493764828210`

---

## 🌐 Desplegar a la web

### Opción 1: Usar Vercel (Recomendado)
1. Crear cuenta en https://vercel.com
2. Conectar repositorio GitHub
3. Variables de entorno en Vercel Dashboard

### Opción 2: Usar Render
1. Crear cuenta en https://render.com
2. Crear "Web Service"
3. Configurar variables de entorno

### Opción 3: Usar Railway
1. Crear cuenta en https://railway.app
2. Conectar GitHub
3. Configurar variables

---

## ❌ Problemas comunes

### Error: "Cannot find module 'express'"
**Solución:** Ejecutar `npm install`

### Error: "Cannot authenticate user"
**Solución:** Verificar que la contraseña de aplicación es correcta en `.env`

### El formulario no envía
**Solución:** 
1. Abrir consola (F12)
2. Verificar que el servidor esté corriendo (http://localhost:3000/api/test)
3. Revisar logs del servidor

### Gmail rechaza el correo
**Solución:** 
- Activar acceso a aplicaciones menos seguras en https://myaccount.google.com/lesssecureapps
- O usar contraseña de aplicación (recomendado)

---

## 📊 Variables de entorno (.env)

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| ADMIN_EMAIL | Tu email para recibir mensajes | raul@gmail.com |
| EMAIL_USER | Email de Gmail para enviar | raul@gmail.com |
| EMAIL_PASSWORD | Contraseña de aplicación | abcd efgh ijkl mnop |
| PORT | Puerto del servidor | 3000 |

---

## 🔒 Seguridad

✓ Emails encriptados en tránsito
✓ Validación de datos en servidor
✓ Variables de entorno protegidas
✓ CORS configurado
✓ Sin almacenamiento de datos sensibles

---

## 📞 Contacto

Para soporte o preguntas, contacta a Raúl a través del formulario.

---

**Última actualización:** 25 de Enero 2026
