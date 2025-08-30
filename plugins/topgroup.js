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
function formatDateRome(iso) {
  const d = iso ? new Date(iso) : nowRome()
  const local = new Date(d.toLocaleString('en-US', { timeZone: 'Europe/Rome' }))
  const dd = String(local.getDate()).padStart(2, '0')
  const mm = String(local.getMonth() + 1).padStart(2, '0')
  const yyyy = local.getFullYear()
  const hh = String(local.getHours()).padStart(2, '0')
  const min = String(local.getMinutes()).padStart(2, '0')
  return `${dd}/${mm}/${yyyy} ${hh}:${min}`
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
function getResetCountdownRome() {
  const now = nowRome()
  const midnight = new Date(now)
  midnight.setHours(24, 0, 0, 0)
  const ms = midnight - now
  const h = Math.max(0, Math.floor(ms / (1000 * 60 * 60)))
  const m = Math.max(0, Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60)))
  return { hours: h, minutes: m, nowDate: formatDateRome(now.toISOString()) }
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

// 🟡 Funzione che normalizza i testi (emoji + font supportati)
function sanitizeText(text) {
  if (!text) return ''
  let clean = text.normalize("NFKD")
  // rimuove caratteri non compatibili
  clean = clean.replace(/[^\p{L}\p{N}\p{P}\p{Z}\u{1F300}-\u{1FAFF}]/gu, "")
  if (clean.length > 40) clean = clean.slice(0, 37) + "..."
  return clean
}

function drawCup(ctx, x, y, size = 60) {
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
  ctx.strokeStyle = '#ffcc99'
  ctx.lineWidth = 6
  ctx.beginPath()
  ctx.arc(x - size * 0.9, y + size * 0.5, size * 0.35, 0, Math.PI * 2)
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(x + size * 0.9, y + size * 0.5, size * 0.35, 0, Math.PI * 2)
  ctx.stroke()
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
      .sort((a, b) => {
        if (b.dailyMessages !== a.dailyMessages) return b.dailyMessages - a.dailyMessages
        if (b.totalMessages !== a.totalMessages) return b.totalMessages - a.totalMessages
        if (b.participants !== a.participants) return b.participants - a.participants
        return a.subject.localeCompare(b.subject)
      })
      .slice(0, topCount)

    if (!sorted.length) return m.reply('❌ Nessun gruppo trovato nella classifica.')

    const width = 1600
    const height = 1100
    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')

    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, '#0f172a')
    gradient.addColorStop(1, '#1e3a8a')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    for (let i = 0; i < 180; i++) {
      ctx.beginPath()
      ctx.fillStyle = `hsl(${Math.random() * 360}, 80%, 60%)`
      ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 3 + 2, 0, Math.PI * 2)
      ctx.fill()
    }

    const fontStack = '"Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji","Poppins","Roboto",sans-serif'

    ctx.fillStyle = '#fff'
    ctx.font = `bold 70px ${fontStack}`
    ctx.textAlign = 'center'
    ctx.fillText('TOP GRUPPI', width / 2, 100)

    drawCup(ctx, width / 2 - 420, 55, 55)
    drawCup(ctx, width / 2 + 420, 55, 55)

    const boxX = 80
    const boxY = 200
    const boxW = 650
    const boxH = 750
    const radius = 30

    ctx.fillStyle = 'rgba(0,0,0,0.55)'
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 6
    ctx.beginPath()
    ctx.moveTo(boxX + radius, boxY)
    ctx.lineTo(boxX + boxW - radius, boxY)
    ctx.quadraticCurveTo(boxX + boxW, boxY, boxX + boxW, boxY + radius)
    ctx.lineTo(boxX + boxW, boxY + boxH - radius)
    ctx.quadraticCurveTo(boxX + boxW, boxY + boxH, boxX + boxW - radius, boxY + boxH)
    ctx.lineTo(boxX + radius, boxY + boxH)
    ctx.quadraticCurveTo(boxX, boxY + boxH, boxX, boxY + boxH - radius)
    ctx.lineTo(boxX, boxY + radius)
    ctx.quadraticCurveTo(boxX, boxY, boxX + radius, boxY)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    ctx.fillStyle = '#facc15'
    ctx.font = `bold 38px ${fontStack}`
    ctx.textAlign = 'left'
    ctx.fillText('TOP GRUPPI OGGI:', boxX + 20, boxY + 50)

    ctx.font = `22px ${fontStack}`
    sorted.forEach((g, i) => {
      const y = boxY + 100 + i * 65
      ctx.fillStyle = '#fff'
      ctx.fillText(`#${i + 1} ${sanitizeText(g.subject)}`, boxX + 30, y)
      ctx.fillStyle = '#cbd5e1'
      ctx.fillText(`${g.dailyMessages} msg oggi | ${g.totalMessages} tot`, boxX + 350, y)
    })

    const baseY = boxY + boxH
    const colW = 200
    const spacing = 260
    const centerX = width - 500

    const positions = [
      { rank: 2, x: centerX - spacing, h: 170, color: '#9ca3af' },
      { rank: 1, x: centerX, h: 240, color: '#facc15' },
      { rank: 3, x: centerX + spacing, h: 150, color: '#d97706' }
    ]

    for (let pos of positions) {
      const g = sorted[pos.rank - 1]
      if (!g) continue
      const y = baseY - pos.h

      ctx.fillStyle = pos.color
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 6
      const r = 20

      ctx.beginPath()
      ctx.moveTo(pos.x + r, y)
      ctx.lineTo(pos.x + colW - r, y)
      ctx.quadraticCurveTo(pos.x + colW, y, pos.x + colW, y + r)
      ctx.lineTo(pos.x + colW, baseY - r)
      ctx.quadraticCurveTo(pos.x + colW, baseY, pos.x + colW - r, baseY)
      ctx.lineTo(pos.x + r, baseY)
      ctx.quadraticCurveTo(pos.x, baseY, pos.x, baseY - r)
      ctx.lineTo(pos.x, y + r)
      ctx.quadraticCurveTo(pos.x, y, pos.x + r, y)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      try {
        let img = await loadImage(g.photo)
        ctx.save()
        ctx.beginPath()
        ctx.arc(pos.x + colW / 2, y - 65, 55, 0, Math.PI * 2)
        ctx.clip()
        ctx.drawImage(img, pos.x + colW / 2 - 55, y - 120, 110, 110)
        ctx.restore()
      } catch {}

      ctx.fillStyle = '#fff'
      ctx.font = `bold 22px ${fontStack}`
      ctx.textAlign = 'center'
      ctx.fillText(sanitizeText(g.subject), pos.x + colW / 2, baseY + 35)

      ctx.font = `18px ${fontStack}`
      ctx.fillText(`${g.dailyMessages} msg oggi | ${g.totalMessages} tot`, pos.x + colW / 2, baseY + 60)
    }

    const first = positions.find(p => p.rank === 1)
    if (first) {
      const y = baseY - first.h
      const cx = first.x + colW / 2
      const cy = y - 190
      drawCup(ctx, cx, cy, 70)
    }

    const { hours, minutes, nowDate } = getResetCountdownRome()
    ctx.fillStyle = '#9ca3af'
    ctx.font = `18px ${fontStack}`
    ctx.textAlign = 'center'
    ctx.fillText(`Reset tra ${hours}h ${minutes}m • ${nowDate}`, width / 2, height - 20)

    const buffer = canvas.toBuffer('image/jpeg')
    await conn.sendMessage(m.chat, { image: buffer, caption: '🏆 Classifica gruppi aggiornata!' }, { quoted: m })
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