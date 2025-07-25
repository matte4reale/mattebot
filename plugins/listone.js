let handler = async (m, { args, conn }) => {
  let page = parseInt(args[0]) || 1;
  const perPage = 20;
  const offset = (page - 1) * perPage;

  let scarpe = [
    { nome: "Air Jordan 4 Retro Thunder (2023)" },
    { nome: "Nike Dunk Low Retro White Black Panda" },
    { nome: "adidas Yeezy Boost 350 V2 Zebra" },
    { nome: "Jordan 1 Retro Low OG SP Travis Scott Reverse Mocha" },
    { nome: "Air Jordan 1 Retro High OG Chicago Lost & Found" },
    { nome: "Nike Air Max 1 Anniversary Red" },
    { nome: "adidas Samba OG Cloud White" },
    { nome: "New Balance 550 White Grey" },
    { nome: "Nike Air Force 1 Low White" },
    { nome: "Vans Old Skool Black White" },
    { nome: "Nike Blazer Mid 77 Vintage White Black" },
    { nome: "adidas Superstar White Black" },
    { nome: "Converse Chuck Taylor All Star High" },
    { nome: "New Balance 990v5 Grey" },
    { nome: "Puma Suede Classic Black White" },
    { nome: "Asics Gel-Lyte III OG" },
    { nome: "Reebok Club C 85 White Green" },
    { nome: "Nike SB Dunk Low Ben & Jerry's Chunky Dunky" },
    { nome: "Jordan 11 Retro Cool Grey 2021" },
    { nome: "Nike Air Max 90 Infrared" },
    { nome: "Yeezy Boost 700 Wave Runner" },
    { nome: "Nike React Element 87 Black" },
    { nome: "adidas Ultra Boost 1.0 Triple White" },
    { nome: "Air Jordan 3 Retro White Cement Reimagined" },
    { nome: "Nike SB Dunk Low Travis Scott" },
    { nome: "adidas Yeezy Slide Bone" },
    { nome: "Jordan 6 Retro Carmine 2021" },
    { nome: "Nike Zoom Vomero 5 Oatmeal" },
    { nome: "New Balance 2002R Protection Pack Rain Cloud" },
    { nome: "Nike Dunk High Panda" },
    { nome: "adidas Forum Low Bad Bunny" },
    { nome: "Jordan 5 Retro Raging Bull Red 2021" },
    { nome: "Nike Air Max 97 Silver Bullet 2022" },
    { nome: "Reebok Question Mid Iverson" },
    { nome: "Puma RS-X Toys" },
    { nome: "Asics Gel-Kayano 14" },
    { nome: "Nike Air More Uptempo Black White" },
    { nome: "adidas Yeezy Foam RNNR Sand" },
    { nome: "Jordan 13 Retro Flint 2020" },
    { nome: "Nike LD Waffle Sacai White Nylon" },
    { nome: "New Balance 574 Classic Grey" },
    { nome: "Vans Sk8-Hi Black White" },
    { nome: "Nike Air Presto Triple Black" },
    { nome: "adidas ZX 8000 Aqua" },
    { nome: "Converse Run Star Hike Black" },
    { nome: "Nike Kyrie 7 Sisterhood" },
    { nome: "Jordan 12 Retro Royalty Taxi" },
    { nome: "Nike Air Huarache Triple White" },
    { nome: "Reebok Classic Leather White" },
    { nome: "adidas NMD R1 Triple Black" },
    { nome: "Puma Mirage Sport Remix" },
    { nome: "Nike Air Max Plus OG Hyper Blue" },
    { nome: "Jordan 4 Retro Red Thunder" },
    { nome: "Nike Air Max 270 React ENG" },
    { nome: "adidas Yeezy 700 V3 Azael" },
    { nome: "New Balance 997H Grey" },
    { nome: "Nike Dunk Low SE Lottery Green" },
    { nome: "Air Jordan 1 Mid SE Diamond" },
    { nome: "Nike Air Max 1 Patta Monarch" },
    { nome: "adidas Yeezy 350 V2 Beluga Reflective" },
    { nome: "Puma Future Rider Play On" },
    { nome: "Nike SB Dunk High Hawaii" },
    { nome: "Jordan 1 Retro High OG Pollen" },
    { nome: "Nike LeBron 18 Low Space Jam" },
    { nome: "Reebok Pump Omni Zone II Dee Brown" },
    { nome: "New Balance 327 Casablanca" },
    { nome: "Nike PG 6 What The" },
    { nome: "Jordan 1 Retro High OG Volt Gold" },
    { nome: "adidas Ultra 4D Core Black" },
    { nome: "Nike SB Dunk Low Court Purple" },
    { nome: "Jordan 1 Mid Chicago 2020" },
    { nome: "Nike Air Max 95 OG Neon" },
    { nome: "New Balance XC-72 Casablanca" },
    { nome: "adidas 4D Fusio Core Black" },
    { nome: "Puma MB.01 Rick and Morty" },
    { nome: "Nike Dunk Low Retro White Grey" },
    { nome: "Jordan 1 Retro High OG Bordeaux" },
    { nome: "Reebok Shaq Attaq Orlando" },
    { nome: "Nike Air Max 90 Duck Camo" },
    { nome: "New Balance 991 Made in UK Grey" },
    { nome: "adidas Yeezy Boost 350 V2 Onyx" },
    { nome: "Nike Zoom Freak 3 Project 34" },
    { nome: "Air Jordan 11 Retro Cool Grey" },
    { nome: "Nike Air Max Terrascape Plus" },
    { nome: "New Balance 9060 Sea Salt" },
    { nome: "adidas Forum Mid Blue Thread" },
    { nome: "Converse Chuck 70 Hi Off-White" },
    { nome: "Nike Air Zoom GT Cut 2" },
    { nome: "Jordan 7 Retro Cardinal 2022" },
    { nome: "Nike Air More Uptempo Slide Black" },
    { nome: "Reebok Answer IV White Red" },
    { nome: "New Balance 5740 Protection Pack" },
    { nome: "Nike Waffle One Summit White" },
    { nome: "adidas Nite Jogger OG" },
    { nome: "Nike Cortez Basic Leather White Black" },
    { nome: "Puma Slipstream Lo Retro" },
    { nome: "Nike Kyrie Infinity Alchemy" },
    { nome: "Air Jordan 5 Green Bean 2022" },
    { nome: "Nike Air Max BW OG Persian Violet" },
    { nome: "New Balance 990v3 Levi’s Grey" },
    { nome: "adidas ZX 2K Boost Triple Black" },
    { nome: "Nike Dunk High University Red" }
  ];

  const totalPages = Math.ceil(scarpe.length / perPage);
  const scarpeDaMostrare = scarpe.slice(offset, offset + perPage);

  if (!scarpeDaMostrare.length) {
    return m.reply(`📭 Fine elenco. Nessun altro modello disponibile per la pagina ${page}.`);
  }

  const lista = scarpeDaMostrare.map((s, i) => `${offset + i + 1}. ${s.nome}`).join('\n');
  const messaggio = `📦 *Lista modelli (pagina ${page}/${totalPages}):*\n\n${lista}\n\n✅ Totale: ${scarpe.length} modelli\n➡️ Usa \`.listinoall ${page + 1}\` per la prossima pagina\n🆕 *Nuove scarpe in arrivo!*`;

  return conn.sendMessage(m.chat, { text: messaggio }, { quoted: m });
};

handler.command = /^listinoall$/i;
handler.help = ['listinoall [pagina]'];
handler.tags = ['shop'];

export default handler;