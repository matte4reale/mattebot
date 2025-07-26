// ✴️ Plugin Ted migliorato - Risponde in stile Ted senza duplicazioni
const matte = "66621409462@s.whatsapp.net"; // JID Matte

const difeseMatte = (nome) => [
    `Ehi ${nome}, guarda che @matte ti prende pure senza usare le mani.`,
    `${nome} hai 3 neuroni in sciopero. Lascia stare @matte.`,
    `Oh ${nome}, non ti vergogni a taggare uno che ti batte a mani legate?`,
    `Ma ti sei guardato allo specchio prima di scrivere a @matte? Imbarazzo vivente.`,
    `@matte non ti ha risposto perché ha pietà di te, ${nome}. Io no.`,
    `${nome}, quando parli a @matte metti prima un casco. Che poi ti rompi facile.`,
];

const risposteBot = (nome) => [
    `${nome}, tu esisti solo per far ridere i piccioni.`,
    `Che noia ${nome}. Vuoi attenzione? Prendi un cane.`,
    `${nome}, hai il QI di una ciabatta bagnata.`,
    `Il tuo messaggio è stato sponsorizzato da 'nessuno ti ha chiesto nulla', ${nome}.`,
    `Sei il motivo per cui lo spelling è importante, ${nome}.`,
    `Hai appena perso il premio 'inutilità dell’anno', ${nome}.`,
];

var handler = async (m, { conn }) => {
    const sender = m.sender;
    const pushName = m.pushName || 'amico';
    const mentions = m.mentionedJid || [];
    const replied = m.quoted?.sender;
    const botJid = conn.user.jid || conn.user.id;

    // Previene esecuzione multipla
    if (!m.isGroup) return;

    // ➤ Se taggano solo matte
    if (mentions.includes(matte) && !m.quoted) {
        const frase = difeseMatte(pushName)[Math.floor(Math.random() * difeseMatte(pushName).length)];
        await conn.reply(m.chat, `🧸 Ted dice: ${frase}`, m, { mentions: [matte] });
        return;
    }

    // ➤ Se rispondono al messaggio del bot
    if (m.quoted && m.quoted.sender === botJid) {
        const frase = risposteBot(pushName)[Math.floor(Math.random() * risposteBot(pushName).length)];
        await conn.reply(m.chat, `🧸 Ted risponde: ${frase}`, m);
        return;
    }
};

handler.command = /^$/; // Nessun comando, trigger silenzioso
handler.group = true;

export default handler;