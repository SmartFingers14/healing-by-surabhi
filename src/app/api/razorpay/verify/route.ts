import { NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json(
        { verified: false, error: "Payment gateway is not configured." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = body as {
      razorpay_order_id?: string;
      razorpay_payment_id?: string;
      razorpay_signature?: string;
    };

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { verified: false, error: "Missing payment details." },
        { status: 400 }
      );
    }

    // Recreate the signature on the server and compare with what Razorpay sent.
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const isValid = crypto.timingSafeEqual(
      Buffer.from(expectedSignature),
      Buffer.from(razorpay_signature)
    );

    if (!isValid) {
      return NextResponse.json(
        { verified: false, error: "Payment verification failed." },
        { status: 400 }
      );
    }

    return NextResponse.json({ verified: true, paymentId: razorpay_payment_id });
  } catch (err) {
    console.error("Razorpay verification failed:", err);
    return NextResponse.json(
      { verified: false, error: "Verification error. Please contact support." },
      { status: 500 }
    );
  }
}
