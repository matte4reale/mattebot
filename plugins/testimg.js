let handler = async (m, { conn }) => {
  const url = 'https://i.imgur.com/nPgyRsF.png' // test BMW

  try {
    await conn.sendMessage(m.chat, {
      image: { url },
      caption: '🚗 *Indovina il marchio!*'
    }, { quoted: m })
  } catch (e) {
    console.error(e)
    m.reply('Errore invio immagine')
  }
}

handler.command = /^testimg$/i
export default handler