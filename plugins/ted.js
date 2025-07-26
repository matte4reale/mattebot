// Mappa: JID → nome personalizzato
const targets = {
    "1234567890@s.whatsapp.net": "matte" // <- matte è il difeso
};

// Frasi in difesa di "matte"
const defenseQuotes = (name, authorName) => [
    `Occhio a come parli con ${name}, ${authorName}. Hai finito le vite?`,
    `${name} non si tocca. Rispetta la leggenda, ${authorName}.`,
    `${authorName}, ti serve un abbraccio? Perché l'umiliazione arriva a raffica.`,
    `Oh ${authorName}, vuoi fare il duro? Sei tenero come un biscotto bagnato.`,
    `Parlare male di ${name}? È come sfidare un orso ubriaco. Pensaci.`,
    `${name} sta zitto, ma io no. E tu, ${authorName}, hai appena perso una dignità.`,
    `Metti giù il telefono, ${authorName}. Stai per farti umiliare da un peluche.`,
    `${name} non dice niente, ma io sì: taci, ${authorName}, prima di peggiorare la tua reputazione.`
];

// Frasi sarcastiche in reply a chi risponde al bot
const replyQuotes = (name) => [
    `Oh ${name}, sei tornato? Pensavo ti avessero bannato dalla logica.`,
    `Parli ancora, ${name}? Il silenzio ti donava.`,
    `Hai la profondità di una pozzanghera, ${name}.`,
    `${name}, ogni tuo messaggio mi fa rivalutare il medioevo.`,
    `Il tuo contributo, ${name}, è come il Wi-Fi nei boschi: inutile.`,
    `${name}, stai scrivendo da un frigorifero o è solo il tuo cervello offline?`,
    `Ogni tuo messaggio è come un audio di 8 minuti: evitabile.`,
    `${name}, se continui così ti blocco anche io, e sono un bot.`,
    `Wow, ${name}, sei riuscito a peggiorare una situazione già tragica.`,
    `${name}, sembri un bug di The Sims senza pathfinding.`
];

module.exports = async function tedHandler(message, sock) {
    const chatId = message.key.remoteJid;
    const senderJid = message.key.participant || message.key.remoteJid;
    const senderName = message.pushName || "tu";

    const text = message.message?.conversation ||
        message.message?.extendedTextMessage?.text || "";

    const mentioned =
        message.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];

    const quotedMsg = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;

    const quotedParticipant = message.message?.extendedTextMessage?.contextInfo?.participant;

    // ✅ Caso 1: qualcuno tagga "matte"
    for (const [jid, name] of Object.entries(targets)) {
        if (mentioned.includes(jid)) {
            const defense = defenseQuotes(name, senderName)[Math.floor(Math.random() * defenseQuotes(name, senderName).length)];

            await sock.sendMessage(chatId, {
                text: `🧸 Ted interviene: "${defense}"`
            }, { quoted: message });

            return;
        }
    }

    // ✅ Caso 2: qualcuno risponde a un messaggio del bot (Ted)
    if (quotedMsg && quotedParticipant?.includes(sock.user.id.split(":")[0])) {
        const reply = replyQuotes(senderName)[Math.floor(Math.random() * replyQuotes(senderName).length)];

        await sock.sendMessage(chatId, {
            text: `🧸 Ted risponde: "${reply}"`
        }, { quoted: message });

        return;
    }
};