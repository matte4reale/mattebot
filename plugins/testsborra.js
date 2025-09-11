import puppeteer from 'puppeteer'

let handler = async (m, { conn }) => {
  const sito = 'https://chatunitycenter.netlify.app/chatunity-bot'

  try {
    await conn.sendMessage(m.chat, { text: '⏳ Controllo stato ChatUnityBot...' }, { quoted: m })

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    const page = await browser.newPage()
    await page.goto(sito, { waitUntil: 'networkidle2' })
    await page.setViewport({ width: 1200, height: 800 })

    const screenshot = await page.screenshot({ 
      fullPage: false, 
      type: 'jpeg', 
      quality: 90
    })
    await browser.close()

    await conn.sendMessage(m.chat, {
      image: screenshot,
      mimetype: 'image/jpeg',
      caption: `📊 *ChatUnityBot — Stato Bot Online*\n🌐 Fonte: ${sito}`
    }, { quoted: m })

  } catch (e) {
    console.error('Error botsonline:', e)
    await conn.sendMessage(m.chat, { text: '❌ Errore durante il controllo stato ChatUnityBot.' }, { quoted: m })
  }
}

handler.command = ['botsonline', 'statusbot']
handler.tags = ['tools']
handler.help = ['botsonline']
export default handler