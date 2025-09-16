import puppeteer from "puppeteer";

let handler = async (m, { conn }) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.goto("https://chatunitycenter.netlify.app/chatunity-bot", {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    await page.addStyleTag({
      content: `
        section:has(h2.section-title) {
          background: black !important;
          color: white !important;
          padding: 20px;
        }
        section:has(h2.section-title) .bot-card {
          background: #1f2937 !important;
          border-radius: 8px !important;
          padding: 10px !important;
          margin-bottom: 10px !important;
          box-shadow: 0 2px 6px rgba(0,0,0,0.5) !important;
          transition: background 0.3s;
        }
        section:has(h2.section-title) .bot-card:hover {
          background: #2563eb !important;
        }
        section:has(h2.section-title) h2.section-title {
          color: #facc15 !important;
        }
      `
    });

    const section = await page.$("section:has(h2.section-title)");
    if (!section) throw new Error("Sezione Bot Ufficiali non trovata");

    const buffer = await section.screenshot({ type: "jpeg", quality: 90 });

    await browser.close();

    await conn.sendFile(
      m.chat,
      buffer,
      "bot-ufficiali.jpeg",
      "🤖 Sezione *Bot Ufficiali* aggiornata con colori accesi",
      m
    );
  } catch (e) {
    console.error("Errore Puppeteer:", e);
    await conn.reply(m.chat, "❌ Errore: impossibile generare lo screenshot colorato");
  }
};

handler.command = ["sito"];
handler.tags = ["tools"];
export default handler;