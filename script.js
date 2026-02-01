// Esperar a que EmailJS esté disponible
function initializeEmailJS() {
    if (typeof emailjs !== 'undefined') {
        // Inicializar EmailJS
        emailjs.init({
            publicKey: 'Wp6bcuFG3HNCid_1h',
            serviceID: 'service_0mau13i'
        });
    } else {
        // Reintentar si aún no carga
        setTimeout(initializeEmailJS, 100);
    }
}

// Llamar la función cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeEmailJS);
} else {
    initializeEmailJS();
}

// ===== INTERSECTION OBSERVER PARA ANIMACIONES DE ENTRADA =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplicar reveal a elementos específicos
document.addEventListener('DOMContentLoaded', () => {
    // Agregar clase reveal a cards si no está presente
    const cards = document.querySelectorAll('.service-card, .pricing-card, .testimonial-card');
    cards.forEach(card => {
        if (!card.classList.contains('reveal')) {
            card.classList.add('reveal');
        }
        observer.observe(card);
    });
});

// Menú móvil
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const nav = document.querySelector('nav');

mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
    mobileMenuBtn.innerHTML = nav.classList.contains('open') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Cerrar menú al hacer clic en un enlace
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('open');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Formulario de contacto
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');
const submitBtn = document.querySelector('.form-submit button');

// Validar email
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Validar formulario antes de enviar
function validateForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('El nombre debe tener al menos 2 caracteres');
    }
    
    if (!isValidEmail(formData.email)) {
        errors.push('Por favor ingresa un email válido');
    }
    
    if (!formData.service || formData.service === '') {
        errors.push('Por favor selecciona un servicio');
    }
    
    if (!formData.message || formData.message.trim().length < 10) {
        errors.push('El mensaje debe tener al menos 10 caracteres');
    }
    
    return errors;
}

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Deshabilitar botón mientras se envía
    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '⏳ Enviando...';
    
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        service: document.getElementById('service').value,
        message: document.getElementById('message').value.trim()
    };
    
    // Validar formulario
    const errors = validateForm(formData);
    if (errors.length > 0) {
        alert('⚠️ Errores en el formulario:\n\n' + errors.join('\n'));
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        return;
    }
    
    try {
        // Verificar que EmailJS está cargado
        if (typeof emailjs === 'undefined') {
            throw new Error('EmailJS no se pudo cargar. Por favor, recarga la página.');
        }
        
        // Enviar email mediante EmailJS
        const result = await emailjs.send(
            'service_0mau13i', // Service ID
            'template_contact',      // Template ID
            {
                to_email: 'rulo.lenci07@gmail.com', // Tu email
                name: formData.name,
                email: formData.email,
                phone: formData.phone || 'No proporcionado',
                service: formData.service,
                message: formData.message,
                time: new Date().toLocaleString('es-AR')
            }
        );
        
        if (result.status === 200) {
            // Mostrar mensaje de éxito
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> ¡Mensaje enviado con éxito! Me pondré en contacto contigo en menos de 24 horas.';
            successMessage.classList.add('active');
            
            // Resetear formulario
            contactForm.reset();
            
            // Ocultar mensaje después de 6 segundos
            setTimeout(() => {
                successMessage.classList.remove('active');
            }, 6000);
            
            // Desplazarse al mensaje de éxito
            setTimeout(() => {
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        } else {
            alert('⚠️ Error: No se pudo enviar el mensaje');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('❌ Error al enviar el mensaje: ' + error.message);
    } finally {
        // Rehabilitar botón
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
});

// Navegación suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Cambiar estilo del header al hacer scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(44, 62, 80, 0.95)';
        header.style.padding = '15px 0';
    } else {
        header.style.backgroundColor = 'var(--primary)';
        header.style.padding = '20px 0';
    }
});

// FAQs - Acordeón
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Toggle del item actual
        item.classList.toggle('open');
    });
});
