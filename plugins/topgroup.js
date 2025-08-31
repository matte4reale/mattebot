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

function drawCup(ctx, x, y, size = 70) {
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
      .sort((a, b) => {
        if (b.dailyMessages !== a.dailyMessages) return b.dailyMessages - a.dailyMessages
        if (b.totalMessages !== a.totalMessages) return b.totalMessages - a.totalMessages
        if (b.participants !== a.participants) return b.participants - a.participants
        return a.subject.localeCompare(b.subject)
      })
      .slice(0, topCount)

    if (!sorted.length) return m.reply('❌ Nessun gruppo trovato nella classifica.')

    // 🎨 Canvas solo per top 3
    const width = 1200, height = 800
    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')

    // Background
    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, '#0f172a')
    gradient.addColorStop(1, '#1e3a8a')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    ctx.fillStyle = '#fff'
    ctx.font = 'bold 60px "Segoe UI Emoji","Noto Color Emoji","Poppins","Roboto",sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('🏆 TOP 3 GRUPPI', width / 2, 100)

    // Podio
    const baseY = 650
    const colW = 220
    const spacing = 280
    const centerX = width / 2

    const positions = [
      { rank: 2, x: centerX - spacing, h: 180, color: '#9ca3af' },
      { rank: 1, x: centerX, h: 250, color: '#facc15' },
      { rank: 3, x: centerX + spacing, h: 150, color: '#d97706' }
    ]

    for (let pos of positions) {
      const g = sorted[pos.rank - 1]
      if (!g) continue
      const y = baseY - pos.h

      ctx.fillStyle = pos.color
      ctx.fillRect(pos.x, y, colW, pos.h)

      try {
        let img = await loadImage(g.photo)
        ctx.save()
        ctx.beginPath()
        ctx.arc(pos.x + colW / 2, y - 60, 55, 0, Math.PI * 2)
        ctx.clip()
        ctx.drawImage(img, pos.x + colW / 2 - 55, y - 115, 110, 110)
        ctx.restore()
      } catch {}

      ctx.fillStyle = '#fff'
      ctx.font = 'bold 22px "Segoe UI Emoji","Noto Color Emoji","Poppins","Roboto",sans-serif'
      ctx.fillText(sanitizeText(g.subject), pos.x + colW / 2, baseY + 30)

      ctx.font = '18px "Segoe UI Emoji","Noto Color Emoji","Poppins","Roboto",sans-serif'
      ctx.fillText(`${g.dailyMessages} oggi | ${g.totalMessages} totali`, pos.x + colW / 2, baseY + 55)
    }

    // Coppa sopra il primo
    const first = positions.find(p => p.rank === 1)
    if (first) {
      const cx = first.x + colW / 2
      const cy = baseY - first.h - 120
      drawCup(ctx, cx, cy, 70)
    }

    // Caption per #4 → #10
    let caption = "🏅 Classifica Gruppi\n\n"
    caption += "🥇 " + sanitizeText(sorted[0]?.subject || '') + ` (${sorted[0]?.dailyMessages} oggi)\n`
    caption += "🥈 " + sanitizeText(sorted[1]?.subject || '') + ` (${sorted[1]?.dailyMessages} oggi)\n`
    caption += "🥉 " + sanitizeText(sorted[2]?.subject || '') + ` (${sorted[2]?.dailyMessages} oggi)\n\n`
    caption += "Altri gruppi:\n"
    sorted.slice(3).forEach((g, i) => {
      caption += `#${i + 4} ${sanitizeText(g.subject)} - ${g.dailyMessages} msg oggi\n`
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