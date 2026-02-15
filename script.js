// ===== Dark Mode Toggle =====
const darkModeToggle = document.getElementById('dark-mode-toggle');
const htmlElement = document.documentElement;

// Initialize dark mode from localStorage
function initDarkMode() {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true' || (!savedMode && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark-mode');
        updateDarkModeIcon(true);
    }
}

function updateDarkModeIcon(isDark) {
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

// ===== Smooth Scrolling =====
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

// ===== Skeleton Loader Hide =====
window.addEventListener('load', () => {
    const skeletonLoader = document.getElementById('skeleton-loader');
    if (skeletonLoader) {
        skeletonLoader.style.display = 'none';
    }
});

// Auto-hide skeleton loader after 2.5 seconds as fallback
setTimeout(() => {
    const skeletonLoader = document.getElementById('skeleton-loader');
    if (skeletonLoader && skeletonLoader.style.display !== 'none') {
        skeletonLoader.style.display = 'none';
    }
}, 2500);

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

// ===== Booking Form Handling =====
const bookingForm = document.getElementById('booking-form');

if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
        e.preventDefault();
        submitBooking();
    });
}

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

    // Build WhatsApp message
    const days = Math.ceil((new Date(dropoff) - new Date(pickup)) / (1000 * 60 * 60 * 24));

    const message = `🚗 *BOOKING REQUEST - GoaRide*

*Customer Details:*
• Name: ${name}
• Phone: ${phone}
• Email: ${email}

*Rental Details:*
• Vehicle: ${vehicle}
• Pickup Date: ${pickup}
• Drop-off Date: ${dropoff}
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
        const whatsappURL = `https://wa.me/918262812997?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');

        // Reset form
        bookingForm.reset();
        if (messagesDiv) {
            messagesDiv.innerHTML = '';
        }
    }, 500);
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

    const whatsappURL = `https://wa.me/918262812997?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

// ===== Phone Input Formatting =====
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');

        // Auto-add country code for Indian numbers
        if (value.length === 10 && /^[6789]/.test(value)) {
            value = '91' + value;
        }

        // Format display
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
        if (phoneClean.length > 0 && (phoneClean.length < 10 || phoneClean.length > 13)) {
            e.target.style.borderColor = '#e53e3e';
            e.target.title = 'Please enter a valid phone number';
        } else {
            e.target.style.borderColor = '';
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

// ===== Initialize on Load =====
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    console.log('GoaRide website loaded successfully! ✅');
});
