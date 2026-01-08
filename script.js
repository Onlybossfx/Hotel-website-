// Main JavaScript for Centurion Apartment Website

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== NAVIGATION =====
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    // Sticky header on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile navigation toggle
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Change hamburger icon
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close mobile menu when clicking on a link
    navLinksItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // ===== HERO SLIDESHOW =====
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    let slideInterval;
    
    // Function to show a specific slide
    function showSlide(index) {
        // Remove active class from all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Handle wrap-around for slide index
        if (index >= slides.length) currentSlide = 0;
        if (index < 0) currentSlide = slides.length - 1;
        
        // Add active class to current slide
        slides[currentSlide].classList.add('active');
    }
    
    // Function to go to next slide
    function nextSlide() {
        currentSlide++;
        showSlide(currentSlide);
    }
    
    // Function to go to previous slide
    function prevSlide() {
        currentSlide--;
        showSlide(currentSlide);
    }
    
    // Initialize slideshow
    function initSlideshow() {
        // Show first slide
        showSlide(currentSlide);
        
        // Auto-advance slides every 5 seconds
        slideInterval = setInterval(nextSlide, 5000);
        
        // Pause slideshow on hover
        const slideshowContainer = document.getElementById('hero-slideshow');
        slideshowContainer.addEventListener('mouseenter', function() {
            clearInterval(slideInterval);
        });
        
        slideshowContainer.addEventListener('mouseleave', function() {
            slideInterval = setInterval(nextSlide, 5000);
        });
    }
    
    // Event listeners for manual slide controls
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            clearInterval(slideInterval);
            prevSlide();
            // Restart auto-advance after manual control
            slideInterval = setInterval(nextSlide, 5000);
        });
        
        nextBtn.addEventListener('click', function() {
            clearInterval(slideInterval);
            nextSlide();
            // Restart auto-advance after manual control
            slideInterval = setInterval(nextSlide, 5000);
        });
    }
    
    // ===== QUICK LINKS INTERACTIVITY =====
    const quickLinks = document.querySelectorAll('.link-card');
    
    quickLinks.forEach(link => {
        link.addEventListener('click', function() {
            const target = this.getAttribute('data-link');
            
            // Smooth scroll to the target section
            if (target === 'rooms') {
                document.getElementById('rooms').scrollIntoView({ behavior: 'smooth' });
            } else if (target === 'gallery') {
                document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
            } else if (target === 'dining') {
                // Switch to dining tab in amenities section
                document.getElementById('amenities').scrollIntoView({ behavior: 'smooth' });
                
                // After a short delay, activate the dining tab
                setTimeout(() => {
                    const diningTab = document.querySelector('[data-tab="dining"]');
                    if (diningTab) {
                        diningTab.click();
                    }
                }, 500);
            } else if (target === 'booking') {
                document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // ===== AMENITIES TABS =====
    const amenityTabs = document.querySelectorAll('.amenity-tab');
    const amenityPanels = document.querySelectorAll('.amenity-panel');
    
    amenityTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and panels
            amenityTabs.forEach(t => t.classList.remove('active'));
            amenityPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding panel
            document.getElementById(`${tabId}-panel`).classList.add('active');
        });
    });
    
    // ===== CONTACT FORM =====
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For now, we'll simulate a successful submission
            alert(`Thank you, ${name}! Your message has been sent. We'll get back to you soon at ${email}.`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // ===== BOOKING SIMULATION =====
    const simulateBookingBtn = document.getElementById('simulate-booking');
    
    if (simulateBookingBtn) {
        simulateBookingBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const checkin = document.getElementById('checkin').value;
            const checkout = document.getElementById('checkout').value;
            const guests = document.getElementById('guests').value;
            const roomType = document.getElementById('room-type').value;
            
            if (!checkin || !checkout) {
                alert('Please select check-in and check-out dates.');
                return;
            }
            
            // Calculate number of nights
            const checkinDate = new Date(checkin);
            const checkoutDate = new Date(checkout);
            const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
            const nightCount = Math.ceil(timeDiff / (1000 * 3600 * 24));
            
            if (nightCount <= 0) {
                alert('Check-out date must be after check-in date.');
                return;
            }
            
            // Simulate availability check
            const availableRooms = ['The Ochre Loft', 'The Canvas Suite', 'Watercolor View Room'];
            const randomAvailability = Math.random() > 0.3; // 70% chance of availability
            
            if (randomAvailability) {
                // Generate a random price
                const basePrices = {
                    'The Ochre Loft': 350,
                    'The Canvas Suite': 450,
                    'Watercolor View Room': 300
                };
                
                const basePrice = basePrices[roomType] || 350;
                const totalPrice = basePrice * nightCount;
                
                alert(`Great news! ${roomType} is available for your selected dates.\n\n` +
                      `Check-in: ${checkin}\n` +
                      `Check-out: ${checkout}\n` +
                      `Nights: ${nightCount}\n` +
                      `Guests: ${guests}\n` +
                      `Estimated Total: ₦${totalPrice.toLocaleString()}\n\n` +
                      `In a real implementation, you would be redirected to a booking page to complete your reservation.`);
            } else {
                alert(`We're sorry, but ${roomType} is not available for your selected dates. Please try different dates or another room type.`);
            }
        });
    }
    
    // ===== PHONE NUMBER CLICK-TO-CALL =====
    const phoneLink = document.getElementById('phone-link');
    
    if (phoneLink) {
        // Check if on mobile device
        function isMobileDevice() {
            return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
        }
        
        // If on mobile, ensure phone link uses tel: protocol
        if (isMobileDevice()) {
            phoneLink.setAttribute('href', 'tel:+2348024745595');
        }
    }
    
    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ===== IMAGE LAZY LOADING =====
    // This would be implemented if we had many high-res images
    // For now, we're using Unsplash CDN which handles optimization
    
    // ===== INITIALIZE COMPONENTS =====
    initSlideshow();
    
    // ===== SCROLL REVEAL ANIMATIONS =====
    // Simple scroll reveal for elements
    const revealElements = document.querySelectorAll('.room-card, .gallery-item, .link-card');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
    }
    
    // Add CSS for reveal animation
    const style = document.createElement('style');
    style.textContent = `
        .room-card, .gallery-item, .link-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .room-card.revealed, .gallery-item.revealed, .link-card.revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Check reveal on scroll and load
    window.addEventListener('scroll', checkReveal);
    window.addEventListener('load', checkReveal);
    
    // Initial check
    checkReveal();
});