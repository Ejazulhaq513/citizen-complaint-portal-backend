const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const authRoutes = require("./routers/authRoutes.js");
const complaintRoutes = require("./routers/complaintRoutes.js"); // 1. Router import karein

// 2. PEHLE app ko initialize karein
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ensure MongoDB is connected before handling API requests
app.use(async (req, res, next) => {
    if (req.path === "/") {
        return next();
    }
    try {
        await connectDB();
        next();
    } catch (err) {
        res.status(500).json({ error: "Database connection failed: " + err.message });
    }
});

// Routes
app.get("/", (req, res) => {
    res.send("Hackathon Backend is Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes); // 3. Express initialize hone ke BAAD use karein

module.exports = app;