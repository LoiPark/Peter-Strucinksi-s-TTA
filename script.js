// ========================
// SMOOTH SCROLLING
// ========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================
// MOBILE NAVIGATION
// ========================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ========================
// NAVBAR SCROLL EFFECT
// ========================

const navbar = document.querySelector('.navbar');
const navContainer = document.querySelector('.nav-container');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.padding = '1rem 0';
        navContainer.style.background = 'rgba(10, 10, 21, 0.98)';
        navContainer.style.padding = '0.6rem 1.25rem';
    } else {
        navbar.style.padding = '1.5rem 0';
        navContainer.style.background = 'rgba(10, 10, 21, 0.95)';
        navContainer.style.padding = '0.75rem 1.5rem';
    }
    
    lastScroll = currentScroll;
});

// ========================
// ANIMATED COUNTERS
// ========================

const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

// Intersection Observer for counter animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(counter => {
    counterObserver.observe(counter);
});

// ========================
// TESTIMONIALS SLIDER
// ========================

const testimonials = document.querySelectorAll('.testimonial-item');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('sliderDots');

let currentTestimonial = 0;

// Create dots
testimonials.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToTestimonial(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function showTestimonial(index) {
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
}

function goToTestimonial(index) {
    currentTestimonial = index;
    showTestimonial(currentTestimonial);
}

if (nextBtn) {
    nextBtn.addEventListener('click', nextTestimonial);
}

if (prevBtn) {
    prevBtn.addEventListener('click', prevTestimonial);
}

// Auto-rotate testimonials
let testimonialInterval = setInterval(nextTestimonial, 5000);

// Pause auto-rotate on hover
const testimonialsSection = document.querySelector('.testimonials-slider');
if (testimonialsSection) {
    testimonialsSection.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    
    testimonialsSection.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    });
}

// ========================
// FAQ ACCORDION
// ========================

const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// ========================
// FORM SUBMISSIONS
// ========================

// Contact Form
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };
        
        // Simple validation
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.service || !formData.message) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Show success message
        alert(`Thank you, ${formData.firstName}! Your message has been sent. We'll get back to you soon!`);
        contactForm.reset();
    });
}

// ========================
// SCROLL ANIMATIONS
// ========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.service-card, .timeline-item, .stat-card, .about-text, .about-image').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    scrollObserver.observe(el);
});

// ========================
// HERO TESTIMONIAL ROTATION
// ========================

const heroTestimonials = [
    {
        text: '"Coach Peter\'s training program transformed my game. His technical expertise and motivational approach helped me win my first national championship."',
        author: 'Michael Chen',
        date: 'December 15, 2024'
    },
    {
        text: '"The personalized training plan made all the difference. I improved my serves and backhand significantly in just three months."',
        author: 'Emma Rodriguez',
        date: 'November 28, 2024'
    },
    {
        text: '"As a beginner, I felt welcomed and supported. Coach Peter broke down complex techniques into easy steps. Highly recommend!"',
        author: 'James Wilson',
        date: 'December 10, 2024'
    }
];

let currentHeroTestimonial = 0;
const heroTestimonialCard = document.querySelector('.testimonial-card');

if (heroTestimonialCard) {
    const heroArrowBtn = heroTestimonialCard.querySelector('.arrow-btn');
    const textElement = heroTestimonialCard.querySelector('.testimonial-text');
    const authorElement = heroTestimonialCard.querySelector('.testimonial-author');
    const dateElement = heroTestimonialCard.querySelector('.testimonial-date');
    
    // Calculate and set fixed height based on longest testimonial
    let maxHeight = 0;
    const originalText = textElement.textContent;
    const originalAuthor = authorElement.textContent;
    const originalDate = dateElement.textContent;
    
    // Temporarily test all testimonials to find max height
    heroTestimonials.forEach(testimonial => {
        textElement.textContent = testimonial.text;
        authorElement.textContent = testimonial.author;
        dateElement.textContent = testimonial.date;
        const height = heroTestimonialCard.offsetHeight;
        if (height > maxHeight) maxHeight = height;
    });
    
    // Restore original content
    textElement.textContent = originalText;
    authorElement.textContent = originalAuthor;
    dateElement.textContent = originalDate;
    
    // Set fixed height to prevent any layout shift
    heroTestimonialCard.style.height = maxHeight + 'px';
    heroTestimonialCard.style.transition = 'opacity 0.3s ease';
    
    if (heroArrowBtn) {
        heroArrowBtn.addEventListener('click', () => {
            currentHeroTestimonial = (currentHeroTestimonial + 1) % heroTestimonials.length;
            updateHeroTestimonial();
        });
    }
    
    function updateHeroTestimonial() {
        const testimonial = heroTestimonials[currentHeroTestimonial];
        
        // Fade out
        heroTestimonialCard.style.opacity = '0';
        
        setTimeout(() => {
            textElement.textContent = testimonial.text;
            authorElement.textContent = testimonial.author;
            dateElement.textContent = testimonial.date;
            
            // Fade in
            heroTestimonialCard.style.opacity = '1';
        }, 300);
    }
}

// ========================
// ACTIVE NAVIGATION LINK
// ========================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========================
// PAGE LOAD ANIMATION
// ========================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ========================
// CONSOLE MESSAGE
// ========================

console.log('%c🏓 Peter Strucinski\'s TTA', 'font-size: 20px; font-weight: bold; color: #D4FF00;');
console.log('%cWelcome to our website! Ready to elevate your game?', 'font-size: 14px; color: #a0a0b0;');

