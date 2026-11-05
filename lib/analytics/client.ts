// Browser side. Never throws and never delays the page or the WhatsApp link.

let memorySid = "";

export function sessionId() {
  try {
    const saved = sessionStorage.getItem("fn_sid");
    if (saved) return saved;
    const sid = crypto.randomUUID();
    sessionStorage.setItem("fn_sid", sid);
    return sid;
  } catch {
    memorySid ||= Math.random().toString(36).slice(2).padEnd(12, "0");
    return memorySid;
  }
}

export function post(path: string, body: object) {
  try {
    const data = JSON.stringify(body);
    const sent = navigator.sendBeacon?.(path, new Blob([data], { type: "application/json" }));
    if (!sent) void fetch(path, { method: "POST", body: data, keepalive: true }).catch(() => {});
  } catch {
    // Analytics must never affect ordering.
  }
}
