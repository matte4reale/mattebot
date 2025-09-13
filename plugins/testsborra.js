import puppeteer from 'puppeteer'

let handler = async (m, { conn }) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    })
    const page = await browser.newPage()
    await page.goto("https://chatunitycenter.netlify.app/chatunity-bot", {
      waitUntil: "networkidle2",
    })
    
    const screenshot = await page.screenshot({ type: "jpeg", quality: 80 })
    await browser.close()

    await conn.sendMessage(m.chat, { 
      image: screenshot, 
      caption: "📊 Stato dei bot ChatUnity" 
    }, { quoted: m })

  } catch (err) {
    console.error("Errore Puppeteer:", err)
    await conn.reply(m.chat, "❌ Errore nel generare lo screenshot.", m)
  }
}

handler.command = ["botstatus"]
export default handler