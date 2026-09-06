const mongoose = require("mongoose");

const connectDB = async () => {
    // Return existing connection in serverless warm containers
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    const uri = process.env.MONGO_URI || "mongodb+srv://ejazkhalidkiazai_db_user:r8dtV3qq3FPlZFu5@cluster0.f8lc16g.mongodb.net/?appName=Cluster0";

    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000
        });

        console.log("MongoDB connected successfully");
    } catch (error) {
        console.warn("MongoDB connection notice:", error.message);
        console.warn("If you are using MongoDB Atlas, please ensure your IP address is whitelisted in Atlas Network Access (0.0.0.0/0).");
        throw error;
    }
};

module.exports = connectDB;
