const token = process.env.TELEGRAM_BOT_TOKEN?.trim();

export const telegramReady = () => Boolean(token);

export class TelegramError extends Error {
  constructor(
    method: string,
    public code: number,
    description: string
  ) {
    super(`Telegram ${method} failed: ${code} ${description}`);
  }
}

async function call(method: string, body: object) {
  const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
    signal: AbortSignal.timeout(4000),
  });
  const data = await res.json();
  if (!data.ok) throw new TelegramError(method, data.error_code, data.description);
  return data.result;
}

// Plain text on purpose: no parse mode, so order text can't inject formatting.
export const sendTelegram = (chatId: string, text: string) =>
  call("sendMessage", { chat_id: chatId, text });

/** The chat that most recently messaged the bot, used once to link the admin. */
export async function latestChatId(): Promise<string | null> {
  const updates = (await call("getUpdates", { limit: 20 })) as {
    message?: { chat?: { id?: number; type?: string } };
  }[];
  for (const u of [...updates].reverse()) {
    const chat = u.message?.chat;
    if (chat?.id && chat.type === "private") return String(chat.id);
  }
  return null;
}
