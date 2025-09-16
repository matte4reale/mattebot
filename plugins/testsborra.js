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

    // Cattura tutta la sezione con titolo + griglia
    const elementHandle = await page.$(".section-title"); 
    if (!elementHandle) throw new Error("❌ Sezione 'Bot Ufficiali' non trovata.");

    // Salgo al contenitore principale della sezione
    const sectionHandle = await page.$eval("h2.section-title", el => el.parentElement);
    const sectionElement = await page.$("section"); // puoi adattare se cambia struttura

    const buffer = await sectionElement.screenshot({ type: "jpeg", quality: 90 });
    await browser.close();

    await conn.sendFile(
      m.chat,
      buffer,
      "bot-ufficiali.jpeg",
      "🤖 Ecco la sezione *Bot Ufficiali* con la griglia.",
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