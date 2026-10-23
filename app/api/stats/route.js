import { NextResponse } from "next/server";
import { getStats } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const stats = await getStats();
  return NextResponse.json({ stats });
}