# contact-management

# Contact Management App

## Overview

The Contact Management App is a full-stack application built with **Node.js**, **Express.js**, **MongoDB**, and **React.js**. The application allows users to register, log in, and manage their contacts with basic CRUD (Create, Read, Update, Delete) functionalities. Each contact contains information like name, phone, job title, company, and email, all associated with the authenticated user.

This project is designed to handle user authentication using JWT tokens and provides a secure interface to manage contact data, making it a practical application for managing personal or business contacts.

---

## Features

- **Authentication**: Users can register, log in, and authenticate with a JWT token.
- **CRUD Operations**: Users can add, update, view, and delete contacts.
- **Responsive UI**: Built using **React.js** with Material-UI, ensuring the app works on both desktop and mobile devices.
- **Secure API**: JWT authentication and authorization on all backend routes.
- **MongoDB Integration**: MongoDB stores the contacts data and user information.

---

## Technical Decisions

### Backend

- **Node.js** & **Express.js**: Used for building the REST API, handling HTTP requests and responses.
- **MongoDB**: Used as the database to store users and contacts data due to its flexibility and scalability.
- **JWT Authentication**: JSON Web Tokens (JWT) are used for secure user authentication. The token is passed in the Authorization header to access protected routes.
- **Mongoose**: Used to interact with MongoDB, including defining schemas for contacts and users.
- **Validation**: Input validation is implemented on the backend using custom validation logic (e.g., validating email format and required fields).

### Frontend

- **React.js**: The UI is built using React to provide a dynamic, single-page application experience.
- **Material-UI**: Provides pre-built UI components to speed up development and ensure a consistent design.
- **React Router**: Handles routing between pages such as the login page, registration page, and contacts page.
- **Axios**: Used for making HTTP requests to interact with the backend API.

---

## Setup Instructions

### Prerequisites

Before you begin, make sure you have the following installed on your system:

- **Node.js** (v16 or higher)
- **MongoDB** (either locally or using MongoDB Atlas)
- **npm** (Node Package Manager)

### Backend Setup

1. Clone the repository:
  
   git clone https://github.com/praveenkaikala/contact-management
  

2. Navigate to the backend folder:
  
   cd contact-management/Backend
  

3. Install dependencies:
  
   npm install
   

4. Create a `.env` file in the backend directory with the following variables:
  
   PORT=5000
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key
  

   - `MONGO_URI`: Your MongoDB connection string (can be from MongoDB Atlas or a local MongoDB instance).
   - `JWT_SECRET`: A secret key for JWT signing.

5. Run the backend server:
   
   npm start
  

   The backend server will now be running at `http://localhost:5000`.

### Frontend Setup

1. Navigate to the frontend folder:
   
   cd contact-management/Frontend


2. Install dependencies:
  
   npm install
   

3. Update the frontend to point to your backend URL:
   - In the `src/utils/AxiosPrivate.js` file, set the `baseURL` to match your backend server.

4. Run the frontend:
  
   npm run start
   

   The frontend will now be running at `http://localhost:3000`.

### Database Schema

The application uses MongoDB to store the following data:

#### User Schema (`userSchema.js`)

```js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
```

#### Contact Schema (`contactSchema.js`)

const mongoose = require("mongoose");


const messageModel = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, 
    },
    firstName: {
      type: String,
      trim: true,
      required: [true, "First name is required"], d
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "Last name is required"], 
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      unique: true, 
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"], 
    },
    phone: {
      type: String,
      trim: true,
      required: [true, "Phone number is required"], 
      match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
    },
    company: {
      type: String,
      trim: true,
      required: [true, "Company name is required"], 
    },
    jobTitle: {
      type: String,
      trim: true,
      required: [true, "Job title is required"], 
    },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model("Contact", messageModel);
```
---

## Challenges & Solutions

### 1. **Authentication and Authorization**
   **Challenge**: Implementing JWT-based authentication for secure access to the contacts data.
   **Solution**: Used **JWT** tokens for secure authentication. The backend generates a token when the user logs in, which is then sent with each subsequent request in the `Authorization` header. This ensures that only authenticated users can access the contacts.

### 2. **Handling Contact CRUD Operations**
   **Challenge**: Ensuring that contacts are correctly associated with the authenticated user.
   **Solution**: Each contact is linked to a user via the `userId` field. This relationship ensures that users can only access and manipulate their own contacts.

### 3. **Frontend-Backend Communication**
   **Challenge**: Making sure the frontend and backend communicate correctly, especially handling authorization for protected routes.
   **Solution**: Used **Axios** on the frontend to handle API calls. The token is included in the `Authorization` header for protected routes, ensuring only authenticated requests are processed.

### 4. **Input Validation and Error Handling**
   **Challenge**: Validating inputs for contacts to ensure data integrity.
   **Solution**: Implemented input validation for both the frontend (using forms) and the backend (with Mongoose schema constraints). Detailed error messages are returned to the client when validation fails.

### 5. **Deployment Considerations**
   **Challenge**: Ensuring the app works seamlessly both locally and in production.
   **Solution**: Configured the `.env` file to allow dynamic configuration of MongoDB URI and JWT secret key based on the environment. Used a reverse proxy setup for deployment.

---

## Conclusion

This project demonstrates the ability to build a full-stack application using modern web technologies like React.js and Node.js. The Contact Management App provides a complete CRUD interface for managing contacts and includes JWT authentication for secure access.

---

### Notes:

- Replace the placeholder URLs, repository name, and credentials with actual values.
- Ensure the environment variables (`MONGO_URI`, `JWT_SECRET`) are correctly set up for both development and production environments.
