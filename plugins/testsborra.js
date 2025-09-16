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

    // Trova la sezione "Bot Ufficiali" (primo container)
    const element = await page.$("section"); // prende il primo <section>

    if (!element) {
      throw new Error("Sezione 'Bot Ufficiali' non trovata");
    }

    // Screenshot solo di quell'elemento
    const buffer = await element.screenshot({ type: "jpeg", quality: 90 });

    await browser.close();

    await conn.sendFile(m.chat, buffer, "bot-ufficiali.jpeg", "🤖 Bot Ufficiali Online", m);
  } catch (e) {
    await conn.reply(m.chat, "❌ Errore nel generare lo screenshot.", m);
    console.error("Errore Puppeteer:", e);
  }
};

handler.command = ["sito"];
export default handler;