import { NextResponse } from "next/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { deleteUser,createOrUpdateUser } from "@/lib/actions/user";
import { clerkClient } from "@clerk/nextjs/dist/types/server";
export async function POST(req) {
  try {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;


    // // تحقق من وجود المتغير فقط، لا نطبع القيمة
    // if (!WEBHOOK_SECRET) {
    //   console.warn("⚠️ CLERK_WEBHOOK_SECRET غير موجود!");
    // } else {
    //   console.log("🔑 CLERK_WEBHOOK_SECRET موجود ✅");
    // }

    const evt = await verifyWebhook(req, WEBHOOK_SECRET);
      const { id } = evt?.data;
      const eventType = evt?.type;
       if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, first_name, last_name, image_url, email_addresses, username } =
      evt?.data;
    try {
      const user = await createOrUpdateUser(
        id,
        first_name,
        last_name,
        image_url,
        email_addresses,
        username
      );
      if (user && eventType === 'user.created') {
        try {
          await clerkClient.users.updateUserMetadata(id, {
            publicMetadata: {
              userMongoId: user._id,
              isAdmin: user.isAdmin,
            },
          });
        } catch (error) {
          console.log('Error updating user metadata:', error);
        }
      }
    } catch (error) {
      console.log('Error creating or updating user:', error);
      return new Response('Error occured', {
        status: 400,
      });
    }
       }

      if (eventType === 'user.deleted') {
            const { id } = evt?.data;
            try {
                  await deleteUser(id);
                } catch (error) {
                  console.log('Error deleting user:', error);
                   return new Response('Error occured', {
                   status: 400,
                  });
                }
     }

    // console.log("✅ Verified Webhook:", JSON.stringify(evt, null, 2));

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("❌ Webhook verification failed:", err);
    return NextResponse.json({ error: "Invalid webhook" }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "Webhook route working (GET)" });
}