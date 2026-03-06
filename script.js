/* ============================================================
   GoaRide — Premium JS Architecture
   Clean, modular functions | No dependencies
   ============================================================ */

'use strict';

// ===== CONSTANTS =====
const WHATSAPP_NUMBER = '918262812997';

// ===== VEHICLE DATA MODEL =====
const VEHICLES = [
    // ── Hatchbacks ──
    {
        id: 1, name: 'Maruti Ignis', type: 'hatchback', badge: 'Popular', badgeColor: '',
        image: 'https://image2url.com/r2/default/images/1771085514586-f48442cc-255d-424b-8a86-bd933470a02e.jpeg',
        seats: 5, deposit: 3000,
        features: ['AC', 'GPS', 'Fuel Efficient'],
        transmissions: [
            { type: 'manual',    price: 1200 },
            { type: 'automatic', price: 1500 }
        ]
    },
    {
        id: 2, name: 'Maruti Swift', type: 'hatchback', badge: 'Popular', badgeColor: '',
        image: 'https://www.varunmaruti.com/uploads/products/colors/new-swift-pearlr-arctic-white-with-midnight-black-roof.png',
        seats: 5, deposit: 3000,
        features: ['AC', 'GPS', 'Fuel Efficient'],
        transmissions: [
            { type: 'manual',    price: 1200 },
            { type: 'automatic', price: 1500 }
        ]
    },
    // ── SUVs ──
    {
        id: 3, name: 'Maruti Brezza', type: 'suv', badge: 'SUV', badgeColor: 'blue',
        image: 'https://image2url.com/r2/default/images/1771085514586-f48442cc-255d-424b-8a86-bd933470a02e.jpeg',
        seats: 5, deposit: 3000,
        features: ['AC', 'Sunroof', 'SUV'],
        transmissions: [
            { type: 'manual',    price: 2000 },
            { type: 'automatic', price: 2500 }
        ]
    },
    {
        id: 4, name: 'Hyundai Creta', type: 'suv', badge: 'Premium SUV', badgeColor: 'blue',
        image: 'https://image2url.com/r2/default/images/1771082168034-3cea15fd-961e-441b-827a-e772f7a0db43.png',
        seats: 5, deposit: 5000,
        features: ['AC', 'Sunroof', '5★ Safety'],
        transmissions: [
            { type: 'manual',    price: 2500 },
            { type: 'automatic', price: 3200 }
        ]
    },
    {
        id: 5, name: 'Toyota Fortuner', type: 'suv', badge: 'Luxury SUV', badgeColor: 'purple',
        image: 'https://image2url.com/r2/default/images/1771085163103-0cfc8bf6-b170-4f60-9be3-068e68b08592.jpeg',
        seats: 7, deposit: 5000,
        features: ['Premium Interior', 'Powerful 4×4', 'Luxury'],
        transmissions: [
            { type: 'automatic', price: 6000 }
        ]
    },
    {
        id: 6, name: 'Mahindra Thar Hardtop', type: 'suv', badge: 'Adventure', badgeColor: '',
        image: 'https://image2url.com/r2/default/images/1771085007230-e3056cd4-758f-43a1-857c-024057a6fdd5.jpeg',
        seats: 4, deposit: 5000,
        features: ['Off-Road', 'Hardtop', '4×4'],
        transmissions: [
            { type: 'manual',    price: 3000 },
            { type: 'automatic', price: 3500 }
        ]
    },
    {
        id: 7, name: 'Mahindra Thar Convertible', type: 'suv', badge: 'Convertible', badgeColor: '',
        image: 'https://image2url.com/r2/default/images/1771085007230-e3056cd4-758f-43a1-857c-024057a6fdd5.jpeg',
        seats: 4, deposit: 5000,
        features: ['Soft Top', 'Off-Road', 'Beach Ready'],
        transmissions: [
            { type: 'manual',    price: 3300 },
            { type: 'automatic', price: 4000 }
        ]
    },
    {
        id: 8, name: 'Mahindra Thar Roxx', type: 'suv', badge: 'New Launch', badgeColor: 'green',
        image: 'https://image2url.com/r2/default/images/1771084019004-13492275-dca8-4f5a-b2e5-e1527576fe03.jpg',
        seats: 5, deposit: 5000,
        features: ['Latest Model', 'Advanced Tech', 'Off-Road'],
        transmissions: [
            { type: 'automatic', price: 6500 }
        ]
    },
    // ── MPVs ──
    {
        id: 9, name: 'Maruti Ertiga', type: 'mpv', badge: '7-Seater', badgeColor: 'blue',
        image: 'https://image2url.com/r2/default/images/1771083423558-6d9933ca-f849-46ea-8f35-24715d02f016.jpeg',
        seats: 7, deposit: 5000,
        features: ['7 Seats', 'Spacious', 'Family MPV'],
        transmissions: [
            { type: 'manual',    price: 2200 },
            { type: 'automatic', price: 3000 }
        ]
    },
    {
        id: 10, name: 'Kia Carens', type: 'mpv', badge: 'Family', badgeColor: 'blue',
        image: 'https://image2url.com/r2/default/images/1771086756653-26b04aeb-abcb-4bab-bf85-f14a576e0015.jpeg',
        seats: 7, deposit: 5000,
        features: ['6-7 Seats', 'Connected Car', 'Premium'],
        transmissions: [
            { type: 'manual',    price: 2500 },
            { type: 'automatic', price: 3000 }
        ]
    },
    {
        id: 11, name: 'Toyota Innova Crysta', type: 'mpv', badge: 'Premium MPV', badgeColor: 'blue',
        image: 'https://image2url.com/r2/default/images/1771082409934-b12afb7d-7dfd-42d5-a583-c6b96ae3b097.jpeg',
        seats: 8, deposit: 5000,
        features: ['8 Seats', 'Highway Cruiser', 'Premium'],
        transmissions: [
            { type: 'manual',    price: 3000 },
            { type: 'automatic', price: 3500 }
        ]
    },
    {
        id: 12, name: 'Toyota Innova Hycross', type: 'mpv', badge: 'Hybrid', badgeColor: 'green',
        image: 'https://image2url.com/r2/default/images/1771086867555-f1b998ba-9d26-4c0e-b1c8-d55ddb7e33b8.jpeg',
        seats: 8, deposit: 5000,
        features: ['Hybrid', '8 Seats', 'Eco Friendly'],
        transmissions: [
            { type: 'automatic', price: 3500 }
        ]
    },
    // ── Luxury ──
    {
        id: 13, name: 'Mercedes-Benz C300', type: 'luxury', badge: 'Executive', badgeColor: 'purple',
        image: 'https://image2url.com/r2/default/images/1771086392720-50bf550e-b4e3-4657-841c-8440eb5f8994.jpeg',
        seats: 5, deposit: 10000,
        features: ['German Luxury', 'Performance', 'Prestige'],
        transmissions: [
            { type: 'automatic', price: 18000 }
        ]
    },
    {
        id: 14, name: 'Audi A3', type: 'luxury', badge: 'Ultra Luxury', badgeColor: 'purple',
        image: 'https://image2url.com/r2/default/images/1771083007149-3d15f250-cca7-40dd-ba7e-8b3b78a2dbd2.jpeg',
        seats: 5, deposit: 10000,
        features: ['German Engineering', 'Advanced Tech', 'Prestige'],
        transmissions: [
            { type: 'automatic', price: 20000 }
        ]
    },
    {
        id: 15, name: 'Mini Cooper', type: 'luxury', badge: 'Luxury', badgeColor: 'purple',
        image: 'https://image2url.com/r2/default/images/1771083165899-7695a97a-57e7-4cf7-98c7-9f88cc0a2dbe.jpeg',
        seats: 4, deposit: 10000,
        features: ['Iconic Design', 'Premium Brand', 'Fun Drive'],
        transmissions: [
            { type: 'automatic', price: 16000 }
        ]
    },
    // ── Bikes ──
    {
        id: 16, name: 'Yamaha Fascino 125', type: 'bikes', badge: 'Stylish', badgeColor: '',
        image: 'https://image2url.com/r2/default/images/1771141146471-5eb9de67-def0-4725-890d-4e4dbeae6b9e.jpeg',
        seats: 2, deposit: 600,
        features: ['125cc', 'Scooter', 'City Ride'],
        transmissions: [
            { type: 'automatic', price: 600 }
        ]
    },
    {
        id: 17, name: 'Royal Enfield Hunter 350', type: 'bikes', badge: 'Premium', badgeColor: '',
        image: 'https://images.unsplash.com/photo-1689599943500-0f73b9e5b78b?q=80&w=500&auto=format&fit=crop',
        seats: 2, deposit: 1000,
        features: ['350cc', 'Retro Modern', 'Coastal Rides'],
        transmissions: [
            { type: 'manual', price: 2000 }
        ]
    },
    {
        id: 18, name: 'Royal Enfield Bullet 350', type: 'bikes', badge: 'Classic', badgeColor: '',
        image: 'https://images.unsplash.com/photo-1655179552613-4532b003cd50?q=80&w=500&auto=format&fit=crop',
        seats: 2, deposit: 1000,
        features: ['350cc', 'Classic Icon', 'Timeless'],
        transmissions: [
            { type: 'manual', price: 2000 }
        ]
    }
];

