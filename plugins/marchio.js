let handler = async (m, { conn, args, isAdmin }) => {
  if (m.text?.toLowerCase() === '.skiplogo') {
    if (!m.isGroup) return m.reply('⚠️ Questo comando funziona solo nei gruppi!')
    if (!global.logoGame?.[m.chat]) return m.reply('⚠️ Nessuna partita attiva in questo gruppo!')

    if (!isAdmin && !m.fromMe) {
      return m.reply('❌ Solo admin possono usare questo comando!')
    }

    clearTimeout(global.logoGame[m.chat].timeout)
    await conn.reply(m.chat, `🛑 Gioco interrotto dall'admin.\nLa risposta era: *${global.logoGame[m.chat].risposta}*`, m)
    delete global.logoGame[m.chat]
    return
  }

  if (global.logoGame?.[m.chat]) {
    return m.reply('⚠️ C\'è già una partita attiva in questo gruppo!')
  }

  // Lista di loghi auto (immagini di logo + marca corretta)
  let loghi = [
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Toyota_logo.svg/512px-Toyota_logo.svg.png', marca: 'toyota' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ford_logo_flat.svg/512px-Ford_logo_flat.svg.png', marca: 'ford' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Mercedes-Benz_logo_2010.svg/512px-Mercedes-Benz_logo_2010.svg.png', marca: 'mercedes' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/BMW_logo_%282021%29.svg/512px-BMW_logo_%282021%29.svg.png', marca: 'bmw' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Audi_logo.svg/512px-Audi_logo.svg.png', marca: 'audi' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Volkswagen_logo_2019.svg/512px-Volkswagen_logo_2019.svg.png', marca: 'volkswagen' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Lexus_logo.svg/512px-Lexus_logo.svg.png', marca: 'lexus' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Nissan_logo.svg/512px-Nissan_logo.svg.png', marca: 'nissan' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Hyundai_logo.svg/512px-Hyundai_logo.svg.png', marca: 'hyundai' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Kia_logo.svg/512px-Kia_logo.svg.png', marca: 'kia' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Chevrolet_logo.svg/512px-Chevrolet_logo.svg.png', marca: 'chevrolet' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Fiat_logo.svg/512px-Fiat_logo.svg.png', marca: 'fiat' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Jeep_logo.svg/512px-Jeep_logo.svg.png', marca: 'jeep' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Lamborghini_logo.svg/512px-Lamborghini_logo.svg.png', marca: 'lamborghini' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Ferrari_logo.svg/512px-Ferrari_logo.svg.png', marca: 'ferrari' },
  ]

  let frasi = [
    `🔷 *INDOVINA LA MARCA DAL LOGO!* 🔷`,
    `🚗 *Che marca è questo logo?*`,
    `🏁 *Sfida: riconosci il marchio dell'auto!*`,
    `🔍 *Osserva il logo e scrivi la marca!*`,
    `🎯 *Indovina il marchio del logo mostrato!*`,
  ]

  let scelta = loghi[Math.floor(Math.random() * loghi.length)]
  let frase = frasi[Math.floor(Math.random() * frasi.length)]

  global.logoGame = global.logoGame || {}
  global.logoGame[m.chat] = {
    risposta: scelta.marca.toLowerCase(),
    timeout: setTimeout(() => {
      if (global.logoGame?.[m.chat]) {
        conn.reply(m.chat, `⏰ Tempo scaduto!\nLa risposta corretta era: *${scelta.marca}*`, m)
        delete global.logoGame[m.chat]
      }
    }, 60000) // 60 secondi per rispondere
  }

  await conn.sendMessage(m.chat, { image: { url: scelta.url }, caption: `${frase}\n\nHai 60 secondi per rispondere!` }, { quoted: m })
}

handler.help = ['auto', 'skiplogo']
handler.tags = ['game']
handler.command = ['logo', 'skiplogo']

export default handler