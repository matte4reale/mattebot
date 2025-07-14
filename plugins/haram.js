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
            return m.reply('✅ Link del gruppo nuovo salvato con successo.');
        } catch {
            return m.reply('❌ Link invalido o già utilizzato.');
        }
    }

    if (command === 'backup') {
        const metadata = await conn.groupMetadata(chatId);
        const members = metadata.participants
            .filter(p => !p.admin) // solo membri normali
            .map(p => p.id);

        backupUtenti[chatId] = members;
        return m.reply(`✅ Backup completato. Membri salvati: ${members.length}`);
    }

    if (command === 'haram') {
        if (!linkGruppoNuovo[chatId])
            return m.reply('❌ Nessun gruppo nuovo salvato. Usa prima `.setgrupponuovo <link>`');

        await conn.sendMessage(
            m.sender,
            {
                text: `🧨 Il gruppo è stato svuotato!\n\nPremi il bottone per inviare il nuovo link a tutti i membri salvati o aggiungerli direttamente (se ≤ 6).`,
                buttons: [
                    {
                        buttonId: `#inoltragrup ${chatId}`,
                        buttonText: { displayText: '📤 Inoltra/Aggiungi' },
                        type: 1
                    }
                ],
                footer: 'Autorizzato',
                headerType: 1
            },
            { quoted: m }
        );
    }

    if (command === 'inoltragrup') {
        const chatOrigine = args[0];
        const datiGruppo = linkGruppoNuovo[chatOrigine];
        const utenti = backupUtenti[chatOrigine];

        if (!datiGruppo || !utenti)
            return m.reply('❌ Mancano dati: link o lista membri.');

        const { link, groupId } = datiGruppo;

        if (utenti.length <= 6) {
            try {
                await conn.groupAdd(groupId, utenti);
                return m.reply(`✅ Membri (${utenti.length}) aggiunti direttamente al nuovo gruppo.`);
            } catch (e) {
                console.error('Errore durante aggiunta:', e);
                return m.reply('⚠️ Errore durante aggiunta automatica. Provo con messaggi privati...');
            }
        }

        let riusciti = 0;
        let falliti = 0;

        for (const user of utenti) {
            try {
                await conn.sendMessage(user, { text: '.' }); // messaggio vuoto/di ping
                await conn.sendMessage(user, {
                    text: `👋 Ciao! Il gruppo è stato chiuso.\n🔗 Entra nel nuovo gruppo qui: ${link}`
                });
                riusciti++;
            } catch (err) {
                falliti++;
                console.log(`❌ Fallito invio a ${user}`);
            }
        }

        return m.reply(`✅ Inviato a ${riusciti} utenti.\n❌ Falliti: ${falliti}`);
    }
};

handler.command = /^(setgrupponuovo|backup|haram|inoltragrup)$/i;
export default handler;
