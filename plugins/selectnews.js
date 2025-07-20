let handler = async (m, { conn }) => { const buttons = [ { buttonId: '.notiziario', buttonText: { displayText: '📰 Notizie Generali' }, type: 1 }, { buttonId: '.news', buttonText: { displayText: '🏟️ Notizie Sportive' }, type: 1 } ];

await conn.sendMessage(m.chat, { text: '📡 Seleziona il tipo di notizie che vuoi ricevere:', footer: 'Notiziario - Seleziona tra Generali o Sport', buttons, headerType: 1 }, { quoted: m }); };

handler.command = /^selectnews$/i; export default handler;

