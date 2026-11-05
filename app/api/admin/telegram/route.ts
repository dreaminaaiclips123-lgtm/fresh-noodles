import { isAdmin } from "@/lib/analytics/auth";
import { keys, run, sameOrigin } from "@/lib/analytics/store";
import { latestChatId, sendTelegram, telegramReady } from "@/lib/analytics/telegram";

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
  } catch {
    return Response.json({ error: "Telegram didn't respond. Try again." }, { status: 502 });
  }
}