// ===== GLOBAL FILTER STATE =====
const filterState = {
    type:         'all',
    transmission: 'all',
    price:        'all',
    search:       ''
};

// ===== MODAL STATE =====
let activeModalVehicle = null;

/* ============================================================
   FLEET RENDERING
   ============================================================ */

/**
 * Renders vehicle cards into the fleet grid
 * @param {Array} vehicles — filtered list of vehicles to render
 */
function renderFleet(vehicles) {
    const grid = document.getElementById('fleet-grid');
    const noResults = document.getElementById('no-results');
    const resultsCount = document.getElementById('results-count');

    if (!grid) return;

    if (vehicles.length === 0) {
        grid.innerHTML = '';
        if (noResults) noResults.style.display = 'block';
        if (resultsCount) resultsCount.textContent = '0';
        return;
    }

    if (noResults) noResults.style.display = 'none';
    if (resultsCount) resultsCount.textContent = vehicles.length;

    grid.innerHTML = vehicles.map(v => buildVehicleCard(v)).join('');

    // Lazy-load images within rendered cards
    initLazyImages(grid.querySelectorAll('.card-image-bg[data-bg]'));
}

/**
 * Builds the HTML for a single vehicle card
 * @param {Object} v — vehicle data object
 * @returns {string} HTML string
 */
