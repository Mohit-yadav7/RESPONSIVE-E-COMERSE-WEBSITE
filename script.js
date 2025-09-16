// Sample Products with categories
const products = [
    { id: 1, name: "Smartphone", price: 499, category: "Electronics", image: "smartphones.jpeg" },
    { id: 2, name: "Headphones", price: 99, category: "Electronics", image: "headphones.avif" },
    { id: 3, name: "Laptop", price: 999, category: "Electronics", image: "laptop.webp" },
    { id: 4, name: "T-Shirt", price: 29, category: "Clothing", image: "t -shirt.jpeg" },
    { id: 5, name: "Jeans", price: 59, category: "Clothing", image: "download.jpeg" },
    { id: 6, name: "Camera", price: 699, category: "Electronics", image: "camra.webp" },
    
    { id: 7, name: "smartpen", price: 599, category: "Electronics", image: "smartpen.webp" },
    { id: 8, name: "induction", price: 1099, category: "Electronics", image: "induction.webp" },
    { id: 9, name: "fan", price: 9999, category: "Electronics", image: "OIP (1).webp" },
    { id: 10, name: "shirt", price: 729, category: "Clothing", image: "shirt.webp" },
    { id: 11, name: "bag", price: 959, category: "Clothing", image: "bag.jpeg" },
    { id: 12, name: "droncamra", price: 6699, category: "Electronics", image: "617rfzwf0fL._AC_SL1500_.jpg" },
];

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// DOM Elements
const productsContainer = document.getElementById("products");
const cartCount = document.getElementById("cart-count");
const cartModal = document.getElementById("cartModal");
const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");
const searchInput = document.getElementById("search");
const categoryFilter = document.getElementById("categoryFilter");
const minPriceInput = document.getElementById("minPrice");
const maxPriceInput = document.getElementById("maxPrice");

// Populate Category Filter
const categories = [...new Set(products.map(p => p.category))];
categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
});

// Display Products
function displayProducts(productsToShow) {
    productsContainer.innerHTML = "";
    if(productsToShow.length === 0){
        productsContainer.innerHTML = "<p>No products found!</p>";
        return;
    }
    productsToShow.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productsContainer.appendChild(div);
    });
}

// Add to Cart
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    updateCart();
}

// Update Cart
function updateCart() {
    cartCount.textContent = cart.reduce((acc, item) => acc + item.qty, 0);
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        const div = document.createElement("div");
        div.textContent = `${item.name} x${item.qty} - $${item.price * item.qty}`;
        cartItems.appendChild(div);
        total += item.price * item.qty;
    });
    totalPrice.textContent = total;
    localStorage.setItem("cart", JSON.stringify(cart)); // Save to localStorage
}

// Checkout Simulation
document.getElementById("checkout").addEventListener("click", () => {
    if(cart.length === 0){
        alert("Cart is empty!");
        return;
    }
    alert("Checkout successful!");
    cart = [];
    updateCart();
    cartModal.style.display = "none";
});

// Cart Open/Close
document.querySelector(".cart").addEventListener("click", () => {
    cartModal.style.display = "block";
});
document.getElementById("closeCart").addEventListener("click", () => {
    cartModal.style.display = "none";
});

// Search, Category & Price Filter
function applyFilters() {
    let filtered = products.filter(p => 
        p.name.toLowerCase().includes(searchInput.value.toLowerCase()) &&
        (categoryFilter.value === "all" || p.category === categoryFilter.value) &&
        (minPriceInput.value === "" || p.price >= parseFloat(minPriceInput.value)) &&
        (maxPriceInput.value === "" || p.price <= parseFloat(maxPriceInput.value))
    );
    displayProducts(filtered);
}

searchInput.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);
minPriceInput.addEventListener("input", applyFilters);
maxPriceInput.addEventListener("input", applyFilters);

// Dark/Light Mode
document.getElementById("toggleMode").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    cartModal.classList.toggle("dark-mode");
});

// Initial Display
displayProducts(products);
updateCart();
