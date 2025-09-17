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
        section:has(h2.section-title) { background:#0a0a0a!important; color:white!important; padding:20px; border-radius:15px; position:relative; }
        section:has(h2.section-title) h2.section-title { color:#ffcc00!important; font-size:30px!important; font-weight:bold!important; margin-bottom:20px!important; text-align:center; }
        section:has(h2.section-title) .bot-card { background:#145214!important; border:2px solid white!important; border-radius:10px!important; padding:15px!important; margin:10px!important; color:#fff!important; font-size:18px!important; font-weight:bold!important; text-align:center; }
        section:has(h2.section-title)::after { content:"Developed by Matte"; position:absolute; bottom:10px; right:15px; font-size:13px; color:#aaa; }
      `
    });

    const botData = await page.evaluate(() => {
      return [...document.querySelectorAll("section:has(h2.section-title) .bot-card")].map(card => {
        const number = card.querySelector(".bot-number")?.textContent?.replace(/\D/g, "");
        const status = card.querySelector(".status")?.textContent || "N/A";
        return { number, status };
      }).filter(b => b.number && b.status.toLowerCase().includes("attivo"));
    });

    const section = await page.$("section:has(h2.section-title)");
    if (!section) throw new Error("Sezione Bot Ufficiali non trovata");
    const buffer = await section.screenshot({ type: "jpeg", quality: 90 });
    await browser.close();

    await conn.sendFile(m.chat, buffer, "bot-ufficiali.jpeg", "🤖 Bot Ufficiali Aggiornati", m);

    if (botData.length > 0) {
      const sections = [
        {
          title: "📲 Bot Attivi",
          rows: botData.map(bot => ({
            title: "↩️ Bot Attivo",
            rowId: `open_${bot.number}`,
            description: `Contatta su WhatsApp: +${bot.number}`,
          }))
        }
      ];

      await conn.sendMessage(m.chat, {
        text: "👇 Contatta subito i bot attivi:",
        footer: "Developed by Matte",
        title: "Bot Disponibili",
        buttonText: "Apri Lista 📋",
        sections
      }, { quoted: m });
    }

  } catch (e) {
    console.error("Errore Puppeteer:", e);
    await conn.reply(m.chat, "❌ Errore: impossibile generare lo screenshot.", m);
  }
};

handler.command = ["sito"];
handler.tags = ["tools"];
export default handler;