function buildVehicleCard(v) {
    const isBike = v.type === 'bikes';
    const hasManual = v.transmissions.some(t => t.type === 'manual');
    const hasAuto   = v.transmissions.some(t => t.type === 'automatic');
    const manualPrice = v.transmissions.find(t => t.type === 'manual')?.price;
    const autoPrice   = v.transmissions.find(t => t.type === 'automatic')?.price;
    const lowestPrice = Math.min(...v.transmissions.map(t => t.price));

    const featureTags = v.features.map(f => `
        <span class="card-feature-tag">
            <i class="fas fa-check" aria-hidden="true"></i>${f}
        </span>`).join('');

    // Pricing section
    let pricingHTML;
    if (hasManual && hasAuto) {
        pricingHTML = `
        <div class="card-pricing" aria-label="Pricing options">
            <div class="pricing-option">
                <span class="pricing-type">Manual</span>
                <span class="pricing-amount">₹${manualPrice?.toLocaleString('en-IN')}<span class="pricing-day">/day</span></span>
            </div>
            <div class="pricing-option">
                <span class="pricing-type">Automatic</span>
                <span class="pricing-amount">₹${autoPrice?.toLocaleString('en-IN')}<span class="pricing-day">/day</span></span>
            </div>
        </div>`;
    } else {
        const singleT = v.transmissions[0];
        const label = singleT.type === 'automatic' ? 'Automatic Only' : 'Manual Only';
        pricingHTML = `
        <div class="card-pricing single-price" aria-label="Pricing">
            <div class="pricing-option">
                <span class="pricing-type">${label}</span>
                <span class="pricing-amount">₹${singleT.price.toLocaleString('en-IN')}<span class="pricing-day">/day</span></span>
            </div>
        </div>`;
    }

    // CTA buttons
    let ctaHTML;
    if (hasManual && hasAuto) {
        ctaHTML = `
        <div class="card-cta" role="group" aria-label="Booking options">
            <button class="btn-book-manual" onclick="openBookingModal(${v.id}, 'manual')" aria-label="Book ${v.name} Manual">
                <i class="fas fa-car" aria-hidden="true"></i> Book Manual
            </button>
            <button class="btn-book-auto" onclick="openBookingModal(${v.id}, 'automatic')" aria-label="Book ${v.name} Automatic via WhatsApp">
                <i class="fab fa-whatsapp" aria-hidden="true"></i> Book Auto
            </button>
        </div>`;
    } else {
        const singleT = v.transmissions[0];
        const label = isBike ? 'Book Now' : (singleT.price >= 10000 ? 'Book Premium' : 'Book Now');
        ctaHTML = `
        <div class="card-cta single" role="group" aria-label="Booking">
            <button class="btn-book-single" onclick="openBookingModal(${v.id}, '${singleT.type}')" aria-label="Book ${v.name} via WhatsApp">
                <i class="fab fa-whatsapp" aria-hidden="true"></i> ${label}
            </button>
        </div>`;
    }

    const typeLabel = {
        hatchback: 'Hatchback',
        suv:       'SUV',
        mpv:       'MPV',
        luxury:    'Luxury',
        bikes:     isBike ? '2-Wheeler' : 'Bike'
    }[v.type] || v.type;

    const badgeClass = v.badgeColor ? `card-badge ${v.badgeColor}` : 'card-badge';

    return `
    <article class="vehicle-card${isBike ? ' bike-card' : ''}" role="listitem" aria-label="${v.name} rental">
        <div class="card-image-wrap">
            <div class="card-image-bg" data-bg="${v.image}" aria-label="${v.name} photo" role="img"
                 style="background-color: #162040;"></div>
            <span class="${badgeClass}" aria-label="${v.badge} vehicle">${v.badge}</span>
            <span class="card-type-chip">${typeLabel}</span>
        </div>
        <div class="card-body">
            <div class="card-header">
                <h3 class="card-name">${v.name}</h3>
                <span class="card-seats" aria-label="${v.seats} seater">
                    <i class="fas fa-users" aria-hidden="true"></i> ${v.seats}
                </span>
            </div>
            <div class="card-features" aria-label="Features">${featureTags}</div>
            ${pricingHTML}
            <p class="card-deposit" aria-label="Security deposit">
                <i class="fas fa-shield-alt" aria-hidden="true"></i>
                ₹${v.deposit.toLocaleString('en-IN')} refundable deposit
            </p>
            ${ctaHTML}
        </div>
    </article>`;
}

