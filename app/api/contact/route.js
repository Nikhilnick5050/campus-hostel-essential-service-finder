import { NextResponse } from "next/server";

// Demonstration mode: the form is validated on the client and this endpoint
// simply acknowledges receipt. No email is actually sent.
export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    return NextResponse.json({ ok: true, demo: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}