const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");

// get the configuration setting from the environment variables
dotenv.config();
connectDB();

// Create app instance
const app = express();
// to parse incoming JSON data from HTTP requests
app.use(express.json());
// to allow the server to accept the requests from different origins
app.use(cors());

// define port if not in the env file
const PORT = process.env.PORT || 5000;

// Routes need to be create after this
// auth route
app.use("/api/auth", authRoutes);

// quiz route

// check whether the application is working fine or not
app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