/* ============================================================
   FILTERING SYSTEM
   ============================================================ */

/**
 * Sets a filter category and applies filters
 * @param {string} category — 'type'
 * @param {string} value    — filter value
 * @param {HTMLElement} btn — clicked button element
 */
function setFilter(category, value, btn) {
    filterState[category] = value;

    // Update active button styles
    if (btn) {
        const group = btn.closest('.filter-group');
        if (group) {
            group.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
        }
    }

    applyFilters();
}

/**
 * Reads all current filter controls and re-renders the fleet
 */
function applyFilters() {
    const searchEl = document.getElementById('fleet-search');
    const heroSearchEl = document.getElementById('hero-search-input');
    const txSelect = document.getElementById('filter-transmission');
    const priceSelect = document.getElementById('filter-price');

    filterState.search       = (searchEl?.value || heroSearchEl?.value || '').toLowerCase().trim();
    filterState.transmission = txSelect?.value || 'all';
    filterState.price        = priceSelect?.value || 'all';

    let filtered = VEHICLES.filter(v => {
        // Type filter
        if (filterState.type !== 'all' && v.type !== filterState.type) return false;

        // Search filter
        if (filterState.search) {
            const q = filterState.search;
            const matchable = (v.name + ' ' + v.type + ' ' + v.badge + ' ' + v.features.join(' ')).toLowerCase();
            if (!matchable.includes(q)) return false;
        }

        // Transmission filter
        if (filterState.transmission !== 'all') {
            const hasTx = v.transmissions.some(t => t.type === filterState.transmission);
            if (!hasTx) return false;
        }

        // Price filter
        if (filterState.price !== 'all') {
            const [minP, maxP] = filterState.price.split('-').map(Number);
            const txToCheck = filterState.transmission !== 'all'
                ? v.transmissions.filter(t => t.type === filterState.transmission)
                : v.transmissions;
            const lowestMatch = txToCheck.length > 0
                ? Math.min(...txToCheck.map(t => t.price))
                : Infinity;
            if (lowestMatch < minP || lowestMatch > maxP) return false;
        }

        return true;
    });

    renderFleet(filtered);
    observeNewCards();
}

/**
 * Resets all filters to default state
 */
function resetFilters() {
    filterState.type = 'all';
    filterState.transmission = 'all';
    filterState.price = 'all';
    filterState.search = '';

    const searchEl = document.getElementById('fleet-search');
    const txSelect = document.getElementById('filter-transmission');
    const priceSelect = document.getElementById('filter-price');

    if (searchEl)    searchEl.value = '';
    if (txSelect)    txSelect.value = 'all';
    if (priceSelect) priceSelect.value = 'all';

    document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
    });
    const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
    if (allBtn) { allBtn.classList.add('active'); allBtn.setAttribute('aria-pressed', 'true'); }

    applyFilters();
}

/**
 * Filter fleet to bikes/cars and scroll
 * @param {string} section — 'cars' | 'bikes'
 */
function filterSection(section) {
    const type = section === 'bikes' ? 'bikes' : 'all';
    filterState.type = type;

    const allBtn = document.querySelector(`.filter-btn[data-filter="${section === 'bikes' ? 'bikes' : 'all'}"]`);
    if (allBtn) {
        document.querySelectorAll('.filter-btn').forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-pressed', 'false');
        });
        allBtn.classList.add('active');
        allBtn.setAttribute('aria-pressed', 'true');
    }

    applyFilters();
    scrollToFleet();
}

function scrollToFleet() {
    const fleet = document.getElementById('vehicles');
    if (fleet) {
        const top = fleet.getBoundingClientRect().top + window.scrollY - getNavHeight() - 10;
        window.scrollTo({ top, behavior: 'smooth' });
    }
}

/* ============================================================
   BOOKING MODAL
   ============================================================ */

/**
 * Opens the booking modal with vehicle details pre-filled
 * @param {number} vehicleId    — vehicle ID from VEHICLES array
 * @param {string} transmission — 'manual' | 'automatic'
 */
