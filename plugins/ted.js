let matte = "66621409462@s.whatsapp.net";
let tedReplies = [
  "Ma ti sei guardato allo specchio prima di scrivere a matte? Imbarazzo vivente.",
  "matte non ti ha risposto perché ha pietà di te, amico. Io no.",
  "Ehi amico, guarda che matte ti prende pure senza usare le mani.",
  "Amico hai 3 neuroni in sciopero. Lascia stare matte.",
  "matte ha già vinto discutendo con uno come te. Fine del gioco.",
  "Scrivere contro matte è come usare un cucchiaio per tagliare il cemento. Patetico.",
  "Fratello, hai perso contro matte ancora prima di iniziare. Game over.",
  "Stai parlando con matte come se fossi all’altezza. Buffone.",
  "Ted dice: torna a scuola prima di sfidare matte.",
  "matte ti ha risparmiato. Io no. 💀"
];

let replyReplies = [
  "Ah quindi ora parli anche? Il miracolo di Lourdes.",
  "Chi ti ha dato la parola, un sorteggio?",
  "Più scrivi, più matte ride. Continua.",
  "Neanche un clown riuscirebbe a rispondere peggio.",
  "Hai toccato il fondo e stai scavando. Impressionante.",
  "Ted dice: ho visto scimmie con più dialettica.",
  "Scrivere male è un talento, tu sei un fenomeno.",
  "Vieni pure, che ti massacro a parole. Vai, prossimo turno.",
  "Ogni tua parola è un regalo al cringe. Grazie.",
  "Dovrei farti un monumento alla figura di 💩."
];

var handler = async (m, { conn }) => {
  const mentioned = m?.mentionedJid || [];
  const isReplyToTed = m.quoted?.sender === conn.user.jid;

  if (mentioned.includes(matte)) {
    let frase = tedReplies[Math.floor(Math.random() * tedReplies.length)];
    await conn.sendMessage(m.chat, {
      text: `🧸 *Ted dice:* ${frase}`
    }, { quoted: m });
    return;
  }

  if (isReplyToTed) {
    let frase = replyReplies[Math.floor(Math.random() * replyReplies.length)];
    await conn.sendMessage(m.chat, {
      text: `🧸 *Ted risponde:* ${frase}`
    }, { quoted: m });
    return;
  }
};

handler.customPrefix = /^$/; // solo eventi naturali
handler.command = new RegExp; // nessun comando
handler.group = true;

export default handler;