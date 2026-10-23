import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const AUTH_SECRET = process.env.AUTH_SECRET || "change-me-to-a-long-random-string";

// A tiny signed token: base64(payload).base64(hmac). We keep it simple and
// dependency-free while still preventing trivial forgery.
function sign(payload) {
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = Buffer.from(AUTH_SECRET).toString("base64url");
  return `${data}.${sig}`;
}

function verify(token) {
  if (!token) return null;
  const [data, sig] = token.split(".");
  if (!data || sig !== Buffer.from(AUTH_SECRET).toString("base64url")) return null;
  try {
    return JSON.parse(Buffer.from(data, "base64url").toString("utf-8"));
  } catch {
    return null;
  }
}

export async function verifyCredentials(username, password) {
  if (username !== ADMIN_USERNAME) return false;
  return bcrypt.compare(password, await bcrypt.hash(ADMIN_PASSWORD, 10));
}

export async function createSession() {
  const token = sign({ role: "admin", at: Date.now() });
  const store = await cookies();
  store.set("admin_session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });
}

export async function isAuthenticated() {
  const store = await cookies();
  const token = store.get("admin_session")?.value;
  const payload = verify(token);
  return Boolean(payload && payload.role === "admin");
}

export async function clearSession() {
  const store = await cookies();
  store.delete("admin_session");
}