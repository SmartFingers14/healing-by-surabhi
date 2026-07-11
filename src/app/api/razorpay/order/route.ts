import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { allServices } from "@/lib/data";

// Ensure this route always runs on the Node.js runtime (Razorpay SDK needs it)
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: "Payment gateway is not configured. Please try again later." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { slug } = body as { slug?: string };

    if (!slug) {
      return NextResponse.json({ error: "Missing service." }, { status: 400 });
    }

    // Look up the service on the SERVER so the price can't be tampered with by the client.
    const service = allServices.find((s) => s.slug === slug);
    if (!service) {
      return NextResponse.json({ error: "Invalid service." }, { status: 400 });
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    // Razorpay expects the amount in the smallest currency unit (paise for INR).
    const amount = Math.round(service.price * 100);

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `rcpt_${slug}_${Date.now()}`,
      notes: {
        service: service.name,
        slug: service.slug,
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
      serviceName: service.name,
    });
  } catch (err) {
    console.error("Razorpay order creation failed:", err);
    return NextResponse.json(
      { error: "Could not initiate payment. Please try again." },
      { status: 500 }
    );
  }
}
