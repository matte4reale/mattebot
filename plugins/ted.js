import fetch from 'node-fetch';

let handler = m => m;

global.tedSilenced = global.tedSilenced || false;

handler.all = async function (m) {
  if (!m.text || m.fromMe || m.sender === conn.user.jid) return;

  const text = m.text.toLowerCase();
  const mentioned = m.mentionedJid || [];

  const edyJid = '40767396892@s.whatsapp.net';
  const matteJid = '66621409462@s.whatsapp.net';

  if (text.includes('ted calma')) {
    global.tedSilenced = true;
    await conn.reply(m.chat, 'Ok mi zittisco… ma ricordati chi comanda.', m);
    return;
  }

  if (text.includes('ted fatti sentire')) {
    global.tedSilenced = false;
    await conn.reply(m.chat, 'Sto qua brutto coglione, che vuoi?', m);
    return;
  }

  if (global.tedSilenced) return;

  const matteTriggers = ['matte'];
  const matteReplies = [
    'Oh, parli di Matte? Mettiti in ginocchio prima di nominarlo.',
    'Matte è off-limits. Sta più in alto di te nella catena alimentare.',
    'Solo chi ha un minimo di cervello rispetta Matte. Tu no.',
    'Lascia stare Matte o ti insegno l’educazione a calci.',
    'Giù le mani da Matte, non è roba per te.',
    'Nomini Matte e ti autodistruggi. Hai scelto male.',
    'Matte è l’unico essere umano che sopporto. Tu no.'
  ];

  const edyInsults = [
    'Edy è il motivo per cui la parola "fallimento" esiste.',
    'Parlare con Edy è come urlare in un pozzo di letame.',
    'Edy? Ma è ancora tra noi? Pensavo fosse un bug.',
    'Ogni volta che Edy scrive, un neurone muore.',
    'Edy è come un captcha mal riuscito: nessuno lo capisce e dà solo fastidio.',
    'Taggare Edy è un insulto alla tua dignità. Bravo.',
    'Edy ha il fascino di una stampante rotta.'
  ];

  const genericReplies = [
    'Scrivi meglio, sembri Edy dopo una lobotomia.',
    'Non so se sei ironico o solo stupido.',
    'Hai detto qualcosa? Il mio cervello l’ha censurato per pietà.',
    'Sembri il trailer di un film brutto: rumoroso e inutile.',
    'La tua presenza abbassa il QI del gruppo.',
    'Hai appena perso l’occasione per stare zitto.'
  ];

  if (matteTriggers.some(trigger => text.includes(trigger))) {
    const reply = matteReplies[Math.floor(Math.random() * matteReplies.length)];
    await conn.reply(m.chat, reply, m, { quoted: m });
    return;
  }

  if (mentioned.includes(edyJid) || text.includes('edy')) {
    const insult = edyInsults[Math.floor(Math.random() * edyInsults.length)];
    await conn.reply(m.chat, insult, m, { quoted: m });
    return;
  }

  if (mentioned.includes(matteJid) || m.sender === matteJid) {
    try {
      const prompt = `Sei Ted, l'orso sboccato e sarcastico, e stai parlando con il tuo miglior amico John (Matte). Rispondi in tono affettuoso ma volgare. Frase: "${m.text}"`;
      const gpt = await fetch(`https://apis-starlights-team.koyeb.app/starlight/gemini?text=${encodeURIComponent(prompt)}`);
      const res = await gpt.json();
      if (res?.result) await conn.reply(m.chat, res.result, m, { quoted: m });
    } catch {}
    return;
  }

  if (mentioned.length > 0 || text.length > 5) {
    try {
      const prompt = `Sei Ted, l'orso volgare e sarcastico del film. Rispondi in modo diretto, offensivo e irriverente alla frase: "${m.text}"`;
      const gpt = await fetch(`https://apis-starlights-team.koyeb.app/starlight/gemini?text=${encodeURIComponent(prompt)}`);
      const res = await gpt.json();
      if (res?.result) await conn.reply(m.chat, res.result, m, { quoted: m });
    } catch {}
  }

  return !0;
};

export default handler;