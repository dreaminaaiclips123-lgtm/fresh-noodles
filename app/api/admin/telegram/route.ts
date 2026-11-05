import { isAdmin } from "@/lib/analytics/auth";
import { keys, run, sameOrigin } from "@/lib/analytics/store";
import { TelegramError, latestChatId, sendTelegram, telegramReady } from "@/lib/analytics/telegram";

export async function POST(req: Request) {
  if (!sameOrigin(req) || !(await isAdmin())) {
    return Response.json({ error: "Sign in again." }, { status: 401 });
  }
  if (!telegramReady()) {
    return Response.json({ error: "The Telegram bot token is not set yet." }, { status: 503 });
  }
  try {
    const chatId = await latestChatId();
    if (!chatId) {
      return Response.json(
        { error: "No message found. Open your bot in Telegram, send it any message, then try again." },
        { status: 409 }
      );
    }
    await run([["SET", keys.telegramChat, chatId]]);
    await sendTelegram(chatId, "Fresh Noodles alerts are on. You'll get a message here when someone presses Send on the website.");
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Telegram link failed:", err instanceof Error ? err.message : "unknown");
    const error =
      err instanceof TelegramError && (err.code === 401 || err.code === 404)
        ? "Telegram rejected the bot token. Copy it again from @BotFather and replace TELEGRAM_BOT_TOKEN in Vercel."
        : err instanceof TelegramError
          ? err.message
          : "Telegram didn't respond. Try again.";
    return Response.json({ error }, { status: 502 });
  }
}
