let handler = async (m, { args, conn, command }) => {
  if (!args.length) {
    return m.reply('Scrivi il nome della scarpa.\nEsempio: `.listino jordan 4 thunder`\nOppure `.listino immagine <SKU>` per vedere la foto.');
  }

  const scarpe = [
    {
      modello: "jordan 4 thunder",
      nome: "Air Jordan 4 Retro Thunder (2023)",
      sku: "DH6927-017",
      prezzo: "280",
      immagine: "https://images.stockx.com/images/Air-Jordan-4-Retro-Thunder-2023-Product.jpg",
      link: "https://stockx.com/air-jordan-4-retro-thunder-2023"
    },
    {
      modello: "nike dunk low panda",
      nome: "Nike Dunk Low Retro White Black Panda",
      sku: "DD1391-100",
      prezzo: "160",
      immagine: "https://images.stockx.com/images/Nike-Dunk-Low-Retro-White-Black-Panda-Product.jpg",
      link: "https://stockx.com/nike-dunk-low-retro-white-black-2021"
    },
    {
      modello: "yeezy 350 zebra",
      nome: "adidas Yeezy Boost 350 V2 Zebra",
      sku: "CP9654",
      prezzo: "290",
      immagine: "https://images.stockx.com/images/adidas-Yeezy-Boost-350-V2-Zebra-Product.jpg",
      link: "https://stockx.com/adidas-yeezy-boost-350-v2-zebra"
    },
    {
      modello: "jordan 1 chicago",
      nome: "Air Jordan 1 Retro High OG Chicago Lost & Found",
      sku: "DZ5485-612",
      prezzo: "400",
      immagine: "https://images.stockx.com/images/Air-Jordan-1-Retro-High-OG-Chicago-Lost-and-Found-Product.jpg",
      link: "https://stockx.com/air-jordan-1-retro-high-og-chicago-lost-and-found"
    },
    {
      modello: "travis scott 1 low",
      nome: "Jordan 1 Retro Low OG SP Travis Scott Reverse Mocha",
      sku: "DM7866-162",
      prezzo: "680",
      immagine: "https://images.stockx.com/images/Air-Jordan-1-Retro-Low-OG-SP-Travis-Scott-Reverse-Mocha-Product.jpg",
      link: "https://stockx.com/jordan-1-retro-low-og-sp-travis-scott-reverse-mocha"
    },
    {
      modello: "yeezy superstar high",
      nome: "Yeezy Superstar High",
      sku: "YESUHI0001",
      prezzo: "101",
      immagine: "https://images.stockx.com/images/sneaker-1.jpg",
      link: "https://stockx.com/yeezy-superstar-high-1"
    },
    {
      modello: "new balance classic runner",
      nome: "New Balance Classic Runner",
      sku: "NECLRU0002",
      prezzo: "102",
      immagine: "https://images.stockx.com/images/sneaker-2.jpg",
      link: "https://stockx.com/new-balance-classic-runner-2"
    },
    {
      modello: "jordan gel-lyte retro",
      nome: "Jordan Gel-Lyte Retro",
      sku: "JOGERE0003",
      prezzo: "103",
      immagine: "https://images.stockx.com/images/sneaker-3.jpg",
      link: "https://stockx.com/jordan-gel-lyte-retro-3"
    },
    {
      modello: "puma classic high",
      nome: "Puma Classic High",
      sku: "PUCLHI0004",
      prezzo: "104",
      immagine: "https://images.stockx.com/images/sneaker-4.jpg",
      link: "https://stockx.com/puma-classic-high-4"
    },
    {
      modello: "new balance air max slide",
      nome: "New Balance Air Max Slide",
      sku: "NEAISL0005",
      prezzo: "105",
      immagine: "https://images.stockx.com/images/sneaker-5.jpg",
      link: "https://stockx.com/new-balance-air-max-slide-5"
    },
    {
      modello: "puma react slide",
      nome: "Puma React Slide",
      sku: "PURESL0006",
      prezzo: "106",
      immagine: "https://images.stockx.com/images/sneaker-6.jpg",
      link: "https://stockx.com/puma-react-slide-6"
    },
    {
      modello: "jordan skate runner",
      nome: "Jordan Skate Runner",
      sku: "JOSKRU0007",
      prezzo: "107",
      immagine: "https://images.stockx.com/images/sneaker-7.jpg",
      link: "https://stockx.com/jordan-skate-runner-7"
    },
    {
      modello: "jordan gel-lyte runner",
      nome: "Jordan Gel-Lyte Runner",
      sku: "JOGERU0008",
      prezzo: "108",
      immagine: "https://images.stockx.com/images/sneaker-8.jpg",
      link: "https://stockx.com/jordan-gel-lyte-runner-8"
    },
    {
      modello: "adidas forum canvas",
      nome: "Adidas Forum Canvas",
      sku: "ADFOCA0009",
      prezzo: "109",
      immagine: "https://images.stockx.com/images/sneaker-9.jpg",
      link: "https://stockx.com/adidas-forum-canvas-9"
    },
    {
      modello: "yeezy classic high",
      nome: "Yeezy Classic High",
      sku: "YECLHI0010",
      prezzo: "110",
      immagine: "https://images.stockx.com/images/sneaker-10.jpg",
      link: "https://stockx.com/yeezy-classic-high-10"
    },
    {
      modello: "new balance skate high",
      nome: "New Balance Skate High",
      sku: "NESKHI0011",
      prezzo: "111",
      immagine: "https://images.stockx.com/images/sneaker-11.jpg",
      link: "https://stockx.com/new-balance-skate-high-11"
    },
    {
      modello: "nike forum high",
      nome: "Nike Forum High",
      sku: "NIFOHI0012",
      prezzo: "112",
      immagine: "https://images.stockx.com/images/sneaker-12.jpg",
      link: "https://stockx.com/nike-forum-high-12"
    },
    {
      modello: "yeezy classic low",
      nome: "Yeezy Classic Low",
      sku: "YECLLO0013",
      prezzo: "113",
      immagine: "https://images.stockx.com/images/sneaker-13.jpg",
      link: "https://stockx.com/yeezy-classic-low-13"
    },
    {
      modello: "asics superstar boost",
      nome: "Asics Superstar Boost",
      sku: "ASSUBO0014",
      prezzo: "114",
      immagine: "https://images.stockx.com/images/sneaker-14.jpg",
      link: "https://stockx.com/asics-superstar-boost-14"
    },
    {
      modello: "asics classic canvas",
      nome: "Asics Classic Canvas",
      sku: "ASCLCA0015",
      prezzo: "115",
      immagine: "https://images.stockx.com/images/sneaker-15.jpg",
      link: "https://stockx.com/asics-classic-canvas-15"
    },
    {
      modello: "reebok gel-lyte slide",
      nome: "Reebok Gel-Lyte Slide",
      sku: "REGESL0016",
      prezzo: "116",
      immagine: "https://images.stockx.com/images/sneaker-16.jpg",
      link: "https://stockx.com/reebok-gel-lyte-slide-16"
    },
    {
      modello: "adidas superstar runner",
      nome: "Adidas Superstar Runner",
      sku: "ADSURU0017",
      prezzo: "117",
      immagine: "https://images.stockx.com/images/sneaker-17.jpg",
      link: "https://stockx.com/adidas-superstar-runner-17"
    },
    {
      modello: "yeezy dunk boost",
      nome: "Yeezy Dunk Boost",
      sku: "YEDUBO0018",
      prezzo: "118",
      immagine: "https://images.stockx.com/images/sneaker-18.jpg",
      link: "https://stockx.com/yeezy-dunk-boost-18"
    },
    {
      modello: "yeezy club c zoom",
      nome: "Yeezy Club C Zoom",
      sku: "YECLZO0019",
      prezzo: "119",
      immagine: "https://images.stockx.com/images/sneaker-19.jpg",
      link: "https://stockx.com/yeezy-club-c-zoom-19"
    },
    {
      modello: "reebok forum flyknit",
      nome: "Reebok Forum Flyknit",
      sku: "REFOFL0020",
      prezzo: "120",
      immagine: "https://images.stockx.com/images/sneaker-20.jpg",
      link: "https://stockx.com/reebok-forum-flyknit-20"
    }
  ];

  if (args[0].toLowerCase() === 'immagine' && args[1]) {
    const sku = args[1].toUpperCase();
    const scarpa = scarpe.find(s => s.sku === sku);
    if (!scarpa) return m.reply('❌ Immagine non trovata per questo SKU.');

    return conn.sendMessage(m.chat, {
      image: { url: scarpa.immagine },
      caption: `📷 *Immagine scarpa SKU ${sku}*`
    }, { quoted: m });
  }

  const query = args.join(' ').toLowerCase();
  const scarpa = scarpe.find(s => query.includes(s.modello));
  if (!scarpa) return m.reply('❌ Scarpa non trovata nel listino.');

  const messaggio = `👟 *${scarpa.nome}*\n🆔 SKU: ${scarpa.sku}\n💸 Prezzo medio: ${scarpa.prezzo} $\n🔗 ${scarpa.link}`;

  await conn.sendMessage(m.chat, {
    text: messaggio,
    buttons: [
      {
        buttonId: `.listino immagine ${scarpa.sku}`,
        buttonText: { displayText: '📷 Vedi Immagine' },
        type: 1
      }
    ],
    footer: 'Premi il pulsante per vedere la scarpa.',
    headerType: 1
  }, { quoted: m });
};

handler.command = /^listino$/i;
handler.help = ['listino <modello>', 'listino immagine <sku>'];
handler.tags = ['shop'];

export default handler;