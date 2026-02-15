// ===== Global Constants =====
const WHATSAPP_NUMBER = '918262812997'; // GoaRide Whatsapp Business Number
const NAVBAR_OFFSET_MOBILE = 62;   // matches CSS --navbar-height-mobile
const NAVBAR_OFFSET_DESKTOP = 70;  // matches CSS --navbar-height-desktop
function getNavbarScrollOffset() {
    return window.innerWidth >= 1025 ? NAVBAR_OFFSET_DESKTOP : NAVBAR_OFFSET_MOBILE;
}

// ===== Global State =====
let currentSection = null; // null means show all sections

// ===== Section Filtering (Cars vs Bikes) =====
function showSection(section) {
    currentSection = section;
    const vehiclesSection = document.getElementById('vehicles');
    const bikesSection = document.getElementById('bikes');

    if (!vehiclesSection || !bikesSection) return;

    if (section === 'vehicles') {
        // Show vehicles, hide bikes
        vehiclesSection.style.display = 'block';
        bikesSection.style.display = 'none';
        vehiclesSection.classList.add('section-fade-in');
        vehiclesSection.classList.remove('section-fade-out');

        setTimeout(() => {
            const targetPosition = vehiclesSection.getBoundingClientRect().top + window.scrollY - getNavbarScrollOffset();
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }, 100);
    } else if (section === 'bikes') {
        // Show bikes, hide vehicles
        vehiclesSection.style.display = 'none';
        bikesSection.style.display = 'block';
        bikesSection.classList.add('section-fade-in');
        bikesSection.classList.remove('section-fade-out');

        setTimeout(() => {
            const targetPosition = bikesSection.getBoundingClientRect().top + window.scrollY - getNavbarScrollOffset();
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }, 100);
    } else {
        // Show all (section === 'all')
        vehiclesSection.style.display = 'block';
        bikesSection.style.display = 'block';
        vehiclesSection.classList.remove('section-fade-out');
        bikesSection.classList.remove('section-fade-out');
        currentSection = null;
    }

    // Close mobile menu if open
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    if (mobileMenu && navMenu) {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('mobile-active');
    }
}

// ===== WhatsApp Direct Booking =====
function bookViaWhatsApp(vehicleName, transmission, price) {
    if (!vehicleName || !transmission || !price) {
        console.warn('Missing booking parameters');
        return;
    }

    const message = `🚗 *Vehicle Booking Inquiry - GoaRide*

Hello Team 👋, I'm interested in booking:

📌 *Car:* ${vehicleName}
⚙️ *Transmission:* ${transmission}
💵 *Price:* ${price}/day
💰 *Refundable Deposit:* ₹3,000

Could you please help me with:
1️⃣ Availability check
2️⃣ Booking process
3️⃣ Pickup location
4️⃣ Required documents
5️⃣ Security deposit info

✅ Looking forward to exploring Goa with GoaRide! 🙏`;

    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

// ===== Booking Form Submission =====
function submitBooking() {
    const vehicle = document.getElementById('vehicle')?.value || '';
    const name = document.getElementById('name')?.value || '';
    const phone = document.getElementById('phone')?.value || '';
    const email = document.getElementById('email')?.value || '';
    const pickup = document.getElementById('pickup')?.value || '';
    const dropoff = document.getElementById('dropoff')?.value || '';
    const location = document.getElementById('location')?.value || '';
    const requests = document.getElementById('requests')?.value || '';

    // Validation
    const errors = [];

    if (!name || name.length < 2) {
        errors.push('Name must be at least 2 characters');
    }
    if (!phone) {
        errors.push('Phone number is required');
    }
    if (!email || !email.includes('@')) {
        errors.push('Valid email is required');
    }
    if (!vehicle) {
        errors.push('Please select a vehicle');
    }
    if (!pickup) {
        errors.push('Pickup date is required');
    }
    if (!dropoff) {
        errors.push('Drop-off date is required');
    }
    if (!location) {
        errors.push('Pickup location is required');
    }

    const messagesDiv = document.getElementById('booking-messages');
    if (errors.length > 0) {
        if (messagesDiv) {
            messagesDiv.innerHTML = `
                <div style="background: #fed7d7; color: #c53030; padding: 1rem; border-radius: 10px; border-left: 4px solid #e53e3e;">
                    <strong><i class="fas fa-exclamation-circle"></i> Please fix these errors:</strong>
                    <ul style="margin: 0.5rem 0 0 1rem;">
                        ${errors.map(e => `<li>${e}</li>`).join('')}
                    </ul>
                </div>
            `;
            messagesDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }

    // Build WhatsApp message with formatted dates
    const days = Math.ceil((new Date(dropoff) - new Date(pickup)) / (1000 * 60 * 60 * 24));

    // Format dates as DD-MM-YYYY for WhatsApp message
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
    };

    const formattedPickup = formatDate(pickup);
    const formattedDropoff = formatDate(dropoff);

    const message = `🚗 *BOOKING REQUEST - GoaRide*

*Customer Details:*
• Name: ${name}
• Phone: ${phone}
• Email: ${email}

*Rental Details:*
• Vehicle: ${vehicle}
• Pickup Date: ${formattedPickup}
• Drop-off Date: ${formattedDropoff}
• Duration: ${days} day${days > 1 ? 's' : ''}
• Pickup Location: ${location}
• Refundable Deposit: ₹3,000

${requests ? `*Special Requests:* ${requests}` : ''}

Please confirm availability and total cost. Thank you!`;

    // Show success message
    if (messagesDiv) {
        messagesDiv.innerHTML = `
            <div style="background: #c6f6d5; color: #22543d; padding: 1rem; border-radius: 10px; border-left: 4px solid #38a169;">
                <i class="fas fa-check-circle"></i> Redirecting to WhatsApp...
            </div>
        `;
    }

    // Open WhatsApp
    setTimeout(() => {
        const bookingForm = document.getElementById('booking-form');
        const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');

        // Reset form
        if (bookingForm) {
            bookingForm.reset();
        }
        if (messagesDiv) {
            messagesDiv.innerHTML = '';
        }
    }, 500);
}

// ===== Dark Mode Functions =====
function initDarkMode() {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true' || (!savedMode && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark-mode');
        updateDarkModeIcon(true);
    }
}

