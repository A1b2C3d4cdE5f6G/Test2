import { NextResponse } from "next/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";

export async function POST(req) {
  try {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;


    // تحقق من وجود المتغير فقط، لا نطبع القيمة
    if (!WEBHOOK_SECRET) {
      console.warn("⚠️ CLERK_WEBHOOK_SECRET غير موجود!");
    } else {
      console.log("🔑 CLERK_WEBHOOK_SECRET موجود ✅");
    }

    const evt = await verifyWebhook(req, WEBHOOK_SECRET);

    console.log("✅ Verified Webhook:", JSON.stringify(evt, null, 2));

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("❌ Webhook verification failed:", err);
    return NextResponse.json({ error: "Invalid webhook" }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "Webhook route working (GET)" });
}