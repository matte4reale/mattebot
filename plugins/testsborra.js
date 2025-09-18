import puppeteer from "puppeteer";

let handler = async (m, { conn, isGroup }) => {
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

    // 🎨 Stile personalizzato con layout a griglia
    await page.addStyleTag({
      content: `
        section:has(h2.section-title) { 
          background: linear-gradient(135deg, #0a0a0a, #1c1c1c)!important; 
          color:white!important; padding:25px; 
          border-radius:15px; position:relative; 
          display: grid; grid-template-columns: repeat(3, 1fr); 
          gap: 20px; justify-items: center;
        }
        section:has(h2.section-title) h2.section-title { 
          grid-column: span 3; 
          color:#ffcc00!important; font-size:32px!important; 
          font-weight:bold!important; margin-bottom:25px!important; 
          text-align:center; text-shadow:2px 2px 8px rgba(0,0,0,0.9); 
        }
        section:has(h2.section-title) .bot-card { 
          background: linear-gradient(145deg, #0d2e0d, #124212)!important; 
          border:3px solid white!important; border-radius:12px!important; 
          padding:20px!important; color:#fff!important; 
          font-size:18px!important; font-weight:bold!important; 
          text-align:center; width: 90%; 
          box-shadow:0 6px 18px rgba(0,0,0,0.9)!important;
        }
        section:has(h2.section-title)::after { 
          content:"Developed by Matte"; 
          grid-column: span 3;
          text-align:right;
          margin-top:15px;
          font-size:14px; color:#aaa; opacity:0.8; 
        }
      `
    });

    // 📊 Estrarre i dati
    const botData = await page.evaluate(() => {
      return [...document.querySelectorAll("section:has(h2.section-title) .bot-card")].map(card => {
        const number = card.querySelector(".bot-number")?.textContent?.replace(/\D/g, "");
        const status = card.querySelector(".status")?.textContent || "N/A";
        return { number, status };
      }).filter(b => b.number && b.status.toLowerCase().includes("attivo"));
    });

    // 📸 Screenshot
    const section = await page.$("section:has(h2.section-title)");
    if (!section) throw new Error("Sezione Bot Ufficiali non trovata");
    const buffer = await section.screenshot({ type: "jpeg", quality: 90 });
    await browser.close();

    // Invia lo screenshot
    await conn.sendFile(m.chat, buffer, "bot-ufficiali.jpeg", "🤖 Bot Ufficiali Aggiornati", m);

    // 🔘 Bottoni
    if (botData.length > 0) {
      if (!isGroup) {
        // In privato → lista interattiva
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
      } else {
        // Nei gruppi → bottoni URL cliccabili
        const buttons = botData.slice(0, 3).map(bot => ({
          buttonId: `wa.me/${bot.number}`,
          buttonText: { displayText: `📲 Bot +${bot.number}` },
          type: 1
        }));
        await conn.sendMessage(m.chat, {
          text: "👇 Bot attivi disponibili:",
          footer: "Developed by Matte",
          buttons,
          headerType: 1
        }, { quoted: m });
      }
    }

  } catch (e) {
    console.error("Errore Puppeteer:", e);
    await conn.reply(m.chat, "❌ Errore: impossibile generare lo screenshot.", m);
  }
};

handler.command = ["sito"];
handler.tags = ["tools"];
export default handler;