function openBookingModal(vehicleId, transmission) {
    const vehicle = VEHICLES.find(v => v.id === vehicleId);
    if (!vehicle) return;

    activeModalVehicle = { vehicle, transmission };

    const modal = document.getElementById('booking-modal');
    const titleEl = document.getElementById('modal-title');
    const detailsEl = document.getElementById('modal-vehicle-details');
    const iconEl = document.getElementById('modal-vehicle-icon');

    if (!modal) return;

    const tx = vehicle.transmissions.find(t => t.type === transmission) || vehicle.transmissions[0];
    const txLabel = tx.type.charAt(0).toUpperCase() + tx.type.slice(1);
    const isBike = vehicle.type === 'bikes';

    if (titleEl) titleEl.textContent = vehicle.name;
    if (detailsEl) detailsEl.textContent = `${txLabel} · ₹${tx.price.toLocaleString('en-IN')}/day · ₹${vehicle.deposit.toLocaleString('en-IN')} deposit`;
    if (iconEl) iconEl.textContent = isBike ? '🏍️' : '🚗';

    // Set date minimums
    const today = new Date().toISOString().split('T')[0];
    const pickupInput  = document.getElementById('modal-pickup');
    const dropoffInput = document.getElementById('modal-dropoff');
    if (pickupInput)  { pickupInput.min = today; pickupInput.value = ''; }
    if (dropoffInput) { dropoffInput.min = today; dropoffInput.value = ''; }

    const durEl = document.getElementById('modal-duration');
    if (durEl) { durEl.textContent = 'Select pickup and return dates above'; durEl.classList.remove('has-value'); }

    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';

    // Focus first interactive element
    setTimeout(() => pickupInput?.focus(), 100);
}

/**
 * Closes the booking modal
 */
function closeModal() {
    const modal = document.getElementById('booking-modal');
    if (modal) {
        modal.setAttribute('hidden', '');
        document.body.style.overflow = '';
        activeModalVehicle = null;
    }
}

/**
 * Confirms booking from modal and sends WhatsApp message
 */
function confirmModalBooking() {
    if (!activeModalVehicle) return;

    const { vehicle, transmission } = activeModalVehicle;
    const tx = vehicle.transmissions.find(t => t.type === transmission) || vehicle.transmissions[0];
    const pickupDate  = document.getElementById('modal-pickup')?.value;
    const dropoffDate = document.getElementById('modal-dropoff')?.value;

    if (!pickupDate || !dropoffDate) {
        alert('Please select both pickup and return dates.');
        return;
    }

    if (dropoffDate <= pickupDate) {
        alert('Return date must be after pickup date.');
        return;
    }

    const days = Math.ceil((new Date(dropoffDate) - new Date(pickupDate)) / 86400000);
    const totalCost = days * tx.price;
    const txLabel = tx.type.charAt(0).toUpperCase() + tx.type.slice(1);

    const message = buildWhatsAppMessage({
        vehicleName:  vehicle.name,
        transmission: txLabel,
        pricePerDay:  `₹${tx.price.toLocaleString('en-IN')}`,
        deposit:      `₹${vehicle.deposit.toLocaleString('en-IN')}`,
        pickup:       formatDate(pickupDate),
        dropoff:      formatDate(dropoffDate),
        days,
        totalCost:    `₹${totalCost.toLocaleString('en-IN')}`
    });

    closeModal();
    openWhatsApp(message);
}

/* ============================================================
   WHATSAPP INTEGRATION
   ============================================================ */

/**
 * Direct quick-book via WhatsApp from card (legacy compat)
 * @param {string} vehicleName
 * @param {string} transmission
 * @param {string} price
 */
function bookViaWhatsApp(vehicleName, transmission, price) {
    const message = buildWhatsAppMessage({ vehicleName, transmission, pricePerDay: price });
    openWhatsApp(message);
}

/**
 * Builds a formatted WhatsApp booking message
 * @param {Object} params
 * @returns {string}
 */
function buildWhatsAppMessage({ vehicleName, transmission, pricePerDay, deposit = '', pickup = '', dropoff = '', days = '', totalCost = '' }) {
    let msg = `🚗 *Vehicle Booking Inquiry — GoaRide*\n\n`;
    msg += `Hello Team 👋, I'd like to book:\n\n`;
    msg += `📌 *Vehicle:* ${vehicleName}\n`;
    msg += `⚙️ *Transmission:* ${transmission}\n`;
    msg += `💵 *Price:* ${pricePerDay}/day\n`;
    if (deposit) msg += `🔐 *Deposit:* ${deposit} (refundable)\n`;
    if (pickup)  msg += `📅 *Pickup Date:* ${pickup}\n`;
    if (dropoff) msg += `📅 *Return Date:* ${dropoff}\n`;
    if (days)    msg += `📆 *Duration:* ${days} day${days > 1 ? 's' : ''}\n`;
    if (totalCost) msg += `💰 *Estimated Total:* ${totalCost}\n`;
    msg += `\nCould you please confirm:\n`;
    msg += `1️⃣ Availability\n`;
    msg += `2️⃣ Pickup location & process\n`;
    msg += `3️⃣ Required documents\n`;
    msg += `\n✅ Looking forward to exploring Goa with GoaRide! 🙏`;
    return msg;
}

