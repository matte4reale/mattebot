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
        @import url('https://fonts.googleapis.com/css2?family=Noto+Color+Emoji&display=swap');

        section:has(h2.section-title) {
          background: #0a0a0a !important;
          color: white !important;
          padding: 20px;
          border-radius: 15px;
          position: relative;
          font-family: 'Noto Color Emoji', Arial, sans-serif !important;
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
          background: #1a5e1a !important;
          border: 3px solid white !important;
          border-radius: 12px !important;
          padding: 18px !important;
          margin: 12px !important;
          color: #ffffff !important;
          font-size: 20px !important;
          font-weight: bold !important;
          box-shadow: 0 6px 14px rgba(0,0,0,0.7) !important;
          text-align: center;
          text-shadow: 2px 2px 5px rgba(0,0,0,0.9);
          position: relative;
        }

        section:has(h2.section-title) .bot-card:hover {
          transform: scale(1.05);
          background: #134d13 !important;
        }

        /* bottone WhatsApp */
        section:has(h2.section-title) .bot-card::after {
          content: "📲 Contatta su WhatsApp";
          display: block;
          background: #25d366;
          color: white;
          border-radius: 8px;
          margin-top: 10px;
          padding: 6px 10px;
          font-size: 14px;
          font-weight: bold;
          text-decoration: none;
        }

        section:has(h2.section-title) .status-indicator {
          display: none !important;
        }

        section:has(h2.section-title)::after {
          content: "Developed by Matte";
          position: absolute;
          bottom: 10px;
          right: 15px;
          font-size: 14px;
          color: #ffffff;
          opacity: 0.8;
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
      "✅ Sezione Bot Ufficiali aggiornata con bottoni e emoji",
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