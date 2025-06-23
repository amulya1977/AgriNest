# 🌾 AgriNest – Empowering Farmers, Enriching Consumers

AgriNest is a full-stack agri-commerce web platform designed to bridge the gap between **farmers** and **consumers** by enabling direct product transactions, eliminating middlemen, and building trust through transparent interactions.

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Other:** bcrypt (password hashing), CORS, Body-parser

---

## 📦 Features

- 👨‍🌾 **Farmer & Consumer Login/Signup**
  - Role-based authentication using `bcrypt` for secure password storage.

- 📬 **Contact Form**
  - Enables users to send messages directly to the admin for queries and feedback.

- 🔒 **Secure Authentication**
  - Passwords are hashed using industry-standard bcrypt before storage.

- 🔄 **Role Management**
  - Differentiates between **farmers** and **consumers** at login to provide tailored features.

- 💬 **Real-Time Message Handling**
  - Stores contact form messages into `contact_messages` table for backend review.

---
## 🚀 API Endpoints Summary

### 🧑‍🌾 Authentication
- `POST /api/signup` - Register a new user (farmer/consumer).
- `POST /api/login` - Authenticate user and return role & ID.

### 📬 Contact
- `POST /api/contact` - Submit contact form (name, email, message).

### 🌾 Crop Management (Farmer)
- `POST /api/crops` - Add a new crop to the marketplace.
- `GET /api/crops` - Fetch all available crops.
- `GET /api/crops/:id` - Get details of a single crop.
- `PUT /api/crops/:id` - Update a crop’s information.
- `DELETE /api/crops/:id` - Delete a crop listing.

### 🛒 Cart (Consumer)
- `POST /api/cart` - Add a crop to the user’s cart.
- `GET /api/cart/:userId` - Retrieve all items in a user’s cart.
- `DELETE /api/cart/:itemId` - Remove an item from the cart.



## ✨ Future Enhancements
🌿 Farmer Product Upload & Inventory Management
Farmers will be able to upload crop listings with quantity, price, and images directly to the platform.

🛒 Consumer Cart and Order Placement
Consumers can browse, add items to a cart, and place orders for fresh produce from local farmers.

🛠 Admin Dashboard
Admin interface for managing user accounts, crop listings, feedback, and message submissions.

📍 Geo-Location Based Search
Consumers can find nearby farmers based on location to encourage local sourcing and reduce delivery time.
## 🧩 Database Schema

### Table: `user_credentials`
| Column     | Type         | Description                 |
|------------|--------------|-----------------------------|
| id         | INT (PK)     | Auto-increment user ID      |
| name       | VARCHAR      | Full name of user           |
| email      | VARCHAR (U)  | Unique email ID             |
| password   | VARCHAR      | Hashed password             |
| role       | VARCHAR      | 'farmer' or 'consumer'      |

### Table: `contact_messages`
| Column     | Type         | Description              |
|------------|--------------|--------------------------|
| id         | INT (PK)     | Auto-increment ID        |
| name       | VARCHAR      | Name of sender           |
| email      | VARCHAR      | Email of sender          |
| message    | TEXT         | Message content          |
### Table:`crops`
### Table:`cart`


---

## 🚀 Getting Started Locally

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/AgriNest.git
cd AgriNest
