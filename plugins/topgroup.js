import { createCanvas, loadImage } from 'canvas'

let groupStats = Object.create(null)
let lastResetKey = getDateKeyRome()

function nowRome() {
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Rome' }))
}
function getDateKeyRome(d = nowRome()) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}
function maybeDailyReset() {
  const key = getDateKeyRome()
  if (key !== lastResetKey) {
    for (const id of Object.keys(groupStats)) {
      if (groupStats[id]) groupStats[id].dailyMessages = 0
    }
    lastResetKey = key
  }
}
function touchGroup(id, subject = '') {
  if (!groupStats[id]) {
    groupStats[id] = {
      totalMessages: 0,
      dailyMessages: 0,
      subject,
      lastUpdated: nowRome().toISOString()
    }
  }
  if (subject && groupStats[id].subject !== subject) {
    groupStats[id].subject = subject
    groupStats[id].lastUpdated = nowRome().toISOString()
  }
  return groupStats[id]
}
function sanitizeText(text) {
  if (!text) return ''
  let clean = text.normalize("NFKC")
  if (clean.length > 40) clean = clean.slice(0, 37) + "..."
  return clean
}

function drawRoundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

function drawCup(ctx, x, y, size = 80) {
  ctx.fillStyle = '#FFD700'
  ctx.beginPath()
  ctx.moveTo(x - size / 2, y)
  ctx.lineTo(x + size / 2, y)
  ctx.lineTo(x + size * 0.4, y + size)
  ctx.lineTo(x - size * 0.4, y + size)
  ctx.closePath()
  ctx.fill()
  ctx.fillRect(x - size * 0.15, y + size, size * 0.3, size * 0.3)
  ctx.fillRect(x - size * 0.5, y + size * 1.3, size, size * 0.15)
}

const handler = async (m, { conn, args }) => {
  maybeDailyReset()
  if (!m.isGroup) return m.reply('Questo comando funziona solo nei gruppi!')

  let topCount = 10
  if (args && args[0]) {
    const n = parseInt(args[0])
    if (!isNaN(n) && n > 0 && n <= 20) topCount = n
  }

  try {
    const groups = await conn.groupFetchAllParticipating()
    const list = Object.values(groups || {})
    const groupsData = await Promise.all(list.map(async g => {
      const id = g.id
      const subject = g.subject || 'Gruppo senza nome'
      const participants = Array.isArray(g.participants) ? g.participants.length : (g.participants?.length || 0)
      const s = touchGroup(id, subject)
      let photo
      try {
        photo = await conn.profilePictureUrl(id, 'image')
      } catch {
        photo = 'https://qu.ax/LoGxD.png'
      }
      return {
        id,
        subject,
        participants,
        totalMessages: s.totalMessages || 0,
        dailyMessages: s.dailyMessages || 0,
        photo,
        lastActivity: s.lastUpdated
      }
    }))

    const sorted = groupsData
      .sort((a, b) => b.dailyMessages - a.dailyMessages || b.totalMessages - a.totalMessages)
      .slice(0, topCount)

    if (!sorted.length) return m.reply('❌ Nessun gruppo trovato nella classifica.')

    // Canvas
    const width = 1200, height = 800
    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')

    // Sfondo pulito (sfumato blu → viola)
    const grad = ctx.createLinearGradient(0, 0, 0, height)
    grad.addColorStop(0, '#1e3a8a')
    grad.addColorStop(1, '#6d28d9')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, width, height)

    // Titolo
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 60px "Poppins","Roboto","Segoe UI",sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('🏆 TOP 3 GRUPPI 🏆', width / 2, 100)

    // Podio centrato
    const baseY = 620
    const colW = 220
    const spacing = 280
    const centerX = width / 2

    const positions = [
      { rank: 2, x: centerX - spacing, h: 180, color: '#9ca3af', emoji: '🥈' },
      { rank: 1, x: centerX, h: 250, color: '#facc15', emoji: '🥇' },
      { rank: 3, x: centerX + spacing, h: 150, color: '#d97706', emoji: '🥉' }
    ]

    for (let pos of positions) {
      const g = sorted[pos.rank - 1]
      if (!g) continue
      const y = baseY - pos.h

      drawRoundedRect(ctx, pos.x, y, colW, pos.h, 20)
      ctx.fillStyle = pos.color
      ctx.fill()
      ctx.lineWidth = 5
      ctx.strokeStyle = '#fff'
      ctx.stroke()

      // Avatar
      try {
        let img = await loadImage(g.photo)
        ctx.save()
        ctx.beginPath()
        ctx.arc(pos.x + colW / 2, y - 60, 55, 0, Math.PI * 2)
        ctx.clip()
        ctx.drawImage(img, pos.x + colW / 2 - 55, y - 115, 110, 110)
        ctx.restore()
      } catch {}

      // Nome
      ctx.fillStyle = '#fff'
      ctx.font = 'bold 22px "Poppins","Roboto","Segoe UI",sans-serif'
      ctx.fillText(sanitizeText(g.subject), pos.x + colW / 2, baseY + 30)

      // Statistiche
      ctx.font = '18px "Poppins","Roboto","Segoe UI",sans-serif'
      ctx.fillText(`${g.dailyMessages} oggi | ${g.totalMessages} totali`, pos.x + colW / 2, baseY + 55)

      // Emoji podio
      ctx.font = 'bold 50px "Poppins"'
      ctx.fillText(pos.emoji, pos.x + colW / 2, y + pos.h / 2)
    }

    // Coppa più in alto
    const first = positions.find(p => p.rank === 1)
    if (first) {
      const cx = first.x + colW / 2
      const cy = baseY - first.h - 200
      drawCup(ctx, cx, cy, 90)
    }

    // Caption dal 4° in poi con cornici
    let caption = "📋 Classifica Gruppi (dal 4° posto in poi):\n\n"
    sorted.slice(3).forEach((g, i) => {
      caption += `╔══════════════════════╗\n`
      caption += `#${i + 4} ${sanitizeText(g.subject)}\n`
      caption += `🗨️ ${g.dailyMessages} oggi | 📊 ${g.totalMessages} totali\n`
      caption += `╚══════════════════════╝\n\n`
    })

    const buffer = canvas.toBuffer('image/jpeg')
    await conn.sendMessage(m.chat, { image: buffer, caption }, { quoted: m })
  } catch (e) {
    console.error('topgruppi error:', e)
    await m.reply('Errore nel recuperare i gruppi.')
  }
}

handler.all = async (m, { conn }) => {
  maybeDailyReset()
  if (!m || !m.isGroup || !m.chat) return
  try {
    let subject = ''
    try {
      const md = await conn.groupMetadata(m.chat)
      subject = md?.subject || ''
    } catch {}
    const s = touchGroup(m.chat, subject)
    s.totalMessages++
    s.dailyMessages++
    s.lastUpdated = nowRome().toISOString()
  } catch {}
}

handler.command = /^topgruppi|topgroups$/i
handler.group = true

export default handler