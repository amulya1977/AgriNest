const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt'); // Ensure you install this with `npm install bcrypt`

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files to the "uploads/" directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});
const upload = multer({ storage });

// Ensure "uploads/" directory exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Connect to MySQL database (shared connection)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'amulya@2005', // Replace with your MySQL root password
  database: 'farmer_dashboard', // Use one database for all functionalities
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
  } else {
    console.log('Connected to MySQL database.');
  }
});

// --------------------------- CROP MANAGEMENT APIs ---------------------------

// API to add a crop
app.post('/api/crops', upload.single('image'), (req, res) => {
  const { cropName, quantity, location, price } = req.body;
  const imageUrl = req.file ? `uploads/${req.file.filename}` : '';

  if (!cropName || !quantity || !location || !price || !imageUrl) {
    return res.status(400).json({ message: 'All fields, including image, are required' });
  }

  const query =
    'INSERT INTO crops (crop_name, quantity, location, price, image_url) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [cropName, quantity, location, price, imageUrl], (err) => {
    if (err) {
      console.error('Error inserting crop data:', err);
      return res.status(500).json({ message: 'Failed to add crop' });
    }
    res.status(200).json({ message: 'Crop added successfully' });
  });
});

// API to get all crops
app.get('/api/crops', (req, res) => {
  const query = 'SELECT id, crop_name, quantity, location, price, image_url FROM crops';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving crops:', err);
      return res.status(500).json({ message: 'Error retrieving crops' });
    }
    res.json(results);
  });
});

// Serve uploaded images
app.use('/uploads', express.static('uploads'));

// --------------------------- USER AUTHENTICATION APIs ---------------------------

// API for user signup
app.post('/api/signup', async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check for existing user
    const checkQuery = 'SELECT * FROM user_credentials WHERE email = ?';
    db.query(checkQuery, [email], (err, results) => {
      if (err) {
        console.error('Error checking user:', err);
        return res.status(500).json({ message: 'Database error' });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      // Insert new user
      const insertQuery =
        'INSERT INTO user_credentials (name, email, password, role) VALUES (?, ?, ?, ?)';
      db.query(insertQuery, [name, email, hashedPassword, role], (err) => {
        if (err) {
          console.error('Error inserting user:', err);
          return res.status(500).json({ message: 'Failed to save user details' });
        }
        res.status(200).json({ message: 'Signup successful' });
      });
    });
  } catch (err) {
    console.error('Error hashing password:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// API for user login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const query = 'SELECT * FROM user_credentials WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Error during login:', err);
      return res.status(500).json({ message: 'Login failed' });
    }

    if (results.length > 0) {
      const user = results[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        res.status(200).json({
          message: 'Login successful',
          userType: user.role,
          userId: user.id,
        });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  });
});
// Add this in your Express server.js
app.post('/api/cart', (req, res) => {
  const { userId, cropId, quantity } = req.body;
  const query = 'INSERT INTO cart (user_id, crop_id, quantity) VALUES (?, ?, ?)';

  db.query(query, [userId, cropId, quantity], (err) => {
    if (err) {
      console.error('Error adding to cart:', err);
      return res.status(500).json({ message: 'Failed to add to cart' });
    }
    res.json({ message: 'Crop added to cart' });
  });
});

// --------------------------- CART MANAGEMENT APIs ---------------------------

// API to add a crop to the cart
// Function to add product to cart
function addToCart(cropId, cropName, price, imageUrl) {
  const quantity = 1; // You can adjust this based on user input for quantity
  const userId = 1;  // You should replace this with the logged-in user's ID

  const data = { userId, cropId, quantity };

  // Send data to the backend
  fetch('http://localhost:5000/api/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message === 'Crop added to cart') {
        console.log('Item added to cart successfully');
        updateCartUI();  // Update the cart UI after adding to the cart
      } else {
        console.error('Failed to add item to cart');
      }
    })
    .catch((err) => {
      console.error('Error adding item to cart:', err);
    });
}

// Function to update the cart UI
function updateCartUI() {
  const userId = 1; // Replace with actual logged-in user ID

  fetch(`http://localhost:5000/api/cart/${userId}`)
    .then((res) => res.json())
    .then((cartItems) => {
      const cartItemsList = document.getElementById('cart-items');
      const cartTotal = document.getElementById('cart-total');

      cartItemsList.innerHTML = cartItems
        .map(
          (item) => `
          <li>
            <img src="http://localhost:5000/${item.image_url}" alt="${item.crop_name}" style="width: 50px;">
            ${item.crop_name} - ₹${item.price} x ${item.quantity}
          </li>
        `
        )
        .join('');

      const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      cartTotal.textContent = `Total: ₹${total}`;
    })
    .catch((err) => {
      console.error('Error updating cart UI:', err);
    });
}



// --------------------------- SERVER SETUP ---------------------------
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
