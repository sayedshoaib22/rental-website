 // Smooth scrolling for navigation links
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

// Mobile menu toggle - Fixed
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

mobileMenu.addEventListener('click', function () {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('mobile-active');
});

// Close mobile menu when clicking on nav links
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('mobile-active');
    });
});

// WhatsApp booking from vehicle card
function bookViaWhatsApp(vehicleName, transmission, price) {
    const message = `🚗 Vehicle Booking Inquiry - GoaRide

Hi! I'm interested in booking the ${vehicleName} (${transmission} - ${price}/day) for my Goa trip.

Can you please help me with:
✅ Availability check for my dates
✅ Complete booking process
✅ Pickup location details
✅ Required documents
✅ Security deposit information

Looking forward to exploring Goa with GoaRide!`;

    const whatsappURL = `https://wa.me/918262812997?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

// Enhanced booking form submission
document.getElementById('booking-form').addEventListener('submit', function (e) {
    e.preventDefault();
    submitBookingViaWhatsApp();
});

function submitBookingViaWhatsApp() {
    const formData = {
        name: document.getElementById('name').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        email: document.getElementById('email').value.trim(),
        vehicle: document.getElementById('vehicle').value,
        pickup: document.getElementById('pickup').value,
        dropoff: document.getElementById('dropoff').value,
        pickupLocation: document.getElementById('pickup-location').value,
        specialRequests: document.getElementById('special-requests').value.trim()
    };

    // Clear previous messages
    const messagesDiv = document.getElementById('booking-messages');
    messagesDiv.innerHTML = '';

    // Client-side validation
    const validationErrors = validateBookingForm(formData);
    if (validationErrors.length > 0) {
        showErrorMessage('Please fix the following issues:', validationErrors);
        return;
    }

    // Show loading state
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.classList.add('btn-loading');
    submitBtn.disabled = true;

    // Calculate rental duration
    const pickup = new Date(formData.pickup);
    const dropoff = new Date(formData.dropoff);
    const days = Math.ceil((dropoff - pickup) / (1000 * 60 * 60 * 24));

    // Build WhatsApp message
    let message = `🚗 BOOKING REQUEST - GoaRide

👤 Customer Details:
• Name: ${formData.name}
• Phone: ${formData.phone}
• Email: ${formData.email}

🚙 Rental Details:
• Vehicle: ${formData.vehicle}
• Pickup Date: ${new Date(formData.pickup).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
• Drop-off Date: ${new Date(formData.dropoff).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
• Duration: ${days} day${days > 1 ? 's' : ''}
• Pickup Location: ${formData.pickupLocation}`;

    if (formData.specialRequests) {
        message += `\n• Special Requests: ${formData.specialRequests}`;
    }

    message += `\n\n📋 Please confirm:
✅ Vehicle availability
✅ Total cost
✅ Pickup location & time
✅ Required documents

Thank you for choosing GoaRide!`;

    // Remove loading state
    setTimeout(() => {
        submitBtn.classList.remove('btn-loading');
        submitBtn.disabled = false;

        // Open WhatsApp
        const whatsappURL = `https://wa.me/918262812997?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');

        // Show success message and clear form
        showSuccessMessage('Redirecting to WhatsApp... Your booking request is ready!');
        setTimeout(() => {
            clearBookingForm();
        }, 2000);
    }, 1000);
}

// Enhanced form validation
function validateBookingForm(formData) {
    const errors = [];

    if (!formData.name || formData.name.length < 2) {
        errors.push('Name must be at least 2 characters long');
    }

    if (!formData.phone) {
        errors.push('Phone number is required');
    } else {
        const phoneClean = formData.phone.replace(/\D/g, '');
        if (phoneClean.length < 10 || phoneClean.length > 13) {
            errors.push('Please enter a valid phone number (10-13 digits)');
        }
    }

    if (!formData.email) {
        errors.push('Email address is required');
    } else if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errors.push('Please enter a valid email address');
    }

    if (!formData.vehicle) {
        errors.push('Please select a vehicle');
    }

    if (!formData.pickup) {
        errors.push('Pickup date is required');
    }

    if (!formData.dropoff) {
        errors.push('Drop-off date is required');
    }

    if (!formData.pickupLocation) {
        errors.push('Please select a pickup location');
    }

    if (formData.pickup && formData.dropoff) {
        const pickup = new Date(formData.pickup);
        const dropoff = new Date(formData.dropoff);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (pickup < today) {
            errors.push('Pickup date cannot be in the past');
        }
        if (dropoff <= pickup) {
            errors.push('Drop-off date must be after pickup date');
        }

        const daysDiff = Math.ceil((dropoff - pickup) / (1000 * 60 * 60 * 24));
        if (daysDiff > 30) {
            errors.push('Maximum rental period is 30 days');
        }
    }

    return errors;
}

