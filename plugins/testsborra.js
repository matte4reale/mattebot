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

    // Trova il blocco che segue l'h2.section-title con scritto "Bot Ufficiali"
    const elementHandle = await page.$("h2.section-title");

    if (!elementHandle) {
      throw new Error("❌ Non ho trovato la sezione Bot Ufficiali.");
    }

    // Risali al contenitore genitore che racchiude l'intera sezione
    const parentHandle = await page.evaluateHandle(el => el.parentElement, elementHandle);

    const buffer = await parentHandle.screenshot({ type: "jpeg", quality: 90 });
    await browser.close();

    await conn.sendFile(
      m.chat,
      buffer,
      "bot-ufficiali.jpeg",
      "📊 Ecco la sezione *Bot Ufficiali*",
      m
    );
  } catch (e) {
    await conn.reply(m.chat, "❌ Errore nel generare lo screenshot della sezione Bot Ufficiali.", m);
    console.error(e);
  }
};

handler.command = ["sito"];
handler.tags = ["tools"];
export default handler;