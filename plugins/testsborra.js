import puppeteer from "puppeteer";

let handler = async (m, { conn }) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();
    await page.goto("https://chatunitycenter.netlify.app/chatunity-bot", {
      waitUntil: "networkidle2",
      timeout: 60000
    });

    const buffer = await page.screenshot({ type: "jpeg", quality: 80, fullPage: true });
    await browser.close();

    await conn.sendFile(m.chat, buffer, "bots.jpeg", "📊 Lista Bot Online", m);
  } catch (e) {
    await conn.reply(m.chat, "❌ Errore nel generare lo screenshot.", m);
    console.error("Errore Puppeteer:", e);
  }
};

handler.command = ["sito"];
export default handler;