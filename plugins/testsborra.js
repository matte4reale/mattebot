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
        body { background: #000 !important; }
        section:has(h2.section-title) { 
          background: #0a0a0a !important; 
          color: white !important; 
          padding: 20px; 
          border-radius: 15px; 
          position: relative; 
          font-family: Arial, sans-serif !important; 
        }
        section:has(h2.section-title) h2.section-title { 
          color: #00ff88 !important; 
          font-size: 28px !important; 
          font-weight: bold !important; 
          margin-bottom: 20px !important; 
          text-align: center; 
        }
        section:has(h2.section-title) .bot-card { 
          background: #145214 !important; 
          border: 2px solid white !important; 
          border-radius: 10px !important; 
          padding: 15px !important; 
          margin: 12px auto !important; 
          color: #fff !important; 
          font-size: 18px !important; 
          font-weight: bold !important; 
          text-align: center; 
          box-shadow: 0 4px 12px rgba(0,0,0,0.7) !important; 
        }
        section:has(h2.section-title) .status-indicator { display:none !important; }
        section:has(h2.section-title)::after { 
          content:"Developed by Matte"; 
          position:absolute; 
          bottom:10px; 
          right:15px; 
          font-size:14px; 
          color:#fff; 
          opacity:0.8; 
        }
      `,
    });

    // Estrazione numeri attivi
    const activeBots = await page.evaluate(() => {
      const cards = document.querySelectorAll("section:has(h2.section-title) .bot-card");
      let bots = [];
      cards.forEach(card => {
        const number = card.textContent.match(/\+?\d+/)?.[0] || null;
        const status = card.innerText.includes("ATTIVO") ? "ATTIVO" : "OFF";
        if (number && status === "ATTIVO") {
          bots.push(number);
        }
      });
      return bots;
    });

    // Screenshot
    const section = await page.$("section:has(h2.section-title)");
    if (!section) throw new Error("Sezione Bot Ufficiali non trovata");
    const buffer = await section.screenshot({ type: "jpeg", quality: 90 });
    await browser.close();

    // Manda immagine
    await conn.sendFile(m.chat, buffer, "bot-ufficiali.jpeg", "🤖 Bot Ufficiali Aggiornati", m);

    // Manda bottoni sotto
    if (activeBots.length > 0) {
      let buttons = activeBots.map(n => ({
        buttonId: `.contactbot ${n}`,
        buttonText: { displayText: `🤖 Bot Attivo` },
        type: 1
      }));

      await conn.sendMessage(m.chat, {
        text: "👇 Contatta subito i bot attivi:",
        footer: "Developed by Matte",
        buttons,
        headerType: 2
      }, { quoted: m });
    } else {
      await conn.reply(m.chat, "⚠️ Nessun bot attivo al momento.", m);
    }

  } catch (e) {
    console.error("Errore Puppeteer:", e);
    await conn.reply(m.chat, "❌ Errore: impossibile generare lo screenshot.");
  }
};

handler.command = ["sito"];
handler.tags = ["tools"];
export default handler;