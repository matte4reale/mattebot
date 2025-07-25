let handler = async (m, { conn }) => {
  const scarpe = [
    {
      modello: "jordan 4 thunder",
      nome: "Air Jordan 4 Retro Thunder (2023)",
      sku: "DH6927-017",
      prezzo: "280",
      link: "https://stockx.com/air-jordan-4-retro-thunder-2023"
    },
    {
      modello: "travis scott 1 low",
      nome: "Jordan 1 Retro Low OG SP Travis Scott Reverse Mocha",
      sku: "DM7866-162",
      prezzo: "680",
      link: "https://stockx.com/jordan-1-retro-low-og-sp-travis-scott-reverse-mocha"
    },
    {
      modello: "nike dunk low photon",
      nome: "Nike Dunk Low Photon Dust (Women's)",
      sku: "DD1503-103",
      prezzo: "160",
      link: "https://stockx.com/nike-dunk-low-photon-dust-womens"
    },
    {
      modello: "air jordan 1 mid ice blue",
      nome: "Air Jordan 1 Mid Ice Blue (Women's)",
      sku: "BQ6472-114",
      prezzo: "150",
      link: "https://stockx.com/air-jordan-1-mid-ice-blue-womens"
    },
    {
      modello: "adidas campus 00s",
      nome: "adidas Campus 00s Grey White",
      sku: "HQ8708",
      prezzo: "140",
      link: "https://stockx.com/adidas-campus-00s-grey-white"
    },
    // ... aggiungi qui il resto delle 50 scarpe
  ];

  let messaggio = '*📦 LISTINO COMPLETO 📦*\n\n';

  for (const s of scarpe) {
    messaggio += `👟 *${s.nome}*\n🆔 SKU: ${s.sku}\n💸 ${s.prezzo} $\n🔗 ${s.link}\n\n`;
  }

  messaggio += '🆕 *Nuove scarpe in arrivo...*';

  await conn.sendMessage(m.chat, { text: messaggio }, { quoted: m });
};

handler.command = /^listinoall$/i;
handler.help = ['listinoall'];
handler.tags = ['shop'];

export default handler;