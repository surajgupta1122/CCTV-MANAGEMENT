# 🎥 CCTV Management System
A full-stack CCTV Management System built using the MERN Stack (MongoDB, Express.js, React, Node.js). The application allows users to browse CCTV products, manage carts, place orders, and provides administrators with complete product management capabilities.
## 🚀 Live Demo
🔗 (https://cctv-management-jet.vercel.app/login)
---
## 📸 Screenshots
> Add screenshots of:
- Home Page
- Product Listing
- Product Details
- Cart
- Login/Register
- Admin Dashboard
- Order Page
---
## ✨ Features
### User
- User Registration & Login
- JWT Authentication
- Secure Password Hashing (bcrypt)
- Browse CCTV Products
- Product Search
- Add to Cart
- Update Cart Quantity
- Cart persists per-user via localStorage
- Place Orders
- View Order History
- Responsive UI
### Admin
- Add Products
- Edit Products
- Delete Products
- Manage Inventory
- View Orders
---
## 🛠 Tech Stack
### Frontend
- React.js
- React Router
- Axios
- CSS
### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
---
## 📁 Project Structure
CCTV-MANAGEMENT
│
├── cctv_v1.1/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── controller/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── config/
│   └── server.js
│
└── README.md
---
## 🔐 Authentication
- JWT Authentication
- Protected Routes
- Role-Based Authorization
- Password Hashing using bcrypt
---
## 📦 Installation
### Clone Repository
```bash
git clone https://github.com/surajgupta1122/CCTV-MANAGEMENT.git
```
### Frontend
```bash
cd cctv_v1.1
npm install
npm run dev
```
### Backend
```bash
cd server
npm install
npm start
```
---
## ⚙ Environment Variables
Create a `.env` file inside the `server` folder.
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
---
## 📚 API Features
- User Authentication
- Product CRUD
- Cart Management
- Order Management
- Inventory Management
---
## 🔒 Security Features
- JWT Authentication
- Password Encryption
- Protected APIs
- Ownership Validation
- Environment Variables
---
## 🚧 Future Improvements
- Payment Gateway Integration
- Product Reviews & Ratings
- Admin Analytics Dashboard
- Email Notifications
- Image Upload 
- Order Tracking
- Login Rate Limiting
- Input Validation (express-validator)
---
## 🎯 What I Learned
- Building scalable REST APIs
- JWT Authentication
- Role-Based Authorization
- React State Management
- MongoDB Data Modeling
- API Integration using Axios
- CRUD Operations
- Full-Stack Application Development
---
## 👨‍💻 Author
**Suraj Gupta**

GitHub: [github.com/surajgupta1122](https://github.com/surajgupta1122)

LinkedIn: [linkedin.com/in/suraj-gupta-11j45](https://linkedin.com/in/suraj-gupta-11j45)

Email: sg8121094@gmail.com

---
## ⭐ If you like this project
Please consider giving it a ⭐ on GitHub.
