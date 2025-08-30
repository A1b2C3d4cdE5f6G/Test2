// app/api/test/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

export async function GET() {
  try {
    await connectDB();

    const users = await mongoose.connection.db.collection("users").countDocuments();

    console.log("🔌 Connected to MongoDB, users count:", users);

    return NextResponse.json({
      success: true,
      message: "✅ Connected to MongoDB",
      database: mongoose.connection.name,
      usersCount: users,
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    return NextResponse.json(
      { success: false, message: "Database connection failed", error: error.message },
      { status: 500 }
    );
  }
}