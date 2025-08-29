import { NextRequest, NextResponse } from "next/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";

export async function POST(req) {
  try {
    // اطبع الهيدرز
    console.log("Headers:", Object.fromEntries(req.headers));

    // اطبع البودي الخام
    const body = await req.text();
    console.log("Body:", body);

    // جرب التحقق (بعد ما تتأكد أن الهيدرز وصلت)
    const evt = await verifyWebhook({
      body,
      secret: process.env.WEBHOOK_SECRET,
      headers: {
        "svix-id": req.headers.get("svix-id"),
        "svix-signature": req.headers.get("svix-signature"),
        "svix-timestamp": req.headers.get("svix-timestamp"),
      },
    });

    console.log("✅ Webhook verified:", evt);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Error verifying webhook:", err);
    return new NextResponse("Webhook Error", { status: 400 });
  }
}