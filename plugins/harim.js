let handler = async (m, { conn }) => { const animazioni = [ 333 bot-            -Origin-Bot    Vare-Bot-            -Onix-Bot Turbo-Bot-         -Bixby-Bot\n               Origin-Bot,

`333 bot   |   Origin-Bot     |   Vare-Bot   |   Onix-Bot   |   Turbo-Bot   |   Bixby-Bot\n                     - Initializing System -`,

`[ 333 ] ── Origin ● Vare ● Onix ● Turbo ● Bixby\n                  Setting up core modules...`,

`>>> Origin | Vare | Onix | Turbo | Bixby <<<\n             [ Loading Interfaces... ]`,

`333 ● Origin ● Vare ● Onix ● Turbo ● Bixby\n           ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n             [    Preparing Uplink...    ]`,

`⟨ Origin-Bot ⟩ ⟨ Vare-Bot ⟩ ⟨ Onix ⟩ ⟨ Turbo ⟩ ⟨ Bixby ⟩\n               { Integrating nodes }`,

`⋰❉⋱   Origin    Vare    Onix    Turbo    Bixby   ⋰❉⋱\n               🔷 SYSTEM STABILIZED 🔷`,

`      ░▀▀▓░▀▀▓░▀▀▓░▀▀▓░▀▀▓░▀▀▓\n      ▀░ CHATUNITY BOT ░▀\n      ░▀▀▓░▀▀▓░▀▀▓░▀▀▓░▀▀▓`

];

let sent = await conn.sendMessage(m.chat, { text: animazioni[0] }, { quoted: m });

for (let i = 1; i < animazioni.length; i++) { await new Promise(resolve => setTimeout(resolve, 1000)); await conn.relayMessage(m.chat, { protocolMessage: { key: sent.key, type: 14, editedMessage: { conversation: animazioni[i] } } }, {}); } };

handler.command = ['harim']; handler.help = ['harim']; handler.tags = ['tools'];

export default handler;

