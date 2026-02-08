// Carousel functionality
let slideIndex = 1;

function changeSlide(n) {
    showSlide(slideIndex += n);
}

function currentSlide(n) {
    showSlide(slideIndex = n);
}

function showSlide(n) {
    const slides = document.getElementsByClassName('carousel-slide');
    const indicators = document.getElementsByClassName('indicator');
    
    if (!slides.length) return;
    
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    
    // Remove active class from indicators
    for (let i = 0; i < indicators.length; i++) {
        indicators[i].classList.remove('active');
    }
    
    // Show current slide and indicator
    slides[slideIndex - 1].classList.add('active');
    if (indicators[slideIndex - 1]) {
        indicators[slideIndex - 1].classList.add('active');
    }
    
    // Update carousel position
    const carousel = document.querySelector('.carousel-inner');
    if (carousel) {
        carousel.style.transform = `translateX(-${(slideIndex - 1) * 100}%)`;
    }
}

// Auto-advance carousel
setInterval(() => {
    changeSlide(1);
}, 5000);

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // Contact form handling - FormSubmit.co AJAX
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitBtn = this.querySelector('.btn-submit');
            if (submitBtn) {
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
            }

            try {
                const formData = new FormData(this);

                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 15000);

                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' },
                    signal: controller.signal
                });

                clearTimeout(timeoutId);

                if (!response.ok) {
                    throw new Error('HTTP ' + response.status);
                }

                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const result = await response.json();
                    if (result.success === 'true' || result.success === true) {
                        showFormSuccess(formData.get('name'));
                    } else {
                        throw new Error(result.message || 'Submission failed');
                    }
                } else {
                    showFormSuccess(formData.get('name'));
                }
            } catch (error) {
                let message = 'Something went wrong. ';
                if (error.name === 'AbortError') {
                    message += 'The request timed out. Please try again.';
                } else if (!navigator.onLine) {
                    message += 'Check your internet connection.';
                } else {
                    message += 'Give us a call on 0414 240 662 instead!';
                }
                alert(message);
                if (submitBtn) {
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                }
            }
        });
    }

    function showFormSuccess(name) {
        const form = document.getElementById('contact-form');
        const success = document.getElementById('formSuccess');
        if (form && success) {
            form.style.display = 'none';
            const userName = success.querySelector('.user-name');
            if (userName && name) {
                userName.textContent = name;
            }
            success.style.display = 'block';
        }
    }

    // Smooth scrolling for anchor links
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

    // Scroll to hash target on page load (e.g. contact.html#quote-form)
    if (window.location.hash) {
        const hashTarget = document.querySelector(window.location.hash);
        if (hashTarget) {
            setTimeout(() => {
                hashTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }

    // Add scroll effect to header
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        }
        
        lastScroll = currentScroll;
    });
});