"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { post, sessionId } from "@/lib/analytics/client";

const BEAT_MS = 20_000;

export default function SiteTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin") || navigator.webdriver) return;
    const sid = sessionId();
    post("/api/track", { sid, type: "view", path: pathname });
    const beat = setInterval(() => {
      if (document.visibilityState === "visible") {
        post("/api/track", { sid, type: "beat" });
      }
    }, BEAT_MS);
    return () => clearInterval(beat);
  }, [pathname]);

  return null;
}
