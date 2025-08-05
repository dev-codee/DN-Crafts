
const categories = [
  'All',
  'Acrylic Products',
  'Invitation Cards',
  'Favor Boxes',
  'Personalized Nikkah Namas',
  'Customized Bride Dupata',
  'Tabarak Boxes',
  'Occasion Gifts',
  'Flower Bouquets',
  'Gift Baskets',
];
// Application State
let cartItems = [];
let selectedCategory = 'All';
let searchTerm = '';
let isCartOpen = false;
let isCheckoutOpen = false;
let isMobileMenuOpen = false;
let isMobileSearchOpen = false;
let priceRange = { min: 0, max: 50000 }; // Uncomment if not already defined
let selectedBrands = []; // Uncomment if not already defined

// DOM Elements
const elements = {
    cartToggle: document.getElementById('cart-toggle'),
    cartOverlay: document.getElementById('cart-overlay'),
    cartSidebar: document.getElementById('cart-sidebar'),
    cartBackdrop: document.getElementById('cart-backdrop'),
    cartClose: document.getElementById('cart-close'),
    cartCount: document.getElementById('cart-count'),
    cartItems: document.getElementById('cart-items'),
    cartList: document.getElementById('cart-list'),
    emptyCart: document.getElementById('empty-cart'),
    cartFooter: document.getElementById('cart-footer'),
    cartTotal: document.getElementById('cart-total'),
    checkoutBtn: document.getElementById('checkout-btn'),
    checkoutModal: document.getElementById('checkout-modal'),
    checkoutBackdrop: document.getElementById('checkout-backdrop'),
    checkoutClose: document.getElementById('checkout-close'),
    checkoutItems: document.getElementById('checkout-items'),
    checkoutTotal: document.getElementById('checkout-total'),
    whatsappOrder: document.getElementById('whatsapp-order'),
    emailOrder: document.getElementById('email-order'),
    customerForm: document.getElementById('customer-form'),
    productsGrid: document.getElementById('products-grid'),
    categoryFilter: document.getElementById('category-filter'),
    noProducts: document.getElementById('no-products'),
    desktopSearch: document.getElementById('desktop-search'),
    mobileSearchToggle: document.getElementById('mobile-search-toggle'),
    mobileSearch: document.getElementById('mobile-search'),
    mobileSearchInput: document.getElementById('mobile-search-input'),
    mobileMenuToggle: document.getElementById('mobile-menu-toggle'),
    mobileMenu: document.getElementById('mobile-menu')
};

// Utility Functions
function formatPrice(price) {
    return `${price.toFixed(2)}`;
}

function updateCartCount() {
    const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    elements.cartCount.textContent = count > 99 ? '99+' : count;
    if (count > 0) {
        elements.cartCount.classList.remove('hidden');
    } else {
        elements.cartCount.classList.add('hidden');
    }
}

function updateCartTotal() {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    elements.cartTotal.textContent = formatPrice(total);
    elements.checkoutTotal.textContent = formatPrice(total);
    return total;
}

// Cart Functions
function addToCart(product) {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ ...product, quantity: 1 });
    }
    updateCartDisplay();
    updateCartCount();
}

function updateQuantity(id, newQuantity) {
    if (newQuantity <= 0) {
        removeItem(id);
        return;
    }
    const item = cartItems.find(item => item.id === id);
    if (item) {
        item.quantity = newQuantity;
        updateCartDisplay();
        updateCartCount();
    }
}

function removeItem(id) {
    cartItems = cartItems.filter(item => item.id !== id);
    updateCartDisplay();
    updateCartCount();
}

function updateCartDisplay() {
    if (cartItems.length === 0) {
        elements.emptyCart.classList.remove('hidden');
        elements.cartList.classList.add('hidden');
        elements.cartFooter.classList.add('hidden');
    } else {
        elements.emptyCart.classList.add('hidden');
        elements.cartList.classList.remove('hidden');
        elements.cartFooter.classList.remove('hidden');

        elements.cartList.innerHTML = cartItems.map(item => `
                    <div class="flex items-center space-x-3 sm:space-x-4 py-3 sm:py-4 border-b border-gray-200">
                        <img
                            src="${item.image}"
                            alt="${item.name}"
                            class="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg flex-shrink-0"
                            onerror="this.src='https://placehold.co/400x500/E3E7EB/5C5E60?text=Image+Unavailable'"
                        />
                        <div class="flex-1 min-w-0">
                            <h4 class="font-medium text-gray-900 text-sm sm:text-base truncate">${item.name}</h4>
                            <p class="text-xs sm:text-sm text-gray-500">${formatPrice(item.price)}</p>
                        </div>
                        <div class="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                            <button
                                onclick="updateQuantity(${item.id}, ${item.quantity - 1})"
                                class="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
                                ${item.quantity <= 1 ? 'disabled' : ''}
                            >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                                </svg>
                            </button>
                            <span class="w-6 sm:w-8 text-center text-sm font-medium">${item.quantity}</span>
                            <button
                                onclick="updateQuantity(${item.id}, ${item.quantity + 1})"
                                class="p-1 rounded-full hover:bg-gray-100"
                            >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                                </svg>
                            </button>
                        </div>
                        <button
                            onclick="removeItem(${item.id})"
                            class="p-1 text-red-500 hover:bg-red-50 rounded-full flex-shrink-0"
                            aria-label="Remove item"
                        >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                `).join('');
    }
    updateCartTotal();
    updateCheckoutDisplay();
}

