"use client";

import { createContext, useContext, useState } from "react";
import {
  ADMIN_LANG_COOKIE,
  ADMIN_STRINGS,
  type AdminLang,
  type AdminStrings,
} from "@/lib/admin-i18n";

const AdminStringsContext = createContext<{
  t: AdminStrings;
  toggle: () => void;
} | null>(null);

export function useAdminStrings() {
  const ctx = useContext(AdminStringsContext);
  if (!ctx) throw new Error("useAdminStrings must be used within AdminFrame");
  return ctx;
}

/** Sets language and direction for the admin page only; the customer site stays English. */
export default function AdminFrame({
  initialLang,
  fontClass,
  children,
}: {
  initialLang: AdminLang;
  fontClass: string;
  children: React.ReactNode;
}) {
  const [lang, setLang] = useState(initialLang);

  const toggle = () => {
    const next = ADMIN_STRINGS[lang].switchLang;
    setLang(next);
    document.cookie = `${ADMIN_LANG_COOKIE}=${next}; path=/admin; max-age=31536000; samesite=lax`;
  };

  return (
    <AdminStringsContext.Provider value={{ t: ADMIN_STRINGS[lang], toggle }}>
      <div
        lang={lang}
        dir={lang === "ar" ? "rtl" : "ltr"}
        className={`${fontClass} min-h-dvh ${lang === "ar" ? "admin-ar" : ""}`}
      >
        {children}
      </div>
    </AdminStringsContext.Provider>
  );
}

export function LanguageButton() {
  const { t, toggle } = useAdminStrings();
  return (
    <button
      type="button"
      onClick={toggle}
      lang={t.switchLang}
      className="pressable min-h-10 rounded-full border border-line px-4 text-sm font-bold text-ink hover:border-gold"
    >
      {t.switchTo}
    </button>
  );
}
