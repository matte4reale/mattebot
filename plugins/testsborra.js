import axios from 'axios'

let handler = async (m, { conn }) => {
  try {
    let url = 'https://chatunitycenter.netlify.app/chatunity-bot'
    let apiKey = '2T2jALv6S84wiO73e4c6a6d4e99cba7da58d725cd8a653dcf'

    let res = await axios.post(
      `https://chrome.browserless.io/screenshot?token=${apiKey}`,
      {
        url,
        options: { type: 'jpeg', fullPage: true }
      },
      { responseType: 'arraybuffer' }
    )

    await conn.sendMessage(
      m.chat,
      { image: res.data, caption: '📊 Stato bot ChatUnity' },
      { quoted: m }
    )
  } catch (err) {
    console.error(err)
    await m.reply('❌ Errore nel generare lo screenshot.')
  }
}

handler.command = /^botstatus$/i
export default handler