function updateCheckoutDisplay() {
    elements.checkoutItems.innerHTML = cartItems.map(item => `
                <div class="flex justify-between items-start py-2 border-b border-gray-200 last:border-b-0">
                    <div class="flex-1 min-w-0 pr-2">
                        <span class="text-xs sm:text-sm font-medium block truncate">${item.name}</span>
                        <span class="text-xs text-gray-500">Qty: ${item.quantity}</span>
                    </div>
                    <span class="text-xs sm:text-sm font-medium whitespace-nowrap">${formatPrice(item.price * item.quantity)}</span>
                </div>
            `).join('');
}

// Cart Toggle Functions
function toggleCart() {
    isCartOpen = !isCartOpen;
    if (isCartOpen) {
        elements.cartOverlay.classList.remove('pointer-events-none');
        elements.cartBackdrop.classList.remove('opacity-0');
        elements.cartBackdrop.classList.add('opacity-50');
        elements.cartSidebar.classList.remove('translate-x-full');
        elements.cartSidebar.classList.add('translate-x-0');
        document.body.style.overflow = 'hidden';
    } else {
        elements.cartOverlay.classList.add('pointer-events-none');
        elements.cartBackdrop.classList.add('opacity-0');
        elements.cartBackdrop.classList.remove('opacity-50');
        elements.cartSidebar.classList.add('translate-x-full');
        elements.cartSidebar.classList.remove('translate-x-0');
        document.body.style.overflow = '';
    }
}

function closeCart() {
    if (isCartOpen) {
        toggleCart();
    }
}

// Checkout Functions
function openCheckout() {
    closeCart();
    isCheckoutOpen = true;
    elements.checkoutModal.classList.remove('hidden');
    updateCheckoutDisplay();
    document.body.style.overflow = 'hidden';
}

function closeCheckout() {
    isCheckoutOpen = false;
    elements.checkoutModal.classList.add('hidden');
    document.body.style.overflow = '';
}

function getCustomerInfo() {
    const formData = new FormData(elements.customerForm);
    return {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        city: formData.get('city'),
        postalCode: formData.get('postalCode')
    };
}

function validateCustomerInfo(customerInfo) {
    return customerInfo.name && customerInfo.email && customerInfo.phone;
}

function handleWhatsAppOrder() {
    const customerInfo = getCustomerInfo();
    if (!validateCustomerInfo(customerInfo)) {
        alert('Please fill in all required fields (Name, Email, Phone)');
        return;
    }

    const orderDetails = cartItems.map(item =>
        `${item.name} (Qty: ${item.quantity}) - ${formatPrice(item.price * item.quantity)}`
    ).join('\n');

    const total = updateCartTotal();

    const message = `New Order Request:
    
Customer Details:
Name: ${customerInfo.name}
Email: ${customerInfo.email}
Phone: ${customerInfo.phone}
Address: ${customerInfo.address}, ${customerInfo.city}, ${customerInfo.postalCode}

Order Items:
${orderDetails}

Total: ${formatPrice(total)}

Please confirm this order.`;

    const whatsappUrl = `https://wa.me/+923021943684?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

function handleEmailOrder() {
    const customerInfo = getCustomerInfo();
    if (!validateCustomerInfo(customerInfo)) {
        alert('Please fill in all required fields (Name, Email, Phone)');
        return;
    }

    const orderDetails = cartItems.map(item =>
        `${item.name} (Qty: ${item.quantity}) - ${formatPrice(item.price * item.quantity)}`
    ).join('%0D%0A');

    const total = updateCartTotal();

    const subject = 'New Order Request';
    const body = `New Order Request:%0D%0A%0D%0ACustomer Details:%0D%0AName: ${customerInfo.name}%0D%0AEmail: ${customerInfo.email}%0D%0APhone: ${customerInfo.phone}%0D%0AAddress: ${customerInfo.address}, ${customerInfo.city}, ${customerInfo.postalCode}%0D%0A%0D%0AOrder Items:%0D%0A${orderDetails}%0D%0A%0D%0ATotal: ${formatPrice(total)}`;

    const mailtoUrl = `mailto:infodncrafts@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
}

// Product Display Functions
function createProductCard(product) {
    return `
                <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                    <div class="relative overflow-hidden">
                        <img
                            src="${product.image || 'https://placehold.co/400x500/E3E7EB/5C5E60?text=Image+Unavailable'}"
                            alt="${product.name}"
                            class="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                            onerror="this.src='https://placehold.co/400x500/E3E7EB/5C5E60?text=Image+Unavailable'"
                        />
                        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                    </div>
                    <div class="p-3 sm:p-4">
                        <p class="text-xs sm:text-sm text-blue-600 font-medium mb-1">${product.category}</p>
                        <h3 class="text-base sm:text-lg font-semibold text-gray-800 mb-2 leading-tight">${product.name}</h3>
                        <p class="text-xs sm:text-sm text-gray-600 mb-3 leading-relaxed">${product.description}</p>
                        <div class="flex justify-between items-center">
                            <p class="text-lg sm:text-xl font-bold text-gray-900">${formatPrice(product.price)}</p>
                            <button
                                onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})"
                                class="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            `;
}



