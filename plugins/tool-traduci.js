import translate from '@vitalets/google-translate-api'

let userLang = {}

const handler = async (m, { args, usedPrefix, command }) => {
    if (!args[0]) {
        return m.reply(`🌍 Dimmi la lingua!\n\nEsempio: *${usedPrefix + command} es*`)
    }

    let lang = args[0].toLowerCase()
    userLang[m.sender] = lang

    await m.reply(`✅ Tutti i messaggi del bot saranno tradotti in *${lang.toUpperCase()}*`)
}

handler.help = ['traducii <lingua>']
handler.tags = ['tools']
handler.command = ['traducii']

export async function before(m, { conn }) {
    let lang = userLang[m.sender]
    if (!lang) return

    // patch m.reply
    let originalReply = m.reply.bind(m)
    m.reply = async (text, ...rest) => {
        try {
            if (typeof text === 'string') {
                let res = await translate(text, { to: lang })
                return originalReply(res.text, ...rest)
            }
        } catch (e) {
            console.error('Errore traduzione reply:', e)
        }
        return originalReply(text, ...rest)
    }

    let originalSend = conn.sendMessage.bind(conn)
    conn.sendMessage = async (jid, content, options) => {
        try {
            if (content.text) {
                let res = await translate(content.text, { to: lang })
                content.text = res.text
            }
        } catch (e) {
            console.error('Errore traduzione sendMessage:', e)
        }
        return originalSend(jid, content, options)
    }
}

export default handler