/**
 * Opens WhatsApp with pre-filled message
 * @param {string} message
 */
function openWhatsApp(message) {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
}

/* ============================================================
   BOOKING FORM (Section)
   ============================================================ */

/**
 * Validates and submits the booking form
 */
function submitBooking() {
    const fields = {
        vehicle:  document.getElementById('vehicle')?.value?.trim(),
        name:     document.getElementById('name')?.value?.trim(),
        phone:    document.getElementById('phone')?.value?.trim(),
        email:    document.getElementById('email')?.value?.trim(),
        location: document.getElementById('location')?.value?.trim(),
        pickup:   document.getElementById('pickup')?.value,
        dropoff:  document.getElementById('dropoff')?.value,
        requests: document.getElementById('requests')?.value?.trim()
    };

    const errors = [];
    if (!fields.vehicle)                       errors.push('Please select a vehicle');
    if (!fields.name || fields.name.length < 2) errors.push('Name must be at least 2 characters');
    if (!fields.phone)                         errors.push('Phone number is required');
    if (!fields.email || !fields.email.includes('@')) errors.push('A valid email address is required');
    if (!fields.location)                      errors.push('Please select a pickup location');
    if (!fields.pickup)                        errors.push('Pickup date is required');
    if (!fields.dropoff)                       errors.push('Return date is required');
    if (fields.pickup && fields.dropoff && fields.dropoff <= fields.pickup)
        errors.push('Return date must be after pickup date');

    const msgDiv = document.getElementById('booking-messages');

    if (errors.length > 0) {
        if (msgDiv) {
            msgDiv.innerHTML = `<div class="msg-error"><strong><i class="fas fa-exclamation-circle"></i> Please fix these errors:</strong><ul style="margin:.5rem 0 0 1.25rem;">${errors.map(e => `<li>${e}</li>`).join('')}</ul></div>`;
            msgDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }

    const days = Math.ceil((new Date(fields.dropoff) - new Date(fields.pickup)) / 86400000);

    const message = `🚗 *BOOKING REQUEST — GoaRide*\n\n*Customer Details:*\n• Name: ${fields.name}\n• Phone: ${fields.phone}\n• Email: ${fields.email}\n\n*Rental Details:*\n• Vehicle: ${fields.vehicle}\n• Pickup: ${formatDate(fields.pickup)}\n• Return: ${formatDate(fields.dropoff)}\n• Duration: ${days} day${days > 1 ? 's' : ''}\n• Pickup Location: ${fields.location}${fields.requests ? `\n\n*Special Requests:* ${fields.requests}` : ''}\n\nPlease confirm availability and total cost. Thank you! 🙏`;

    if (msgDiv) {
        msgDiv.innerHTML = `<div class="msg-success"><i class="fas fa-check-circle"></i> <strong>Redirecting to WhatsApp...</strong> Your booking details are ready to send.</div>`;
    }

    setTimeout(() => openWhatsApp(message), 800);
}

/* ============================================================
   FAQ ACCORDION
   ============================================================ */

/**
 * Toggles an FAQ item open/closed
 * @param {HTMLElement} btn — clicked FAQ question button
 */
function toggleFaq(btn) {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    const answer = btn.nextElementSibling;

    // Close all other items
    document.querySelectorAll('.faq-question[aria-expanded="true"]').forEach(q => {
        if (q !== btn) {
            q.setAttribute('aria-expanded', 'false');
            const a = q.nextElementSibling;
            if (a) a.hidden = true;
        }
    });

    btn.setAttribute('aria-expanded', String(!isOpen));
    if (answer) answer.hidden = isOpen;
}

/* ============================================================
   DARK MODE
   ============================================================ */

function initDarkMode() {
    const saved = localStorage.getItem('grDarkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (saved === 'true' || (saved === null && prefersDark)) {
        document.body.classList.add('dark-mode');
        updateThemeIcon(true);
    } else {
        updateThemeIcon(false);
    }
}

function toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('grDarkMode', isDark);
    updateThemeIcon(isDark);
}

function updateThemeIcon(isDark) {
    const icon = document.getElementById('theme-icon');
    if (!icon) return;
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
}

/* ============================================================
   WHATSAPP LINKS INIT
   ============================================================ */

