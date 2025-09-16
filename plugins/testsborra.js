import puppeteer from "puppeteer";

let handler = async (m, { conn }) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    // Vai al sito
    await page.goto("https://chatunitycenter.netlify.app/chatunity-bot", {
      waitUntil: "networkidle2",
    });

    // Forza lo sfondo nero alla sezione dei bot ufficiali
    await page.evaluate(() => {
      const section = document.querySelector("h2.section-title");
      if (section) {
        const parent = section.closest("section") || section.parentElement;
        if (parent) {
          parent.style.background = "black";
          parent.style.color = "white";
        }
      }
    });

    // Screenshot solo della sezione Bot Ufficiali
    const section = await page.$("h2.section-title");
    let buffer;
    if (section) {
      const parent = await section.evaluateHandle(
        (el) => el.closest("section") || el.parentElement
      );
      buffer = await parent.screenshot({ type: "jpeg" });
    } else {
      buffer = await page.screenshot({ type: "jpeg", fullPage: false });
    }

    await browser.close();

    // Invia lo screen come JPEG
    await conn.sendFile(
      m.chat,
      buffer,
      "bot-ufficiali.jpeg",
      "🤖 Ecco i Bot Ufficiali con sfondo nero",
      m
    );
  } catch (e) {
    console.error("Errore Puppeteer:", e);
    await conn.reply(m.chat, "❌ Errore nel generare lo screenshot.", m);
  }
};

handler.command = ["sito"];
handler.tags = ["tools"];
export default handler;