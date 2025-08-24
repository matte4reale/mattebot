import { createCanvas, loadImage, registerFont } from 'canvas'
import fs from 'fs'
import path from 'path'
import https from 'https'

// Scarica font Noto Sans se non esiste
const fontPath = path.join('/mnt/data', 'NotoSans-Regular.ttf')
if (!fs.existsSync(fontPath)) {
  const file = fs.createWriteStream(fontPath)
  https.get('https://github.com/googlefonts/noto-fonts/blob/main/hinted/ttf/NotoSans/NotoSans-Regular.ttf?raw=true', (res) => {
    res.pipe(file)
  })
}
registerFont(fontPath, { family: 'NotoSans' })

function normalizeText(text) {
  if (!text) return ''
  const map = {}
  const ranges = []
  const addRange = (from, to) => ranges.push({ from, to })
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  for (let i = 0; i < 50; i++) addRange(alphabet, alphabet)
  ranges.forEach(r => {
    for (let i = 0; i < r.from.length; i++) map[r.from[i]] = r.to[i]
  })
  return text.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').split('').map(c => map[c] || c).join('')
}

async function generaLeaderboard(conn, chat, users, topN = 10) {
  const width = 800
  const height = 120 + topN * 90
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#0f172a'
  ctx.fillRect(0, 0, width, height)
  ctx.fillStyle = '#facc15'
  ctx.font = 'bold 40px NotoSans'
  ctx.textAlign = 'center'
  ctx.fillText('🏆 CLASSIFICA TOP', width / 2, 70)
  for (let i = 0; i < Math.min(topN, users.length); i++) {
    const u = users[i]
    const y = 130 + i * 90
    ctx.fillStyle = i % 2 === 0 ? '#1e293b' : '#334155'
    ctx.fillRect(50, y - 50, width - 100, 80)
    try {
      const url = await conn.profilePictureUrl(u.id, 'image').catch(() => null)
      if (url) {
        const avatar = await loadImage(url)
        ctx.save()
        ctx.beginPath()
        ctx.arc(90, y - 10, 30, 0, Math.PI * 2)
        ctx.closePath()
        ctx.clip()
        ctx.drawImage(avatar, 60, y - 40, 60, 60)
        ctx.restore()
      }
    } catch {}
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 24px NotoSans'
    ctx.textAlign = 'left'
    ctx.fillText(`#${i + 1} ${normalizeText(u.name)}`, 140, y)
    ctx.font = '20px NotoSans'
    ctx.fillStyle = '#cbd5e1'
    ctx.textAlign = 'right'
    ctx.fillText(`💰 ${u.euro || 0}€   ⭐ ${u.exp || 0}xp`, width - 70, y)
  }
  ctx.fillStyle = '#94a3b8'
  ctx.font = '16px NotoSans'
  ctx.textAlign = 'right'
  ctx.fillText('Dev by Matte', width - 20, height - 20)
  return canvas.toBuffer()
}

let handler = async (m, { conn, command }) => {
  const chat = m.chat
  const dbUsers = Object.entries(global.db.data.users)
    .map(([id, u]) => ({ id, name: u.name || id.split('@')[0], euro: u.euro || 0, exp: u.exp || 0 }))
    .sort((a, b) => (b.euro + b.exp) - (a.euro + a.exp))
  const buffer = await generaLeaderboard(conn, chat, dbUsers, 10)
  await conn.sendMessage(chat, { image: buffer, caption: '📊 Classifica del gruppo' }, { quoted: m })
}

handler.command = /^topss$/i
handler.group = true
export default handler