import { NextResponse } from "next/server"

export async function GET() {
  try {
    return NextResponse.json({
      public_key:
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
    })
  } catch (e) {
    console.error(e)
  }
}
