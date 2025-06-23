// References
const cropForm = document.getElementById('crop-form');
const cropList = document.getElementById('crop-list');

// Load crops from localStorage
function loadCrops() {
    const crops = JSON.parse(localStorage.getItem('crops')) || [];
    cropList.innerHTML = '';

    crops.forEach((crop, index) => {
        const li = document.createElement('li');
        li.textContent = `${crop.name} - ${crop.quantity} kg`;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('button');
        deleteBtn.addEventListener('click', () => deleteCrop(index));
        li.appendChild(deleteBtn);
        cropList.appendChild(li);
    });
}

// Add crop to localStorage
function addCrop(event) {
    event.preventDefault();

    const cropName = document.getElementById('crop-name').value;
    const quantity = document.getElementById('quantity').value;

    const crops = JSON.parse(localStorage.getItem('crops')) || [];
    crops.push({ name: cropName, quantity: parseInt(quantity) });
    localStorage.setItem('crops', JSON.stringify(crops));

    cropForm.reset();
    loadCrops();
}

// Delete crop from localStorage
function deleteCrop(index) {
    const crops = JSON.parse(localStorage.getItem('crops')) || [];
    crops.splice(index, 1);
    localStorage.setItem('crops', JSON.stringify(crops));
    loadCrops();
}

// Event Listeners
cropForm.addEventListener('submit', addCrop);
document.addEventListener('DOMContentLoaded', loadCrops);
