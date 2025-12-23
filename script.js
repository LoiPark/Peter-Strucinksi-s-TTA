// ========================
// SCROLL TO TOP ON PAGE LOAD
// ========================

window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

// Force scroll to top on page load/refresh
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('load', () => {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 0);
});

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
const navButtons = document.querySelector('.nav-buttons');

if (hamburger && navMenu) {
    // Toggle menu when hamburger is clicked
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        if (navButtons) {
            navButtons.classList.toggle('active');
        }
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            if (navButtons) {
                navButtons.classList.remove('active');
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && (!navButtons || !navButtons.contains(e.target))) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            if (navButtons) {
                navButtons.classList.remove('active');
            }
        }
    });
    
    // Close menu when clicking the Get Started button
    if (navButtons) {
        navButtons.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            navButtons.classList.remove('active');
        });
    }
}

// ========================
// NAVBAR SCROLL EFFECT
// ========================

const navbar = document.querySelector('.navbar');
const navContainer = document.querySelector('.nav-container');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
   
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
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form values
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value.trim();
        
        // Validation: Check all required fields are filled
        if (!firstName || !lastName || !email || !service || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Validation: Email must contain @
        if (!email.includes('@')) {
            alert('Please enter a valid email address containing @');
            return;
        }
        
        // Validation: Email format check (more thorough)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Validation: Phone number must be 10 numerical characters
        const phoneDigits = phone.replace(/\D/g, ''); // Remove non-numeric characters
        if (phoneDigits.length !== 10) {
            alert('Please enter a valid 10-digit phone number.');
            return;
        }
        
        // Validation: Service must be selected
        if (service === '' || !service) {
            alert('Please select a service you are interested in.');
            return;
        }
        
        const formData = new FormData(contactForm);
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        
        // Disable button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Clear the form
                contactForm.reset();
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success-message';
                successMessage.textContent = 'Thank you! Your message has been sent successfully. We will get back to you soon!';
                
                // Insert success message before the form
                contactForm.parentElement.insertBefore(successMessage, contactForm);
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
                
                // Re-enable button
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            // Show error message
            alert('Oops! There was a problem sending your message. Please try again or contact us directly.');
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
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
        text: '"In just 2 years of training with Coach Peter, I\'ve gone from USATT Rating 1048 to 1948! I highly recommend him to any serious players looking to improve fast!"',
        author: 'Loi Park',
        date: 'USATT Rating 1948'
    },
    {
        text: '"He cares about his student\'s needs. He goes above and beyond to craft a tailered approach that works best for every individual player."',
        author: 'Vivian Wong',
        date: 'USATT Rating 1588'
    },
    {
        text: '"I came to Peter Strucinski\'s TTA stuck at 1700 USATT rating and now I have won numerous tournaments and improved my rating to 1993. His structured training program and supportive environment made all the difference."',
        author: 'Jun Ou',
        date: 'USATT Rating 1993'
    },
    {
        text: '"Every session with coach Peter, I learn something new and improve my game. He is a great coach and I highly recommend him to anyone looking to improve their game."',
        author: 'Julia Leong',
        date: 'USATT Rating 1250'
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

