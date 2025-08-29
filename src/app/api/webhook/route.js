import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  console.log("📩 Webhook body:", body);
  return NextResponse.json({ received: true });
}

export async function GET() {
  return NextResponse.json({ message: "Webhook route working (GET)" });
}