function filterProducts() {
    return products.filter(product => {
        // Category filter - this is the main fix
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        
        // Search filter
        const matchesSearch = searchTerm === '' || 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Only apply additional filters if they exist and are defined
        let matchesPrice = true;
        if (typeof priceRange !== 'undefined' && priceRange !== null) {
            matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
        }
        
        let matchesBrand = true;
        if (typeof selectedBrands !== 'undefined' && selectedBrands !== null && selectedBrands.length > 0) {
            matchesBrand = product.brand && selectedBrands.includes(product.brand);
        }

        return matchesCategory && matchesSearch && matchesPrice && matchesBrand;
    });
}

function renderProducts() {
    const filteredProducts = filterProducts();
    
    console.log('Filtered products count:', filteredProducts.length); // Add this for debugging
    console.log('Selected category:', selectedCategory); // Add this for debugging
    
    if (filteredProducts.length === 0) {
        elements.productsGrid.classList.add('hidden');
        elements.noProducts.classList.remove('hidden');
    } else {
        elements.productsGrid.classList.remove('hidden');
        elements.noProducts.classList.add('hidden');
        elements.productsGrid.innerHTML = filteredProducts.map(createProductCard).join('');
    }
}

function renderCategories() {
    elements.categoryFilter.innerHTML = categories.map(category => `
                <button
                    onclick="selectCategory('${category}')"
                    class="px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors duration-300 ${selectedCategory === category
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }"
                >
                    ${category}
                </button>
            `).join('');
}

function selectCategory(category) {
    selectedCategory = category;
    renderCategories();
    renderProducts();
}

// Search Functions
function handleSearch() {
    const desktopValue = elements.desktopSearch.value.toLowerCase();
    const mobileValue = elements.mobileSearchInput.value.toLowerCase();
    searchTerm = desktopValue || mobileValue;
    renderProducts();
}

function syncSearchInputs() {
    if (document.activeElement === elements.desktopSearch) {
        elements.mobileSearchInput.value = elements.desktopSearch.value;
    } else if (document.activeElement === elements.mobileSearchInput) {
        elements.desktopSearch.value = elements.mobileSearchInput.value;
    }
}

// Mobile Menu Functions
function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
    const menuLines = document.querySelectorAll('.menu-line');

    if (isMobileMenuOpen) {
        elements.mobileMenu.classList.remove('hidden');
        menuLines[0].style.transform = 'rotate(45deg) translateY(6px)';
        menuLines[1].style.opacity = '0';
        menuLines[2].style.transform = 'rotate(-45deg) translateY(-6px)';
    } else {
        elements.mobileMenu.classList.add('hidden');
        menuLines[0].style.transform = '';
        menuLines[1].style.opacity = '';
        menuLines[2].style.transform = '';
    }
}

function toggleMobileSearch() {
    isMobileSearchOpen = !isMobileSearchOpen;
    if (isMobileSearchOpen) {
        elements.mobileSearch.classList.remove('hidden');
        elements.mobileSearchInput.focus();
    } else {
        elements.mobileSearch.classList.add('hidden');
    }
}

// Event Listeners
function setupEventListeners() {
    // Cart Events
    elements.cartToggle.addEventListener('click', toggleCart);
    elements.cartClose.addEventListener('click', closeCart);
    elements.cartBackdrop.addEventListener('click', closeCart);
    elements.checkoutBtn.addEventListener('click', openCheckout);

    // Checkout Events
    elements.checkoutClose.addEventListener('click', closeCheckout);
    elements.checkoutBackdrop.addEventListener('click', closeCheckout);
    elements.whatsappOrder.addEventListener('click', handleWhatsAppOrder);
    elements.emailOrder.addEventListener('click', handleEmailOrder);

    // Search Events
    elements.desktopSearch.addEventListener('input', () => {
        syncSearchInputs();
        handleSearch();
    });
    elements.mobileSearchInput.addEventListener('input', () => {
        syncSearchInputs();
        handleSearch();
    });

    // Mobile Menu Events
    elements.mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    elements.mobileSearchToggle.addEventListener('click', toggleMobileSearch);

    // Form Validation
    const formInputs = elements.customerForm.querySelectorAll('input[required]');
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            const customerInfo = getCustomerInfo();
            const isValid = validateCustomerInfo(customerInfo);
            elements.whatsappOrder.disabled = !isValid;
            elements.emailOrder.disabled = !isValid;
        });
    });

    // Keyboard Events
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (isCheckoutOpen) {
                closeCheckout();
            } else if (isCartOpen) {
                closeCart();
            }
        }
    });

    // Prevent body scroll when modals are open
    document.addEventListener('touchmove', (e) => {
        if (isCartOpen || isCheckoutOpen) {
            if (!e.target.closest('#cart-sidebar') && !e.target.closest('#checkout-modal')) {
                e.preventDefault();
            }
        }
    }, { passive: false });
}

