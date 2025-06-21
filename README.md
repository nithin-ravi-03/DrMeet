# DrMeet - Doctor Appointment Booking System

![DrMeet Banner]([DrMeet-white-bg](https://github.com/user-attachments/assets/02e31be5-467a-4427-909f-c8ad292e7028)
)

A full-stack MERN application for booking doctor appointments with three user roles (patient, doctor, admin), online payments, and appointment management.

[![Live Preview]([https://img.shields.io/badge/Live_Preview-Available-brightgreen)](https://drmeet-demo.netlify.app](https://drmeet-frontend.onrender.com/))

## Features

### Patient Features
- Browse doctors by specialty
- View doctor profiles with details
- Book appointments with date/time selection
- Manage personal profile information
- View/Cancel appointments
- Online payment integration (Razorpay)
- Appointment history tracking

### Doctor Features
- Dashboard with earnings analytics
- Appointment management (complete/cancel)
- Profile management (fees, availability)
- Patient count tracking
- View upcoming appointments

### Admin Features
- Doctor profile management
- Add new doctors to the system
- View all appointments
- Cancel appointments
- Dashboard analytics (total doctors, patients, appointments)

## Tech Stack

### Frontend
- React.js with Vite
- Tailwind CSS for styling
- React Router DOM for navigation
- Context API for state management
- Axios for API calls
- React Toastify for notifications

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- Bcrypt for password hashing
- Multer for file uploads
- Cloudinary for image storage
- Razorpay for payment processing

### Deployment
- Frontend: Netlify
- Backend: Render
- Database: MongoDB Atlas

## Screenshots

### Homepage
![Homepage](./screenshots/homepage.png)

### Doctor Listing
![Doctor Listing](./screenshots/doctor-listing.png)

### Appointment Booking
![Appointment Booking](./screenshots/booking.png)

### Admin Dashboard
![Admin Dashboard](./screenshots/admin-dashboard.png)

### Doctor Dashboard
![Doctor Dashboard](./screenshots/doctor-dashboard.png)

## How to Add Screenshots

1. Create a `screenshots` folder in your project root
2. Save your images as PNG/JPG files in this folder
3. Name them descriptively (as shown above)
4. Use the relative paths shown in the markdown (e.g., `./screenshots/filename.png`)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/drmeet.git
