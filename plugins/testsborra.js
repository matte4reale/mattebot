import puppeteer from "puppeteer"

let handler = async (m, { conn }) => {
  try {
    let url = "https://chatunitycenter.netlify.app/chatunity-bot"

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    })

    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 })

    let screenshot = await page.screenshot({ type: "jpeg", quality: 80, fullPage: true })

    await browser.close()

    await conn.sendMessage(
      m.chat,
      { image: screenshot, caption: "📊 Stato bot ChatUnity" },
      { quoted: m }
    )
  } catch (err) {
    console.error("Errore Puppeteer:", err)
    await m.reply("❌ Errore nel generare lo screenshot con Puppeteer.")
  }
}

handler.command = /^botstatus$/i
export default handler