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
      modello: "travis scott 1 low",
      nome: "Jordan 1 Retro Low OG SP Travis Scott Reverse Mocha",
      sku: "DM7866-162",
      prezzo: "680",
      immagine: "https://images.stockx.com/images/Air-Jordan-1-Retro-Low-OG-SP-Travis-Scott-Reverse-Mocha-Product.jpg",
      link: "https://stockx.com/jordan-1-retro-low-og-sp-travis-scott-reverse-mocha"
    },
    {
      modello: "yeezy foam runner onyx",
      nome: "adidas Yeezy Foam RNNR Onyx",
      sku: "HP8739",
      prezzo: "160",
      immagine: "https://images.stockx.com/images/adidas-Yeezy-Foam-RNNR-Onyx-Product.jpg",
      link: "https://stockx.com/adidas-yeezy-foam-rnnr-onyx"
    },
    {
      modello: "nike sb dunk low born x raised",
      nome: "Nike SB Dunk Low Born x Raised One Block at a Time",
      sku: "FN7819-400",
      prezzo: "370",
      immagine: "https://images.stockx.com/images/Nike-SB-Dunk-Low-Born-x-Raised-One-Block-At-A-Time-Product.jpg",
      link: "https://stockx.com/nike-sb-dunk-low-born-x-raised-one-block-at-a-time"
    },
    {
      modello: "jordan 1 high og lucky green",
      nome: "Air Jordan 1 Retro High OG Lucky Green",
      sku: "DZ5485-031",
      prezzo: "220",
      immagine: "https://images.stockx.com/images/Air-Jordan-1-Retro-High-OG-Lucky-Green-2023-Product.jpg",
      link: "https://stockx.com/air-jordan-1-retro-high-og-lucky-green-2023"
    },
    {
      modello: "nike dunk low university red",
      nome: "Nike Dunk Low University Red",
      sku: "CU1727-100",
      prezzo: "190",
      immagine: "https://images.stockx.com/images/Nike-Dunk-Low-SP-University-Red-Product.jpg",
      link: "https://stockx.com/nike-dunk-low-sp-university-red"
    },
    {
      modello: "adidas samba og black white",
      nome: "adidas Samba OG Cloud White Core Black",
      sku: "B75807",
      prezzo: "100",
      immagine: "https://images.stockx.com/images/adidas-Samba-OG-Cloud-White-Core-Black-Product.jpg",
      link: "https://stockx.com/adidas-samba-og-cloud-white-core-black"
    },
    {
      modello: "new balance 550 white grey",
      nome: "New Balance 550 White Grey",
      sku: "BB550PB1",
      prezzo: "140",
      immagine: "https://images.stockx.com/images/New-Balance-550-White-Grey-Product.jpg",
      link: "https://stockx.com/new-balance-550-white-grey"
    },
    {
      modello: "nike air max 1 patta waves monarch",
      nome: "Nike Air Max 1 Patta Waves Monarch",
      sku: "DH1348-001",
      prezzo: "260",
      immagine: "https://images.stockx.com/images/Nike-Air-Max-1-Patta-Waves-Monarch-Product.jpg",
      link: "https://stockx.com/nike-air-max-1-patta-waves-monarch"
    },
    {
      modello: "jordan 3 white cement reimagined",
      nome: "Air Jordan 3 White Cement Reimagined",
      sku: "DN3707-100",
      prezzo: "280",
      immagine: "https://images.stockx.com/images/Air-Jordan-3-Retro-White-Cement-Reimagined-Product.jpg",
      link: "https://stockx.com/air-jordan-3-retro-white-cement-reimagined"
    },
    {
      modello: "nike air force 1 low white",
      nome: "Nike Air Force 1 '07 White",
      sku: "CW2288-111",
      prezzo: "110",
      immagine: "https://images.stockx.com/images/Nike-Air-Force-1-07-White-Product.jpg",
      link: "https://stockx.com/nike-air-force-1-07-white"
    },
    {
      modello: "adidas campus 00s grey white",
      nome: "adidas Campus 00s Grey White",
      sku: "HQ8708",
      prezzo: "110",
      immagine: "https://images.stockx.com/images/adidas-Campus-00s-Grey-White-Product.jpg",
      link: "https://stockx.com/adidas-campus-00s-grey-white"
    },
    {
      modello: "jordan 11 cherry",
      nome: "Air Jordan 11 Retro Cherry (2022)",
      sku: "CT8012-116",
      prezzo: "280",
      immagine: "https://images.stockx.com/images/Air-Jordan-11-Retro-Cherry-2022-Product.jpg",
      link: "https://stockx.com/air-jordan-11-retro-cherry-2022"
    },
    {
      modello: "nike sb dunk low marty mcfly",
      nome: "Nike SB Dunk Low Marty McFly",
      sku: "313170-022",
      prezzo: "500",
      immagine: "https://images.stockx.com/images/Nike-SB-Dunk-Low-Marty-McFly-Product.jpg",
      link: "https://stockx.com/nike-sb-dunk-low-marty-mcfly"
    },
    {
      modello: "nike air max 97 silver bullet",
      nome: "Nike Air Max 97 Silver Bullet",
      sku: "884421-001",
      prezzo: "180",
      immagine: "https://images.stockx.com/images/Nike-Air-Max-97-Silver-Bullet-Product.jpg",
      link: "https://stockx.com/nike-air-max-97-silver-bullet"
    },
    {
      modello: "nike air max plus triple black",
      nome: "Nike Air Max Plus Triple Black",
      sku: "604133-050",
      prezzo: "190",
      immagine: "https://images.stockx.com/images/Nike-Air-Max-Plus-Triple-Black-Product.jpg",
      link: "https://stockx.com/nike-air-max-plus-triple-black"
    },
    {
      modello: "nike air max 95 og neon",
      nome: "Nike Air Max 95 OG Neon (2020)",
      sku: "CT1689-001",
      prezzo: "200",
      immagine: "https://images.stockx.com/images/Nike-Air-Max-95-OG-Neon-2020-Product.jpg",
      link: "https://stockx.com/nike-air-max-95-og-neon-2020"
    },
    {
      modello: "adidas yeezy boost 350 v2 beluga",
      nome: "adidas Yeezy Boost 350 V2 Beluga Reflective",
      sku: "GW1229",
      prezzo: "310",
      immagine: "https://images.stockx.com/images/adidas-Yeezy-Boost-350-V2-Beluga-Reflective-Product.jpg",
      link: "https://stockx.com/adidas-yeezy-boost-350-v2-beluga-reflective"
    },
    {
      modello: "new balance 9060 sea salt",
      nome: "New Balance 9060 Sea Salt",
      sku: "U9060ECA",
      prezzo: "150",
      immagine: "https://images.stockx.com/images/New-Balance-9060-Sea-Salt-Product.jpg",
      link: "https://stockx.com/new-balance-9060-sea-salt"
    },
    {
      modello: "jordan 6 carmine",
      nome: "Air Jordan 6 Retro Carmine (2021)",
      sku: "CT8529-106",
      prezzo: "240",
      immagine: "https://images.stockx.com/images/Air-Jordan-6-Retro-Carmine-2021-Product.jpg",
      link: "https://stockx.com/air-jordan-6-retro-carmine-2021"
    },
    {
      modello: "nike dunk low photon dust",
      nome: "Nike Dunk Low Photon Dust (Women's)",
      sku: "DD1503-103",
      prezzo: "150",
      immagine: "https://images.stockx.com/images/Nike-Dunk-Low-Photon-Dust-W-Product.jpg",
      link: "https://stockx.com/nike-dunk-low-photon-dust-w"
    },
    {
      modello: "new balance 2002r protection pack grey",
      nome: "New Balance 2002R Protection Pack Rain Cloud",
      sku: "M2002RDA",
      prezzo: "230",
      immagine: "https://images.stockx.com/images/New-Balance-2002R-Protection-Pack-Rain-Cloud-Product.jpg",
      link: "https://stockx.com/new-balance-2002r-protection-pack-rain-cloud"
    },
    {
      modello: "adidas ultraboost 1.0 dna",
      nome: "adidas UltraBoost 1.0 DNA Cloud White",
      sku: "GY9125",
      prezzo: "180",
      immagine: "https://images.stockx.com/images/adidas-Ultraboost-1-0-DNA-Cloud-White-Product.jpg",
      link: "https://stockx.com/adidas-ultraboost-1-0-dna-cloud-white"
    }
  ];

  // ➤ Caso immagine
  if (args[0].toLowerCase() === 'immagine' && args[1]) {
    const sku = args[1].toUpperCase();
    const scarpa = scarpe.find(s => s.sku === sku);
    if (!scarpa) return m.reply('❌ Immagine non trovata per questo SKU.');

    return conn.sendMessage(m.chat, {
      image: { url: scarpa.immagine },
      caption: `📷 *Immagine scarpa SKU ${sku}*`
    }, { quoted: m });
  }

  // ➤ Caso listino
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