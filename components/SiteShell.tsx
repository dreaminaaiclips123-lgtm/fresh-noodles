"use client";

import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import SiteTracker from "./SiteTracker";

/** The admin page is its own screen, without the customer nav and cart. */
export default function SiteShell({
  top,
  bottom,
  children,
}: {
  top: React.ReactNode;
  bottom: React.ReactNode;
  children: React.ReactNode;
}) {
  const isAdmin = usePathname().startsWith("/admin");
  return (
    <>
      <SiteTracker />
      {!isAdmin && top}
      <main>{children}</main>
      {!isAdmin && bottom}
      {!isAdmin && <Analytics />}
    </>
  );
}
