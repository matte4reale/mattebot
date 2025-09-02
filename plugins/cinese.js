import fs from 'fs'
import { join } from 'path'

const pending = new Map()
const TIMEOUT_MS = 60 * 1000

const handler = async (m, { conn, args, command }) => {
  const from = m.sender
  const chat = m.chat
  const text = (m.text || '').toLowerCase().trim()

  if (command === 'cinese') {
    if (pending.has(from)) {
      return conn.sendMessage(chat, { text: 'Hai già una richiesta in sospeso. Rispondi semplicemente "si" o "no".' }, { quoted: m })
    }
    pending.set(from, Date.now())
    setTimeout(() => {
      if (pending.has(from)) pending.delete(from)
    }, TIMEOUT_MS)
    return conn.sendMessage(chat, { text: 'Hai più di 18 anni? Rispondi "si" o "no".' }, { quoted: m })
  }

  if (pending.has(from)) {
    if (text.startsWith('si') || text === 'sì') {
      pending.delete(from)
      const videoFilename = 'VID-20250903-WA0000.mp4'
      const videoPath = join(process.cwd(), 'plugins', videoFilename)
      if (!fs.existsSync(videoPath)) {
        return conn.sendMessage(chat, { text: '❌ Video non trovato sul server.' }, { quoted: m })
      }
      try {
        const stream = fs.readFileSync(videoPath)
        await conn.sendMessage(chat, { video: stream, caption: 'Ecco il video' }, { quoted: m })
        return
      } catch (e) {
        return conn.sendMessage(chat, { text: '❌ Errore durante l\'invio del video.' }, { quoted: m })
      }
    } else if (text.startsWith('no') || text === 'n') {
      pending.delete(from)
      return conn.sendMessage(chat, { text: 'Capito, non invierò il video.' }, { quoted: m })
    } else {
      return conn.sendMessage(chat, { text: 'Rispondi solamente "si" o "no".' }, { quoted: m })
    }
  }
}

handler.command = ['cinese']
handler.private = false
handler.group = true

export default handler