function updateDarkModeIcon(isDark) {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        const icon = darkModeToggle.querySelector('i');
        if (icon) {
            if (isDark) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
    }
}

// ===== Initialize WhatsApp Links =====
function initializeWhatsAppLinks() {
    const initialMessage = encodeURIComponent("Hi! I'm interested in renting a car for my Goa trip.");
    const whatsappBaseURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${initialMessage}`;

    // Update navigation WhatsApp link
    const navLink = document.getElementById('nav-whatsapp-link');
    if (navLink) {
        navLink.href = whatsappBaseURL;
    }

    // Update hero WhatsApp button
    const heroBtn = document.getElementById('hero-whatsapp-btn');
    if (heroBtn) {
        heroBtn.href = whatsappBaseURL;
    }

    // Update FAB WhatsApp link
    const fabLink = document.getElementById('fab-whatsapp-link');
    if (fabLink) {
        fabLink.href = whatsappBaseURL;
    }

    // Update footer WhatsApp link
    const footerLink = document.getElementById('footer-whatsapp-link');
    if (footerLink) {
        footerLink.href = `https://wa.me/${WHATSAPP_NUMBER}`;
    }
}

// ===== DOM CONTENT LOADED - Initialize All Event Listeners =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize dark mode
    initDarkMode();
    initializeWhatsAppLinks();

    // ===== Dark Mode Toggle =====
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDark);
            updateDarkModeIcon(isDark);
        });
    }

    // ===== Mobile Menu Toggle =====
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('mobile-active');
        });

        // Close menu when clicking nav links
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('mobile-active');
            });
        });
    }

    // ===== Booking Form Handling =====
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();
            submitBooking();
        });
    }

    // ===== Phone Input Formatting & Validation =====
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');

            // Limit to max 13 digits (country code + 10 digit number)
            value = value.substring(0, 13);

            // Auto-add country code for Indian numbers (10 digits)
            if (value.length === 10 && /^[6789]/.test(value)) {
                value = '91' + value;
            }

            // Format display: +91 XXXXX XXXXX
            if (value.length > 0) {
                if (value.startsWith('91')) {
                    value = '+91 ' + value.substring(2, 7) + ' ' + value.substring(7);
                } else {
                    value = '+' + value.substring(0, 3) + ' ' + value.substring(3);
                }
            }

            e.target.value = value.trim();
        });

        phoneInput.addEventListener('blur', (e) => {
            const phoneClean = e.target.value.replace(/\D/g, '');
            // Valid format: 91 followed by exactly 10 digits (Indian number)
            const isValid = phoneClean.length === 12 && phoneClean.startsWith('91');

            if (phoneClean.length > 0 && !isValid) {
                e.target.style.borderColor = '#e53e3e';
                e.target.style.boxShadow = '0 0 0 3px rgba(229, 62, 62, 0.1)';
                e.target.title = 'Please enter a valid 10-digit Indian phone number';
            } else {
                e.target.style.borderColor = '';
                e.target.style.boxShadow = '';
                e.target.title = '';
            }
        });
    }

    // ===== Date Validation =====
    const pickupInput = document.getElementById('pickup');
    const dropoffInput = document.getElementById('dropoff');

    if (pickupInput && dropoffInput) {
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        pickupInput.min = today;
        dropoffInput.min = today;

        pickupInput.addEventListener('change', () => {
            dropoffInput.min = pickupInput.value;
            if (dropoffInput.value && dropoffInput.value <= pickupInput.value) {
                dropoffInput.value = '';
            }
        });

        // Validate dates
        [pickupInput, dropoffInput].forEach(input => {
            input.addEventListener('change', () => {
                if (pickupInput.value && dropoffInput.value && dropoffInput.value <= pickupInput.value) {
                    dropoffInput.style.borderColor = '#e53e3e';
                } else {
                    dropoffInput.style.borderColor = '';
                }
            });
        });
    }

    // ===== Smooth Scrolling (CSS scroll-padding-top handles navbar offset; this is fallback) =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const targetPosition = target.getBoundingClientRect().top + window.scrollY - getNavbarScrollOffset();
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ===== Scroll Reveal Animation =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with data-scroll-reveal
    document.querySelectorAll('[data-scroll-reveal]').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ===== Navbar Scroll Effect =====
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        }
    });

    console.log('GoaRide website loaded successfully! ✅');
});

// ===== Skeleton Loader Hide =====
function hideSkeletonLoader() {
    const skeletonLoader = document.getElementById('skeleton-loader');
    if (skeletonLoader && !skeletonLoader.classList.contains('hidden')) {
        skeletonLoader.classList.add('hidden');
    }
}

// Hide on window load
window.addEventListener('load', hideSkeletonLoader);

// Auto-hide skeleton loader after 2.5 seconds as fallback
setTimeout(hideSkeletonLoader, 2500);
