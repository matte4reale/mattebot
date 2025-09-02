import fs from 'fs'
import { join } from 'path'

const pending = new Map() // memorizza chi deve ancora rispondere
const TIMEOUT_MS = 60 * 1000 // 1 minuto

// comando principale
const handler = async (m, { conn, command }) => {
  const sender = m.sender
  if (command === 'cinese') {
    if (pending.has(sender)) {
      return conn.sendMessage(m.chat, { text: '⚠️ Hai già una richiesta in sospeso, rispondi "si" o "no".' }, { quoted: m })
    }

    pending.set(sender, Date.now())
    setTimeout(() => pending.delete(sender), TIMEOUT_MS)

    return conn.sendMessage(m.chat, { text: 'Hai più di 18 anni? Rispondi "si" o "no".' }, { quoted: m })
  }
}

handler.command = ['cinese']
export default handler

// intercetta messaggi successivi
handler.before = async function (m, { conn }) {
  const sender = m.sender
  if (!pending.has(sender)) return false

  const text = (m.text || '').toLowerCase().trim()
  if (text === 'si' || text === 'sì') {
    pending.delete(sender)

    const videoPath = join(process.cwd(), 'plugins', 'VID-20250903-WA0000.mp4') // nome video fisso
    if (!fs.existsSync(videoPath)) {
      return conn.sendMessage(m.chat, { text: '❌ Video non trovato: assicurati che sia in plugins/ con nome VID-20250903-WA0000.mp4' }, { quoted: m })
    }

    try {
      const buffer = fs.readFileSync(videoPath)
      await conn.sendMessage(m.chat, { video: buffer, caption: '🎬 Ecco il video!' }, { quoted: m })
    } catch (e) {
      await conn.sendMessage(m.chat, { text: '❌ Errore durante l\'invio del video.' }, { quoted: m })
    }

  } else if (text === 'no') {
    pending.delete(sender)
    await conn.sendMessage(m.chat, { text: '😏 Ah, avevo già capito che eri una pussy!' }, { quoted: m })
  } else {
    await conn.sendMessage(m.chat, { text: '⚠️ Rispondi solo con "si" o "no".' }, { quoted: m })
  }

  return true
}