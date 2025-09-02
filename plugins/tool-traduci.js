import translate from '@vitalets/google-translate-api'

let chatLang = {}
let patched = false

async function traduciTesto(testo, lingua) {
  if (!testo || typeof testo !== 'string') return testo
  try {
    const res = await translate(testo, { to: lingua })
    return res.text
  } catch {
    return testo
  }
}

function patch(conn) {
  if (patched) return
  const origSend = conn.sendMessage.bind(conn)

  conn.sendMessage = async (jid, contenuto, opzioni = {}) => {
    try {
      const lingua = chatLang[jid]
      if (!lingua) return origSend(jid, contenuto, opzioni)

      if (typeof contenuto === 'string') {
        contenuto = await traduciTesto(contenuto, lingua)
      } else if (typeof contenuto === 'object') {
        for (let k of Object.keys(contenuto)) {
          if (typeof contenuto[k] === 'string') {
            contenuto[k] = await traduciTesto(contenuto[k], lingua)
          }
          if (contenuto[k] && typeof contenuto[k] === 'object') {
            for (let kk of Object.keys(contenuto[k])) {
              if (typeof contenuto[k][kk] === 'string') {
                contenuto[k][kk] = await traduciTesto(contenuto[k][kk], lingua)
              }
            }
          }
        }
      }
    } catch (e) {
      console.error('Errore traduzione:', e)
    }
    return origSend(jid, contenuto, opzioni)
  }

  const origReply = conn.reply.bind(conn)
  conn.reply = async (jid, testo, quoted, opzioni = {}) => {
    try {
      const lingua = chatLang[jid || quoted?.key?.remoteJid]
      if (lingua && typeof testo === 'string') {
        testo = await traduciTesto(testo, lingua)
      }
    } catch (e) {
      console.error('Errore traduzione reply:', e)
    }
    return origReply(jid, testo, quoted, opzioni)
  }

  patched = true
}

const handler = async (m, { conn, args }) => {
  patch(conn)

  if (!args[0]) return m.reply('🌍 Scrivi una lingua, es: `.traducii es` o `.traducii off`')

  const lingua = args[0].toLowerCase()
  if (lingua === 'off' || lingua === 'reset') {
    delete chatLang[m.chat]
    return m.reply('✅ Traduzione disattivata in questa chat')
  } else {
    chatLang[m.chat] = lingua
    return m.reply(`✅ Da ora tutti i messaggi del bot in questa chat saranno tradotti in *${lingua.toUpperCase()}*`)
  }
}

handler.help = ['traducii <lingua|off>']
handler.tags = ['tools']
handler.command = ['traducii']

export default handler