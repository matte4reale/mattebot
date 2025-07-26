// ✴️ Plugin Ted - Risponde come un orso volgare e difende utenti taggati
const matte = "66621409462@s.whatsapp.net"; // JID matte

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

    const replied = m.quoted && m.quoted.sender;
    const botJid = conn.user.id.split(":")[0] + "@s.whatsapp.net";

    // ➤ Se taggano Matte
    if (mentions.includes(matte)) {
        const frase = difeseMatte(pushName)[Math.floor(Math.random() * difeseMatte(pushName).length)];
        await conn.reply(m.chat, `🧸 Ted dice: ${frase}`, m, { mentions: [matte] });
        return;
    }

    // ➤ Se rispondono a Ted (il bot)
    if (replied && replied === botJid) {
        const frase = risposteBot(pushName)[Math.floor(Math.random() * risposteBot(pushName).length)];
        await conn.reply(m.chat, `🧸 Ted risponde: ${frase}`, m);
        return;
    }
};

handler.customPrefix = /@|./i;
handler.command = new RegExp; // Trigger automatico
handler.group = true;

export default handler;