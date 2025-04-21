
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

  const body = req.body;

  const chatId = body.message?.chat?.id;
  const text = body.message?.text;

  let responseMessage = "Unknown command. Use /start, /vip, or /refer.";

  if (text === '/start') {
    responseMessage = `👋 Welcome to BetTips AI Bot!
Use:
/vip - Get your exclusive VIP tip
/refer - Get your referral link to earn rewards`;
  }

  if (text === '/vip') {
    responseMessage = `🎯 VIP TIP: Man City to win + over 2.5 goals 🤑 (Confidence: 91%)`;
  }

  if (text === '/refer') {
    responseMessage = `📣 Share this link and earn 3 free premium tips per referral:
https://betting-platform-phi.vercel.app/referral?code=${chatId}`;
  }

  await fetch(`${TELEGRAM_API}/sendMessage`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: responseMessage
    })
  });

  return res.status(200).send("OK");
}
