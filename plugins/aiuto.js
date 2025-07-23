let statoSilenzioso = {};

const numeroAutorizzato = '66621409462';

const handler = async (m, { conn }) => {
  const chatId = m.chat;
  const bot = m.key.fromMe;
  const sender = m.sender;
  const èTaggato = m.mentionedJid?.includes(`${numeroAutorizzato}@s.whatsapp.net`);
  const èRispostaAMatte = m.quoted?.sender === `${numeroAutorizzato}@s.whatsapp.net`;
  const èRispostaAlBot = m.quoted?.fromMe;

  if (bot || sender === `${numeroAutorizzato}@s.whatsapp.net`) return;

  if (statoSilenzioso[chatId]) {
    if (
      èTaggato &&
      m.text.toLowerCase().includes("fatti sentire") &&
      sender === `${numeroAutorizzato}@s.whatsapp.net`
    ) {
      statoSilenzioso[chatId] = false;
      return conn.reply(chatId, "🕶️ Tornato operativo, fratellì.", m);
    }
    return;
  }

  if (èRispostaAlBot && m.text.toLowerCase().includes("calmo")) {
    statoSilenzioso[chatId] = true;
    return conn.reply(chatId, "Scusa fratello, mi calmo subito. 🙏", m);
  }

  if (èTaggato || èRispostaAMatte) {
    const risposteMafiose = [
      "Parla bene che Matte c'ha gli occhi ovunque.",
      "Matte non si nomina invano.",
      "Stai calmino che qui si protegge famiglia.",
      "Hai messo in mezzo Matte? Mo' te ne penti.",
      "Matte è rispettato, tu no. Occhio."
    ];

    const risposta = risposteMafiose[Math.floor(Math.random() * risposteMafiose.length)];
    return conn.reply(chatId, risposta, m);
  }
};

handler.customPrefix = /.*/;
handler.command = new RegExp;

export default handler;