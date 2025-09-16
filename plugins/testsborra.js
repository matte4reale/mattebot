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

    // Seleziona l'intera sezione che contiene titolo + griglia
    const section = await page.$("section:has(h2.section-title)");
    if (!section) throw new Error("❌ Sezione 'Bot Ufficiali' non trovata.");

    // Screenshot solo della sezione selezionata
    const buffer = await section.screenshot({ type: "jpeg", quality: 90 });

    await browser.close();

    await conn.sendFile(
      m.chat,
      buffer,
      "bot-ufficiali.jpeg",
      "🤖 Ecco la sezione *Bot Ufficiali* con la griglia.",
      m
    );
  } catch (e) {
    await conn.reply(m.chat, "❌ Errore: impossibile catturare la sezione Bot Ufficiali.", m);
    console.error(e);
  }
};

handler.command = ["sito"];
handler.tags = ["tools"];
export default handler;