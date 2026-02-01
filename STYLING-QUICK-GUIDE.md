# 🎨 Guía Rápida de Estilos Visuales

## 📋 Tabla de Contenidos
1. [Variables CSS](#variables-css)
2. [Componentes Principales](#componentes-principales)
3. [Animaciones](#animaciones)
4. [Responsiveness](#responsiveness)
5. [Accesibilidad](#accesibilidad)

---

## 🎯 Variables CSS

Todas las variables están definidas en `:root` en `style.css`:

```css
:root {
    --bg: #0f1723;                    /* Fondo principal oscuro */
    --muted: #95a0ab;                 /* Texto secundario (gris) */
    --accent: #2c9aa7;                /* Color primario (verde-azul) */
    --accent-2: #7bd389;              /* Color secundario (verde claro) */
    --card-bg: rgba(255,255,255,0.06);/* Fondo card semi-transparent */
    --glass: rgba(255,255,255,0.06);  /* Glassmorphism base */
    --glass-border: rgba(255,255,255,0.08); /* Border glass */
    --glass-blur: 8px;                /* Intensidad blur */
    --radius-lg: 1rem;                /* Border radius cards (16px) */
    --transition-fast: 220ms;         /* Transición estándar */
}
```

### Cómo cambiar colores
```css
/* Cambiar color acento primario (verde-azul) */
--accent: #TU_COLOR_AQUI;

/* Cambiar color acento secundario (verde claro) */
--accent-2: #TU_COLOR_AQUI;

/* Cambiar intensidad blur glassmorphism */
--glass-blur: 12px; /* Más blur = más difuminado */
```

---

## 🏗️ Componentes Principales

### 1. Hero Section
```html
<section class="hero" id="inicio">
    <div class="container">
        <h1>Título con <span class="highlight">highlight</span></h1>
        <p>Descripción</p>
        <div class="hero-btns">
            <a href="#contacto" class="btn">Botón Primario</a>
            <a href="#about" class="btn btn-secondary">Botón Secundario</a>
        </div>
    </div>
</section>
```

**Características**:
- Fondo con gradiente animado
- Pseudo-elemento `::before` con animación floatBG
- Overlay sutil con radiantes

---

### 2. Cards (Servicios, Precios, Testimonios)
```html
<div class="service-card">
    <div class="service-icon"><i class="fas fa-icon"></i></div>
    <h3>Título</h3>
    <p>Descripción</p>
</div>
```

**Estilos aplicados**:
- Glassmorphism (background + border + backdrop-filter)
- Sombra volumétrica
- Hover effect: translateY + scale

---

### 3. Botones
```html
<!-- Botón Primario -->
<button class="btn">Acción Principal</button>

<!-- Botón Secundario (Transparent) -->
<button class="btn btn-secondary">Acción Secundaria</button>
```

**Estados**:
- Normal: Gradiente + sombra volumétrica
- Hover: Elevación (-4px) + sombra aumentada
- Focus: Outline accent con offset

---

### 4. FAQ Accordion
```html
<div class="faq-item">
    <div class="faq-question">
        <span>Pregunta frecuente</span>
        <i class="fas fa-chevron-down"></i>
    </div>
    <div class="faq-answer">
        <p>Respuesta detallada...</p>
    </div>
</div>
```

**JavaScript**:
```javascript
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    item.querySelector('.faq-question').addEventListener('click', () => {
        item.classList.toggle('open');
    });
});
```

**CSS para toggle**:
```css
.faq-item.open .faq-answer {
    max-height: 480px;  /* Ajusta según necesidad */
    opacity: 1;
}
```

---

### 5. Formulario
```html
<form id="contactForm">
    <div class="form-group">
        <label for="name">Campo</label>
        <input type="text" id="name" class="form-control" required>
    </div>
    <button type="submit" class="btn">Enviar</button>
</form>
```

**Estilos**:
- Input glassmorphism
- Focus: Border accent + glow shadow
- Success message: Gradient + animation slideIn

---

## 🎬 Animaciones

### 1. floatBG (Hero)
```css
@keyframes floatBG {
    0% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-12px) scale(1.02); }
    100% { transform: translateY(0) scale(1); }
}

.hero::before {
    animation: floatBG 12s ease-in-out infinite;
}
```

**Uso**: Decorativo, fondo animado del hero

---

### 2. slideIn (Success Message)
```css
@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.success-message.active {
    animation: slideIn 300ms ease;
}
```

**Uso**: Mostrar mensaje de éxito del formulario

---

### 3. slideDown (Mobile Menu)
```css
@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

nav.open {
    animation: slideDown 300ms ease;
}
```

**Uso**: Abrir menú móvil

---

### 4. Reveal (Cards - IntersectionObserver)
```css
.reveal {
    opacity: 0;
    transform: translateY(12px) scale(0.995);
}
.reveal.visible {
    opacity: 1;
    transform: none;
}
```

**JavaScript**:
```javascript
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

---

## 📱 Responsiveness

### Breakpoints

```css
/* Desktop (1200px+) */
/* Default styles */

/* Tablet (992px - 1199px) */
@media (max-width: 992px) {
    h1 { font-size: 2.5rem; }
    h2 { font-size: 2rem; }
    .about-content { flex-direction: column; }
}

/* Móvil (768px - 991px) */
@media (max-width: 768px) {
    nav { position: absolute; display: none; }
    nav.open { display: block; }
    .mobile-menu-btn { display: block; }
}

/* Móvil pequeño (576px - 767px) */
@media (max-width: 576px) {
    h1 { font-size: 1.8rem; }
    section { padding: 50px 0; }
}
```

### Cambios específicos por tamaño

**Desktop**:
- Grid 3 columnas en cards
- Menú horizontal visible
- Animaciones complejas

**Tablet**:
- Grid 2 columnas flexible
- Menú hamburguesa visible
- Espacios reducidos

**Móvil**:
- Stack vertical
- Menú hamburguesa
- Tipografía comprimida

---

## ♿ Accesibilidad

### Focus States
```css
a:focus, button:focus, .btn:focus {
    outline: 3px solid rgba(123, 211, 137, 0.12);
    outline-offset: 4px;
    border-radius: 4px;
}
```

### Prefers Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
    * {
        animation: none !important;
        transition: none !important;
    }
}
```

### Semántica HTML
- Usar `<h1>`, `<h2>`, etc. en orden
- `<button>` para acciones interactivas
- `<form>` con `<label>` asociados

---

## 🔧 Cómo Personalizar

### Cambiar Color Acento
```css
:root {
    --accent: #FF6B6B;      /* Rojo */
    --accent-2: #FFD93D;    /* Amarillo */
}
```

### Cambiar Tipografía
```css
body {
    font-family: "Poppins", system-ui, sans-serif;
    /* Cambiar "Inter" por tu font preferida */
}
```

### Intensidad Glassmorphism
```css
:root {
    --glass: rgba(255,255,255,0.10);  /* Más opaco */
    --glass-blur: 12px;               /* Más blur */
}
```

### Velocidad Animaciones
```css
:root {
    --transition-fast: 300ms;  /* Más lento (220ms por defecto) */
}
```

---

## 📊 Archivo CSS - Estructura

```
style.css
├── Variables Base (:root)
├── Tipografía y Reset
├── Highlight & Buttons
├── Header & Navigation
├── Hero Section
├── About
├── Services
├── Testimonials
├── Pricing
├── FAQs
├── Contact Form
├── Footer
├── Reveal Animation
├── Accessibility
├── Prefers Reduced Motion
└── Responsive Media Queries
```

---

## 🚀 Tips de Optimización

1. **Performance**: `will-change: transform` en elementos animados
2. **Smooth scrolling**: `scroll-behavior: smooth` en html
3. **Backdrop filter**: Cuidado en navegadores antiguos
4. **Transform vs Position**: Usar `transform` para animaciones
5. **Debounce scroll events**: Para scroll listeners

---

## 🎨 Paleta de Colores Completa

| Nombre | Color | Uso |
|--------|-------|-----|
| Bg | #0f1723 | Fondo principal |
| Dark | #071026 | Overlays oscuros |
| Accent 1 | #2c9aa7 | Color primario |
| Accent 2 | #7bd389 | Color secundario |
| Muted | #95a0ab | Texto gris |
| Light | #e6eef5 | Texto principal |

---

## 📞 Soporte Rápido

**¿Cards no tienen efecto hover?**
→ Verificar `backdrop-filter` compatibility

**¿Menú móvil no aparece?**
→ Revisar clase `open` en `nav`

**¿Animaciones no funcionan?**
→ Revisar `prefers-reduced-motion`

**¿Glassmorphism no se ve?**
→ Necesita navegador moderno (Chrome 76+)

---

**¡Listo para personalizar tu página! 🚀**
