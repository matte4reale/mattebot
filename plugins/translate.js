import translate from 'translate-google'

let activeLang = {}

const handler = async (m, { conn, args }) => {
    if (!args[0]) {
        return m.reply('⚠️ Dimmi la lingua! Es: .traduci en oppure .traduci it')
    }

    const lang = args[0].toLowerCase()
    activeLang[m.sender] = lang

    m.reply(`🌍 Traduzione attivata in: *${lang.toUpperCase()}* per i tuoi comandi!`)

    // traduci subito le help e tags dei plugin
    for (let name in global.plugins) {
        let plugin = global.plugins[name]

        if (plugin.help) {
            try {
                plugin.help = await Promise.all(plugin.help.map(h => translate(h, { to: lang })))
            } catch (e) { console.log('Errore traduzione help:', e) }
        }

        if (plugin.tags) {
            try {
                plugin.tags = await Promise.all(plugin.tags.map(t => translate(t, { to: lang })))
            } catch (e) { console.log('Errore traduzione tags:', e) }
        }

        if (plugin.description) {
            try {
                plugin.description = await translate(plugin.description, { to: lang })
            } catch (e) { console.log('Errore traduzione description:', e) }
        }
    }
}

handler.help = ['traduci <lingua>']
handler.tags = ['tools']
handler.command = ['traduci']

export default handler