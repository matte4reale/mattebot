import axios from "axios"
import * as cheerio from "cheerio"
import { createCanvas } from "canvas"

let handler = async (m, { conn }) => {
  try {
    let url = "https://chatunitycenter.netlify.app/chatunity-bot"
    let { data } = await axios.get(url)
    let $ = cheerio.load(data)

    let bots = []
    $(".bot-card").each((i, el) => {
      let name = $(el).find(".bot-name").text().trim()
      let status = $(el).find(".bot-status").text().trim().toLowerCase()
      bots.push({
        name: name || `Bot-${i + 1}`,
        online: status.includes("online")
      })
    })

    if (bots.length === 0) {
      return m.reply("⚠️ Nessun bot trovato sul sito.")
    }

    const width = 800
    const height = 200 + bots.length * 80
    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext("2d")

    let gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, "#4e54c8")
    gradient.addColorStop(1, "#8f94fb")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    ctx.fillStyle = "#fff"
    ctx.font = "bold 40px Poppins"
    ctx.textAlign = "center"
    ctx.fillText("🚀 ChatUnity Bots", width / 2, 60)

    let y = 120
    for (let bot of bots) {
      ctx.fillStyle = "#ffffffaa"
      ctx.roundRect(100, y - 40, 600, 60, 20)
      ctx.fill()

      ctx.fillStyle = "#000"
      ctx.font = "bold 28px Poppins"
      ctx.textAlign = "left"
      ctx.fillText(bot.name, 130, y)

      ctx.fillStyle = bot.online ? "#00c853" : "#d50000"
      ctx.beginPath()
      ctx.arc(660, y - 15, 15, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = "#000"
      ctx.font = "20px Poppins"
      ctx.textAlign = "center"
      ctx.fillText(bot.online ? "ONLINE" : "OFFLINE", 660, y + 15)

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