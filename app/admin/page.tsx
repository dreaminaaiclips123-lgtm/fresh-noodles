import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { cookies } from "next/headers";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminFrame from "@/components/admin/AdminFrame";
import AdminLogin from "@/components/admin/AdminLogin";
import { ADMIN_LANG_COOKIE, parseAdminLang } from "@/lib/admin-i18n";
import { isAdmin } from "@/lib/analytics/auth";

const cairo = Cairo({
  variable: "--font-arabic",
  subsets: ["arabic", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const lang = parseAdminLang((await cookies()).get(ADMIN_LANG_COOKIE)?.value);
  return (
    <AdminFrame initialLang={lang} fontClass={cairo.variable}>
      {(await isAdmin()) ? <AdminDashboard /> : <AdminLogin />}
    </AdminFrame>
  );
}
