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

// Toggle mobile menu
document.getElementById('mobile-menu').addEventListener('click', function () {
    this.classList.toggle('active');
    document.getElementById('nav-menu').classList.toggle('mobile-active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function () {
        const mobileMenu = document.getElementById('mobile-menu');
        const navMenu = document.getElementById('nav-menu');
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('mobile-active');
    });
});

// Booking from vehicle cards
function bookViaWhatsApp(vehicle, transmission, price) {
    const phoneNumber = "918262812997";
    const message = `Hello! I want to book:

🚗 Vehicle: ${vehicle}
⚙️ Transmission: ${transmission}
💰 Price: ${price}/day

Please confirm availability.`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}

// Enhanced booking form validation
function validateBookingForm(formData) {
    const errors = [];

    if (!formData.name || formData.name.length < 2) {
        errors.push('Name must be at least 2 characters long');
    }

    if (!formData.phone) {
        errors.push('Phone number is required');
    } else {
        const phoneClean = formData.phone.replace(/\D/g, '');
        if (phoneClean.length === 10) {
            if (!phoneClean.match(/^[6789]\d{9}$/)) {
                errors.push('Please enter a valid Indian mobile number');
            }
        } else if (phoneClean.length === 12) {
            if (!phoneClean.match(/^91[6789]\d{9}$/)) {
                errors.push('Please enter a valid Indian mobile number');
            }
        } else {
            errors.push('Please enter a valid phone number (10 digits)');
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

// Main booking form submission handler
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

    const messagesDiv = document.getElementById('booking-messages');
    messagesDiv.innerHTML = '';

    const validationErrors = validateBookingForm(formData);
    if (validationErrors.length > 0) {
        showErrorMessage('Please fix the following issues:', validationErrors);
        return;
    }

    const submitBtn = document.getElementById('submit-btn');
    submitBtn.classList.add('btn-loading');
    submitBtn.disabled = true;

    const pickup = new Date(formData.pickup);
    const dropoff = new Date(formData.dropoff);
    const days = Math.ceil((dropoff - pickup) / (1000 * 60 * 60 * 24));

    // Calculate total cost
    const dailyRateMatch = formData.vehicle.match(/₹([\d,]+)/);
    let totalCostText = '';
    if (dailyRateMatch) {
        const dailyRate = parseInt(dailyRateMatch[1].replace(/,/g, ''));
        const totalCost = dailyRate * days;
        totalCostText = `\n💵 Total Cost: ₹${totalCost.toLocaleString('en-IN')}`;
    }

    // Build WhatsApp message
    let message = `🚗 BOOKING REQUEST - GoaRide

    👤 Customer Details:
    • Name: ${formData.name}
    • Phone: ${formData.phone}
    • Email: ${formData.email}
    
    🚙 Rental Details:
    • Vehicle: ${formData.vehicle}
    • Pickup Date: ${pickup.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
    • Drop-off Date: ${dropoff.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
    • Duration: ${days} day${days > 1 ? 's' : ''}
    • Pickup Location: ${formData.pickupLocation}${totalCostText}
    • Refundable Security Deposit: ₹3,000`;


    if (formData.specialRequests) {
        message += `\n• Special Requests: ${ formData.specialRequests }`;
    }

    message += `\n\n📋 Please confirm:
✅ Vehicle availability
✅ Pickup location & time
✅ Required documents

Thank you for choosing GoaRide!`;

    setTimeout(() => {
        submitBtn.classList.remove('btn-loading');
        submitBtn.disabled = false;
        const whatsappURL = `https://wa.me/918262812997?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');
    showSuccessMessage('Redirecting to WhatsApp... Your booking request is ready!');
    setTimeout(() => {
        clearBookingForm();
    }, 2000);
}, 1000);
}

// Navbar scroll effect
function handleNavbarScroll() {
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
    }
}

// Phone number formatting and validation
function setupPhoneFormatting() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.removeAttribute('pattern');
        phoneInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 12) value = value.substring(0, 12);
            e.target.value = value;
        });

        phoneInput.addEventListener('blur', function (e) {
            const phoneClean = e.target.value.replace(/\D/g, '');
            if (phoneClean.length === 10 && phoneClean.match(/^[6789]\d{9}$/)) {
                e.target.style.borderColor = '#48bb78';
                e.target.title = 'Valid Indian mobile number';
                e.target.setCustomValidity('');
            } else if (phoneClean.length === 12 && phoneClean.match(/^91[6789]\d{9}$/)) {
                e.target.style.borderColor = '#48bb78';
                e.target.title = 'Valid Indian mobile number with country code';
                e.target.setCustomValidity('');
            } else if (phoneClean.length >= 10) {
                e.target.style.borderColor = '#48bb78';
                e.target.title = '';
                e.target.setCustomValidity('');
            } else if (phoneClean.length > 0) {
                e.target.style.borderColor = '#e53e3e';
                e.target.title = 'Please enter at least 10 digits';
                e.target.setCustomValidity('Please enter a valid phone number');
            } else {
                e.target.style.borderColor = '';
                e.target.title = '';
                e.target.setCustomValidity('');
            }
        });
    }
}

// Calculate and display total cost
function calculateTotalCost() {
    const vehicleSelect = document.getElementById('vehicle');
    const pickupInput = document.getElementById('pickup');
    const dropoffInput = document.getElementById('dropoff');

    if (!vehicleSelect.value || !pickupInput.value || !dropoffInput.value) {
        hideTotalCost();
        return;
    }

    const pickup = new Date(pickupInput.value);
    const dropoff = new Date(dropoffInput.value);

    if (dropoff <= pickup) {
        hideTotalCost();
        return;
    }

    const days = Math.ceil((dropoff - pickup) / (1000 * 60 * 60 * 24));
    const vehicleText = vehicleSelect.value;
    const priceMatch = vehicleText.match(/₹([\d,]+)/);

    if (!priceMatch) {
        hideTotalCost();
        return;
    }

    const dailyRate = parseInt(priceMatch[1].replace(/,/g, ''));
    const totalCost = dailyRate * days;

    showTotalCost(days, dailyRate, totalCost);
}

function showTotalCost(days, dailyRate, totalCost) {
    let costDisplay = document.getElementById('cost-display');
    if (!costDisplay) {
        costDisplay = document.createElement('div');
        costDisplay.id = 'cost-display';
        costDisplay.style.cssText = `
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 15px;
            padding: 1.5rem;
            margin: 1.5rem 0;
            text-align: center;
            backdrop-filter: blur(10px);
        `;
        const form = document.getElementById('booking-form');
        const submitButton = form.querySelector('button[type="submit"]').parentNode;
        form.insertBefore(costDisplay, submitButton);
    }

    costDisplay.innerHTML = `
        <div style="color: rgba(255,255,255,0.9); font-size: 0.9rem; margin-bottom: 0.5rem;">
            Rental Duration: ${days} day${days > 1 ? 's' : ''}
        </div>
        <div style="color: white; font-size: 1.2rem; font-weight: 600;">
            Daily Rate: ₹${dailyRate.toLocaleString('en-IN')} × ${days} day${days > 1 ? 's' : ''}
        </div>
        <div style="color: white; font-size: 1.8rem; font-weight: 800; margin-top: 0.5rem; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
            Total Cost: ₹${totalCost.toLocaleString('en-IN')}
        </div>
        <div style="color: rgba(255,255,255,0.8); font-size: 0.8rem; margin-top: 0.5rem;">
            *Excludes refundable ₹3,000 security deposit and fuel
        </div>
    `;
}

function hideTotalCost() {
    const costDisplay = document.getElementById('cost-display');
    if (costDisplay) {
        costDisplay.remove();
    }
}

// Date validation setup
function setupDateValidation() {
    const today = new Date().toISOString().split('T')[0];
    const pickupInput = document.getElementById('pickup');
    const dropoffInput = document.getElementById('dropoff');

    if (pickupInput) pickupInput.min = today;
    if (dropoffInput) dropoffInput.min = today;

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
        calculateTotalCost();
    }

    if (pickupInput && dropoffInput) {
        pickupInput.addEventListener('change', function () {
            const pickupDate = this.value;
            dropoffInput.min = pickupDate;
            if (dropoffInput.value && dropoffInput.value <= pickupDate) {
                dropoffInput.value = '';
            }
            validateDates();
        });

        dropoffInput.addEventListener('change', validateDates);

        const vehicleSelect = document.getElementById('vehicle');
        if (vehicleSelect) {
            vehicleSelect.addEventListener('change', calculateTotalCost);
        }
    }
}

// Intersection Observer for animations
function setupAnimations() {
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

    const animatedElements = document.querySelectorAll('.vehicle-card, .feature-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// Network status monitoring
function setupNetworkMonitoring() {
    window.addEventListener('online', () => {
        console.log('Network connection restored');
    });

    window.addEventListener('offline', () => {
        console.log('Network connection lost');
        showErrorMessage('Network connection lost', ['WhatsApp may not open until you reconnect to the internet.']);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    setupDateValidation();
    setupPhoneFormatting();
    setupAnimations();
    setupNetworkMonitoring();
    window.addEventListener('scroll', handleNavbarScroll);

    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();
            submitBookingViaWhatsApp();
        });
    }

    console.log('GoaRide website loaded successfully!');
});
