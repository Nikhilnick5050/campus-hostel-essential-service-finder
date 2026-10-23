import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

export default async function AdminLayout({ children }) {
  if (!(await isAuthenticated())) {
    redirect("/admin");
  }
  return children;
}