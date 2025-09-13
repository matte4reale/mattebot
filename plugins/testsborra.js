import puppeteer from "puppeteer"
import fs from "fs"

let handler = async (m, { conn }) => {
  try {
    await conn.reply(m.chat, "⏳ Sto generando lo screenshot, attendi...", m)

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    })
    const page = await browser.newPage()
    await page.goto("https://chatunitycenter.netlify.app/chatunity-bot", {
      waitUntil: "networkidle2"
    })

    // Screenshot dell'intera pagina
    const filePath = "/tmp/chatunity-bots.jpeg"
    await page.screenshot({ path: filePath, type: "jpeg", fullPage: true })

    await browser.close()

    await conn.sendFile(
      m.chat,
      filePath,
      "bots.jpeg",
      "📊 Stato attuale dei bot ChatUnity:",
      m
    )

    fs.unlinkSync(filePath)

  } catch (err) {
    await conn.reply(m.chat, `❌ Errore: ${err.message}`, m)
  }
}

handler.command = ["chatunitybots"]
handler.help = ["chatunitybots"]
handler.tags = ["tools"]

export default handler