// Initialize Application
function init() {
    renderCategories();
    renderProducts();
    updateCartCount();
    setupEventListeners();

    // Set initial button states
    elements.whatsappOrder.disabled = true;
    elements.emailOrder.disabled = true;
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
// 1. PRODUCT WISHLIST/FAVORITES FUNCTIONALITY
// Add this to your product data structure and state
let wishlistItems = [];

// Add these functions for wishlist management
function toggleWishlist(product) {
    const existingIndex = wishlistItems.findIndex(item => item.id === product.id);
    if (existingIndex >= 0) {
        wishlistItems.splice(existingIndex, 1);
    } else {
        wishlistItems.push(product);
    }
    updateWishlistDisplay();
}

function updateWishlistDisplay() {
    // Update wishlist count in header
    const wishlistCount = document.getElementById('wishlist-count');
    if (wishlistCount) {
        wishlistCount.textContent = wishlistItems.length;
        wishlistCount.classList.toggle('hidden', wishlistItems.length === 0);
    }

    // Re-render products to update heart icons
    renderProducts();
}

function isInWishlist(productId) {
    return wishlistItems.some(item => item.id === productId);
}

// 2. PRODUCT QUICK VIEW MODAL
function openQuickView(product) {
    const modal = document.getElementById('quick-view-modal');
    if (!modal) return;

    // Populate modal with product data
    document.getElementById('quick-view-image').src = product.image;
    document.getElementById('quick-view-name').textContent = product.name;
    document.getElementById('quick-view-category').textContent = product.category;
    document.getElementById('quick-view-price').textContent = `$${formatPrice(product.price)}`;
    document.getElementById('quick-view-description').textContent = product.description;

    // Set up add to cart button
    const addToCartBtn = document.getElementById('quick-view-add-to-cart');
    addToCartBtn.onclick = () => {
        addToCart(product);
        closeQuickView();
    };

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeQuickView() {
    const modal = document.getElementById('quick-view-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// 3. PRODUCT SORTING FUNCTIONALITY
let currentSort = 'default';

function sortProducts(sortBy) {
    currentSort = sortBy;
    updateSortButtons();
    renderProducts();
}

function updateSortButtons() {
    const sortButtons = document.querySelectorAll('.sort-button');
    sortButtons.forEach(button => {
        if (button.dataset.sort === currentSort) {
            button.classList.add('bg-blue-600', 'text-white');
            button.classList.remove('bg-gray-100', 'text-gray-700');
        } else {
            button.classList.remove('bg-blue-600', 'text-white');
            button.classList.add('bg-gray-100', 'text-gray-700');
        }
    });
}

function getSortedProducts(products) {
    const sorted = [...products];
    switch (currentSort) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'name':
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        case 'category':
            return sorted.sort((a, b) => a.category.localeCompare(b.category));
        default:
            return sorted;
    }
}

// 4. PRODUCT REVIEW/RATING SYSTEM
const productReviews = {
    // Example structure: productId: [{ rating: 5, comment: "Great!", author: "John" }]
};

function addReview(productId, rating, comment, author) {
    if (!productReviews[productId]) {
        productReviews[productId] = [];
    }

    productReviews[productId].push({
        rating,
        comment,
        author,
        date: new Date().toLocaleDateString()
    });

    // Update display if review modal is open
    updateReviewsDisplay(productId);
}

function getAverageRating(productId) {
    const reviews = productReviews[productId] || [];
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
}

function updateReviewsDisplay(productId) {
    const reviewsList = document.getElementById('reviews-list');
    const averageRating = document.getElementById('average-rating');
    const reviews = productReviews[productId] || [];

    if (averageRating) {
        averageRating.textContent = getAverageRating(productId);
    }

    if (reviewsList) {
        reviewsList.innerHTML = reviews.map(review => `
            <div class="border-b pb-4 mb-4">
                <div class="flex items-center mb-2">
                    <div class="flex text-yellow-400 mr-2">
                        ${Array(5).fill().map((_, i) =>
            `<span class="${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}">★</span>`
        ).join('')}
                    </div>
                    <span class="font-medium">${review.author}</span>
                    <span class="text-gray-500 text-sm ml-2">${review.date}</span>
                </div>
                <p class="text-gray-700">${review.comment}</p>
            </div>
        `).join('');
    }
}

// 5. PRODUCT QUANTITY SELECTOR IN PRODUCT CARDS
function createQuantitySelector(productId) {
    return `
        <div class="flex items-center border rounded-full overflow-hidden">
            <button 
                onclick="updateProductQuantity(${productId}, -1)"
                class="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-sm"
            >-</button>
            <input 
                type="number" 
                id="qty-${productId}" 
                value="1" 
                min="1" 
                max="99"
                class="w-12 text-center border-0 text-sm focus:outline-none"
            />
            <button 
                onclick="updateProductQuantity(${productId}, 1)"
                class="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-sm"
            >+</button>
        </div>
    `;
}

function updateProductQuantity(productId, change) {
    const input = document.getElementById(`qty-${productId}`);
    if (input) {
        const currentValue = parseInt(input.value) || 1;
        const newValue = Math.max(1, Math.min(99, currentValue + change));
        input.value = newValue;
    }
}

function addToCartWithQuantity(product) {
    const qtyInput = document.getElementById(`qty-${product.id}`);
    const quantity = parseInt(qtyInput?.value) || 1;

    for (let i = 0; i < quantity; i++) {
        addToCart(product);
    }

    // Reset quantity selector
    if (qtyInput) qtyInput.value = 1;
}

// 6. CART ITEM QUANTITY BULK UPDATE
function updateAllQuantities() {
    const inputs = document.querySelectorAll('#cart-list input[type="number"]');
    inputs.forEach(input => {
        const itemId = parseInt(input.dataset.itemId);
        const newQuantity = parseInt(input.value);
        updateQuantity(itemId, newQuantity);
    });
}

// 7. SAVE FOR LATER FUNCTIONALITY
let savedForLaterItems = [];

function saveForLater(itemId) {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
        savedForLaterItems.push(item);
        removeItem(itemId);
        updateSavedItemsDisplay();
    }
}

function moveToCart(itemId) {
    const itemIndex = savedForLaterItems.findIndex(item => item.id === itemId);
    if (itemIndex >= 0) {
        const item = savedForLaterItems.splice(itemIndex, 1)[0];
        addToCart(item);
        updateSavedItemsDisplay();
    }
}

function updateSavedItemsDisplay() {
    const savedItemsContainer = document.getElementById('saved-items');
    if (!savedItemsContainer) return;

    if (savedForLaterItems.length === 0) {
        savedItemsContainer.innerHTML = '<p class="text-gray-500 text-center py-4">No saved items</p>';
        return;
    }

    savedItemsContainer.innerHTML = savedForLaterItems.map(item => `
        <div class="flex items-center space-x-3 py-3 border-b">
            <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded-lg" />
            <div class="flex-1">
                <h5 class="font-medium text-sm">${item.name}</h5>
                <p class="text-xs text-gray-500">$${formatPrice(item.price)}</p>
            </div>
            <button 
                onclick="moveToCart(${item.id})"
                class="text-blue-600 text-xs hover:underline"
            >Move to Cart</button>
        </div>
    `).join('');
}


function updatePriceFilter(min, max) {
    priceRange = { min, max };
    renderProducts();
}

function toggleBrandFilter(brand) {
    const index = selectedBrands.indexOf(brand);
    if (index >= 0) {
        selectedBrands.splice(index, 1);
    } else {
        selectedBrands.push(brand);
    }
    renderProducts();
}

function advancedFilterProducts() {
    return products.filter(product => {
        // Correctly use the global selectedCategory and searchTerm
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Ensure priceRange and selectedBrands are initialized or handled
        // You may need to adjust these checks based on how you handle your filters
        const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
        const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);

        return matchesCategory && matchesSearch && matchesPrice && matchesBrand;
    });
}

// 9. PRODUCT COMPARISON FUNCTIONALITY
let comparisonItems = [];

function addToComparison(product) {
    if (comparisonItems.length >= 4) {
        alert('You can compare up to 4 products at a time');
        return;
    }

    if (!comparisonItems.find(item => item.id === product.id)) {
        comparisonItems.push(product);
        updateComparisonDisplay();
    }
}

function removeFromComparison(productId) {
    comparisonItems = comparisonItems.filter(item => item.id !== productId);
    updateComparisonDisplay();
}

function updateComparisonDisplay() {
    const comparisonBar = document.getElementById('comparison-bar');
    const comparisonCount = document.getElementById('comparison-count');

    if (comparisonCount) {
        comparisonCount.textContent = comparisonItems.length;
    }

    if (comparisonBar) {
        if (comparisonItems.length > 0) {
            comparisonBar.classList.remove('hidden');
        } else {
            comparisonBar.classList.add('hidden');
        }
    }
}

function openComparisonModal() {
    const modal = document.getElementById('comparison-modal');
    if (modal && comparisonItems.length > 1) {
        // Populate comparison table
        populateComparisonTable();
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function populateComparisonTable() {
    const table = document.getElementById('comparison-table');
    if (!table) return;

    // Create comparison table HTML
    const headers = ['Feature', ...comparisonItems.map(item => item.name)];
    const rows = [
        ['Image', ...comparisonItems.map(item => `<img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded" />`)],
        ['Price', ...comparisonItems.map(item => `$${formatPrice(item.price)}`)],
        ['Category', ...comparisonItems.map(item => item.category)],
        ['Description', ...comparisonItems.map(item => item.description)]
    ];

    table.innerHTML = `
        <thead>
            <tr>${headers.map(header => `<th class="p-3 text-left border-b">${header}</th>`).join('')}</tr>
        </thead>
        <tbody>
            ${rows.map(row => `
                <tr class="border-b">
                    ${row.map(cell => `<td class="p-3">${cell}</td>`).join('')}
                </tr>
            `).join('')}
        </tbody>
    `;
}

// 10. RECENTLY VIEWED PRODUCTS
let recentlyViewed = [];

function addToRecentlyViewed(product) {
    // Remove if already exists
    recentlyViewed = recentlyViewed.filter(item => item.id !== product.id);

    // Add to beginning
    recentlyViewed.unshift(product);

    // Keep only last 10 items
    if (recentlyViewed.length > 10) {
        recentlyViewed = recentlyViewed.slice(0, 10);
    }

    updateRecentlyViewedDisplay();
}

function updateRecentlyViewedDisplay() {
    const container = document.getElementById('recently-viewed');
    if (!container || recentlyViewed.length === 0) return;

    container.innerHTML = `
        <h3 class="text-lg font-semibold mb-4">Recently Viewed</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            ${recentlyViewed.slice(0, 5).map(product => `
                <div class="bg-white rounded-lg shadow p-3">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-24 object-cover rounded mb-2" />
                    <h4 class="text-sm font-medium truncate">${product.name}</h4>
                    <p class="text-sm text-blue-600 font-semibold">$${formatPrice(product.price)}</p>
                </div>
            `).join('')}
        </div>
    `;
}

// 11. NEWSLETTER SUBSCRIPTION
function subscribeNewsletter(email) {
    if (!email || !email.includes('@')) {
        alert('Please enter a valid email address');
        return;
    }

    // Simulate API call
    console.log('Newsletter subscription:', email);
    alert('Thank you for subscribing to our newsletter!');

    // Clear the input
    const input = document.getElementById('newsletter-email');
    if (input) input.value = '';
}

// 12. PRODUCT STOCK STATUS
function getStockStatus(productId) {
    // Simulate stock levels
    const stockLevels = {
        1: 15, 2: 3, 3: 0, 4: 25, 5: 8,
        6: 12, 7: 0, 8: 30, 9: 5, 10: 20
    };

    const stock = stockLevels[productId] || 10;

    if (stock === 0) return { status: 'out-of-stock', text: 'Out of Stock', class: 'text-red-600' };
    if (stock <= 5) return { status: 'low-stock', text: `Only ${stock} left`, class: 'text-orange-600' };
    return { status: 'in-stock', text: 'In Stock', class: 'text-green-600' };
}

// 13. LOADING STATES AND ANIMATIONS
function showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = `
            <div class="flex items-center justify-center py-8">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span class="ml-2 text-gray-600">Loading...</span>
            </div>
        `;
    }
}

function hideLoading(elementId, content) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = content;
    }
}

