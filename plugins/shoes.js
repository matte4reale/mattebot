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
    modello: "adidas dunk 1",
    nome: "Adidas Dunk #1",
    sku: "AD00001",
    prezzo: "81",
    immagine: "https://images.stockx.com/images/Adidas-Dunk-Product.jpg",
    link: "https://stockx.com/adidas-dunk-1"
  },
  {
    modello: "jordan yeezy 2",
    nome: "Jordan Yeezy #2",
    sku: "JO00002",
    prezzo: "82",
    immagine: "https://images.stockx.com/images/Jordan-Yeezy-Product.jpg",
    link: "https://stockx.com/jordan-yeezy-2"
  },
  {
    modello: "new balance boost 3",
    nome: "New Balance Boost #3",
    sku: "NE00003",
    prezzo: "83",
    immagine: "https://images.stockx.com/images/New-Balance-Boost-Product.jpg",
    link: "https://stockx.com/new-balance-boost-3"
  },
  {
    modello: "puma retro 4",
    nome: "Puma Retro #4",
    sku: "PU00004",
    prezzo: "84",
    immagine: "https://images.stockx.com/images/Puma-Retro-Product.jpg",
    link: "https://stockx.com/puma-retro-4"
  },
  {
    modello: "reebok classic 5",
    nome: "Reebok Classic #5",
    sku: "RE00005",
    prezzo: "85",
    immagine: "https://images.stockx.com/images/Reebok-Classic-Product.jpg",
    link: "https://stockx.com/reebok-classic-5"
  },
  {
    modello: "asics suede 6",
    nome: "Asics Suede #6",
    sku: "AS00006",
    prezzo: "86",
    immagine: "https://images.stockx.com/images/Asics-Suede-Product.jpg",
    link: "https://stockx.com/asics-suede-6"
  },
  {
    modello: "converse gel-lyte 7",
    nome: "Converse Gel-Lyte #7",
    sku: "CO00007",
    prezzo: "87",
    immagine: "https://images.stockx.com/images/Converse-Gel-Lyte-Product.jpg",
    link: "https://stockx.com/converse-gel-lyte-7"
  },
  {
    modello: "nike air max 8",
    nome: "Nike Air Max #8",
    sku: "NI00008",
    prezzo: "88",
    immagine: "https://images.stockx.com/images/Nike-Air-Max-Product.jpg",
    link: "https://stockx.com/nike-air-max-8"
  },
  {
    modello: "adidas dunk 9",
    nome: "Adidas Dunk #9",
    sku: "AD00009",
    prezzo: "89",
    immagine: "https://images.stockx.com/images/Adidas-Dunk-Product.jpg",
    link: "https://stockx.com/adidas-dunk-9"
  },
  {
    modello: "jordan yeezy 10",
    nome: "Jordan Yeezy #10",
    sku: "JO00010",
    prezzo: "90",
    immagine: "https://images.stockx.com/images/Jordan-Yeezy-Product.jpg",
    link: "https://stockx.com/jordan-yeezy-10"
  },
  {
    modello: "new balance boost 11",
    nome: "New Balance Boost #11",
    sku: "NE00011",
    prezzo: "91",
    immagine: "https://images.stockx.com/images/New-Balance-Boost-Product.jpg",
    link: "https://stockx.com/new-balance-boost-11"
  },
  {
    modello: "puma retro 12",
    nome: "Puma Retro #12",
    sku: "PU00012",
    prezzo: "92",
    immagine: "https://images.stockx.com/images/Puma-Retro-Product.jpg",
    link: "https://stockx.com/puma-retro-12"
  },
  {
    modello: "reebok classic 13",
    nome: "Reebok Classic #13",
    sku: "RE00013",
    prezzo: "93",
    immagine: "https://images.stockx.com/images/Reebok-Classic-Product.jpg",
    link: "https://stockx.com/reebok-classic-13"
  },
  {
    modello: "asics suede 14",
    nome: "Asics Suede #14",
    sku: "AS00014",
    prezzo: "94",
    immagine: "https://images.stockx.com/images/Asics-Suede-Product.jpg",
    link: "https://stockx.com/asics-suede-14"
  },
  {
    modello: "converse gel-lyte 15",
    nome: "Converse Gel-Lyte #15",
    sku: "CO00015",
    prezzo: "95",
    immagine: "https://images.stockx.com/images/Converse-Gel-Lyte-Product.jpg",
    link: "https://stockx.com/converse-gel-lyte-15"
  },
  {
    modello: "nike air max 16",
    nome: "Nike Air Max #16",
    sku: "NI00016",
    prezzo: "96",
    immagine: "https://images.stockx.com/images/Nike-Air-Max-Product.jpg",
    link: "https://stockx.com/nike-air-max-16"
  },
  {
    modello: "adidas dunk 17",
    nome: "Adidas Dunk #17",
    sku: "AD00017",
    prezzo: "97",
    immagine: "https://images.stockx.com/images/Adidas-Dunk-Product.jpg",
    link: "https://stockx.com/adidas-dunk-17"
  },
  {
    modello: "jordan yeezy 18",
    nome: "Jordan Yeezy #18",
    sku: "JO00018",
    prezzo: "98",
    immagine: "https://images.stockx.com/images/Jordan-Yeezy-Product.jpg",
    link: "https://stockx.com/jordan-yeezy-18"
  },
  {
    modello: "new balance boost 19",
    nome: "New Balance Boost #19",
    sku: "NE00019",
    prezzo: "99",
    immagine: "https://images.stockx.com/images/New-Balance-Boost-Product.jpg",
    link: "https://stockx.com/new-balance-boost-19"
  },
  {
    modello: "puma retro 20",
    nome: "Puma Retro #20",
    sku: "PU00020",
    prezzo: "100",
    immagine: "https://images.stockx.com/images/Puma-Retro-Product.jpg",
    link: "https://stockx.com/puma-retro-20"
  },
  {
    modello: "reebok classic 21",
    nome: "Reebok Classic #21",
    sku: "RE00021",
    prezzo: "101",
    immagine: "https://images.stockx.com/images/Reebok-Classic-Product.jpg",
    link: "https://stockx.com/reebok-classic-21"
  },
  {
    modello: "asics suede 22",
    nome: "Asics Suede #22",
    sku: "AS00022",
    prezzo: "102",
    immagine: "https://images.stockx.com/images/Asics-Suede-Product.jpg",
    link: "https://stockx.com/asics-suede-22"
  },
  {
    modello: "converse gel-lyte 23",
    nome: "Converse Gel-Lyte #23",
    sku: "CO00023",
    prezzo: "103",
    immagine: "https://images.stockx.com/images/Converse-Gel-Lyte-Product.jpg",
    link: "https://stockx.com/converse-gel-lyte-23"
  },
  {
    modello: "nike air max 24",
    nome: "Nike Air Max #24",
    sku: "NI00024",
    prezzo: "104",
    immagine: "https://images.stockx.com/images/Nike-Air-Max-Product.jpg",
    link: "https://stockx.com/nike-air-max-24"
  },
  {
    modello: "adidas dunk 25",
    nome: "Adidas Dunk #25",
    sku: "AD00025",
    prezzo: "105",
    immagine: "https://images.stockx.com/images/Adidas-Dunk-Product.jpg",
    link: "https://stockx.com/adidas-dunk-25"
  },
  {
    modello: "jordan yeezy 26",
    nome: "Jordan Yeezy #26",
    sku: "JO00026",
    prezzo: "106",
    immagine: "https://images.stockx.com/images/Jordan-Yeezy-Product.jpg",
    link: "https://stockx.com/jordan-yeezy-26"
  },
  {
    modello: "new balance boost 27",
    nome: "New Balance Boost #27",
    sku: "NE00027",
    prezzo: "107",
    immagine: "https://images.stockx.com/images/New-Balance-Boost-Product.jpg",
    link: "https://stockx.com/new-balance-boost-27"
  },
  {
    modello: "puma retro 28",
    nome: "Puma Retro #28",
    sku: "PU00028",
    prezzo: "108",
    immagine: "https://images.stockx.com/images/Puma-Retro-Product.jpg",
    link: "https://stockx.com/puma-retro-28"
  },
  {
    modello: "reebok classic 29",
    nome: "Reebok Classic #29",
    sku: "RE00029",
    prezzo: "109",
    immagine: "https://images.stockx.com/images/Reebok-Classic-Product.jpg",
    link: "https://stockx.com/reebok-classic-29"
  },
  {
    modello: "asics suede 30",
    nome: "Asics Suede #30",
    sku: "AS00030",
    prezzo: "110",
    immagine: "https://images.stockx.com/images/Asics-Suede-Product.jpg",
    link: "https://stockx.com/asics-suede-30"
  },
  {
    modello: "converse gel-lyte 31",
    nome: "Converse Gel-Lyte #31",
    sku: "CO00031",
    prezzo: "111",
    immagine: "https://images.stockx.com/images/Converse-Gel-Lyte-Product.jpg",
    link: "https://stockx.com/converse-gel-lyte-31"
  },
  {
    modello: "nike air max 32",
    nome: "Nike Air Max #32",
    sku: "NI00032",
    prezzo: "112",
    immagine: "https://images.stockx.com/images/Nike-Air-Max-Product.jpg",
    link: "https://stockx.com/nike-air-max-32"
  },
  {
    modello: "adidas dunk 33",
    nome: "Adidas Dunk #33",
    sku: "AD00033",
    prezzo: "113",
    immagine: "https://images.stockx.com/images/Adidas-Dunk-Product.jpg",
    link: "https://stockx.com/adidas-dunk-33"
  },
  {
    modello: "jordan yeezy 34",
    nome: "Jordan Yeezy #34",
    sku: "JO00034",
    prezzo: "114",
    immagine: "https://images.stockx.com/images/Jordan-Yeezy-Product.jpg",
    link: "https://stockx.com/jordan-yeezy-34"
  },
  {
    modello: "new balance boost 35",
    nome: "New Balance Boost #35",
    sku: "NE00035",
    prezzo: "115",
    immagine: "https://images.stockx.com/images/New-Balance-Boost-Product.jpg",
    link: "https://stockx.com/new-balance-boost-35"
  },
  {
    modello: "puma retro 36",
    nome: "Puma Retro #36",
    sku: "PU00036",
    prezzo: "116",
    immagine: "https://images.stockx.com/images/Puma-Retro-Product.jpg",
    link: "https://stockx.com/puma-retro-36"
  },
  {
    modello: "reebok classic 37",
    nome: "Reebok Classic #37",
    sku: "RE00037",
    prezzo: "117",
    immagine: "https://images.stockx.com/images/Reebok-Classic-Product.jpg",
    link: "https://stockx.com/reebok-classic-37"
  },
  {
    modello: "asics suede 38",
    nome: "Asics Suede #38",
    sku: "AS00038",
    prezzo: "118",
    immagine: "https://images.stockx.com/images/Asics-Suede-Product.jpg",
    link: "https://stockx.com/asics-suede-38"
  },
  {
    modello: "converse gel-lyte 39",
    nome: "Converse Gel-Lyte #39",
    sku: "CO00039",
    prezzo: "119",
    immagine: "https://images.stockx.com/images/Converse-Gel-Lyte-Product.jpg",
    link: "https://stockx.com/converse-gel-lyte-39"
  },
  {
    modello: "nike air max 40",
    nome: "Nike Air Max #40",
    sku: "NI00040",
    prezzo: "120",
    immagine: "https://images.stockx.com/images/Nike-Air-Max-Product.jpg",
    link: "https://stockx.com/nike-air-max-40"
  },
  {
    modello: "adidas dunk 41",
    nome: "Adidas Dunk #41",
    sku: "AD00041",
    prezzo: "121",
    immagine: "https://images.stockx.com/images/Adidas-Dunk-Product.jpg",
    link: "https://stockx.com/adidas-dunk-41"
  },
  {
    modello: "jordan yeezy 42",
    nome: "Jordan Yeezy #42",
    sku: "JO00042",
    prezzo: "122",
    immagine: "https://images.stockx.com/images/Jordan-Yeezy-Product.jpg",
    link: "https://stockx.com/jordan-yeezy-42"
  },
  {
    modello: "new balance boost 43",
    nome: "New Balance Boost #43",
    sku: "NE00043",
    prezzo: "123",
    immagine: "https://images.stockx.com/images/New-Balance-Boost-Product.jpg",
    link: "https://stockx.com/new-balance-boost-43"
  },
  {
    modello: "puma retro 44",
    nome: "Puma Retro #44",
    sku: "PU00044",
    prezzo: "124",
    immagine: "https://images.stockx.com/images/Puma-Retro-Product.jpg",
    link: "https://stockx.com/puma-retro-44"
  },
  {
    modello: "reebok classic 45",
    nome: "Reebok Classic #45",
    sku: "RE00045",
    prezzo: "125",
    immagine: "https://images.stockx.com/images/Reebok-Classic-Product.jpg",
    link: "https://stockx.com/reebok-classic-45"
  },
  {
    modello: "asics suede 46",
    nome: "Asics Suede #46",
    sku: "AS00046",
    prezzo: "126",
    immagine: "https://images.stockx.com/images/Asics-Suede-Product.jpg",
    link: "https://stockx.com/asics-suede-46"
  },
  {
    modello: "converse gel-lyte 47",
    nome: "Converse Gel-Lyte #47",
    sku: "CO00047",
    prezzo: "127",
    immagine: "https://images.stockx.com/images/Converse-Gel-Lyte-Product.jpg",
    link: "https://stockx.com/converse-gel-lyte-47"
  },
  {
    modello: "nike air max 48",
    nome: "Nike Air Max #48",
    sku: "NI00048",
    prezzo: "128",
    immagine: "https://images.stockx.com/images/Nike-Air-Max-Product.jpg",
    link: "https://stockx.com/nike-air-max-48"
  },
];


