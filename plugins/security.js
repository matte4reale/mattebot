let messaggioRifiuto = `❌ Mi dispiace, non entro in gruppi con meno di 30 membri.
👉 Invita più persone e poi riprova!`;

export async function before(m, { conn }) {
  // Se il bot è stato appena aggiunto a un gruppo
  if (m.isGroup && m.action === 'add' && m.participants?.includes(conn.user.jid)) {
    const metadata = await conn.groupMetadata(m.chat);
    if (metadata.participants.length < 30) {
      await conn.sendMessage(m.chat, { text: messaggioRifiuto });
      await conn.groupLeave(m.chat);
    }
  }

  // Se riceve un link gruppo in privato
  if (!m.isGroup && m.text && m.text.match(/chat\.whatsapp\.com\/[A-Za-z0-9]{20,24}/)) {
    const invite = m.text.match(/chat\.whatsapp\.com\/([A-Za-z0-9]{20,24})/)?.[1];
    if (invite) {
      try {
        let res = await conn.groupAcceptInvite(invite);
        let metadata = await conn.groupMetadata(res);
        if (metadata.participants.length < 30) {
          await conn.sendMessage(m.chat, { text: messaggioRifiuto });
          await conn.groupLeave(res);
        } else {
          await conn.sendMessage(m.chat, { text: '✅ Gruppo valido. Sono entrato!' });
        }
      } catch (e) {
        await conn.sendMessage(m.chat, { text: '❌ Link non valido o errore durante l\'accesso.' });
      }
    }
  }
}