// 14. TOAST NOTIFICATIONS
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white transform transition-all duration-300 translate-x-full ${type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-blue-600'
        }`;
    toast.textContent = message;

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
        toast.classList.remove('translate-x-full');
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// 15. LOCAL STORAGE PERSISTENCE
function saveToLocalStorage() {
    try {
        localStorage.setItem('styleshop_cart', JSON.stringify(cartItems));
        localStorage.setItem('styleshop_wishlist', JSON.stringify(wishlistItems));
        localStorage.setItem('styleshop_recently_viewed', JSON.stringify(recentlyViewed));
    } catch (error) {
        console.warn('Could not save to localStorage:', error);
    }
}

function loadFromLocalStorage() {
    try {
        const savedCart = localStorage.getItem('styleshop_cart');
        const savedWishlist = localStorage.getItem('styleshop_wishlist');
        const savedRecent = localStorage.getItem('styleshop_recently_viewed');

        if (savedCart) cartItems = JSON.parse(savedCart);
        if (savedWishlist) wishlistItems = JSON.parse(savedWishlist);
        if (savedRecent) recentlyViewed = JSON.parse(savedRecent);

        updateCartDisplay();
        updateWishlistDisplay();
        updateRecentlyViewedDisplay();
    } catch (error) {
        console.warn('Could not load from localStorage:', error);
    }
}

// Update existing functions to include persistence
const originalAddToCart = addToCart;
addToCart = function (product) {
    originalAddToCart(product);
    saveToLocalStorage();
    showToast(`${product.name} added to cart!`);
};

const originalRemoveItem = removeItem;
removeItem = function (id) {
    originalRemoveItem(id);
    saveToLocalStorage();
    showToast('Item removed from cart', 'info');
};
// Additional JavaScript functions to add to your existing script

// 16. WISHLIST SIDEBAR FUNCTIONS
function toggleWishlist() {
    const isWishlistOpen = !document.getElementById('wishlist-overlay').classList.contains('pointer-events-none');
    if (isWishlistOpen) {
        closeWishlist();
    } else {
        openWishlist();
    }
}

function openWishlist() {
    const overlay = document.getElementById('wishlist-overlay');
    const backdrop = document.getElementById('wishlist-backdrop');
    const sidebar = document.getElementById('wishlist-sidebar');

    overlay.classList.remove('pointer-events-none');
    backdrop.classList.remove('opacity-0');
    backdrop.classList.add('opacity-50');
    sidebar.classList.remove('translate-x-full');
    sidebar.classList.add('translate-x-0');
    document.body.style.overflow = 'hidden';

    updateWishlistSidebar();
}

function closeWishlist() {
    const overlay = document.getElementById('wishlist-overlay');
    const backdrop = document.getElementById('wishlist-backdrop');
    const sidebar = document.getElementById('wishlist-sidebar');

    overlay.classList.add('pointer-events-none');
    backdrop.classList.add('opacity-0');
    backdrop.classList.remove('opacity-50');
    sidebar.classList.add('translate-x-full');
    sidebar.classList.remove('translate-x-0');
    document.body.style.overflow = '';
}

function updateWishlistSidebar() {
    const emptyWishlist = document.getElementById('empty-wishlist');
    const wishlistList = document.getElementById('wishlist-list');

    if (wishlistItems.length === 0) {
        emptyWishlist.classList.remove('hidden');
        wishlistList.classList.add('hidden');
    } else {
        emptyWishlist.classList.add('hidden');
        wishlistList.classList.remove('hidden');

        wishlistList.innerHTML = wishlistItems.map(item => `
            <div class="flex items-center space-x-3 py-3 border-b border-gray-200">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg" />
                <div class="flex-1">
                    <h4 class="font-medium text-gray-900 text-sm">${item.name}</h4>
                    <p class="text-sm text-gray-500">$${formatPrice(item.price)}</p>
                </div>
                <div class="flex flex-col space-y-2">
                    <button onclick="addToCart(${JSON.stringify(item).replace(/"/g, '&quot;')})" class="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors">
                        Add to Cart
                    </button>
                    <button onclick="removeFromWishlist(${item.id})" class="text-red-600 text-xs hover:underline">
                        Remove
                    </button>
                </div>
            </div>
        `).join('');
    }
}

function removeFromWishlist(productId) {
    wishlistItems = wishlistItems.filter(item => item.id !== productId);
    updateWishlistDisplay();
    updateWishlistSidebar();
    saveToLocalStorage();
}

// 17. FILTERS SIDEBAR FUNCTIONS
function toggleFilters() {
    const sidebar = document.getElementById('filters-sidebar');
    const isOpen = !sidebar.classList.contains('-translate-x-full');

    if (isOpen) {
        closeFilters();
    } else {
        openFilters();
    }
}

function openFilters() {
    const sidebar = document.getElementById('filters-sidebar');
    sidebar.classList.remove('-translate-x-full');
    sidebar.classList.add('translate-x-0');
}

function closeFilters() {
    const sidebar = document.getElementById('filters-sidebar');
    sidebar.classList.add('-translate-x-full');
    sidebar.classList.remove('translate-x-0');
}

function clearAllFilters() {
    selectedCategory = 'All';
    priceRange = { min: 0, max: 1000 };
    selectedBrands = [];
    searchTerm = '';

    // Reset UI elements
    document.getElementById('filter-price-min').value = 0;
    document.getElementById('filter-price-max').value = 1000;
    document.querySelectorAll('#filters-sidebar input[type="checkbox"]').forEach(cb => cb.checked = false);

    renderCategories();
    renderProducts();
    closeFilters();
}

// 18. REVIEWS FUNCTIONS
let currentProductId = null;
let selectedRating = 0;

function openReviewsModal(productId) {
    currentProductId = productId;
    const modal = document.getElementById('reviews-modal');
    modal.classList.remove('hidden');
    updateReviewsDisplay(productId);
    document.body.style.overflow = 'hidden';
}

function closeReviewsModal() {
    const modal = document.getElementById('reviews-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    currentProductId = null;
    selectedRating = 0;
    updateStarRating();
}

function setRating(rating) {
    selectedRating = rating;
    document.getElementById('selected-rating').value = rating;
    updateStarRating();
}

function updateStarRating() {
    const stars = document.querySelectorAll('.star-rating');
    stars.forEach((star, index) => {
        if (index < selectedRating) {
            star.classList.remove('text-gray-300');
            star.classList.add('text-yellow-400');
        } else {
            star.classList.add('text-gray-300');
            star.classList.remove('text-yellow-400');
        }
    });
}

function submitReview(event) {
    event.preventDefault();

    const rating = parseInt(document.getElementById('selected-rating').value);
    const name = document.getElementById('reviewer-name').value;
    const comment = document.getElementById('review-comment').value;

    if (rating === 0) {
        alert('Please select a rating');
        return;
    }

    addReview(currentProductId, rating, comment, name);

    // Reset form
    document.getElementById('review-form').reset();
    selectedRating = 0;
    updateStarRating();

    showToast('Review submitted successfully!');
}

// 19. IMAGE ZOOM FUNCTIONS
function openImageZoom(imageSrc) {
    const modal = document.getElementById('image-zoom-modal');
    const zoomedImage = document.getElementById('zoomed-image');

    zoomedImage.src = imageSrc;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeImageZoom() {
    const modal = document.getElementById('image-zoom-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
}

// 20. COMPARISON FUNCTIONS
function closeComparisonModal() {
    const modal = document.getElementById('comparison-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
}

// 21. COOKIE CONSENT FUNCTIONS
function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    hideCookieBanner();
}

function rejectCookies() {
    localStorage.setItem('cookieConsent', 'rejected');
    hideCookieBanner();
}

function hideCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
        banner.style.display = 'none';
    }
}

function checkCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');
    if (consent) {
        hideCookieBanner();
    }
}

// 22. BACK TO TOP FUNCTION
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleScroll() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.remove('translate-y-16', 'opacity-0');
        backToTopBtn.classList.add('translate-y-0', 'opacity-100');
    } else {
        backToTopBtn.classList.add('translate-y-16', 'opacity-0');
        backToTopBtn.classList.remove('translate-y-0', 'opacity-100');
    }
}

// 23. ENHANCED PRODUCT CARD FUNCTION (replaces existing createProductCard)
function createProductCard(product) {
    const stockInfo = getStockStatus(product.id);
    const isWishlisted = isInWishlist(product.id);
    const avgRating = getAverageRating(product.id);

    return `
        <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group relative">
            <!-- Wishlist Heart -->
            <button 
                onclick="toggleWishlist(${JSON.stringify(product).replace(/"/g, '&quot;')})"
                class="absolute top-3 right-3 z-10 p-2 rounded-full ${isWishlisted ? 'text-red-500 bg-white' : 'text-gray-400 bg-white'} shadow-md hover:scale-110 transition-all"
            >
                <svg class="w-5 h-5" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.682l-1.318-1.364a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
            </button>
            
            <!-- Stock Badge -->
            ${stockInfo.status === 'out-of-stock' ?
            '<div class="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">Out of Stock</div>' :
            stockInfo.status === 'low-stock' ?
                '<div class="absolute top-3 left-3 bg-orange-600 text-white px-2 py-1 rounded text-xs font-medium">Low Stock</div>' : ''
        }
            
            <div class="relative overflow-hidden cursor-pointer" onclick="openImageZoom('${product.image}')">
                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    onerror="this.src='https://placehold.co/400x500/E3E7EB/5C5E60?text=Image+Unavailable'"
                />
                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                
                <!-- Quick View Button -->
                <button 
                    onclick="event.stopPropagation(); openQuickView(${JSON.stringify(product).replace(/"/g, '&quot;')})"
                    class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"
                >
                    <span class="bg-white text-gray-900 px-4 py-2 rounded-full font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-105">
                        Quick View
                    </span>
                </button>
            </div>
            
            <div class="p-3 sm:p-4">
                <div class="flex justify-between items-start mb-2">
                    <p class="text-xs sm:text-sm text-blue-600 font-medium">${product.category}</p>
                    <button 
                        onclick="addToComparison(${JSON.stringify(product).replace(/"/g, '&quot;')})"
                        class="text-gray-400 hover:text-blue-600 transition-colors"
                        title="Add to Compare"
                    >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                        </svg>
                    </button>
                </div>
                
                <h3 class="text-base sm:text-lg font-semibold text-gray-800 mb-2 leading-tight cursor-pointer hover:text-blue-600 transition-colors" onclick="addToRecentlyViewed(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                    ${product.name}
                </h3>
                
                <!-- Rating -->
                <div class="flex items-center mb-2">
                    <div class="flex text-yellow-400 text-sm mr-2">
                        ${Array(5).fill().map((_, i) =>
            `<span class="${i < Math.floor(avgRating) ? 'text-yellow-400' : 'text-gray-300'}">★</span>`
        ).join('')}
                    </div>
                    <span class="text-xs text-gray-500">(${avgRating || '0.0'})</span>
                    <button onclick="openReviewsModal(${product.id})" class="text-xs text-blue-600 hover:underline ml-2">
                        Reviews
                    </button>
                </div>
                
                <p class="text-xs sm:text-sm text-gray-600 mb-3 leading-relaxed">${product.description}</p>
                
                <!-- Stock Status -->
                <p class="text-xs ${stockInfo.class} mb-2 font-medium">${stockInfo.text}</p>
                
                <div class="flex justify-between items-center">
                    <p class="text-lg sm:text-xl font-bold text-gray-900">${formatPrice(product.price)} pkr</p>
                    
                    ${stockInfo.status === 'out-of-stock' ?
            '<button class="bg-gray-400 text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium cursor-not-allowed" disabled>Out of Stock</button>' :
            `<div class="flex items-center space-x-2">
                            ${createQuantitySelector(product.id)}
                            <button
                                onclick="addToCartWithQuantity(${JSON.stringify(product).replace(/"/g, '&quot;')})"
                                class="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
                            >
                                Add to Cart
                            </button>
                        </div>`
        }
                </div>
            </div>
        </div>
    `;
}

// 24. ENHANCED FILTER AND RENDER FUNCTIONS
// Update the existing filterProducts function
const originalFilterProducts = filterProducts;

// 25. PRICE RANGE FILTER HANDLERS
function setupPriceRangeFilters() {
    const priceMin = document.getElementById('filter-price-min');
    const priceMax = document.getElementById('filter-price-max');
    const priceDisplay = document.getElementById('price-display');

    function updatePriceDisplay() {
        if (priceDisplay) {
            priceDisplay.textContent = `$${priceMin.value} - $${priceMax.value}`;
        }
    }
}
function openWhatsApp() {
    const phoneNumber = '923021943684';

    // Pre-filled message
    const message = 'Hello! I\'m interested in your products from DN Crafts.';

    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp
    window.open(whatsappURL, '_blank');
}
let currentSlideIndex = 0;
        let slideInterval;
        const slides = document.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.carousel-dot');
        
        function showSlide(index) {
            // Remove active class from all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Add active class to current slide and dot
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            
            // Trigger animations by removing and re-adding animation classes
            const activeSlide = slides[index];
            const animatedElements = activeSlide.querySelectorAll('.slide-in-left, .slide-in-right, .fade-in-up');
            animatedElements.forEach(el => {
                el.style.animation = 'none';
                el.offsetHeight; // Trigger reflow
                el.style.animation = null;
            });
        }
        
        function nextSlide() {
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            showSlide(currentSlideIndex);
        }
        
        function previousSlide() {
            currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
            showSlide(currentSlideIndex);
        }
        
        function goToSlide(index) {
            currentSlideIndex = index;
            showSlide(currentSlideIndex);
            resetAutoPlay();
        }
        
        function startAutoPlay() {
            slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
        }
        
        function resetAutoPlay() {
            clearInterval(slideInterval);
            startAutoPlay();
        }
        
        // Start auto-play
        startAutoPlay();
        
        // Pause auto-play on hover
        const carouselContainer = document.querySelector('.carousel-container');
        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        carouselContainer.addEventListener('mouseleave', () => {
            startAutoPlay();
        });
        
        // Touch/swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        carouselContainer.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        carouselContainer.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                nextSlide();
                resetAutoPlay();
            }
            if (touchEndX > touchStartX + 50) {
                previousSlide();
                resetAutoPlay();
            }
        }