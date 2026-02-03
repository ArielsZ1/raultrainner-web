# 🏋️ Raúl Lencina - Personal Trainer
## Sitio Web Profesional v2.0 Premium

> Página web moderna y responsiva para personal trainer con diseño Dark Mode Premium, glassmorphism y animaciones fluidas.

---

## ✨ Características Principales

### 🎨 Diseño Moderno
- **Dark Mode Premium** - Tema oscuro elegante (#0f1723)
- **Glassmorphism** - Efecto vidrio esmerilado en cards y componentes
- **Gradientes Sofisticados** - Acentos verdes-azules (#2c9aa7, #7bd389)
- **Tipografía Inter** - Font moderna vía Google Fonts

### 🎬 Animaciones
- **Hero Animado** - Fondo flotante continuo (floatBG 12s)
- **Micro-interacciones** - Hover effects suaves en cards y botones
- **FAQ Accordion** - Icon rotativo con toggle smooth (350ms)
- **Reveal Animations** - IntersectionObserver para cards
- **Menú Móvil** - Animación fluida (slideDown 300ms)

### 📱 Responsiveness
- **100% Responsive** - Mobile, Tablet, Desktop optimizados
- **Grid Flexible** - Adapta de 3 a 1 columna según viewport
- **Mobile Menu** - Hamburguesa con animación suave

### ♿ Accesibilidad
- **WCAG 2.1 AA** - Completamente accesible
- **Focus States** - Outline clara para navegación con teclado
- **prefers-reduced-motion** - Respeta preferencias del usuario

### ⚡ Performance
- **60fps Smooth** - Todas las animaciones suaves
- **Lightweight** - CSS moderno sin bloat

---

## 🚀 Inicio Rápido

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/ArielsZ1/raultrainner-web.git
cd raultrainner-web

# Instalar dependencias
npm install
```

### Configurar Variables de Entorno

Crear archivo `.env`:

```env
EMAIL_USER=tu_email@gmail.com
EMAIL_PASSWORD=tu_app_password
PORT=3000
ADMIN_EMAIL=admin@raultrainner.com
ADMIN_PASSWORD=change_me
JWT_SECRET=change_me
```

También puedes partir desde `.env.example` para tener todas las variables requeridas.

### Ejecutar Localmente

```bash
npm start
# http://localhost:3000
```
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

## 🧩 Backend (Blog + Usuarios)

El backend ahora incluye gestión de publicaciones, usuarios con roles y subida de imágenes (SQLite local).

### Endpoints clave

- `POST /api/auth/login` → inicia sesión y devuelve JWT.
- `POST /api/auth/users` → crea usuarios (admin).
- `GET /api/posts` → lista posts publicados.
- `GET /api/admin/posts` → lista posts con borradores (admin/editor).
- `POST /api/posts` → crea post (admin/editor).
- `POST /api/uploads` → sube imágenes (admin/editor).

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

## 🎨 Paleta de Colores Premium v2.0

| Color | Código | Uso |
|-------|--------|-----|
| **Fondo Principal** | `#0f1723` | Background base |
| **Fondo Degradado** | `#071026 → #081226` | Hero section |
| **Acento Primario** | `#2c9aa7` | CTAs, links activos |
| **Acento Secundario** | `#7bd389` | Detalles, hover |
| **Texto Principal** | `#e6eef5` | Párrafos, contenido |
| **Texto Secundario** | `#b0bfd0` | Subtítulos |
| **Glassmorphism** | `rgba(255,255,255,0.06)` | Cards, containers |
| **Borde Sutil** | `rgba(255,255,255,0.1)` | Separadores |

**Modo Oscuro Profesional:** Diseñado para reducir fatiga visual y mejorar legibilidad

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Glassmorphism, animaciones, responsive
- **JavaScript ES6+** - IntersectionObserver, interactividad
- **Google Fonts** - Tipografía Inter (300, 400, 600, 700, 800)
- **Font Awesome** - Iconografía profesional

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web minimalista
- **Nodemailer** - Envío de emails
- **EmailJS** - Alternativa email frontend

### Características de Diseño
- ✨ **Glassmorphism** - Efecto vidrio translúcido
- 🎬 **Animaciones Fluidas** - 5+ keyframes personalizados
- 📱 **Responsive Design** - 3 breakpoints (desktop, tablet, mobile)
- ♿ **Accesibilidad WCAG 2.1 AA** - Focus states, prefers-reduced-motion
- ⚡ **Performance** - 60fps smooth, will-change optimization

### ✨ Extras Premium
- 🎬 **Loader elegante** - Fade-in/fade-out animations
- 🌟 **Canvas partículas** - ~40 partículas animadas en hero
- 🖼️ **Hero cinematográfico** - Imagen, blur y overlay gradiente
- 💫 **Sistema de sombras** - Variables CSS (shadow-sm/md/lg/xl)
- 💎 **Botones mejorados** - Microcopy + overlay animation
- ⭐ **Testimonios premium** - Badges de tiempo (3 meses, 2 meses)

---

## 📚 Documentación Completa

Este repositorio incluye guías exhaustivas para cada aspecto del proyecto:

| Documento | Contenido |
|-----------|----------|
| **[START-HERE.md](START-HERE.md)** | 🚀 Primer paso: instalación rápida |
| **[QUICK-START.md](QUICK-START.md)** | ⚡ Guía rápida de configuración |
| **[SETUP-GUIDE.md](SETUP-GUIDE.md)** | 📋 Instalación detallada paso a paso |
| **[VISUAL-UPDATES-SUMMARY.md](VISUAL-UPDATES-SUMMARY.md)** | 🎨 Resumen de actualizaciones visuales |
| **[UPDATES-COMPLETED.md](UPDATES-COMPLETED.md)** | ✅ Lista de cambios realizados |
| **[BEFORE-AFTER-COMPARISON.md](BEFORE-AFTER-COMPARISON.md)** | 📊 Comparativa antes/después |
| **[STYLING-QUICK-GUIDE.md](STYLING-QUICK-GUIDE.md)** | 🎯 Guía rápida de estilos |
| **[PREMIUM-EXTRAS.md](PREMIUM-EXTRAS.md)** | 💎 Extras premium: loader, partículas, sombras |

---

## 🚀 Características Principales por Sección

### Hero Section
- Fondo animado con floatBG (12s)
- ✨ **NUEVO**: Imagen de fondo con blur cinematográfico
- ✨ **NUEVO**: ~40 partículas animadas en canvas
- ✨ **NUEVO**: Overlay degradado con mix-blend-mode
- Degradado premium #071026 → #081226
- CTA buttons con hover glassmorphism
- ✨ **NUEVO**: Microcopy mejorado en botones ("Consulta sin costo")
- Responsive typography

### Services Cards
- 3 columnas → 2 columnas → 1 columna responsive
- Glassmorphism background
- Icon containers con gradientes
- Reveal animation al scroll

### Pricing Section
- Cards destacadas con acento primario
- Feature list con checkmarks
- CTA buttons prominentes
- Hover transform effect

### Testimonials
- Avatar circles
- Rating system (⭐)
- Quote styling
- ✨ **NUEVO**: Badges de tiempo (3 meses, 2 meses, etc)
- Carousel-ready structure

### Contact Form
- Glassmorphism background
- Placeholder styling
- Validación frontend
- EmailJS integration

### Footer
- Grid responsive
- Social links con hover animation
- Links útiles organizados
- Copyright info

---

## 🔧 Personalización Avanzada

### Cambiar Colores Principales
Editar `:root` en [style.css](style.css#L1):

```css
:root {
    --accent: #2c9aa7;      /* Tu color primario */
    --accent-2: #7bd389;    /* Tu color secundario */
    --glass-blur: 8px;      /* Blur effect */
    --transition-fast: 220ms;
}
```

### Ajustar Velocidades de Animación
```css
--transition-fast: 220ms;   /* Cambiar a 150ms para más rápido */
--transition-slow: 350ms;
```

### Modificar Breakpoints Responsive
```css
/* Mobile: < 768px */
/* Tablet: 768px - 992px */
/* Desktop: > 1200px */
```

---

## 🧪 Testing & Validación

### Validar Responsive
- F12 → Device Toggle → Seleccionar diferentes dispositivos
- Verificar que grillas se adaptan (3→2→1 columnas)

### Probar Animaciones
- Abrir DevTools → Performance
- Grabar y verificar 60fps

### Verificar Accesibilidad
- Tab navigation por toda la página
- Screen reader testing
- prefers-reduced-motion respectado

---

## 🐛 Troubleshooting

| Problema | Solución |
|----------|----------|
| Glassmorphism no visible | Navegador debe soportar backdrop-filter (Chrome 76+, Firefox 103+) |
| Animaciones lentas | Desactivar extensiones Chrome, verificar GPU hardware |
| EmailJS no funciona | Verificar service ID, template ID, public key en script.js |
| Responsive roto | Limpiar caché del navegador (Ctrl+Shift+R) |
| Fonts no cargan | Verificar conexión a Google Fonts CDN |

---

## 🔒 Seguridad

✓ Emails encriptados en tránsito
✓ Validación de datos en servidor
✓ Variables de entorno protegidas
✓ CORS configurado
✓ Sin almacenamiento de datos sensibles

---

## 🚀 Próximas Mejoras

- [ ] Dark/Light theme toggle
- [ ] Blog de artículos fitness
- [ ] Gallery con antes/después
- [ ] Sistema de bookings
- [ ] Dashboard para Raúl
- [ ] Analytics integradas

---

## 📞 Soporte

Para soporte o preguntas:
1. 📧 Contacta a Raúl a través del formulario
2. 💬 WhatsApp: [Link en página](index.html)
3. 📱 Instagram: @raultrainner

---

## 📄 Licencia

Este proyecto es exclusivo de Raúl Lencina. Todos los derechos reservados.

---

**Última actualización:** 25 de Enero 2026  
**Versión:** v2.0 Premium  
**Estado:** ✅ Production Ready
