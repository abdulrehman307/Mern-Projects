# 🔐 Advanced MERN Authentication System

A highly secure, enterprise-level backend authentication system built with Node.js, Express, and MongoDB. This project implements modern security practices including Access/Refresh token architecture, Token Rotation, Session Management, and OTP-based Email Verification.

This architecture is designed to prevent common web vulnerabilities like XSS and CSRF attacks while providing a seamless user experience.

## 🚀 Key Features

*   **Dual Token Architecture:** Uses short-lived Access Tokens (memory) and long-lived Refresh Tokens (httpOnly cookies).
*   **Token Rotation:** Generates a new Refresh Token upon every successful access token renewal, invalidating the old one to prevent token theft.
*   **Session Management:** Tracks active user sessions in the database.
*   **Logout from All Devices:** Allows users to revoke all active sessions simultaneously for enhanced security.
*   **OTP Email Verification:** Prevents bot registrations by sending secure OTPs via Gmail (using Nodemailer & Google OAuth2) before granting account access.
*   **Password Hashing:** Secures user credentials using advanced hashing algorithms.

## 🛠️ Tech Stack

*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Database:** MongoDB Atlas & Mongoose
*   **Authentication:** JSON Web Tokens (JWT)
*   **Email Service:** Nodemailer (Google OAuth2)
*   **Security/Crypto:** Built-in Node `crypto` module, `cookie-parser`, `cors`

## ⚙️ Environment Variables Setup

Create a `.env` file in the root directory and add the following variables:

```env
# Database
MONGO_URI=mongodb://username:password@cluster-node.../main-auth?ssl=true&replicaSet=...&authSource=admin

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here

# Google OAuth2 Credentials (Nodemailer)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REFRESH_TOKEN=your_google_refresh_token
GOOGLE_USER=your_email@gmail.com
