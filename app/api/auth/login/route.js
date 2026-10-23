import { NextResponse } from "next/server";
import { verifyCredentials, createSession } from "@/lib/auth";

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    const ok = await verifyCredentials(username || "", password || "");
    if (!ok) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }
    await createSession();
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}