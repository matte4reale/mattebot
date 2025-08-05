let handler = async (m, { conn }) => {
  const messaggioCatena = `Ciao! Oggi è il compleanno di brawl Stars. Questa è una collaborazione con watthshapp. Quando avrai mandato questo messaggio a 20 persone questa spunta ✅ diventerà verde. E riceverai un brawler casuale o 1000 crediti.`

  await conn.sendMessage(m.chat, {
    text: messaggioCatena,
    contextInfo: {
      isForwarded: true,
      forwardingScore: 999, // forza "inoltrato molte volte"
    }
  }, { quoted: m })
}

handler.command = /^catena$/i
handler.help = ['catena']
handler.tags = ['fun']

export default handler