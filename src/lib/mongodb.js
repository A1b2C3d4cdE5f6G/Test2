// lib/mongodb.js
import mongoose from "mongoose";

let isConnected = false; // لمتابعة حالة الاتصال

export const connectDB = async () => {
  if (isConnected) {
    console.log("🔄 Using existing MongoDB connection");
    return;
  }

  try { 
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "test1", // اسم قاعدة البيانات
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw new Error("Database connection failed");
  }
};