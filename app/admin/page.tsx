import type { Metadata } from "next";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminLogin from "@/components/admin/AdminLogin";
import { isAdmin } from "@/lib/analytics/auth";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  return (await isAdmin()) ? <AdminDashboard /> : <AdminLogin />;
}
