let handler = async (m, { conn }) => {
  const messaggi = [
 " 333 bot-          -Origin-Bot
  Vare-Bot-          -Onix-Bot
 Turbo-Bot-          -Bixby-Bot
             
           Origin-Bot          ",
    "un unico progetto...",
  "333 bot--   c    --Origin-Bot
  Vare-Bot--        --Onix-Bot
 Turbo-Bot--        --Bixby-Bot
           
           Origin-Bot",
    "Ma perché sto scrivendo tutto questo?",
    "Comunque Edy fa schifo.",
    "Matte invece è un king.",
    "No seriamente, Edy smetti di taggare.",
    "Ancora qui?",
    "Va bene, è ora di chiudere.",
    "Ciao ciao 👋"
  ];

  try {
    let botMsg = await conn.sendMessage(m.chat, { text: messaggi[0] }, { quoted: m });

    for (let i = 1; i < messaggi.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      await conn.sendMessage(m.chat, {
        edit: botMsg.key,
        text: messaggi[i]
      });
    }
  } catch (err) {
    console.error(err);
    m.reply('Errore nel plugin di modifica messaggio.');
  }
};

handler.command = ['harim'];
handler.help = ['harim'];
handler.tags = ['fun'];
handler.limit = false;

export default handler;