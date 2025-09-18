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

    // 🎨 Styling custom
    await page.addStyleTag({
      content: `
        body { background: #0d0d0d !important; }
        section:has(h2.section-title) { 
          background: #111 !important; 
          color: white !important; 
          padding: 25px; 
          border-radius: 18px; 
          position: relative;
          font-family: Arial, sans-serif;
        }
        section:has(h2.section-title) h2.section-title { 
          color: #00ffcc !important; 
          font-size: 32px !important; 
          font-weight: bold !important; 
          margin-bottom: 25px !important; 
          text-align: center; 
          text-shadow: 0px 0px 12px rgba(0,255,200,0.9);
        }
        section:has(h2.section-title) .bot-card { 
          background: linear-gradient(145deg, #1d6b1d, #0f3f0f) !important; 
          border: 3px solid white !important; 
          border-radius: 12px !important; 
          padding: 18px !important; 
          margin: 15px auto !important; 
          color: #fff !important; 
          font-size: 20px !important; 
          font-weight: bold !important; 
          text-align: center; 
          box-shadow: 0px 4px 15px rgba(0,0,0,0.8), inset 0px 0px 12px rgba(0,255,200,0.4); 
          text-shadow: 1px 1px 6px rgba(0,0,0,0.9);
        }
        section:has(h2.section-title)::after { 
          content: "Developed by Matte"; 
          position: absolute; 
          bottom: 10px; 
          right: 15px; 
          font-size: 14px; 
          color: #ccc; 
          opacity: 0.9;
        }
      `
    });

    // 📊 Estrai numeri attivi
    const botData = await page.evaluate(() => {
      return [...document.querySelectorAll("section:has(h2.section-title) .bot-card")].map(card => {
        const number = card.querySelector(".bot-number")?.textContent?.replace(/\D/g, "");
        const status = card.querySelector(".status")?.textContent || "N/A";
        return { number, status };
      }).filter(b => b.number && b.status.toLowerCase().includes("attivo")); // Solo attivi
    });

    // 📸 Screenshot
    const section = await page.$("section:has(h2.section-title)");
    if (!section) throw new Error("❌ Sezione Bot Ufficiali non trovata");
    const buffer = await section.screenshot({ type: "jpeg", quality: 95 });
    await browser.close();

    // 📤 Manda immagine
    await conn.sendFile(m.chat, buffer, "bot-ufficiali.jpeg", "🤖 Bot Ufficiali Aggiornati", m);

    // 📲 Menu interattivo con bot attivi
    if (botData.length > 0) {
      const sections = [
        {
          title: "📲 Bot Attivi",
          rows: botData.map(bot => ({
            title: "✅ Bot Attivo",
            rowId: `https://wa.me/${bot.number}`,
            description: `Clicca per contattare subito il bot: +${bot.number}`,
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
    } else {
      await conn.reply(m.chat, "⚠️ Nessun bot attivo al momento.", m);
    }

  } catch (e) {
    console.error("Errore Puppeteer:", e);
    await conn.reply(m.chat, "❌ Errore: impossibile generare lo screenshot.", m);
  }
};

handler.command = ["sito"];
handler.tags = ["tools"];
export default handler;