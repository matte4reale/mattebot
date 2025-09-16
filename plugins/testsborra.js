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
          background: #0a0a0a !important;
          color: white !important;
          padding: 20px;
          border-radius: 15px;
        }
        section:has(h2.section-title) h2.section-title {
          color: #ffcc00 !important;
          font-size: 30px !important;
          font-weight: bold !important;
          margin-bottom: 20px !important;
          text-align: center;
          text-shadow: 2px 2px 6px rgba(0,0,0,0.8);
        }
        section:has(h2.section-title) .bot-card {
          background: linear-gradient(135deg, #ff3b3b, #ff7b00) !important;
          border: 3px solid white !important;
          border-radius: 12px !important;
          padding: 18px !important;
          margin: 12px !important;
          color: white !important;
          font-size: 18px !important;
          font-weight: bold !important;
          box-shadow: 0 6px 14px rgba(0,0,0,0.7) !important;
          text-align: center;
          transition: transform 0.2s, background 0.3s;
        }
        section:has(h2.section-title) .bot-card:hover {
          transform: scale(1.05);
          background: linear-gradient(135deg, #007bff, #00e6e6) !important;
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
      "✅ Sezione Bot Ufficiali aggiornata",
      m
    );
  } catch (e) {
    console.error("Errore Puppeteer:", e);
    await conn.reply(m.chat, "❌ Errore: impossibile generare lo screenshot.");
  }
};

handler.command = ["sito"];
handler.tags = ["tools"];
export default handler;