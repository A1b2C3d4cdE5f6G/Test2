import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req) {
  try {
    const evt = await verifyWebhook({
      req,
      secret: process.env.WEBHOOK_SECRET, // استخدم السيكرت من env
    });

    // Print webhook info
    const { id } = evt.data;
    const eventType = evt.type;

    console.log(`✅ Received webhook with ID: ${id}`);
    console.log(`📌 Event type: ${eventType}`);
    console.log("🔍 Full payload:", JSON.stringify(evt.data, null, 2));

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("❌ Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}