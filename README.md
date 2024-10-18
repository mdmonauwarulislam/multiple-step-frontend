
---

# Multi-Step Form with Authentication and Dashboard

This project is a full-stack application built with **React**, **React Router**, **JWT Authentication**, and **State Management** using **React Context** or **Redux**. It includes a multi-step form, user authentication, and a user dashboard with profile editing capabilities.

## Features

### 1. Multi-Step Form
A user registration form with 3 steps:
- **Step 1**: Collects user information (name, email, password).
- **Step 2**: Collects address and phone number details.
- **Step 3**: Displays a review of the entered data for confirmation before submission.

**Navigation**: Uses **React Router** for seamless transitions between steps.

### 2. Authentication
- **JWT Authentication**: Secures protected routes using **JSON Web Tokens**.
- Stores the token in `localStorage` or `sessionStorage` after a successful login.
- Users are redirected to the login page if they try to access the dashboard without being authenticated.

### 3. State Management
- **React Context** or **Redux** is used to:
  - Handle form state across multiple steps.
  - Manage user authentication state globally across the application.

### 4. User Dashboard
- Displays user information after successful login.
- Includes an "Edit Profile" button to update user details.

### Bonus Features
- **Profile Picture Upload**: Allows users to upload a profile picture using **Multer** or **Cloudinary**.
- **Loading Spinners or Skeleton Screens**: Enhances user experience with loaders while fetching or submitting data.

---

## Tech Stack

- **Frontend**: React, React Router, Context API or Redux, Axios
- **Backend**: Node.js, Express, MongoDB, Multer (or Cloudinary for image upload)
- **Authentication**: JWT (JSON Web Tokens)
- **State Management**: React Context API or Redux

---

## Project Structure

```
├── backend/
│   ├── config/
│   │   └── db.js                # MongoDB connection
│   ├── controllers/
│   │   └── authController.js     # Handles login and registration
│   │   └── userController.js     # Handles profile management
│   ├── middlewares/
│   │   └── authMiddleware.js     # JWT Authentication middleware
│   ├── models/
│   │   └── userModel.js          # Mongoose schema for user
│   ├── routes/
│   │   └── authRoutes.js         # Authentication routes
│   │   └── userRoutes.js         # User-related routes (edit profile)
│   └── server.js                 # Entry point of the backend server
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── MultiStepForm/    # Components for each form step
│   │   │   ├── Dashboard.js      # User Dashboard component
│   │   │   ├── EditProfile.js    # Profile editing component
│   │   ├── context/              # Context API or Redux setup
│   │   ├── routes/               # React Router setup
│   │   ├── services/             # API service for making HTTP requests
│   │   └── App.js                # Main React component
├── .env                          # Environment variables
└── README.md                     # Project documentation
```

---

## Installation

### Prerequisites

- **Node.js** (version >= 14)
- **MongoDB** (local or cloud instance)
- **Cloudinary** or **Multer** for image upload (optional)

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/multi-step-dashboard.git
   cd multi-step-dashboard
   ```

2. **Install dependencies** for both frontend and backend:
   ```bash
   npm install            # in the backend folder
   cd frontend
   npm install            # in the frontend folder
   ```

3. **Set up environment variables** in `.env` (for the backend):
   ```plaintext
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_URL=your_cloudinary_url  # Optional for image upload
   ```

4. **Run the backend server**:
   ```bash
   npm start              # in the backend folder
   ```

5. **Run the frontend**:
   ```bash
   cd frontend
   npm start              # in the frontend folder
   ```

---

## API Endpoints

### User Authentication

- **POST** `/api/register`  
  Registers a new user.

- **POST** `/api/login`  
  Authenticates a user and returns a JWT token.

- **GET** `/api/user/:id`  
  Fetches the authenticated user’s details (protected route).

- **PUT** `/api/user/:id`  
  Updates user details (protected route).

---

## Multi-Step Form Flow

### Step 1: User Information
- **Fields**: Name, Email, Password
- **Validation**: Ensure all fields are filled and the email is valid.

### Step 2: Address and Phone Number
- **Fields**: Address, Phone Number
- **Validation**: Ensure valid phone number format and address completion.

### Step 3: Review and Submit
- Display a summary of all data entered in previous steps.
- Confirm before submission.

---

## Dashboard

After successful login, the dashboard fetches and displays the user’s profile data. The "Edit Profile" button allows the user to update their profile, including uploading a profile picture.

### Profile Picture Upload
- Uses **Multer** (for local storage) or **Cloudinary** (for cloud storage) to handle image uploads.

---

## State Management

- **Form State**: Managed using either **React Context** or **Redux** across multiple steps to persist the entered data.
- **Authentication State**: The JWT token is stored in `localStorage` or `sessionStorage` and used to maintain the authenticated state across routes.

---

## Bonus Features

- **Image Upload**: Profile picture upload functionality via Multer or Cloudinary.
- **Loading Spinners**: Added while fetching data for better UX.

---

## License

This project is licensed under the MIT License.

---


