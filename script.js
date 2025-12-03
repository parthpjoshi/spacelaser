const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
const navList = nav.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navList.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navList.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.classList.remove('active');
        navList.classList.remove('active');
    }
});

const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const sections = document.querySelectorAll('section[id]');

function setActiveNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});


function revealOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .service-card, .product-card, .project-card, .vision-mission-card, .timeline-item, .contact-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 50) {
            element.classList.add('revealed');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .service-card, .product-card, .project-card, 
        .vision-mission-card, .timeline-item, .contact-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .feature-card.revealed, .service-card.revealed, .product-card.revealed, 
        .project-card.revealed, .vision-mission-card.revealed, 
        .timeline-item.revealed, .contact-card.revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    revealOnScroll();
});

window.addEventListener('scroll', revealOnScroll, { passive: true });

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
        console.log('Image failed to load:', this.src);
    });
});
