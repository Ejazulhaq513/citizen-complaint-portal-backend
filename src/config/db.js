const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000
        });

        console.log("MongoDB connected successfully");
    } catch (error) {
        console.warn("MongoDB connection notice:", error.message);
        console.warn("If you are using MongoDB Atlas, please ensure your IP address is whitelisted in Atlas Network Access (0.0.0.0/0).");
    }
};

module.exports = connectDB;
