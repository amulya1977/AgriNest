const productsContainer = document.getElementById('products');
const cartContainer = document.getElementById('cart-items');
const totalAmount = document.getElementById('total');
const searchInput = document.getElementById('search');

let cart = [];
let products = [];

// Fetch crops from the backend
async function fetchProducts() {
  try {
    const response = await fetch('http://localhost:5000/api/crops');
    products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

// Display products on the page
function displayProducts(products) {
  productsContainer.innerHTML = '';
  products.forEach((product) => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
      <img src="http://localhost:5000/${product.image_url}" alt="${product.crop_name}">
      <h4>${product.crop_name}</h4>
      <p>Price: $${product.price}</p>
      <p>Quantity: ${product.quantity}</p>
      <p>Location: ${product.location}</p>
      <button class="btn" onclick="addToCart(${product.id}, '${product.crop_name}', ${product.price})">Add to Cart</button>
    `;
    productsContainer.appendChild(productCard);
  });
}

// Add item to cart
function addToCart(id, name, price) {
  const existingItem = cart.find((item) => item.id === id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }
  updateCart();
}

// Update the cart display
function updateCart() {
  cartContainer.innerHTML = '';
  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.quantity;
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <p>${item.name} x${item.quantity} - $${item.price * item.quantity}</p>
      <button class="btn" onclick="removeFromCart(${item.id})">Remove</button>
    `;
    cartContainer.appendChild(cartItem);
  });
  totalAmount.innerText = total.toFixed(2);
}

// Remove item from cart
function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCart();
}

// Search functionality
searchInput.addEventListener('input', (e) => {
  const filteredProducts = products.filter((product) =>
    product.crop_name.toLowerCase().includes(e.target.value.toLowerCase())
  );
  displayProducts(filteredProducts);
});
const button = document.getElementById('b');

// Add a click event listener to the button
button.addEventListener('click', () => {

  alert('Order Placed!');
});
// Fetch products on page load
fetchProducts();
