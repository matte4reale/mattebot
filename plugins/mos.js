import fs from 'fs'
import path from 'path'

const AUTHORIZED_OWNER = '393331234567@s.whatsapp.net'     // cambia con il tuo
const AUTHORIZED_CONFIRM = '66621409462@s.whatsapp.net'    // numero autorizzato

const BACKUP_FOLDER = './backups'
if (!fs.existsSync(BACKUP_FOLDER)) fs.mkdirSync(BACKUP_FOLDER, { recursive: true })

global.disabledPlugins = global.disabledPlugins || {}
global.archiviazioneAttiva = global.archiviazioneAttiva || {}

function backupFilePath(chatId) {
  return path.join(BACKUP_FOLDER, `${chatId.replace(/[:@]/g, '_')}.json`)
}

function appendBackup(chatId, messageObj) {
  try {
    const file = backupFilePath(chatId)
    let arr = []
    if (fs.existsSync(file)) {
      const raw = fs.readFileSync(file, 'utf8')
      arr = JSON.parse(raw || '[]')
    }
    arr.push(messageObj)
    fs.writeFileSync(file, JSON.stringify(arr, null, 2))
  } catch (e) {
    console.error('[ARCHIVIO] Errore scrittura backup:', e)
  }
}

let handler = async (m, { conn, command, args }) => {
  try {
    const chatId = m.chat
    const sender = m.sender
    const isOwner = sender === AUTHORIZED_OWNER
    const sub = (args && args[0]) ? args[0].toLowerCase() : null

    if (command === 'target') {
      if (!m.isGroup) return m.reply('❌ Usa questo comando dentro un gruppo.')
      const isAdmin = m.isGroupAdmin
      if (!isOwner && !isAdmin) return m.reply('❌ Solo owner o admin possono richiedere l\'archiviazione.')

      if (!sub || (sub !== 'on' && sub !== 'off' && sub !== 'status')) {
        return m.reply('Uso: .target on | off | status')
      }

      if (sub === 'status') {
        const st = global.archiviazioneAttiva[chatId]
        if (!st || !st.active) return m.reply('ℹ️ Archiviazione: INATTIVA')
        return m.reply(`✅ Archiviazione: ATTIVA\nAvviata da: ${st.by}\nDal: ${st.since}`)
      }

      if (sub === 'off') {
        if (global.archiviazioneAttiva[chatId] && global.archiviazioneAttiva[chatId].active) {
          delete global.archiviazioneAttiva[chatId]
          global.disabledPlugins[chatId] = {}
          return m.reply('✅ Archiviazione disattivata, tutti i plugin riattivati.')
        } else {
          return m.reply('ℹ️ Archiviazione già inattiva.')
        }
      }

      // richiesta attivazione
      global.archiviazioneAttiva[chatId] = { pending: { requestedBy: sender, requestedAt: new Date().toISOString() } }

      const consentMsg = `📢 Richiesta archiviazione chat\nRichiesta da <@${sender.split('@')[0]}>.\n\nSolo il numero autorizzato può accettare:\n✔️ .accetta-archivia\n❌ .rifiuta-archivia`
      await conn.sendMessage(chatId, { text: consentMsg, mentions: [sender] }, { quoted: m })
      return
    }

    if (command === 'accetta-archivia' || command === 'rifiuta-archivia') {
      if (!m.isGroup) return m.reply('❌ Solo in gruppo.')

      const pending = global.archiviazioneAttiva[chatId]?.pending
      if (!pending) return m.reply('ℹ️ Nessuna richiesta in sospeso.')

      if (sender !== AUTHORIZED_CONFIRM && sender !== AUTHORIZED_OWNER) {
        return m.reply('❌ Non sei autorizzato a confermare o rifiutare.')
      }

      if (command === 'rifiuta-archivia') {
        delete global.archiviazioneAttiva[chatId].pending
        return m.reply('❌ Richiesta di archiviazione rifiutata.')
      }

      // accettata
      global.archiviazioneAttiva[chatId] = {
        active: true,
        by: pending.requestedBy,
        since: new Date().toISOString()
      }
      delete global.archiviazioneAttiva[chatId].pending

      // disattiva tutti i plugin tranne questo
      global.disabledPlugins[chatId] = { '*': true }
      global.disabledPlugins[chatId]['target'] = false

      await conn.sendMessage(chatId, { text: '✅ Archiviazione ATTIVATA.\nTutti gli altri plugin sono disattivati.' }, { quoted: m })
    }
  } catch (e) {
    console.error('[target-plugin]', e)
    m.reply('❌ Errore interno plugin.')
  }
}

handler.before = async (m) => {
  try {
    if (!m.isGroup) return
    const chatId = m.chat
    const st = global.archiviazioneAttiva[chatId]
    if (!st || !st.active) return

    const record = {
      id: m.key?.id,
      from: m.sender,
      timestamp: m.messageTimestamp || Date.now(),
      message: m.text || (m.message ? Object.keys(m.message)[0] : null),
    }
    appendBackup(chatId, record)
  } catch (e) {
    console.error('[target before]', e)
  }
}

handler.command = /^(target|accetta-archivia|rifiuta-archivia)$/i
handler.group = true

export default handler