let handler = async (m, { args, conn, command }) => {
  if (!args.length) {
    return m.reply('Scrivi il nome della scarpa.\nEsempio: `.listino jordan 4 thunder`\nOppure `.listino immagine <SKU>` per vedere la foto.');
  }

  // âž¤ Caso: .listino immagine <SKU>
  if (args[0].toLowerCase() === 'immagine' && args[1]) {
    const sku = args[1].toUpperCase();
    const scarpa = scarpe.find(s => s.sku === sku);
    if (!scarpa) return m.reply('âŒ Immagine non trovata per questo SKU.');

    return conn.sendMessage(m.chat, {
      image: { url: scarpa.immagine },
      caption: `ðŸ“· *Immagine scarpa SKU ${sku}*`
    }, { quoted: m });
  }

  // âž¤ Caso: .listino <modello>
  const query = args.join(' ').toLowerCase();
  const scarpa = scarpe.find(s => query.includes(s.modello));
  if (!scarpa) return m.reply('âŒ Scarpa non trovata nel listino.');

  const messaggio = `ðŸ‘Ÿ *${scarpa.nome}*\nðŸ†” SKU: ${scarpa.sku}\nðŸ’¸ Prezzo medio: ${scarpa.prezzo} $\nðŸ”— ${scarpa.link}`;

  await conn.sendMessage(m.chat, {
    text: messaggio,
    buttons: [
      {
        buttonId: `.listino immagine ${scarpa.sku}`,
        buttonText: { displayText: 'ðŸ“· Vedi Immagine' },
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