// UI Helper Functions
function showSuccessMessage(message) {
    const messagesDiv = document.getElementById('booking-messages');
    messagesDiv.innerHTML = `<div class="success-message">
        <i class="fas fa-check-circle"></i> ${message}
    </div>`;
    messagesDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function showErrorMessage(title, errors) {
    const messagesDiv = document.getElementById('booking-messages');
    messagesDiv.innerHTML = `<div class="error-message">
        <i class="fas fa-exclamation-circle"></i> <strong>${title}</strong>
        <ul style="margin-top: 0.5rem; margin-left: 1rem;">
            ${errors.map(error => `<li>${error}</li>`).join('')}
        </ul>
    </div>`;
    messagesDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function clearBookingForm() {
    document.getElementById('booking-form').reset();
    document.getElementById('booking-messages').innerHTML = '';
}

// Navbar scroll effect
let lastScrollTop = 0;
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        lastScrollTop = scrollTop;
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    const pickupInput = document.getElementById('pickup');
    const dropoffInput = document.getElementById('dropoff');

    if (pickupInput) pickupInput.min = today;
    if (dropoffInput) dropoffInput.min = today;

    // Date validation
    if (pickupInput && dropoffInput) {
        pickupInput.addEventListener('change', function () {
            const pickupDate = this.value;
            dropoffInput.min = pickupDate;
            if (dropoffInput.value && dropoffInput.value <= pickupDate) {
                dropoffInput.value = '';
            }
        });

        function validateDates() {
            if (pickupInput.value && dropoffInput.value) {
                const pickup = new Date(pickupInput.value);
                const dropoff = new Date(dropoffInput.value);
                if (dropoff <= pickup) {
                    dropoffInput.style.borderColor = '#e53e3e';
                    dropoffInput.title = 'Drop-off date must be after pickup date';
                } else {
                    dropoffInput.style.borderColor = '';
                    dropoffInput.title = '';
                }
            }
        }

        pickupInput.addEventListener('change', validateDates);
        dropoffInput.addEventListener('change', validateDates);
    }

    // Phone formatting and validation
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');

            // Auto-add country code for Indian numbers
            if (value.length === 10 && value.match(/^[6789]/)) {
                value = '91' + value;
            }

            // Format display
            if (value.length >= 2) {
                if (value.startsWith('91')) {
                    value = '+91 ' + value.substring(2, 7) + ' ' + value.substring(7);
                } else {
                    value = '+' + value.substring(0, 3) + ' ' + value.substring(3);
                }
            } else if (value.length > 0) {
                value = '+' + value;
            }

            e.target.value = value;
        });

        phoneInput.addEventListener('blur', function (e) {
            const phoneClean = e.target.value.replace(/\D/g, '');
            if (phoneClean.length > 0) {
                if (phoneClean.length < 10 || phoneClean.length > 13) {
                    e.target.style.borderColor = '#e53e3e';
                    e.target.title = 'Please enter a valid phone number';
                } else {
                    e.target.style.borderColor = '';
                    e.target.title = '';
                }
            }
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'all 0.8s ease-out';
            }
        });
    }, observerOptions);

    // Animate cards and features
    const animatedElements = document.querySelectorAll('.vehicle-card, .feature-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });

    console.log('GoaRide website loaded successfully!');
});

// Network status monitoring
window.addEventListener('online', () => {
    console.log('Network connection restored');
});

window.addEventListener('offline', () => {
    console.log('Network connection lost');
    showErrorMessage('Network connection lost', ['WhatsApp may not open until you reconnect to the internet.']);
});