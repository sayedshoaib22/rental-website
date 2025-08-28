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

// Booking form submission - Direct WhatsApp Only
function submitBookingViaWhatsApp() {
    const formData = {
        name: document.getElementById('name').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        email: document.getElementById('email').value.trim(),
        vehicle: document.getElementById('vehicle').value,
        pickup: document.getElementById('pickup').value,
        dropoff: document.getElementById('dropoff').value
    };

    // Client-side validation
    const validationErrors = validateBookingForm(formData);
    if (validationErrors.length > 0) {
        showErrorMessage('Please fix the following issues:\n• ' + validationErrors.join('\n• '));
        return;
    }

    // Calculate rental duration
    const pickup = new Date(formData.pickup);
    const dropoff = new Date(formData.dropoff);
    const days = Math.ceil((dropoff - pickup) / (1000 * 60 * 60 * 24));

    // Build WhatsApp message
    const message = `🚗 BOOKING REQUEST - GoaRide

👤 Customer Details:
• Name: ${formData.name}
• Phone: ${formData.phone}
• Email: ${formData.email}

🚙 Rental Details:
• Vehicle: ${formData.vehicle}
• Pickup Date: ${formData.pickup}
• Drop-off Date: ${formData.dropoff}
• Duration: ${days} day${days > 1 ? 's' : ''}

📋 Please confirm:
✅ Vehicle availability
✅ Total cost
✅ Pickup location & time
✅ Required documents

Thank you for choosing GoaRide!`;

    // Open WhatsApp directly
    const whatsappURL = `https://wa.me/918262812997?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');

    // Clear form
    clearBookingForm();
}

// Client-side form validation
function validateBookingForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.length < 2) {
        errors.push('Name must be at least 2 characters long');
    }

    if (!formData.phone) {
        errors.push('Phone number is required');
    } else {
        const phoneClean = formData.phone.replace(/\D/g, '');
        if (phoneClean.length < 10 || !phoneClean.match(/^(91)?[6789]\d{9}$/)) {
            errors.push('Please enter a valid Indian phone number');
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
    }

    return errors;
}

// UI Helper Functions
function showSuccessMessage(message) {
    alert(message);
}

function showErrorMessage(message) {
    alert(message);
}

function clearBookingForm() {
    const fields = ['name', 'phone', 'email', 'vehicle', 'pickup', 'dropoff'];
    fields.forEach(field => {
        const element = document.getElementById(field);
        if (element) {
            element.value = '';
            element.style.borderColor = '';
        }
    });
}

// Navbar scroll effect
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
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

// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenu) {
    mobileMenu.addEventListener('click', function() {
        console.log('Mobile menu clicked');
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }
    });
}, observerOptions);

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    const pickupInput = document.getElementById('pickup');
    const dropoffInput = document.getElementById('dropoff');
    
    if (pickupInput) pickupInput.min = today;
    if (dropoffInput) dropoffInput.min = today;

    if (pickupInput && dropoffInput) {
        pickupInput.addEventListener('change', function() {
            const pickupDate = this.value;
            dropoffInput.min = pickupDate;
            if (dropoffInput.value && dropoffInput.value <= pickupDate) {
                dropoffInput.value = '';
            }
        });
    }

    // Phone formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length === 10 && value.match(/^[6789]/)) {
                value = '91' + value;
            }
            if (value.startsWith('91') && value.length > 2) {
                if (!value.substring(2, 3).match(/[6789]/)) {
                    value = value.substring(0, 2);
                }
            }
            if (value.length > 12) {
                value = value.substring(0, 12);
            }
            if (value.length >= 2) {
                value = '+' + value.substring(0, 2) + ' ' + 
                        value.substring(2, 7) + ' ' + 
                        value.substring(7);
            } else if (value.length > 0) {
                value = '+' + value;
            }
            e.target.value = value;
        });

        phoneInput.addEventListener('blur', function(e) {
            const phoneClean = e.target.value.replace(/\D/g, '');
            if (phoneClean.length > 0 && !phoneClean.match(/^91[6789]\d{9}$/)) {
                e.target.style.borderColor = '#e53e3e';
                e.target.title = 'Please enter a valid Indian phone number';
            } else {
                e.target.style.borderColor = '#48bb78';
                e.target.title = '';
            }
        });
    }

    // Date input validation
    if (pickupInput && dropoffInput) {
        function validateDates() {
            if (pickupInput.value && dropoffInput.value) {
                const pickup = new Date(pickupInput.value);
                const dropoff = new Date(dropoffInput.value);
                if (dropoff <= pickup) {
                    dropoffInput.style.borderColor = '#e53e3e';
                    dropoffInput.title = 'Drop-off date must be after pickup date';
                } else {
                    dropoffInput.style.borderColor = '#48bb78';
                    dropoffInput.title = '';
                }
            }
        }
        pickupInput.addEventListener('change', validateDates);
        dropoffInput.addEventListener('change', validateDates);
    }

    // Animate cards and features
    const animatedElements = document.querySelectorAll('.vehicle-card, .feature-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });

    // Add form validation styling
    const style = document.createElement('style');
    style.textContent = `
        .form-group input:invalid,
        .form-group select:invalid {
            border-color: #e53e3e !important;
        }
        
        .form-group input:valid,
        .form-group select:valid {
            border-color: #48bb78 !important;
        }
    `;
    document.head.appendChild(style);
});

// Network status monitoring
window.addEventListener('online', () => console.log('Network connection restored'));
window.addEventListener('offline', () => {
    console.log('Network connection lost');
    alert('Network connection lost. WhatsApp may not open until you reconnect.');
});