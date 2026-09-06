const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const authRoutes = require("./routers/authRoutes.js");
const complaintRoutes = require("./routers/complaintRoutes.js"); // 1. Router import karein

// 2. PEHLE app ko initialize karein
const app = express();

// Database connect karein
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.send("Hackathon Backend is Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes); // 3. Express initialize hone ke BAAD use karein

module.exports = app;