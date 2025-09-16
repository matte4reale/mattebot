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

    // Applichiamo uno stile pulito e leggibile
    await page.addStyleTag({
      content: `
        section:has(h2.section-title) {
          background: #0f172a !important; /* blu notte */
          color: white !important;
          padding: 20px;
          border-radius: 12px;
        }
        section:has(h2.section-title) h2.section-title {
          color: #facc15 !important; /* giallo brillante */
          font-size: 28px !important;
          font-weight: bold !important;
          margin-bottom: 15px !important;
          text-align: center;
        }
        section:has(h2.section-title) .bot-card {
          background: #1e293b !important; /* grigio scuro */
          border-radius: 10px !important;
          padding: 15px !important;
          margin: 8px !important;
          color: white !important;
          font-size: 16px !important;
          box-shadow: 0 4px 10px rgba(0,0,0,0.5) !important;
          transition: background 0.3s;
        }
        section:has(h2.section-title) .bot-card:hover {
          background: #3b82f6 !important; /* blu acceso hover */
        }
      `
    });

    // Trova la sezione Bot Ufficiali
    const section = await page.$("section:has(h2.section-title)");
    if (!section) throw new Error("Sezione Bot Ufficiali non trovata");

    // Screenshot in JPEG
    const buffer = await section.screenshot({ type: "jpeg", quality: 90 });

    await browser.close();

    // Invia l'immagine al gruppo/chat
    await conn.sendFile(
      m.chat,
      buffer,
      "bot-ufficiali.jpeg",
      "Sezione Bot Ufficiali aggiornata",
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