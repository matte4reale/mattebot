let linkGruppoNuovo = {};
let backupUtenti = {};
const numeriAutorizzati = ['393884769557', '66621409462'];

const handler = async (m, { conn, args, command }) => {
    const sender = m.sender.replace(/[^0-9]/g, '');
    const chatId = m.chat;

    if (!numeriAutorizzati.includes(sender)) {
        return m.reply('❌ Non sei autorizzato a usare questo comando.');
    }

    if (command === 'setgrupponuovo') {
        const link = args[0];
        if (!link || !link.startsWith('https://chat.whatsapp.com/')) {
            return m.reply('❗ Inserisci un link valido del nuovo gruppo WhatsApp.');
        }

        try {
            const groupCode = link.split('https://chat.whatsapp.com/')[1];
            const newGroupId = await conn.groupAcceptInvite(groupCode);
            linkGruppoNuovo[chatId] = { link, groupId: newGroupId };
            return m.reply('✅ Link del nuovo gruppo salvato.');
        } catch {
            return m.reply('❌ Link non valido o già usato.');
        }
    }

    if (command === 'backup') {
        const metadata = await conn.groupMetadata(chatId);
        const members = metadata.participants
            .filter(p => !p.admin)
            .map(p => p.id);

        backupUtenti[chatId] = members;
        return m.reply(`✅ Backup completato. Membri salvati: ${members.length}`);
    }

    if (command === 'haram') {
        if (!linkGruppoNuovo[chatId])
            return m.reply('❌ Usa prima `.setgrupponuovo <link>`');
        if (!backupUtenti[chatId])
            return m.reply('❌ Esegui prima `.backup` per salvare i membri.');

        await conn.sendMessage(
            m.sender,
            {
                text: `📌 Il gruppo è stato svuotato!\n\nScegli un'opzione:`,
                footer: 'Bot Manager',
                buttons: [
                    { buttonId: `#inoltralink ${chatId}`, buttonText: { displayText: '📤 Inoltra Link' }, type: 1 },
                    { buttonId: `#aggiungimembri ${chatId}`, buttonText: { displayText: '➕ Aggiungi Membri' }, type: 1 }
                ],
                headerType: 1
            },
            { quoted: m }
        );
    }

    if (command === 'inoltralink') {
        const chatOrigine = args[0];
        const dati = linkGruppoNuovo[chatOrigine];
        const utenti = backupUtenti[chatOrigine];

        if (!dati || !utenti) return m.reply('❌ Mancano dati.');

        let riusciti = 0, falliti = 0;

        for (const user of utenti) {
            try {
                await conn.sendMessage(user, { text: '.' });
                await conn.sendMessage(user, {
                    text: `🔗 Il gruppo è stato ricreato:\n\n👉 ${dati.link}`
                });
                riusciti++;
            } catch {
                falliti++;
            }
        }

        return m.reply(`📤 Link inoltrato a ${riusciti} membri.\n❌ Falliti: ${falliti}`);
    }

    if (command === 'aggiungimembri') {
        const chatOrigine = args[0];
        const dati = linkGruppoNuovo[chatOrigine];
        const utenti = backupUtenti[chatOrigine];

        if (!dati || !utenti) return m.reply('❌ Mancano dati.');

        if (utenti.length > 6) {
            return m.reply('❗ Ci sono più di 6 membri, non posso aggiungerli tutti.\nUsa il bottone "📤 Inoltra Link".');
        }

        try {
            await conn.groupAdd(dati.groupId, utenti);
            return m.reply(`✅ Aggiunti ${utenti.length} membri nel nuovo gruppo.`);
        } catch (err) {
            return m.reply('❌ Errore durante l’aggiunta dei membri.');
        }
    }
};

handler.command = /^(setgrupponuovo|backup|haram|inoltralink|aggiungimembri)$/i;
export default handler;
