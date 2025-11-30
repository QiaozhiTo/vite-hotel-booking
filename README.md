# vite-hotel-booking

# 🏨 QuickStay — Full-Stack Hotel Booking Platform

QuickStay is a modern full-stack hotel booking application that allows users to browse hotels, view room details, check real-time availability, make secure Stripe payments, and receive booking confirmation emails.  
Built with a clean React + Tailwind UI, secure Clerk authentication, a Node.js + Express backend, and MongoDB for persistence, QuickStay demonstrates production-grade engineering patterns suitable for SDE portfolio projects.

Live Demo: https://quickstay2.vercel.app/  
(Frontend on Vercel, Backend on — your deployment platform)

---

## ✨ Features

### 👤 User Features
- **User signup/login with Clerk**
- **Browse hotels and view detailed room information**
- **Real-time date-range availability check**
- **Stripe checkout for secure payments**
- **View personal booking history**
- **Receive booking confirmation emails (Nodemailer)**

### 🔐 Admin Features
- **Admin authentication**
- **Add, edit, delete hotels**
- **Manage rooms**
- **View all bookings**

### 🧩 System Features
- **Fully responsive UI** using Tailwind CSS
- **Secure authentication** via Clerk
- **REST API** built with Node.js + Express
- **MongoDB / Mongoose** for robust data modeling
- **Server-side validation & middleware**
- **Error handling middleware**
- **Nodemailer integration** for automated email notifications
- **Stripe payment integration**

---

## 🛠 Tech Stack

### Frontend
- React
- Tailwind CSS
- Context API (state management)
- Clerk Auth
- Axios

### Backend
- Node.js
- Express.js
- Mongoose
- Nodemailer
- Stripe SDK

### Database
- MongoDB (Atlas)

### Deployment
- Frontend → **Vercel**
- Backend → (Render / Railway / AWS / etc.)
- Database → MongoDB Atlas

---

## 📁 Project Structure

quickstay/
│── client/ # React frontend
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── context/
│ │ ├── utils/
│ │ └── App.js
│ └── tailwind.config.js
│
│── server/ # Express backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── server.js
│
└── README.md


| Method | Endpoint                           | Description             |
| ------ | ---------------------------------- | ----------------------- |
| POST   | `/api/bookings/check-availability` | Check room availability |
| POST   | `/api/bookings/create`             | Create new booking      |
| GET    | `/api/bookings/user/:id`           | Get user bookings       |


