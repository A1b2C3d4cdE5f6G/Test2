import { NextRequest, NextResponse } from "next/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";

export async function POST(req) {
  try {
    const body = await req.text();

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

// حماية من GET/HEAD
export function GET(req) {
  return new NextResponse("Method Not Allowed", { status: 405 });
}
export function HEAD(req) {
  return new NextResponse("Method Not Allowed", { status: 405 });
}