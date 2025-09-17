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

    // Styling personalizzato
    await page.addStyleTag({
      content: `
        @import url('https://fonts.googleapis.com/css2?family=Noto+Color+Emoji&display=swap');
        section:has(h2.section-title) { background:#0a0a0a!important; color:white!important; padding:20px; border-radius:15px; position:relative; font-family:'Noto Color Emoji',Arial,sans-serif!important; }
        section:has(h2.section-title) h2.section-title { color:#ffcc00!important; font-size:30px!important; font-weight:bold!important; margin-bottom:20px!important; text-align:center; text-shadow:2px 2px 6px rgba(0,0,0,0.8); }
        section:has(h2.section-title) .bot-card { background:#145214!important; border:3px solid white!important; border-radius:12px!important; padding:18px!important; margin:12px!important;color:#fff!important;font-size:20px!important;font-weight:bold!important;box-shadow:0 6px 14px rgba(0,0,0,0.7)!important;text-align:center; text-shadow:2px 2px 5px rgba(0,0,0,0.9); position:relative; }
        section:has(h2.section-title) .bot-card:hover { transform:scale(1.05); background:#0f400f!important; }
        section:has(h2.section-title) .status-indicator { display:none!important; }
        section:has(h2.section-title)::after { content:"Developed by Matte"; position:absolute; bottom:10px; right:15px; font-size:14px; color:#fff; opacity:0.8; }
      `
    });

    // Estrai i numeri dei bot
    const botData = await page.evaluate(() => {
      return [...document.querySelectorAll("section:has(h2.section-title) .bot-card")].map(card => {
        const name = card.querySelector(".bot-name")?.textContent || "Bot Sconosciuto";
        const number = card.querySelector(".bot-number")?.textContent?.replace(/\D/g, "");
        return { name, number };
      }).filter(b => b.number);
    });

    // Screenshot
    const section = await page.$("section:has(h2.section-title)");
    if (!section) throw new Error("Sezione Bot Ufficiali non trovata");
    const buffer = await section.screenshot({ type: "jpeg", quality: 90 });
    await browser.close();

    // Manda immagine
    await conn.sendFile(m.chat, buffer, "bot-ufficiali.jpeg", "🤖 *Bot Ufficiali Aggiornati*", m);

    // Bottoni WhatsApp
    if (botData.length > 0) {
      let buttons = botData.map(bot => ({
        buttonId: `https://wa.me/${bot.number}`,
        buttonText: { displayText: `📲 ${bot.name}` },
        type: 1,
      }));

      await conn.sendMessage(
        m.chat,
        {
          text: "👇 Contatta subito i bot attivi:",
          footer: "Developed by Matte",
          buttons: buttons,
          headerType: 1,
        },
        { quoted: m }
      );
    }

  } catch (e) {
    console.error("Errore Puppeteer:", e);
    await conn.reply(m.chat, "❌ Errore: impossibile generare lo screenshot.", m);
  }
};

handler.command = ["sito"];
handler.tags = ["tools"];
export default handler;