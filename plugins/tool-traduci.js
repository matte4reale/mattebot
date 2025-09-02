import translate from '@vitalets/google-translate-api'

let userLang = {}

const handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) {
        return m.reply(`🌍 Dimmi la lingua!\n\nEsempio: *${usedPrefix + command} en*`)
    }

    let lang = args[0].toLowerCase()
    userLang[m.sender] = lang

    await m.reply(`✅ Traduzione attiva: *${lang.toUpperCase()}*`)

    for (let name in global.plugins) {
        let pl = global.plugins[name]

        if (Array.isArray(pl.help)) {
            try {
                for (let i = 0; i < pl.help.length; i++) {
                    let res = await translate(pl.help[i], { to: lang })
                    pl.help[i] = res.text
                }
            } catch {}
        }

        if (Array.isArray(pl.tags)) {
            try {
                for (let i = 0; i < pl.tags.length; i++) {
                    let res = await translate(pl.tags[i], { to: lang })
                    pl.tags[i] = res.text
                }
            } catch {}
        }

        if (typeof pl.description === 'string') {
            try {
                let res = await translate(pl.description, { to: lang })
                pl.description = res.text
            } catch {}
        }
    }
}

handler.help = ['traduci <lingua>']
handler.tags = ['tools']
handler.command = ['traduci']

export default handler