function initWhatsAppLinks() {
    const initialMsg = encodeURIComponent("Hi! I'm interested in renting a car for my Goa trip. 🚗");
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${initialMsg}`;
    const baseUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

    const links = {
        'nav-whatsapp-link':   url,
        'hero-whatsapp-btn':   url,
        'fab-whatsapp-link':   url,
        'footer-whatsapp-link': baseUrl,
        'booking-wa-link':     url
    };

    Object.entries(links).forEach(([id, href]) => {
        const el = document.getElementById(id);
        if (el) el.href = href;
    });
}

/* ============================================================
   NAVBAR — SCROLL + ACTIVE SECTION
   ============================================================ */

function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (!navbar) return;
        navbar.classList.toggle('scrolled', window.scrollY > 60);
        updateActiveNavLink();

        // Back to top visibility
        const btt = document.getElementById('back-to-top');
        if (btt) btt.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });

    // Hamburger toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            hamburger.classList.toggle('active', isOpen);
            hamburger.setAttribute('aria-expanded', String(isOpen));
        });

        // Close on link click
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Close menu on outside click
    document.addEventListener('click', e => {
        if (navMenu?.classList.contains('open') && !navbar?.contains(e.target)) {
            navMenu.classList.remove('open');
            hamburger?.classList.remove('active');
            hamburger?.setAttribute('aria-expanded', 'false');
        }
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id], footer[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const scrollPos = window.scrollY + getNavHeight() + 20;

    let activeId = '';
    sections.forEach(s => {
        if (scrollPos >= s.offsetTop) activeId = s.id;
    });

    navLinks.forEach(link => {
        const href = link.getAttribute('href')?.slice(1);
        link.classList.toggle('active', href === activeId);
    });
}

/* ============================================================
   HERO SEARCH INTEGRATION
   ============================================================ */

function initHeroSearch() {
    const heroSearch = document.getElementById('hero-search-input');
    if (!heroSearch) return;

    heroSearch.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            const fleetSearch = document.getElementById('fleet-search');
            if (fleetSearch) fleetSearch.value = heroSearch.value;
            filterState.search = heroSearch.value.toLowerCase().trim();
            applyFilters();
            scrollToFleet();
        }
    });
}

/* ============================================================
   STATS COUNTER ANIMATION
   ============================================================ */

function initStatsCounter() {
    const counters = document.querySelectorAll('.stat-num[data-target]');
    if (counters.length === 0) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.dataset.target, 10);
            animateCounter(el, 0, target, 1500);
            observer.unobserve(el);
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}

function animateCounter(el, start, end, duration) {
    const startTime = performance.now();
    const easeOut = t => 1 - Math.pow(1 - t, 3);

    function step(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.round(start + (end - start) * easeOut(progress));
        el.textContent = current.toLocaleString('en-IN');
        if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

/* ============================================================
   SCROLL REVEAL — INTERSECTION OBSERVER
   ============================================================ */

let revealObserver;

function initScrollReveal() {
    if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('revealed'));
        return;
    }

    revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));
}

/**
 * Re-observes newly rendered vehicle cards
 */
function observeNewCards() {
    if (!revealObserver) return;
    document.querySelectorAll('.vehicle-card:not(.revealed)').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        // Small stagger
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 60);
    });
}

/* ============================================================
   LAZY IMAGE LOADING
   ============================================================ */

function initLazyImages(elements) {
    const targets = elements || document.querySelectorAll('[data-bg], img[data-src]');

    if (!('IntersectionObserver' in window)) {
        targets.forEach(el => loadElement(el));
        return;
    }

    const imgObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadElement(entry.target);
                imgObs.unobserve(entry.target);
            }
        });
    }, { rootMargin: '200px 0px' });

    targets.forEach(el => imgObs.observe(el));
}

function loadElement(el) {
    if (el.dataset.bg) {
        el.style.backgroundImage = `url('${el.dataset.bg}')`;
        el.removeAttribute('data-bg');
    }
    if (el.dataset.src) {
        el.src = el.dataset.src;
        el.removeAttribute('data-src');
        el.addEventListener('load', () => el.classList.add('loaded'), { once: true });
    }
}

/* ============================================================
   PHONE INPUT FORMATTING
   ============================================================ */

function initPhoneInput() {
    const phoneInput = document.getElementById('phone');
    if (!phoneInput) return;

    phoneInput.addEventListener('input', e => {
        let val = e.target.value.replace(/\D/g, '').substring(0, 13);

        // Auto-prefix Indian numbers
        if (val.length === 10 && /^[6789]/.test(val)) val = '91' + val;

        // Format display
        if (val.length > 0) {
            if (val.startsWith('91') && val.length >= 2) {
                val = '+91 ' + val.substring(2, 7) + (val.length > 7 ? ' ' + val.substring(7) : '');
            } else {
                val = '+' + val;
            }
        }

        e.target.value = val.trim();
    });

    phoneInput.addEventListener('blur', e => {
        const clean = e.target.value.replace(/\D/g, '');
        const valid = clean.length === 12 && clean.startsWith('91');
        e.target.style.borderColor = (clean.length > 0 && !valid) ? 'rgba(239,68,68,0.6)' : '';
    });
}

/* ============================================================
   DATE VALIDATION
   ============================================================ */

function initDateInputs() {
    const pickupInput  = document.getElementById('pickup');
    const dropoffInput = document.getElementById('dropoff');

    if (!pickupInput || !dropoffInput) return;

    const today = new Date().toISOString().split('T')[0];
    pickupInput.min  = today;
    dropoffInput.min = today;

    pickupInput.addEventListener('change', () => {
        dropoffInput.min = pickupInput.value;
        if (dropoffInput.value && dropoffInput.value <= pickupInput.value) {
            dropoffInput.value = '';
        }
    });

    dropoffInput.addEventListener('change', () => {
        const invalid = dropoffInput.value && pickupInput.value && dropoffInput.value <= pickupInput.value;
        dropoffInput.style.borderColor = invalid ? 'rgba(239,68,68,0.6)' : '';
    });
}

/* ============================================================
   MODAL DATE LISTENER
   ============================================================ */

function initModalDates() {
    const pickupEl  = document.getElementById('modal-pickup');
    const dropoffEl = document.getElementById('modal-dropoff');
    const durEl     = document.getElementById('modal-duration');

    function updateDuration() {
        if (!pickupEl?.value || !dropoffEl?.value || !durEl) return;
        if (dropoffEl.value <= pickupEl.value) {
            durEl.textContent = '⚠️ Return date must be after pickup date';
            durEl.classList.remove('has-value');
            return;
        }
        const days = Math.ceil((new Date(dropoffEl.value) - new Date(pickupEl.value)) / 86400000);
        const vehicle = activeModalVehicle;
        const tx = vehicle?.vehicle.transmissions.find(t => t.type === vehicle.transmission);
        const priceText = tx ? ` · Estimated ₹${(days * tx.price).toLocaleString('en-IN')} total` : '';
        durEl.textContent = `${days} day${days > 1 ? 's' : ''} rental${priceText}`;
        durEl.classList.add('has-value');
    }

    if (pickupEl)  pickupEl.addEventListener('change', () => { if (dropoffEl) dropoffEl.min = pickupEl.value; updateDuration(); });
    if (dropoffEl) dropoffEl.addEventListener('change', updateDuration);
}

/* ============================================================
   SMOOTH SCROLL
   ============================================================ */

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (href === '#' || !href) return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - getNavHeight() - 8;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
}

/* ============================================================
   LOADER
   ============================================================ */

function hideLoader() {
    const loader = document.getElementById('loader-screen');
    if (loader && !loader.classList.contains('hidden')) {
        loader.classList.add('hidden');
    }
}

/* ============================================================
   UTILITY HELPERS
   ============================================================ */

function getNavHeight() {
    return parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 68;
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ============================================================
   MODAL KEYBOARD TRAP
   ============================================================ */

document.addEventListener('keydown', e => {
    const modal = document.getElementById('booking-modal');
    if (!modal || modal.hasAttribute('hidden')) return;

    if (e.key === 'Escape') closeModal();

    if (e.key === 'Tab') {
        const focusable = modal.querySelectorAll('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const first = focusable[0];
        const last  = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first?.focus();
        }
    }
});

// Close modal on overlay click
document.addEventListener('click', e => {
    const modal = document.getElementById('booking-modal');
    if (modal && !modal.hasAttribute('hidden') && e.target === modal) {
        closeModal();
    }
});

/* ============================================================
   DOM READY — INIT ALL
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Core init
    initDarkMode();
    initWhatsAppLinks();
    initNavbar();
    initSmoothScroll();
    initScrollReveal();
    initStatsCounter();
    initHeroSearch();
    initPhoneInput();
    initDateInputs();
    initModalDates();

    // Render fleet
    renderFleet(VEHICLES);
    initLazyImages();

    // Booking form submission
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', e => {
            e.preventDefault();
            submitBooking();
        });
    }

    // Dark mode toggle
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) toggleBtn.addEventListener('click', toggleDarkMode);

    console.log('🚗 GoaRide — Premium Platform Ready ✅');
});

/* ============================================================
   WINDOW LOAD — HIDE LOADER
   ============================================================ */

window.addEventListener('load', () => {
    hideLoader();
    initLazyImages(); // Re-run for any remaining images
});

// Fallback loader hide
setTimeout(hideLoader, 3000);