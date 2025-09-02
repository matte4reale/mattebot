import translate from '@vitalets/google-translate-api'

let chatLang = {}
let patched = false

async function translateText(text, to) {
  if (!text || typeof text !== 'string') return text
  try {
    const res = await translate(text, { to })
    return res.text
  } catch (e) {
    return text
  }
}

function ensurePatched(conn) {
  if (!conn || patched) return
  const origSend = conn.sendMessage?.bind(conn)
  if (origSend) {
    conn.sendMessage = async (jid, content, options = {}) => {
      try {
        const lang = chatLang[jid]
        if (!lang) return origSend(jid, content, options)
        if (typeof content === 'string') {
          const t = await translateText(content, lang)
          return origSend(jid, t, options)
        }
        const newContent = { ...content }
        if (newContent.text) newContent.text = await translateText(newContent.text, lang)
        if (newContent.caption) newContent.caption = await translateText(newContent.caption, lang)
        if (newContent.footer) newContent.footer = await translateText(newContent.footer, lang)
        if (newContent.title) newContent.title = await translateText(newContent.title, lang)
        if (newContent.description) newContent.description = await translateText(newContent.description, lang)
        if (newContent.contentText) newContent.contentText = await translateText(newContent.contentText, lang)
        if (newContent.image && newContent.image.caption) newContent.image = { ...newContent.image, caption: await translateText(newContent.image.caption, lang) }
        if (newContent.video && newContent.video.caption) newContent.video = { ...newContent.video, caption: await translateText(newContent.video.caption, lang) }
        if (newContent.document && newContent.document.caption) newContent.document = { ...newContent.document, caption: await translateText(newContent.document.caption, lang) }
        if (newContent.buttonsMessage && newContent.buttonsMessage.contentText) newContent.buttonsMessage = { ...newContent.buttonsMessage, contentText: await translateText(newContent.buttonsMessage.contentText, lang) }
        if (newContent.templateMessage) {
          const tm = { ...newContent.templateMessage }
          if (tm.hydratedTemplate && tm.hydratedTemplate.hydratedContentText) tm.hydratedTemplate = { ...tm.hydratedTemplate, hydratedContentText: await translateText(tm.hydratedTemplate.hydratedContentText, lang) }
          newContent.templateMessage = tm
        }
        return origSend(jid, newContent, options)
      } catch (e) {
        return origSend(jid, content, options)
      }
    }
  }
  if (conn.reply && typeof conn.reply === 'function') {
    const origReply = conn.reply.bind(conn)
    conn.reply = async (jid, text, quoted, options = {}) => {
      try {
        const lang = chatLang[jid || quoted?.key?.remoteJid]
        if (!lang) return origReply(jid, text, quoted, options)
        if (typeof text === 'string') {
          const t = await translateText(text, lang)
          return origReply(jid, t, quoted, options)
        }
      } catch (e) {
        return origReply(jid, text, quoted, options)
      }
    }
  }
  patched = true
}

const handler = async (m, { conn, args, usedPrefix, command }) => {
  ensurePatched(conn || global.conn)
  if (!args || !args[0]) {
    return m.reply(`🌍 Dimmi la lingua!\nEsempio: ${usedPrefix + command} es oppure ${usedPrefix + command} off`)
  }
  const arg = args[0].toLowerCase()
  if (arg === 'off' || arg === 'reset') {
    delete chatLang[m.chat]
    return m.reply(`✅ Traduzione disattivata per questa chat`)
  }
  chatLang[m.chat] = arg
  return m.reply(`✅ Tutti i messaggi del bot per questa chat saranno tradotti in *${arg.toUpperCase()}*`)
}

handler.help = ['traducii <lingua|off>']
handler.tags = ['tools']
handler.command = ['traducii']

export default handler