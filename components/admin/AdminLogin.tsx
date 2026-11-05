"use client";

import { useState } from "react";
import { LanguageButton, useAdminStrings } from "./AdminFrame";

export default function AdminLogin() {
  const { t } = useAdminStrings();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) return window.location.reload();
      setError((await res.json()).error ?? "signInFailed");
    } catch {
      setError("connectionError");
    }
    setBusy(false);
  };

  const errorText =
    error === "signInFailed" || error === "connectionError"
      ? t[error]
      : error && (t.serverErrors[error] ?? error);

  return (
    <div className="flex min-h-dvh items-center justify-center px-5">
      <form onSubmit={submit} className="w-full max-w-sm">
        <div className="flex items-center justify-between gap-4">
          <h1 className="font-display text-5xl tracking-wide text-ink">{t.adminTitle}</h1>
          <LanguageButton />
        </div>
        <label htmlFor="admin-password" className="mt-8 block text-sm font-semibold text-muted">
          {t.password}
        </label>
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          autoFocus
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full rounded-xl border border-line bg-surface-2 px-4 py-3 text-base text-ink"
        />
        {errorText && (
          <p role="alert" className="mt-3 text-sm font-semibold text-gold">
            {errorText}
          </p>
        )}
        <button
          type="submit"
          disabled={busy}
          className="pressable mt-5 min-h-12 w-full rounded-full bg-accent font-bold text-accent-ink disabled:opacity-60"
        >
          {busy ? t.signingIn : t.signIn}
        </button>
      </form>
    </div>
  );
}
