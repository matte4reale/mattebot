let handler = async (m, { conn }) => {
  const user = m.sender;
  const draft = conn.saveRosa?.[user];

  if (!draft || draft.length === 0) {
    return m.reply('❌ Nessuna rosa trovata da salvare. Usa /futformation prima.');
  }

  global.db.data.users[user].fifaSquad = draft;
  delete conn.saveRosa[user];

  return m.reply('✅ Rosa salvata con successo!');
};

handler.command = /^salvarosa$/i;
export default handler;
