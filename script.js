// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');

mobileMenuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        nav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
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

// Scroll-triggered Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll(
    '.problem-card, .service-card, .feature-card, .process-step, .testimonial-card'
);

animateElements.forEach(el => {
    observer.observe(el);
});

// Form Validation and Submission
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');
const formSuccess = document.getElementById('form-success');

// Validation functions
function validateName(name) {
    if (name.trim() === '') {
        return 'Name is required';
    }
    if (name.trim().length < 2) {
        return 'Name must be at least 2 characters';
    }
    return '';
}

function validateEmail(email) {
    if (email.trim() === '') {
        return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address';
    }
    return '';
}

function validateMessage(message) {
    if (message.trim() === '') {
        return 'Message is required';
    }
    if (message.trim().length < 10) {
        return 'Message must be at least 10 characters';
    }
    return '';
}

// Real-time validation
nameInput.addEventListener('blur', () => {
    const error = validateName(nameInput.value);
    nameError.textContent = error;
    nameInput.style.borderColor = error ? '#E74C3C' : '';
});

emailInput.addEventListener('blur', () => {
    const error = validateEmail(emailInput.value);
    emailError.textContent = error;
    emailInput.style.borderColor = error ? '#E74C3C' : '';
});

messageInput.addEventListener('blur', () => {
    const error = validateMessage(messageInput.value);
    messageError.textContent = error;
    messageInput.style.borderColor = error ? '#E74C3C' : '';
});

// Clear errors on input
nameInput.addEventListener('input', () => {
    if (nameError.textContent) {
        nameError.textContent = '';
        nameInput.style.borderColor = '';
    }
});

emailInput.addEventListener('input', () => {
    if (emailError.textContent) {
        emailError.textContent = '';
        emailInput.style.borderColor = '';
    }
});

messageInput.addEventListener('input', () => {
    if (messageError.textContent) {
        messageError.textContent = '';
        messageInput.style.borderColor = '';
    }
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Clear previous errors
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    
    // Validate all fields
    const nameErrorMsg = validateName(nameInput.value);
    const emailErrorMsg = validateEmail(emailInput.value);
    const messageErrorMsg = validateMessage(messageInput.value);
    
    let hasErrors = false;
    
    if (nameErrorMsg) {
        nameError.textContent = nameErrorMsg;
        nameInput.style.borderColor = '#E74C3C';
        hasErrors = true;
    }
    
    if (emailErrorMsg) {
        emailError.textContent = emailErrorMsg;
        emailInput.style.borderColor = '#E74C3C';
        hasErrors = true;
    }
    
    if (messageErrorMsg) {
        messageError.textContent = messageErrorMsg;
        messageInput.style.borderColor = '#E74C3C';
        hasErrors = true;
    }
    
    if (hasErrors) {
        return;
    }
    
    // If validation passes, show success message
    formSuccess.style.display = 'block';
    contactForm.reset();
    
    // Scroll to success message
    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        formSuccess.style.display = 'none';
    }, 5000);
});

// Header scroll effect (optional enhancement)
let lastScroll = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

