
document.addEventListener('DOMContentLoaded', async function () {
  const inventoryTableBody = document.querySelector('#inventoryTable tbody');
  try {
      const response = await fetch('http://localhost:5000/api/crops');
      const crops = await response.json();

      if (crops.length === 0) {
          inventoryTableBody.innerHTML = '<tr><td colspan="5">No crops available.</td></tr>';
          return;
      }

      crops.forEach(crop => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${crop.crop_name}</td>
              <td>${crop.quantity}</td>
              <td>${crop.price}</td>
              <td>${crop.location}</td>
              <td><img src="${crop.image_url}" alt="${crop.crop_name}" style="width: 100px; height: auto; border: 1px solid #ccc; border-radius: 5px;"></td>
          `;
          inventoryTableBody.appendChild(row);
      });
  } catch (error) {
      console.error('Error fetching crops:', error);
      inventoryTableBody.innerHTML = '<tr><td colspan="5">Failed to load crops. Please try again later.</td></tr>';
  }
});



// Back button functionality
function goBack() {
    window.location.href = 'farmers.html';
}



