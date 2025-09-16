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

    // Cerca il container che contiene "Bot Ufficiali"
    const element = await page.$x("//h2[contains(text(), 'Bot Ufficiali')]/ancestor::section");

    if (!element || element.length === 0) {
      throw new Error("Sezione 'Bot Ufficiali' non trovata");
    }

    // Screenshot solo di quella sezione
    const buffer = await element[0].screenshot({ type: "jpeg", quality: 90 });

    await browser.close();

    await conn.sendFile(m.chat, buffer, "bot-ufficiali.jpeg", "📊 Ecco i Bot Ufficiali ChatUnity:", m);
  } catch (e) {
    await conn.reply(m.chat, "❌ Errore nel generare lo screenshot della sezione Bot Ufficiali.", m);
    console.error("Errore Puppeteer:", e);
  }
};

handler.command = ["sito"];
export default handler;