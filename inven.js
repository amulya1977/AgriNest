// References
const inventoryList = document.getElementById('inventory-list');

// Load crops from localStorage and display them
function loadInventory() {
    const crops = JSON.parse(localStorage.getItem('crops')) || [];
    inventoryList.innerHTML = '';

    crops.forEach(crop => {
        const li = document.createElement('li');
        li.textContent = `${crop.name} - ${crop.quantity} kg`;
        inventoryList.appendChild(li);
    });
}

// Event Listener
document.addEventListener('DOMContentLoaded', loadInventory);
