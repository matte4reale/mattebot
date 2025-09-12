import axios from "axios"
import { createCanvas } from "canvas"

let handler = async (m, { conn }) => {
  try {
    let url = "https://chatunitycenter.netlify.app/chatunity-bot"
    let { data } = await axios.get(url)

    // Regex per trovare nome bot e stato (adatta al tuo HTML)
    let regex = /<div class="bot-card">.*?<div class="bot-name">(.*?)<\/div>.*?<div class="bot-status">(.*?)<\/div>/gs
    let bots = []
    let match
    while ((match = regex.exec(data)) !== null) {
      let name = match[1].trim()
      let status = match[2].trim().toLowerCase()
      bots.push({
        name: name || `Bot-${bots.length + 1}`,
        online: status.includes("online")
      })
    }

    if (bots.length === 0) {
      return m.reply("⚠️ Nessun bot trovato sul sito.")
    }

    // Contiamo online/offline
    let onlineCount = bots.filter(b => b.online).length
    let offlineCount = bots.length - onlineCount

    const width = 800
    const height = 250 + bots.length * 70
    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext("2d")

    // Sfondo gradiente
    let gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, "#1a2a6c")
    gradient.addColorStop(0.5, "#b21f1f")
    gradient.addColorStop(1, "#fdbb2d")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // Titolo
    ctx.fillStyle = "#fff"
    ctx.font = "bold 42px Arial"
    ctx.textAlign = "center"
    ctx.fillText("🚀 ChatUnity Bots", width / 2, 60)

    // Totali
    ctx.font = "28px Arial"
    ctx.fillText(`✅ Online: ${onlineCount}  |  ❌ Offline: ${offlineCount}`, width / 2, 110)

    // Card singole
    let y = 170
    for (let bot of bots) {
      ctx.fillStyle = "#ffffffdd"
      ctx.roundRect(100, y - 35, 600, 60, 20)
      ctx.fill()

      ctx.fillStyle = "#000"
      ctx.font = "bold 26px Arial"
      ctx.textAlign = "left"
      ctx.fillText(bot.name, 130, y)

      ctx.fillStyle = bot.online ? "#00c853" : "#d50000"
      ctx.beginPath()
      ctx.arc(660, y - 5, 15, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = "#000"
      ctx.font = "18px Arial"
      ctx.textAlign = "center"
      ctx.fillText(bot.online ? "ONLINE" : "OFFLINE", 660, y + 20)

      y += 80
    }

    let buffer = canvas.toBuffer("image/jpeg")

    await conn.sendFile(m.chat, buffer, "bots-status.jpg", "📊 Stato dei bot ChatUnity", m)
  } catch (err) {
    console.error(err)
    m.reply("❌ Errore durante il caricamento dei bot.")
  }
}

handler.command = ["botstatus", "chatunitybots"]
export default handler

// Funzione per rettangoli arrotondati
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
  if (w < 2 * r) r = w / 2
  if (h < 2 * r) r = h / 2
  this.beginPath()
  this.moveTo(x + r, y)
  this.arcTo(x + w, y, x + w, y + h, r)
  this.arcTo(x + w, y + h, x, y + h, r)
  this.arcTo(x, y + h, x, y, r)
  this.arcTo(x, y, x + w, y, r)
  this.closePath()
  return this
}