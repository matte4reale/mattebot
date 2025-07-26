// Numero target: difendiamo matte
const targets = {
    "66621409462@s.whatsapp.net": "matte"
};

// Frasi di difesa per matte
const defenseQuotes = (targetName, senderName) => [
    `Occhio a come parli con ${targetName}, ${senderName}. Hai finito le vite?`,
    `${senderName}, ti consiglio di smettere prima che ${targetName} perda la pazienza.`,
    `Oh ${senderName}, ti sei svegliato coraggioso oggi eh? Parli pure di ${targetName}?`,
    `${targetName} non ha bisogno di difendersi... ma io sì. Quindi occhio, ${senderName}.`,
    `${senderName}, se tocchi ancora ${targetName}, ti mando nei gruppi di famiglia.`,
    `Rispetta ${targetName}, ${senderName}. Non sei pronto per l'umiliazione.`,
    `Hai scelto la persona sbagliata da taggare, ${senderName}. ${targetName} è intoccabile.`,
    `Taggare ${targetName}? Sembra che ${senderName} oggi voglia il disastro.`,
    `${senderName}, se ${targetName} fosse un boss, tu saresti il tutorial.`
];

// Frasi se qualcuno risponde a Ted
const replyQuotes = (senderName) => [
    `Oh ${senderName}, sei tornato? Pensavo avessi lasciato il cervello in modalità silenziosa.`,
    `Hai la profondità di una pozzanghera, ${senderName}.`,
    `Ogni tuo messaggio è come un audio di 8 minuti: evitabile.`,
    `${senderName}, non sei cringe... sei direttamente patrimonio dell’errore umano.`,
    `${senderName}, ogni volta che parli, i pixel del mio cervello si staccano.`,
    `Wow ${senderName}, anche i bot provano imbarazzo leggendo te.`,
    `Ma ${senderName}, la tastiera ti ha chiesto pietà.`,
    `Sei riuscito a far vergognare anche il Wi-Fi, ${senderName}.`,
    `${senderName}, ma taci che Ted si sta spegnendo da solo.`
];

module.exports = async function tedHandler(message, sock) {
    const chatId = message.key.remoteJid;
    const senderJid = message.key.participant || message.key.remoteJid;
    const senderName = message.pushName || "qualcuno";

    // Tag ricevuti
    const mentionedJids =
        message.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];

    // Se stanno rispondendo a un messaggio
    const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    const quotedSender = message.message?.extendedTextMessage?.contextInfo?.participant;

    // È una risposta a Ted?
    const isReplyToBot =
        quotedSender && sock.user && quotedSender.includes(sock.user.id.split(":")[0]);

    // Caso 1: qualcuno tagga Matte
    for (const [targetJid, targetName] of Object.entries(targets)) {
        if (mentionedJids.includes(targetJid)) {
            const quote =
                defenseQuotes(targetName, senderName)[
                    Math.floor(Math.random() * defenseQuotes(targetName, senderName).length)
                ];

            await sock.sendMessage(
                chatId,
                { text: `🧸 Ted interviene: "${quote}"` },
                { quoted: message }
            );
            return;
        }
    }

    // Caso 2: risposta a un messaggio di Ted
    if (isReplyToBot) {
        const quote =
            replyQuotes(senderName)[
                Math.floor(Math.random() * replyQuotes(senderName).length)
            ];

        await sock.sendMessage(
            chatId,
            { text: `🧸 Ted risponde: "${quote}"` },
            { quoted: message }
        );
        return;
    }
};