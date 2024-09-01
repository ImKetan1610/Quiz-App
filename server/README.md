# Quiz Builder App - Backend

This repository contains the backend code for the Quiz Builder App, a full-featured quiz creation and management platform. The backend handles user authentication, quiz management, and data storage.

## Features

- **User Authentication**: Secure user login and registration using JWT (JSON Web Tokens).
- **Quiz Management**: Endpoints for creating, editing, deleting, and retrieving quizzes.
- **Question Types**: Support for different question types, including multiple-choice and Q&A.
- **Analytics**: Track impressions and interactions with quizzes.
- **Security**: Password encryption and robust error handling.

## Tech Stack

- **Backend Framework**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express-Validator for request validation

## Live API

The backend API is deployed and accessible [here](https://quiz-app-kadw.onrender.com).

## API Endpoints

### Authentication

- **POST /api/auth/register**: Register a new user
- **POST /api/auth/login**: Login with existing credentials

### Quiz Management

- **POST /api/quizzes**: Create a new quiz
- **GET /api/quizzes**: Retrieve all quizzes
- **GET /api/quizzes/:id**: Retrieve a specific quiz by ID
- **PUT /api/quizzes/:id**: Update a quiz by ID
- **DELETE /api/quizzes/:id**: Delete a quiz by ID

### Analytics

- **GET /api/quizzes/:id/impressions**: Get impressions for a specific quiz
- **GET /api/quizzes/trending**: Retrieve trending quizzes

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB set up locally or use MongoDB Atlas for cloud storage.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ImKetan1610/Quiz-App.git
   ```

2. Navigate to the project directory:

   ```bash
   cd server
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:

   Create a `.env` file in the root directory with the following variables:

   ```env
   PORT=5000
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret
   ```

5. Start the server:

   ```bash
   npm start
   ```

6. The backend API will be running on `http://localhost:5000`.

## Project Structure

- **/routes**: API routes for authentication and quizzes.
- **/controllers**: Functions to handle the logic for each route.
- **/models**: MongoDB models for users and quizzes.
- **/middleware**: Custom middleware for authentication and error handling.
- **/config**: Configuration files, including MongoDB connection.


