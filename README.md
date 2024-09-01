
# Quiz Builder App

The Quiz Builder App is a full-featured platform that allows users to create, manage, and take quizzes. It includes both a frontend and backend, offering user authentication, quiz analytics, and much more.

## Features

### Frontend

- **User Authentication**: Secure sign-up and login functionality.
- **Quiz Creation**: Users can create quizzes, choose between different types (Poll or Q&A), and add questions.
- **Dashboard**: Manage created quizzes from a personalized dashboard.
- **Quiz Sharing**: Share quizzes easily with others.
- **Anonymous Participation**: Users can take quizzes without needing to sign up.
- **Score Display**: For Q&A quizzes, scores are displayed at the end.
- **Timer**: Set timers for specific quiz questions.
- **Analytics**: Get insights into quiz performance and impressions.
- **Trending Quizzes**: Quizzes with more than 10 impressions are marked as trending.

### Backend

- **User Authentication**: Secure user login and registration using JWT (JSON Web Tokens).
- **Quiz Management**: API endpoints for creating, editing, deleting, and retrieving quizzes.
- **Question Types**: Support for multiple-choice and Q&A question types.
- **Analytics**: Track impressions and interactions with quizzes.
- **Security**: Password encryption and robust error handling.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Custom CSS (No libraries used)
- **Validation**: Express-Validator for request validation

## Live Demo

- **Frontend**: [Quiz Builder App](https://cuvette-quiz-builder-app.netlify.app/auth/login)
- **Backend API**: [Quiz Builder API](https://quiz-app-kadw.onrender.com)

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

#### 1. Clone the repository:

```bash
git clone https://github.com/ImKetan1610/Quiz-App.git
```

#### 2. Install the frontend dependencies:

```bash
cd quiz-builder-app/client
npm install
```

#### 3. Install the backend dependencies:

```bash
cd ../server
npm install
```

#### 4. Set up environment variables for the backend:

Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
```

#### 5. Start the backend server:

```bash
npm start
```

#### 6. Start the frontend development server:

```bash
cd ../frontend
npm start
```

The frontend will be running on `http://localhost:3000`, and the backend API will be running on `http://localhost:5000`.

## Project Structure

- **/frontend**: Contains all the source code for the frontend application.
- **/backend**: Contains all the source code for the backend API.
- **/frontend/src/components**: Reusable React components.
- **/frontend/src/pages**: Page components for different routes.
- **/frontend/src/styles**: Custom CSS for styling.
- **/backend/routes**: API routes for authentication and quizzes.
- **/backend/controllers**: Functions to handle the logic for each route.
- **/backend/models**: MongoDB models for users and quizzes.
- **/backend/middleware**: Custom middleware for authentication and error handling.
- **/backend/config**: Configuration files, including MongoDB connection.
