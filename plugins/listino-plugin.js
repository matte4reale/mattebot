let handler = async (m, { args, conn, command }) => {
  const scarpe = [
  {
    "modello": "adidas yeezy 1",
    "nome": "Adidas Yeezy 1",
    "sku": "ADYE0001",
    "prezzo": "242",
    "immagine": "https://images.stockx.com/images/Adidas-Yeezy-1.jpg",
    "link": "https://stockx.com/adidas-yeezy-1"
  },
  {
    "modello": "nike dunk 2",
    "nome": "Nike Dunk 2",
    "sku": "NIDU0002",
    "prezzo": "305",
    "immagine": "https://images.stockx.com/images/Nike-Dunk-2.jpg",
    "link": "https://stockx.com/nike-dunk-2"
  },
  {
    "modello": "jordan classic 3",
    "nome": "Jordan Classic 3",
    "sku": "JOCL0003",
    "prezzo": "198",
    "immagine": "https://images.stockx.com/images/Jordan-Classic-3.jpg",
    "link": "https://stockx.com/jordan-classic-3"
  },
  {
    "modello": "adidas classic 4",
    "nome": "Adidas Classic 4",
    "sku": "ADCL0004",
    "prezzo": "180",
    "immagine": "https://images.stockx.com/images/Adidas-Classic-4.jpg",
    "link": "https://stockx.com/adidas-classic-4"
  },
  {
    "modello": "jordan retro 5",
    "nome": "Jordan Retro 5",
    "sku": "JORE0005",
    "prezzo": "317",
    "immagine": "https://images.stockx.com/images/Jordan-Retro-5.jpg",
    "link": "https://stockx.com/jordan-retro-5"
  },
  {
    "modello": "reebok chuck taylor 6",
    "nome": "Reebok Chuck Taylor 6",
    "sku": "RECH0006",
    "prezzo": "233",
    "immagine": "https://images.stockx.com/images/Reebok-Chuck Taylor-6.jpg",
    "link": "https://stockx.com/reebok-chuck taylor-6"
  },
  {
    "modello": "jordan classic 7",
    "nome": "Jordan Classic 7",
    "sku": "JOCL0007",
    "prezzo": "234",
    "immagine": "https://images.stockx.com/images/Jordan-Classic-7.jpg",
    "link": "https://stockx.com/jordan-classic-7"
  },
  {
    "modello": "new balance yeezy 8",
    "nome": "New Balance Yeezy 8",
    "sku": "NEYE0008",
    "prezzo": "129",
    "immagine": "https://images.stockx.com/images/New Balance-Yeezy-8.jpg",
    "link": "https://stockx.com/new balance-yeezy-8"
  },
  {
    "modello": "converse dunk 9",
    "nome": "Converse Dunk 9",
    "sku": "CODU0009",
    "prezzo": "276",
    "immagine": "https://images.stockx.com/images/Converse-Dunk-9.jpg",
    "link": "https://stockx.com/converse-dunk-9"
  },
  {
    "modello": "puma ultra boost 10",
    "nome": "Puma Ultra Boost 10",
    "sku": "PUUL0010",
    "prezzo": "298",
    "immagine": "https://images.stockx.com/images/Puma-Ultra Boost-10.jpg",
    "link": "https://stockx.com/puma-ultra boost-10"
  },
  {
    "modello": "reebok gel-lyte 11",
    "nome": "Reebok Gel-Lyte 11",
    "sku": "REGE0011",
    "prezzo": "154",
    "immagine": "https://images.stockx.com/images/Reebok-Gel-Lyte-11.jpg",
    "link": "https://stockx.com/reebok-gel-lyte-11"
  },
  {
    "modello": "jordan dunk 12",
    "nome": "Jordan Dunk 12",
    "sku": "JODU0012",
    "prezzo": "280",
    "immagine": "https://images.stockx.com/images/Jordan-Dunk-12.jpg",
    "link": "https://stockx.com/jordan-dunk-12"
  },
  {
    "modello": "puma ultra boost 13",
    "nome": "Puma Ultra Boost 13",
    "sku": "PUUL0013",
    "prezzo": "231",
    "immagine": "https://images.stockx.com/images/Puma-Ultra Boost-13.jpg",
    "link": "https://stockx.com/puma-ultra boost-13"
  },
  {
    "modello": "converse gel-lyte 14",
    "nome": "Converse Gel-Lyte 14",
    "sku": "COGE0014",
    "prezzo": "81",
    "immagine": "https://images.stockx.com/images/Converse-Gel-Lyte-14.jpg",
    "link": "https://stockx.com/converse-gel-lyte-14"
  },
  {
    "modello": "reebok ultra boost 15",
    "nome": "Reebok Ultra Boost 15",
    "sku": "REUL0015",
    "prezzo": "163",
    "immagine": "https://images.stockx.com/images/Reebok-Ultra Boost-15.jpg",
    "link": "https://stockx.com/reebok-ultra boost-15"
  },
  {
    "modello": "converse dunk 16",
    "nome": "Converse Dunk 16",
    "sku": "CODU0016",
    "prezzo": "372",
    "immagine": "https://images.stockx.com/images/Converse-Dunk-16.jpg",
    "link": "https://stockx.com/converse-dunk-16"
  },
  {
    "modello": "converse retro 17",
    "nome": "Converse Retro 17",
    "sku": "CORE0017",
    "prezzo": "366",
    "immagine": "https://images.stockx.com/images/Converse-Retro-17.jpg",
    "link": "https://stockx.com/converse-retro-17"
  },
  {
    "modello": "nike dunk 18",
    "nome": "Nike Dunk 18",
    "sku": "NIDU0018",
    "prezzo": "161",
    "immagine": "https://images.stockx.com/images/Nike-Dunk-18.jpg",
    "link": "https://stockx.com/nike-dunk-18"
  },
  {
    "modello": "nike air max 19",
    "nome": "Nike Air Max 19",
    "sku": "NIAI0019",
    "prezzo": "108",
    "immagine": "https://images.stockx.com/images/Nike-Air Max-19.jpg",
    "link": "https://stockx.com/nike-air max-19"
  },
  {
    "modello": "nike gel-lyte 20",
    "nome": "Nike Gel-Lyte 20",
    "sku": "NIGE0020",
    "prezzo": "94",
    "immagine": "https://images.stockx.com/images/Nike-Gel-Lyte-20.jpg",
    "link": "https://stockx.com/nike-gel-lyte-20"
  },
  {
    "modello": "reebok chuck taylor 21",
    "nome": "Reebok Chuck Taylor 21",
    "sku": "RECH0021",
    "prezzo": "94",
    "immagine": "https://images.stockx.com/images/Reebok-Chuck Taylor-21.jpg",
    "link": "https://stockx.com/reebok-chuck taylor-21"
  },
  {
    "modello": "asics retro 22",
    "nome": "Asics Retro 22",
    "sku": "ASRE0022",
    "prezzo": "237",
    "immagine": "https://images.stockx.com/images/Asics-Retro-22.jpg",
    "link": "https://stockx.com/asics-retro-22"
  },
  {
    "modello": "nike yeezy 23",
    "nome": "Nike Yeezy 23",
    "sku": "NIYE0023",
    "prezzo": "238",
    "immagine": "https://images.stockx.com/images/Nike-Yeezy-23.jpg",
    "link": "https://stockx.com/nike-yeezy-23"
  },
  {
    "modello": "reebok yeezy 24",
    "nome": "Reebok Yeezy 24",
    "sku": "REYE0024",
    "prezzo": "337",
    "immagine": "https://images.stockx.com/images/Reebok-Yeezy-24.jpg",
    "link": "https://stockx.com/reebok-yeezy-24"
  },
  {
    "modello": "asics ultra boost 25",
    "nome": "Asics Ultra Boost 25",
    "sku": "ASUL0025",
    "prezzo": "268",
    "immagine": "https://images.stockx.com/images/Asics-Ultra Boost-25.jpg",
    "link": "https://stockx.com/asics-ultra boost-25"
  },
  {
    "modello": "reebok yeezy 26",
    "nome": "Reebok Yeezy 26",
    "sku": "REYE0026",
    "prezzo": "118",
    "immagine": "https://images.stockx.com/images/Reebok-Yeezy-26.jpg",
    "link": "https://stockx.com/reebok-yeezy-26"
  },
  {
    "modello": "reebok retro 27",
    "nome": "Reebok Retro 27",
    "sku": "RERE0027",
    "prezzo": "383",
    "immagine": "https://images.stockx.com/images/Reebok-Retro-27.jpg",
    "link": "https://stockx.com/reebok-retro-27"
  },
  {
    "modello": "puma yeezy 28",
    "nome": "Puma Yeezy 28",
    "sku": "PUYE0028",
    "prezzo": "83",
    "immagine": "https://images.stockx.com/images/Puma-Yeezy-28.jpg",
    "link": "https://stockx.com/puma-yeezy-28"
  },
  {
    "modello": "new balance yeezy 29",
    "nome": "New Balance Yeezy 29",
    "sku": "NEYE0029",
    "prezzo": "286",
    "immagine": "https://images.stockx.com/images/New Balance-Yeezy-29.jpg",
    "link": "https://stockx.com/new balance-yeezy-29"
  },
  {
    "modello": "jordan dunk 30",
    "nome": "Jordan Dunk 30",
    "sku": "JODU0030",
    "prezzo": "334",
    "immagine": "https://images.stockx.com/images/Jordan-Dunk-30.jpg",
    "link": "https://stockx.com/jordan-dunk-30"
  },
  {
    "modello": "nike ultra boost 31",
    "nome": "Nike Ultra Boost 31",
    "sku": "NIUL0031",
    "prezzo": "306",
    "immagine": "https://images.stockx.com/images/Nike-Ultra Boost-31.jpg",
    "link": "https://stockx.com/nike-ultra boost-31"
  },
  {
    "modello": "reebok dunk 32",
    "nome": "Reebok Dunk 32",
    "sku": "REDU0032",
    "prezzo": "313",
    "immagine": "https://images.stockx.com/images/Reebok-Dunk-32.jpg",
    "link": "https://stockx.com/reebok-dunk-32"
  },
  {
    "modello": "jordan retro 33",
    "nome": "Jordan Retro 33",
    "sku": "JORE0033",
    "prezzo": "228",
    "immagine": "https://images.stockx.com/images/Jordan-Retro-33.jpg",
    "link": "https://stockx.com/jordan-retro-33"
  },
  {
    "modello": "converse classic 34",
    "nome": "Converse Classic 34",
    "sku": "COCL0034",
    "prezzo": "160",
    "immagine": "https://images.stockx.com/images/Converse-Classic-34.jpg",
    "link": "https://stockx.com/converse-classic-34"
  },
  {
    "modello": "converse gel-lyte 35",
    "nome": "Converse Gel-Lyte 35",
    "sku": "COGE0035",
    "prezzo": "293",
    "immagine": "https://images.stockx.com/images/Converse-Gel-Lyte-35.jpg",
    "link": "https://stockx.com/converse-gel-lyte-35"
  },
  {
    "modello": "asics gel-lyte 36",
    "nome": "Asics Gel-Lyte 36",
    "sku": "ASGE0036",
    "prezzo": "138",
    "immagine": "https://images.stockx.com/images/Asics-Gel-Lyte-36.jpg",
    "link": "https://stockx.com/asics-gel-lyte-36"
  },
  {
    "modello": "converse yeezy 37",
    "nome": "Converse Yeezy 37",
    "sku": "COYE0037",
    "prezzo": "373",
    "immagine": "https://images.stockx.com/images/Converse-Yeezy-37.jpg",
    "link": "https://stockx.com/converse-yeezy-37"
  },
  {
    "modello": "jordan classic 38",
    "nome": "Jordan Classic 38",
    "sku": "JOCL0038",
    "prezzo": "306",
    "immagine": "https://images.stockx.com/images/Jordan-Classic-38.jpg",
    "link": "https://stockx.com/jordan-classic-38"
  },
  {
    "modello": "new balance retro 39",
    "nome": "New Balance Retro 39",
    "sku": "NERE0039",
    "prezzo": "387",
    "immagine": "https://images.stockx.com/images/New Balance-Retro-39.jpg",
    "link": "https://stockx.com/new balance-retro-39"
  },
  {
    "modello": "jordan air max 40",
    "nome": "Jordan Air Max 40",
    "sku": "JOAI0040",
    "prezzo": "154",
    "immagine": "https://images.stockx.com/images/Jordan-Air Max-40.jpg",
    "link": "https://stockx.com/jordan-air max-40"
  },
  {
    "modello": "puma classic 41",
    "nome": "Puma Classic 41",
    "sku": "PUCL0041",
    "prezzo": "309",
    "immagine": "https://images.stockx.com/images/Puma-Classic-41.jpg",
    "link": "https://stockx.com/puma-classic-41"
  },
  {
    "modello": "asics classic 42",
    "nome": "Asics Classic 42",
    "sku": "ASCL0042",
    "prezzo": "124",
    "immagine": "https://images.stockx.com/images/Asics-Classic-42.jpg",
    "link": "https://stockx.com/asics-classic-42"
  },
  {
    "modello": "converse air max 43",
    "nome": "Converse Air Max 43",
    "sku": "COAI0043",
    "prezzo": "373",
    "immagine": "https://images.stockx.com/images/Converse-Air Max-43.jpg",
    "link": "https://stockx.com/converse-air max-43"
  },
  {
    "modello": "reebok ultra boost 44",
    "nome": "Reebok Ultra Boost 44",
    "sku": "REUL0044",
    "prezzo": "110",
    "immagine": "https://images.stockx.com/images/Reebok-Ultra Boost-44.jpg",
    "link": "https://stockx.com/reebok-ultra boost-44"
  },
  {
    "modello": "adidas chuck taylor 45",
    "nome": "Adidas Chuck Taylor 45",
    "sku": "ADCH0045",
    "prezzo": "232",
    "immagine": "https://images.stockx.com/images/Adidas-Chuck Taylor-45.jpg",
    "link": "https://stockx.com/adidas-chuck taylor-45"
  },
  {
    "modello": "reebok ultra boost 46",
    "nome": "Reebok Ultra Boost 46",
    "sku": "REUL0046",
    "prezzo": "261",
    "immagine": "https://images.stockx.com/images/Reebok-Ultra Boost-46.jpg",
    "link": "https://stockx.com/reebok-ultra boost-46"
  },
  {
    "modello": "asics chuck taylor 47",
    "nome": "Asics Chuck Taylor 47",
    "sku": "ASCH0047",
    "prezzo": "326",
    "immagine": "https://images.stockx.com/images/Asics-Chuck Taylor-47.jpg",
    "link": "https://stockx.com/asics-chuck taylor-47"
  },
  {
    "modello": "puma chuck taylor 48",
    "nome": "Puma Chuck Taylor 48",
    "sku": "PUCH0048",
    "prezzo": "331",
    "immagine": "https://images.stockx.com/images/Puma-Chuck Taylor-48.jpg",
    "link": "https://stockx.com/puma-chuck taylor-48"
  },
  {
    "modello": "asics ultra boost 49",
    "nome": "Asics Ultra Boost 49",
    "sku": "ASUL0049",
    "prezzo": "390",
    "immagine": "https://images.stockx.com/images/Asics-Ultra Boost-49.jpg",
    "link": "https://stockx.com/asics-ultra boost-49"
  },
  {
    "modello": "reebok dunk 50",
    "nome": "Reebok Dunk 50",
    "sku": "REDU0050",
    "prezzo": "140",
    "immagine": "https://images.stockx.com/images/Reebok-Dunk-50.jpg",
    "link": "https://stockx.com/reebok-dunk-50"
  },
  {
    "modello": "reebok yeezy 51",
    "nome": "Reebok Yeezy 51",
    "sku": "REYE0051",
    "prezzo": "346",
    "immagine": "https://images.stockx.com/images/Reebok-Yeezy-51.jpg",
    "link": "https://stockx.com/reebok-yeezy-51"
  },
  {
    "modello": "nike yeezy 52",
    "nome": "Nike Yeezy 52",
    "sku": "NIYE0052",
    "prezzo": "236",
    "immagine": "https://images.stockx.com/images/Nike-Yeezy-52.jpg",
    "link": "https://stockx.com/nike-yeezy-52"
  },
  {
    "modello": "new balance retro 53",
    "nome": "New Balance Retro 53",
    "sku": "NERE0053",
    "prezzo": "286",
    "immagine": "https://images.stockx.com/images/New Balance-Retro-53.jpg",
    "link": "https://stockx.com/new balance-retro-53"
  },
  {
    "modello": "puma air max 54",
    "nome": "Puma Air Max 54",
    "sku": "PUAI0054",
    "prezzo": "365",
    "immagine": "https://images.stockx.com/images/Puma-Air Max-54.jpg",
    "link": "https://stockx.com/puma-air max-54"
  },
  {
    "modello": "reebok air max 55",
    "nome": "Reebok Air Max 55",
    "sku": "REAI0055",
    "prezzo": "266",
    "immagine": "https://images.stockx.com/images/Reebok-Air Max-55.jpg",
    "link": "https://stockx.com/reebok-air max-55"
  },
  {
    "modello": "new balance ultra boost 56",
    "nome": "New Balance Ultra Boost 56",
    "sku": "NEUL0056",
    "prezzo": "133",
    "immagine": "https://images.stockx.com/images/New Balance-Ultra Boost-56.jpg",
    "link": "https://stockx.com/new balance-ultra boost-56"
  },
  {
    "modello": "asics gel-lyte 57",
    "nome": "Asics Gel-Lyte 57",
    "sku": "ASGE0057",
    "prezzo": "377",
    "immagine": "https://images.stockx.com/images/Asics-Gel-Lyte-57.jpg",
    "link": "https://stockx.com/asics-gel-lyte-57"
  },
  {
    "modello": "jordan gel-lyte 58",
    "nome": "Jordan Gel-Lyte 58",
    "sku": "JOGE0058",
    "prezzo": "282",
    "immagine": "https://images.stockx.com/images/Jordan-Gel-Lyte-58.jpg",
    "link": "https://stockx.com/jordan-gel-lyte-58"
  },
  {
    "modello": "nike gel-lyte 59",
    "nome": "Nike Gel-Lyte 59",
    "sku": "NIGE0059",
    "prezzo": "268",
    "immagine": "https://images.stockx.com/images/Nike-Gel-Lyte-59.jpg",
    "link": "https://stockx.com/nike-gel-lyte-59"
  },
  {
    "modello": "new balance retro 60",
    "nome": "New Balance Retro 60",
    "sku": "NERE0060",
    "prezzo": "86",
    "immagine": "https://images.stockx.com/images/New Balance-Retro-60.jpg",
    "link": "https://stockx.com/new balance-retro-60"
  },
  {
    "modello": "asics ultra boost 61",
    "nome": "Asics Ultra Boost 61",
    "sku": "ASUL0061",
    "prezzo": "268",
    "immagine": "https://images.stockx.com/images/Asics-Ultra Boost-61.jpg",
    "link": "https://stockx.com/asics-ultra boost-61"
  },
  {
    "modello": "asics classic 62",
    "nome": "Asics Classic 62",
    "sku": "ASCL0062",
    "prezzo": "251",
    "immagine": "https://images.stockx.com/images/Asics-Classic-62.jpg",
    "link": "https://stockx.com/asics-classic-62"
  },
  {
    "modello": "jordan ultra boost 63",
    "nome": "Jordan Ultra Boost 63",
    "sku": "JOUL0063",
    "prezzo": "356",
    "immagine": "https://images.stockx.com/images/Jordan-Ultra Boost-63.jpg",
    "link": "https://stockx.com/jordan-ultra boost-63"
  },
  {
    "modello": "adidas gel-lyte 64",
    "nome": "Adidas Gel-Lyte 64",
    "sku": "ADGE0064",
    "prezzo": "347",
    "immagine": "https://images.stockx.com/images/Adidas-Gel-Lyte-64.jpg",
    "link": "https://stockx.com/adidas-gel-lyte-64"
  },
  {
    "modello": "adidas dunk 65",
    "nome": "Adidas Dunk 65",
    "sku": "ADDU0065",
    "prezzo": "367",
    "immagine": "https://images.stockx.com/images/Adidas-Dunk-65.jpg",
    "link": "https://stockx.com/adidas-dunk-65"
  },
  {
    "modello": "jordan dunk 66",
    "nome": "Jordan Dunk 66",
    "sku": "JODU0066",
    "prezzo": "358",
    "immagine": "https://images.stockx.com/images/Jordan-Dunk-66.jpg",
    "link": "https://stockx.com/jordan-dunk-66"
  },
  {
    "modello": "nike chuck taylor 67",
    "nome": "Nike Chuck Taylor 67",
    "sku": "NICH0067",
    "prezzo": "164",
    "immagine": "https://images.stockx.com/images/Nike-Chuck Taylor-67.jpg",
    "link": "https://stockx.com/nike-chuck taylor-67"
  },
  {
    "modello": "asics gel-lyte 68",
    "nome": "Asics Gel-Lyte 68",
    "sku": "ASGE0068",
    "prezzo": "320",
    "immagine": "https://images.stockx.com/images/Asics-Gel-Lyte-68.jpg",
    "link": "https://stockx.com/asics-gel-lyte-68"
  },
  {
    "modello": "asics retro 69",
    "nome": "Asics Retro 69",
    "sku": "ASRE0069",
    "prezzo": "288",
    "immagine": "https://images.stockx.com/images/Asics-Retro-69.jpg",
    "link": "https://stockx.com/asics-retro-69"
  },
  {
    "modello": "puma air max 70",
    "nome": "Puma Air Max 70",
    "sku": "PUAI0070",
    "prezzo": "126",
    "immagine": "https://images.stockx.com/images/Puma-Air Max-70.jpg",
    "link": "https://stockx.com/puma-air max-70"
  },
  {
    "modello": "converse classic 71",
    "nome": "Converse Classic 71",
    "sku": "COCL0071",
    "prezzo": "148",
    "immagine": "https://images.stockx.com/images/Converse-Classic-71.jpg",
    "link": "https://stockx.com/converse-classic-71"
  },
  {
    "modello": "adidas yeezy 72",
    "nome": "Adidas Yeezy 72",
    "sku": "ADYE0072",
    "prezzo": "80",
    "immagine": "https://images.stockx.com/images/Adidas-Yeezy-72.jpg",
    "link": "https://stockx.com/adidas-yeezy-72"
  },
  {
    "modello": "adidas chuck taylor 73",
    "nome": "Adidas Chuck Taylor 73",
    "sku": "ADCH0073",
    "prezzo": "383",
    "immagine": "https://images.stockx.com/images/Adidas-Chuck Taylor-73.jpg",
    "link": "https://stockx.com/adidas-chuck taylor-73"
  },
  {
    "modello": "puma yeezy 74",
    "nome": "Puma Yeezy 74",
    "sku": "PUYE0074",
    "prezzo": "333",
    "immagine": "https://images.stockx.com/images/Puma-Yeezy-74.jpg",
    "link": "https://stockx.com/puma-yeezy-74"
  },
  {
    "modello": "adidas air max 75",
    "nome": "Adidas Air Max 75",
    "sku": "ADAI0075",
    "prezzo": "393",
    "immagine": "https://images.stockx.com/images/Adidas-Air Max-75.jpg",
    "link": "https://stockx.com/adidas-air max-75"
  },
  {
    "modello": "converse yeezy 76",
    "nome": "Converse Yeezy 76",
    "sku": "COYE0076",
    "prezzo": "245",
    "immagine": "https://images.stockx.com/images/Converse-Yeezy-76.jpg",
    "link": "https://stockx.com/converse-yeezy-76"
  },
  {
    "modello": "converse gel-lyte 77",
    "nome": "Converse Gel-Lyte 77",
    "sku": "COGE0077",
    "prezzo": "287",
    "immagine": "https://images.stockx.com/images/Converse-Gel-Lyte-77.jpg",
    "link": "https://stockx.com/converse-gel-lyte-77"
  },
  {
    "modello": "reebok yeezy 78",
    "nome": "Reebok Yeezy 78",
    "sku": "REYE0078",
    "prezzo": "381",
    "immagine": "https://images.stockx.com/images/Reebok-Yeezy-78.jpg",
    "link": "https://stockx.com/reebok-yeezy-78"
  },
  {
    "modello": "new balance ultra boost 79",
    "nome": "New Balance Ultra Boost 79",
    "sku": "NEUL0079",
    "prezzo": "339",
    "immagine": "https://images.stockx.com/images/New Balance-Ultra Boost-79.jpg",
    "link": "https://stockx.com/new balance-ultra boost-79"
  },
  {
    "modello": "asics chuck taylor 80",
    "nome": "Asics Chuck Taylor 80",
    "sku": "ASCH0080",
    "prezzo": "263",
    "immagine": "https://images.stockx.com/images/Asics-Chuck Taylor-80.jpg",
    "link": "https://stockx.com/asics-chuck taylor-80"
  },
  {
    "modello": "asics dunk 81",
    "nome": "Asics Dunk 81",
    "sku": "ASDU0081",
    "prezzo": "216",
    "immagine": "https://images.stockx.com/images/Asics-Dunk-81.jpg",
    "link": "https://stockx.com/asics-dunk-81"
  },
  {
    "modello": "adidas retro 82",
    "nome": "Adidas Retro 82",
    "sku": "ADRE0082",
    "prezzo": "386",
    "immagine": "https://images.stockx.com/images/Adidas-Retro-82.jpg",
    "link": "https://stockx.com/adidas-retro-82"
  },
  {
    "modello": "jordan air max 83",
    "nome": "Jordan Air Max 83",
    "sku": "JOAI0083",
    "prezzo": "238",
    "immagine": "https://images.stockx.com/images/Jordan-Air Max-83.jpg",
    "link": "https://stockx.com/jordan-air max-83"
  },
  {
    "modello": "nike ultra boost 84",
    "nome": "Nike Ultra Boost 84",
    "sku": "NIUL0084",
    "prezzo": "167",
    "immagine": "https://images.stockx.com/images/Nike-Ultra Boost-84.jpg",
    "link": "https://stockx.com/nike-ultra boost-84"
  },
  {
    "modello": "asics retro 85",
    "nome": "Asics Retro 85",
    "sku": "ASRE0085",
    "prezzo": "265",
    "immagine": "https://images.stockx.com/images/Asics-Retro-85.jpg",
    "link": "https://stockx.com/asics-retro-85"
  },
  {
    "modello": "asics yeezy 86",
    "nome": "Asics Yeezy 86",
    "sku": "ASYE0086",
    "prezzo": "199",
    "immagine": "https://images.stockx.com/images/Asics-Yeezy-86.jpg",
    "link": "https://stockx.com/asics-yeezy-86"
  },
  {
    "modello": "adidas air max 87",
    "nome": "Adidas Air Max 87",
    "sku": "ADAI0087",
    "prezzo": "262",
    "immagine": "https://images.stockx.com/images/Adidas-Air Max-87.jpg",
    "link": "https://stockx.com/adidas-air max-87"
  },
  {
    "modello": "adidas air max 88",
    "nome": "Adidas Air Max 88",
    "sku": "ADAI0088",
    "prezzo": "299",
    "immagine": "https://images.stockx.com/images/Adidas-Air Max-88.jpg",
    "link": "https://stockx.com/adidas-air max-88"
  },
  {
    "modello": "converse dunk 89",
    "nome": "Converse Dunk 89",
    "sku": "CODU0089",
    "prezzo": "398",
    "immagine": "https://images.stockx.com/images/Converse-Dunk-89.jpg",
    "link": "https://stockx.com/converse-dunk-89"
  },
  {
    "modello": "jordan air max 90",
    "nome": "Jordan Air Max 90",
    "sku": "JOAI0090",
    "prezzo": "262",
    "immagine": "https://images.stockx.com/images/Jordan-Air Max-90.jpg",
    "link": "https://stockx.com/jordan-air max-90"
  },
  {
    "modello": "puma ultra boost 91",
    "nome": "Puma Ultra Boost 91",
    "sku": "PUUL0091",
    "prezzo": "237",
    "immagine": "https://images.stockx.com/images/Puma-Ultra Boost-91.jpg",
    "link": "https://stockx.com/puma-ultra boost-91"
  },
  {
    "modello": "reebok classic 92",
    "nome": "Reebok Classic 92",
    "sku": "RECL0092",
    "prezzo": "342",
    "immagine": "https://images.stockx.com/images/Reebok-Classic-92.jpg",
    "link": "https://stockx.com/reebok-classic-92"
  },
  {
    "modello": "jordan dunk 93",
    "nome": "Jordan Dunk 93",
    "sku": "JODU0093",
    "prezzo": "261",
    "immagine": "https://images.stockx.com/images/Jordan-Dunk-93.jpg",
    "link": "https://stockx.com/jordan-dunk-93"
  },
  {
    "modello": "puma retro 94",
    "nome": "Puma Retro 94",
    "sku": "PURE0094",
    "prezzo": "236",
    "immagine": "https://images.stockx.com/images/Puma-Retro-94.jpg",
    "link": "https://stockx.com/puma-retro-94"
  },
  {
    "modello": "jordan air max 95",
    "nome": "Jordan Air Max 95",
    "sku": "JOAI0095",
    "prezzo": "358",
    "immagine": "https://images.stockx.com/images/Jordan-Air Max-95.jpg",
    "link": "https://stockx.com/jordan-air max-95"
  },
  {
    "modello": "adidas ultra boost 96",
    "nome": "Adidas Ultra Boost 96",
    "sku": "ADUL0096",
    "prezzo": "178",
    "immagine": "https://images.stockx.com/images/Adidas-Ultra Boost-96.jpg",
    "link": "https://stockx.com/adidas-ultra boost-96"
  },
  {
    "modello": "new balance yeezy 97",
    "nome": "New Balance Yeezy 97",
    "sku": "NEYE0097",
    "prezzo": "338",
    "immagine": "https://images.stockx.com/images/New Balance-Yeezy-97.jpg",
    "link": "https://stockx.com/new balance-yeezy-97"
  },
  {
    "modello": "converse gel-lyte 98",
    "nome": "Converse Gel-Lyte 98",
    "sku": "COGE0098",
    "prezzo": "155",
    "immagine": "https://images.stockx.com/images/Converse-Gel-Lyte-98.jpg",
    "link": "https://stockx.com/converse-gel-lyte-98"
  },
  {
    "modello": "reebok ultra boost 99",
    "nome": "Reebok Ultra Boost 99",
    "sku": "REUL0099",
    "prezzo": "195",
    "immagine": "https://images.stockx.com/images/Reebok-Ultra Boost-99.jpg",
    "link": "https://stockx.com/reebok-ultra boost-99"
  },
  {
    "modello": "new balance gel-lyte 100",
    "nome": "New Balance Gel-Lyte 100",
    "sku": "NEGE0100",
    "prezzo": "241",
    "immagine": "https://images.stockx.com/images/New Balance-Gel-Lyte-100.jpg",
    "link": "https://stockx.com/new balance-gel-lyte-100"
  },
  {
    "modello": "puma ultra boost 101",
    "nome": "Puma Ultra Boost 101",
    "sku": "PUUL0101",
    "prezzo": "172",
    "immagine": "https://images.stockx.com/images/Puma-Ultra Boost-101.jpg",
    "link": "https://stockx.com/puma-ultra boost-101"
  },
  {
    "modello": "new balance gel-lyte 102",
    "nome": "New Balance Gel-Lyte 102",
    "sku": "NEGE0102",
    "prezzo": "131",
    "immagine": "https://images.stockx.com/images/New Balance-Gel-Lyte-102.jpg",
    "link": "https://stockx.com/new balance-gel-lyte-102"
  },
  {
    "modello": "new balance air max 103",
    "nome": "New Balance Air Max 103",
    "sku": "NEAI0103",
    "prezzo": "208",
    "immagine": "https://images.stockx.com/images/New Balance-Air Max-103.jpg",
    "link": "https://stockx.com/new balance-air max-103"
  },
  {
    "modello": "nike retro 104",
    "nome": "Nike Retro 104",
    "sku": "NIRE0104",
    "prezzo": "101",
    "immagine": "https://images.stockx.com/images/Nike-Retro-104.jpg",
    "link": "https://stockx.com/nike-retro-104"
  },
  {
    "modello": "reebok dunk 105",
    "nome": "Reebok Dunk 105",
    "sku": "REDU0105",
    "prezzo": "269",
    "immagine": "https://images.stockx.com/images/Reebok-Dunk-105.jpg",
    "link": "https://stockx.com/reebok-dunk-105"
  },
  {
    "modello": "asics dunk 106",
    "nome": "Asics Dunk 106",
    "sku": "ASDU0106",
    "prezzo": "89",
    "immagine": "https://images.stockx.com/images/Asics-Dunk-106.jpg",
    "link": "https://stockx.com/asics-dunk-106"
  },
  {
    "modello": "reebok yeezy 107",
    "nome": "Reebok Yeezy 107",
    "sku": "REYE0107",
    "prezzo": "219",
    "immagine": "https://images.stockx.com/images/Reebok-Yeezy-107.jpg",
    "link": "https://stockx.com/reebok-yeezy-107"
  },
  {
    "modello": "jordan ultra boost 108",
    "nome": "Jordan Ultra Boost 108",
    "sku": "JOUL0108",
    "prezzo": "160",
    "immagine": "https://images.stockx.com/images/Jordan-Ultra Boost-108.jpg",
    "link": "https://stockx.com/jordan-ultra boost-108"
  },
  {
    "modello": "asics classic 109",
    "nome": "Asics Classic 109",
    "sku": "ASCL0109",
    "prezzo": "363",
    "immagine": "https://images.stockx.com/images/Asics-Classic-109.jpg",
    "link": "https://stockx.com/asics-classic-109"
  },
  {
    "modello": "adidas dunk 110",
    "nome": "Adidas Dunk 110",
    "sku": "ADDU0110",
    "prezzo": "120",
    "immagine": "https://images.stockx.com/images/Adidas-Dunk-110.jpg",
    "link": "https://stockx.com/adidas-dunk-110"
  },
  {
    "modello": "puma retro 111",
    "nome": "Puma Retro 111",
    "sku": "PURE0111",
    "prezzo": "334",
    "immagine": "https://images.stockx.com/images/Puma-Retro-111.jpg",
    "link": "https://stockx.com/puma-retro-111"
  },
  {
    "modello": "jordan yeezy 112",
    "nome": "Jordan Yeezy 112",
    "sku": "JOYE0112",
    "prezzo": "294",
    "immagine": "https://images.stockx.com/images/Jordan-Yeezy-112.jpg",
    "link": "https://stockx.com/jordan-yeezy-112"
  },
  {
    "modello": "jordan air max 113",
    "nome": "Jordan Air Max 113",
    "sku": "JOAI0113",
    "prezzo": "382",
    "immagine": "https://images.stockx.com/images/Jordan-Air Max-113.jpg",
    "link": "https://stockx.com/jordan-air max-113"
  },
  {
    "modello": "adidas gel-lyte 114",
    "nome": "Adidas Gel-Lyte 114",
    "sku": "ADGE0114",
    "prezzo": "262",
    "immagine": "https://images.stockx.com/images/Adidas-Gel-Lyte-114.jpg",
    "link": "https://stockx.com/adidas-gel-lyte-114"
  },
  {
    "modello": "reebok chuck taylor 115",
    "nome": "Reebok Chuck Taylor 115",
    "sku": "RECH0115",
    "prezzo": "176",
    "immagine": "https://images.stockx.com/images/Reebok-Chuck Taylor-115.jpg",
    "link": "https://stockx.com/reebok-chuck taylor-115"
  },
  {
    "modello": "converse chuck taylor 116",
    "nome": "Converse Chuck Taylor 116",
    "sku": "COCH0116",
    "prezzo": "125",
    "immagine": "https://images.stockx.com/images/Converse-Chuck Taylor-116.jpg",
    "link": "https://stockx.com/converse-chuck taylor-116"
  },
  {
    "modello": "reebok air max 117",
    "nome": "Reebok Air Max 117",
    "sku": "REAI0117",
    "prezzo": "259",
    "immagine": "https://images.stockx.com/images/Reebok-Air Max-117.jpg",
    "link": "https://stockx.com/reebok-air max-117"
  },
  {
    "modello": "adidas yeezy 118",
    "nome": "Adidas Yeezy 118",
    "sku": "ADYE0118",
    "prezzo": "299",
    "immagine": "https://images.stockx.com/images/Adidas-Yeezy-118.jpg",
    "link": "https://stockx.com/adidas-yeezy-118"
  },
  {
    "modello": "converse chuck taylor 119",
    "nome": "Converse Chuck Taylor 119",
    "sku": "COCH0119",
    "prezzo": "260",
    "immagine": "https://images.stockx.com/images/Converse-Chuck Taylor-119.jpg",
    "link": "https://stockx.com/converse-chuck taylor-119"
  },
  {
    "modello": "puma retro 120",
    "nome": "Puma Retro 120",
    "sku": "PURE0120",
    "prezzo": "311",
    "immagine": "https://images.stockx.com/images/Puma-Retro-120.jpg",
    "link": "https://stockx.com/puma-retro-120"
  },
  {
    "modello": "new balance chuck taylor 121",
    "nome": "New Balance Chuck Taylor 121",
    "sku": "NECH0121",
    "prezzo": "226",
    "immagine": "https://images.stockx.com/images/New Balance-Chuck Taylor-121.jpg",
    "link": "https://stockx.com/new balance-chuck taylor-121"
  },
  {
    "modello": "adidas classic 122",
    "nome": "Adidas Classic 122",
    "sku": "ADCL0122",
    "prezzo": "121",
    "immagine": "https://images.stockx.com/images/Adidas-Classic-122.jpg",
    "link": "https://stockx.com/adidas-classic-122"
  },
  {
    "modello": "reebok chuck taylor 123",
    "nome": "Reebok Chuck Taylor 123",
    "sku": "RECH0123",
    "prezzo": "287",
    "immagine": "https://images.stockx.com/images/Reebok-Chuck Taylor-123.jpg",
    "link": "https://stockx.com/reebok-chuck taylor-123"
  },
  {
    "modello": "puma yeezy 124",
    "nome": "Puma Yeezy 124",
    "sku": "PUYE0124",
    "prezzo": "162",
    "immagine": "https://images.stockx.com/images/Puma-Yeezy-124.jpg",
    "link": "https://stockx.com/puma-yeezy-124"
  },
  {
    "modello": "jordan retro 125",
    "nome": "Jordan Retro 125",
    "sku": "JORE0125",
    "prezzo": "363",
    "immagine": "https://images.stockx.com/images/Jordan-Retro-125.jpg",
    "link": "https://stockx.com/jordan-retro-125"
  },
  {
    "modello": "jordan gel-lyte 126",
    "nome": "Jordan Gel-Lyte 126",
    "sku": "JOGE0126",
    "prezzo": "131",
    "immagine": "https://images.stockx.com/images/Jordan-Gel-Lyte-126.jpg",
    "link": "https://stockx.com/jordan-gel-lyte-126"
  },
  {
    "modello": "reebok dunk 127",
    "nome": "Reebok Dunk 127",
    "sku": "REDU0127",
    "prezzo": "86",
    "immagine": "https://images.stockx.com/images/Reebok-Dunk-127.jpg",
    "link": "https://stockx.com/reebok-dunk-127"
  },
  {
    "modello": "adidas dunk 128",
    "nome": "Adidas Dunk 128",
    "sku": "ADDU0128",
    "prezzo": "125",
    "immagine": "https://images.stockx.com/images/Adidas-Dunk-128.jpg",
    "link": "https://stockx.com/adidas-dunk-128"
  },
  {
    "modello": "reebok yeezy 129",
    "nome": "Reebok Yeezy 129",
    "sku": "REYE0129",
    "prezzo": "375",
    "immagine": "https://images.stockx.com/images/Reebok-Yeezy-129.jpg",
    "link": "https://stockx.com/reebok-yeezy-129"
  },
  {
    "modello": "adidas yeezy 130",
    "nome": "Adidas Yeezy 130",
    "sku": "ADYE0130",
    "prezzo": "374",
    "immagine": "https://images.stockx.com/images/Adidas-Yeezy-130.jpg",
    "link": "https://stockx.com/adidas-yeezy-130"
  },
  {
    "modello": "converse air max 131",
    "nome": "Converse Air Max 131",
    "sku": "COAI0131",
    "prezzo": "210",
    "immagine": "https://images.stockx.com/images/Converse-Air Max-131.jpg",
    "link": "https://stockx.com/converse-air max-131"
  },
  {
    "modello": "asics yeezy 132",
    "nome": "Asics Yeezy 132",
    "sku": "ASYE0132",
    "prezzo": "231",
    "immagine": "https://images.stockx.com/images/Asics-Yeezy-132.jpg",
    "link": "https://stockx.com/asics-yeezy-132"
  },
  {
    "modello": "reebok air max 133",
    "nome": "Reebok Air Max 133",
    "sku": "REAI0133",
    "prezzo": "129",
    "immagine": "https://images.stockx.com/images/Reebok-Air Max-133.jpg",
    "link": "https://stockx.com/reebok-air max-133"
  },
  {
    "modello": "reebok yeezy 134",
    "nome": "Reebok Yeezy 134",
    "sku": "REYE0134",
    "prezzo": "317",
    "immagine": "https://images.stockx.com/images/Reebok-Yeezy-134.jpg",
    "link": "https://stockx.com/reebok-yeezy-134"
  },
  {
    "modello": "reebok ultra boost 135",
    "nome": "Reebok Ultra Boost 135",
    "sku": "REUL0135",
    "prezzo": "203",
    "immagine": "https://images.stockx.com/images/Reebok-Ultra Boost-135.jpg",
    "link": "https://stockx.com/reebok-ultra boost-135"
  },
  {
    "modello": "converse classic 136",
    "nome": "Converse Classic 136",
    "sku": "COCL0136",
    "prezzo": "297",
    "immagine": "https://images.stockx.com/images/Converse-Classic-136.jpg",
    "link": "https://stockx.com/converse-classic-136"
  },
  {
    "modello": "converse yeezy 137",
    "nome": "Converse Yeezy 137",
    "sku": "COYE0137",
    "prezzo": "373",
    "immagine": "https://images.stockx.com/images/Converse-Yeezy-137.jpg",
    "link": "https://stockx.com/converse-yeezy-137"
  },
  {
    "modello": "new balance yeezy 138",
    "nome": "New Balance Yeezy 138",
    "sku": "NEYE0138",
    "prezzo": "322",
    "immagine": "https://images.stockx.com/images/New Balance-Yeezy-138.jpg",
    "link": "https://stockx.com/new balance-yeezy-138"
  },
  {
    "modello": "asics yeezy 139",
    "nome": "Asics Yeezy 139",
    "sku": "ASYE0139",
    "prezzo": "186",
    "immagine": "https://images.stockx.com/images/Asics-Yeezy-139.jpg",
    "link": "https://stockx.com/asics-yeezy-139"
  },
  {
    "modello": "converse air max 140",
    "nome": "Converse Air Max 140",
    "sku": "COAI0140",
    "prezzo": "393",
    "immagine": "https://images.stockx.com/images/Converse-Air Max-140.jpg",
    "link": "https://stockx.com/converse-air max-140"
  },
  {
    "modello": "reebok air max 141",
    "nome": "Reebok Air Max 141",
    "sku": "REAI0141",
    "prezzo": "245",
    "immagine": "https://images.stockx.com/images/Reebok-Air Max-141.jpg",
    "link": "https://stockx.com/reebok-air max-141"
  },
  {
    "modello": "nike gel-lyte 142",
    "nome": "Nike Gel-Lyte 142",
    "sku": "NIGE0142",
    "prezzo": "131",
    "immagine": "https://images.stockx.com/images/Nike-Gel-Lyte-142.jpg",
    "link": "https://stockx.com/nike-gel-lyte-142"
  },
  {
    "modello": "asics ultra boost 143",
    "nome": "Asics Ultra Boost 143",
    "sku": "ASUL0143",
    "prezzo": "164",
    "immagine": "https://images.stockx.com/images/Asics-Ultra Boost-143.jpg",
    "link": "https://stockx.com/asics-ultra boost-143"
  },
  {
    "modello": "asics retro 144",
    "nome": "Asics Retro 144",
    "sku": "ASRE0144",
    "prezzo": "245",
    "immagine": "https://images.stockx.com/images/Asics-Retro-144.jpg",
    "link": "https://stockx.com/asics-retro-144"
  },
  {
    "modello": "adidas chuck taylor 145",
    "nome": "Adidas Chuck Taylor 145",
    "sku": "ADCH0145",
    "prezzo": "136",
    "immagine": "https://images.stockx.com/images/Adidas-Chuck Taylor-145.jpg",
    "link": "https://stockx.com/adidas-chuck taylor-145"
  },
  {
    "modello": "reebok classic 146",
    "nome": "Reebok Classic 146",
    "sku": "RECL0146",
    "prezzo": "358",
    "immagine": "https://images.stockx.com/images/Reebok-Classic-146.jpg",
    "link": "https://stockx.com/reebok-classic-146"
  },
  {
    "modello": "jordan dunk 147",
    "nome": "Jordan Dunk 147",
    "sku": "JODU0147",
    "prezzo": "299",
    "immagine": "https://images.stockx.com/images/Jordan-Dunk-147.jpg",
    "link": "https://stockx.com/jordan-dunk-147"
  },
  {
    "modello": "adidas dunk 148",
    "nome": "Adidas Dunk 148",
    "sku": "ADDU0148",
    "prezzo": "383",
    "immagine": "https://images.stockx.com/images/Adidas-Dunk-148.jpg",
    "link": "https://stockx.com/adidas-dunk-148"
  },
  {
    "modello": "converse ultra boost 149",
    "nome": "Converse Ultra Boost 149",
    "sku": "COUL0149",
    "prezzo": "80",
    "immagine": "https://images.stockx.com/images/Converse-Ultra Boost-149.jpg",
    "link": "https://stockx.com/converse-ultra boost-149"
  },
  {
    "modello": "adidas air max 150",
    "nome": "Adidas Air Max 150",
    "sku": "ADAI0150",
    "prezzo": "351",
    "immagine": "https://images.stockx.com/images/Adidas-Air Max-150.jpg",
    "link": "https://stockx.com/adidas-air max-150"
  },
  {
    "modello": "converse classic 151",
    "nome": "Converse Classic 151",
    "sku": "COCL0151",
    "prezzo": "356",
    "immagine": "https://images.stockx.com/images/Converse-Classic-151.jpg",
    "link": "https://stockx.com/converse-classic-151"
  },
  {
    "modello": "reebok retro 152",
    "nome": "Reebok Retro 152",
    "sku": "RERE0152",
    "prezzo": "276",
    "immagine": "https://images.stockx.com/images/Reebok-Retro-152.jpg",
    "link": "https://stockx.com/reebok-retro-152"
  },
  {
    "modello": "asics air max 153",
    "nome": "Asics Air Max 153",
    "sku": "ASAI0153",
    "prezzo": "83",
    "immagine": "https://images.stockx.com/images/Asics-Air Max-153.jpg",
    "link": "https://stockx.com/asics-air max-153"
  },
  {
    "modello": "new balance yeezy 154",
    "nome": "New Balance Yeezy 154",
    "sku": "NEYE0154",
    "prezzo": "357",
    "immagine": "https://images.stockx.com/images/New Balance-Yeezy-154.jpg",
    "link": "https://stockx.com/new balance-yeezy-154"
  },
  {
    "modello": "asics air max 155",
    "nome": "Asics Air Max 155",
    "sku": "ASAI0155",
    "prezzo": "282",
    "immagine": "https://images.stockx.com/images/Asics-Air Max-155.jpg",
    "link": "https://stockx.com/asics-air max-155"
  },
  {
    "modello": "reebok classic 156",
    "nome": "Reebok Classic 156",
    "sku": "RECL0156",
    "prezzo": "229",
    "immagine": "https://images.stockx.com/images/Reebok-Classic-156.jpg",
    "link": "https://stockx.com/reebok-classic-156"
  },
  {
    "modello": "converse air max 157",
    "nome": "Converse Air Max 157",
    "sku": "COAI0157",
    "prezzo": "178",
    "immagine": "https://images.stockx.com/images/Converse-Air Max-157.jpg",
    "link": "https://stockx.com/converse-air max-157"
  },
  {
    "modello": "reebok ultra boost 158",
    "nome": "Reebok Ultra Boost 158",
    "sku": "REUL0158",
    "prezzo": "199",
    "immagine": "https://images.stockx.com/images/Reebok-Ultra Boost-158.jpg",
    "link": "https://stockx.com/reebok-ultra boost-158"
  },
  {
    "modello": "new balance air max 159",
    "nome": "New Balance Air Max 159",
    "sku": "NEAI0159",
    "prezzo": "203",
    "immagine": "https://images.stockx.com/images/New Balance-Air Max-159.jpg",
    "link": "https://stockx.com/new balance-air max-159"
  },
  {
    "modello": "jordan ultra boost 160",
    "nome": "Jordan Ultra Boost 160",
    "sku": "JOUL0160",
    "prezzo": "152",
    "immagine": "https://images.stockx.com/images/Jordan-Ultra Boost-160.jpg",
    "link": "https://stockx.com/jordan-ultra boost-160"
  },
  {
    "modello": "puma air max 161",
    "nome": "Puma Air Max 161",
    "sku": "PUAI0161",
    "prezzo": "216",
    "immagine": "https://images.stockx.com/images/Puma-Air Max-161.jpg",
    "link": "https://stockx.com/puma-air max-161"
  },
  {
    "modello": "adidas gel-lyte 162",
    "nome": "Adidas Gel-Lyte 162",
    "sku": "ADGE0162",
    "prezzo": "305",
    "immagine": "https://images.stockx.com/images/Adidas-Gel-Lyte-162.jpg",
    "link": "https://stockx.com/adidas-gel-lyte-162"
  },
  {
    "modello": "reebok classic 163",
    "nome": "Reebok Classic 163",
    "sku": "RECL0163",
    "prezzo": "283",
    "immagine": "https://images.stockx.com/images/Reebok-Classic-163.jpg",
    "link": "https://stockx.com/reebok-classic-163"
  },
  {
    "modello": "converse retro 164",
    "nome": "Converse Retro 164",
    "sku": "CORE0164",
    "prezzo": "245",
    "immagine": "https://images.stockx.com/images/Converse-Retro-164.jpg",
    "link": "https://stockx.com/converse-retro-164"
  },
  {
    "modello": "adidas gel-lyte 165",
    "nome": "Adidas Gel-Lyte 165",
    "sku": "ADGE0165",
    "prezzo": "90",
    "immagine": "https://images.stockx.com/images/Adidas-Gel-Lyte-165.jpg",
    "link": "https://stockx.com/adidas-gel-lyte-165"
  },
  {
    "modello": "adidas classic 166",
    "nome": "Adidas Classic 166",
    "sku": "ADCL0166",
    "prezzo": "325",
    "immagine": "https://images.stockx.com/images/Adidas-Classic-166.jpg",
    "link": "https://stockx.com/adidas-classic-166"
  },
  {
    "modello": "converse air max 167",
    "nome": "Converse Air Max 167",
    "sku": "COAI0167",
    "prezzo": "94",
    "immagine": "https://images.stockx.com/images/Converse-Air Max-167.jpg",
    "link": "https://stockx.com/converse-air max-167"
  },
  {
    "modello": "reebok classic 168",
    "nome": "Reebok Classic 168",
    "sku": "RECL0168",
    "prezzo": "88",
    "immagine": "https://images.stockx.com/images/Reebok-Classic-168.jpg",
    "link": "https://stockx.com/reebok-classic-168"
  },
  {
    "modello": "adidas chuck taylor 169",
    "nome": "Adidas Chuck Taylor 169",
    "sku": "ADCH0169",
    "prezzo": "319",
    "immagine": "https://images.stockx.com/images/Adidas-Chuck Taylor-169.jpg",
    "link": "https://stockx.com/adidas-chuck taylor-169"
  },
  {
    "modello": "jordan retro 170",
    "nome": "Jordan Retro 170",
    "sku": "JORE0170",
    "prezzo": "397",
    "immagine": "https://images.stockx.com/images/Jordan-Retro-170.jpg",
    "link": "https://stockx.com/jordan-retro-170"
  },
  {
    "modello": "reebok chuck taylor 171",
    "nome": "Reebok Chuck Taylor 171",
    "sku": "RECH0171",
    "prezzo": "355",
    "immagine": "https://images.stockx.com/images/Reebok-Chuck Taylor-171.jpg",
    "link": "https://stockx.com/reebok-chuck taylor-171"
  },
  {
    "modello": "asics chuck taylor 172",
    "nome": "Asics Chuck Taylor 172",
    "sku": "ASCH0172",
    "prezzo": "217",
    "immagine": "https://images.stockx.com/images/Asics-Chuck Taylor-172.jpg",
    "link": "https://stockx.com/asics-chuck taylor-172"
  },
  {
    "modello": "nike classic 173",
    "nome": "Nike Classic 173",
    "sku": "NICL0173",
    "prezzo": "219",
    "immagine": "https://images.stockx.com/images/Nike-Classic-173.jpg",
    "link": "https://stockx.com/nike-classic-173"
  },
  {
    "modello": "adidas chuck taylor 174",
    "nome": "Adidas Chuck Taylor 174",
    "sku": "ADCH0174",
    "prezzo": "345",
    "immagine": "https://images.stockx.com/images/Adidas-Chuck Taylor-174.jpg",
    "link": "https://stockx.com/adidas-chuck taylor-174"
  },
  {
    "modello": "nike chuck taylor 175",
    "nome": "Nike Chuck Taylor 175",
    "sku": "NICH0175",
    "prezzo": "278",
    "immagine": "https://images.stockx.com/images/Nike-Chuck Taylor-175.jpg",
    "link": "https://stockx.com/nike-chuck taylor-175"
  },
  {
    "modello": "converse chuck taylor 176",
    "nome": "Converse Chuck Taylor 176",
    "sku": "COCH0176",
    "prezzo": "145",
    "immagine": "https://images.stockx.com/images/Converse-Chuck Taylor-176.jpg",
    "link": "https://stockx.com/converse-chuck taylor-176"
  },
  {
    "modello": "new balance chuck taylor 177",
    "nome": "New Balance Chuck Taylor 177",
    "sku": "NECH0177",
    "prezzo": "363",
    "immagine": "https://images.stockx.com/images/New Balance-Chuck Taylor-177.jpg",
    "link": "https://stockx.com/new balance-chuck taylor-177"
  },
  {
    "modello": "reebok classic 178",
    "nome": "Reebok Classic 178",
    "sku": "RECL0178",
    "prezzo": "177",
    "immagine": "https://images.stockx.com/images/Reebok-Classic-178.jpg",
    "link": "https://stockx.com/reebok-classic-178"
  },
  {
    "modello": "new balance yeezy 179",
    "nome": "New Balance Yeezy 179",
    "sku": "NEYE0179",
    "prezzo": "319",
    "immagine": "https://images.stockx.com/images/New Balance-Yeezy-179.jpg",
    "link": "https://stockx.com/new balance-yeezy-179"
  },
  {
    "modello": "reebok chuck taylor 180",
    "nome": "Reebok Chuck Taylor 180",
    "sku": "RECH0180",
    "prezzo": "347",
    "immagine": "https://images.stockx.com/images/Reebok-Chuck Taylor-180.jpg",
    "link": "https://stockx.com/reebok-chuck taylor-180"
  },
  {
    "modello": "nike classic 181",
    "nome": "Nike Classic 181",
    "sku": "NICL0181",
    "prezzo": "397",
    "immagine": "https://images.stockx.com/images/Nike-Classic-181.jpg",
    "link": "https://stockx.com/nike-classic-181"
  },
  {
    "modello": "nike classic 182",
    "nome": "Nike Classic 182",
    "sku": "NICL0182",
    "prezzo": "359",
    "immagine": "https://images.stockx.com/images/Nike-Classic-182.jpg",
    "link": "https://stockx.com/nike-classic-182"
  },
  {
    "modello": "puma retro 183",
    "nome": "Puma Retro 183",
    "sku": "PURE0183",
    "prezzo": "191",
    "immagine": "https://images.stockx.com/images/Puma-Retro-183.jpg",
    "link": "https://stockx.com/puma-retro-183"
  },
  {
    "modello": "asics ultra boost 184",
    "nome": "Asics Ultra Boost 184",
    "sku": "ASUL0184",
    "prezzo": "235",
    "immagine": "https://images.stockx.com/images/Asics-Ultra Boost-184.jpg",
    "link": "https://stockx.com/asics-ultra boost-184"
  },
  {
    "modello": "asics yeezy 185",
    "nome": "Asics Yeezy 185",
    "sku": "ASYE0185",
    "prezzo": "303",
    "immagine": "https://images.stockx.com/images/Asics-Yeezy-185.jpg",
    "link": "https://stockx.com/asics-yeezy-185"
  },
  {
    "modello": "jordan retro 186",
    "nome": "Jordan Retro 186",
    "sku": "JORE0186",
    "prezzo": "254",
    "immagine": "https://images.stockx.com/images/Jordan-Retro-186.jpg",
    "link": "https://stockx.com/jordan-retro-186"
  },
  {
    "modello": "converse gel-lyte 187",
    "nome": "Converse Gel-Lyte 187",
    "sku": "COGE0187",
    "prezzo": "148",
    "immagine": "https://images.stockx.com/images/Converse-Gel-Lyte-187.jpg",
    "link": "https://stockx.com/converse-gel-lyte-187"
  },
  {
    "modello": "nike dunk 188",
    "nome": "Nike Dunk 188",
    "sku": "NIDU0188",
    "prezzo": "302",
    "immagine": "https://images.stockx.com/images/Nike-Dunk-188.jpg",
    "link": "https://stockx.com/nike-dunk-188"
  },
  {
    "modello": "nike dunk 189",
    "nome": "Nike Dunk 189",
    "sku": "NIDU0189",
    "prezzo": "215",
    "immagine": "https://images.stockx.com/images/Nike-Dunk-189.jpg",
    "link": "https://stockx.com/nike-dunk-189"
  },
  {
    "modello": "nike chuck taylor 190",
    "nome": "Nike Chuck Taylor 190",
    "sku": "NICH0190",
    "prezzo": "315",
    "immagine": "https://images.stockx.com/images/Nike-Chuck Taylor-190.jpg",
    "link": "https://stockx.com/nike-chuck taylor-190"
  },
  {
    "modello": "adidas chuck taylor 191",
    "nome": "Adidas Chuck Taylor 191",
    "sku": "ADCH0191",
    "prezzo": "359",
    "immagine": "https://images.stockx.com/images/Adidas-Chuck Taylor-191.jpg",
    "link": "https://stockx.com/adidas-chuck taylor-191"
  },
  {
    "modello": "new balance gel-lyte 192",
    "nome": "New Balance Gel-Lyte 192",
    "sku": "NEGE0192",
    "prezzo": "330",
    "immagine": "https://images.stockx.com/images/New Balance-Gel-Lyte-192.jpg",
    "link": "https://stockx.com/new balance-gel-lyte-192"
  },
  {
    "modello": "reebok ultra boost 193",
    "nome": "Reebok Ultra Boost 193",
    "sku": "REUL0193",
    "prezzo": "85",
    "immagine": "https://images.stockx.com/images/Reebok-Ultra Boost-193.jpg",
    "link": "https://stockx.com/reebok-ultra boost-193"
  },
  {
    "modello": "jordan chuck taylor 194",
    "nome": "Jordan Chuck Taylor 194",
    "sku": "JOCH0194",
    "prezzo": "248",
    "immagine": "https://images.stockx.com/images/Jordan-Chuck Taylor-194.jpg",
    "link": "https://stockx.com/jordan-chuck taylor-194"
  },
  {
    "modello": "puma gel-lyte 195",
    "nome": "Puma Gel-Lyte 195",
    "sku": "PUGE0195",
    "prezzo": "352",
    "immagine": "https://images.stockx.com/images/Puma-Gel-Lyte-195.jpg",
    "link": "https://stockx.com/puma-gel-lyte-195"
  },
  {
    "modello": "jordan gel-lyte 196",
    "nome": "Jordan Gel-Lyte 196",
    "sku": "JOGE0196",
    "prezzo": "188",
    "immagine": "https://images.stockx.com/images/Jordan-Gel-Lyte-196.jpg",
    "link": "https://stockx.com/jordan-gel-lyte-196"
  },
  {
    "modello": "nike chuck taylor 197",
    "nome": "Nike Chuck Taylor 197",
    "sku": "NICH0197",
    "prezzo": "154",
    "immagine": "https://images.stockx.com/images/Nike-Chuck Taylor-197.jpg",
    "link": "https://stockx.com/nike-chuck taylor-197"
  },
  {
    "modello": "new balance gel-lyte 198",
    "nome": "New Balance Gel-Lyte 198",
    "sku": "NEGE0198",
    "prezzo": "91",
    "immagine": "https://images.stockx.com/images/New Balance-Gel-Lyte-198.jpg",
    "link": "https://stockx.com/new balance-gel-lyte-198"
  },
  {
    "modello": "reebok ultra boost 199",
    "nome": "Reebok Ultra Boost 199",
    "sku": "REUL0199",
    "prezzo": "139",
    "immagine": "https://images.stockx.com/images/Reebok-Ultra Boost-199.jpg",
    "link": "https://stockx.com/reebok-ultra boost-199"
  },
  {
    "modello": "jordan dunk 200",
    "nome": "Jordan Dunk 200",
    "sku": "JODU0200",
    "prezzo": "156",
    "immagine": "https://images.stockx.com/images/Jordan-Dunk-200.jpg",
    "link": "https://stockx.com/jordan-dunk-200"
  },
  {
    "modello": "adidas dunk 201",
    "nome": "Adidas Dunk 201",
    "sku": "ADDU0201",
    "prezzo": "129",
    "immagine": "https://images.stockx.com/images/Adidas-Dunk-201.jpg",
    "link": "https://stockx.com/adidas-dunk-201"
  },
  {
    "modello": "converse chuck taylor 202",
    "nome": "Converse Chuck Taylor 202",
    "sku": "COCH0202",
    "prezzo": "384",
    "immagine": "https://images.stockx.com/images/Converse-Chuck Taylor-202.jpg",
    "link": "https://stockx.com/converse-chuck taylor-202"
  },
  {
    "modello": "puma gel-lyte 203",
    "nome": "Puma Gel-Lyte 203",
    "sku": "PUGE0203",
    "prezzo": "95",
    "immagine": "https://images.stockx.com/images/Puma-Gel-Lyte-203.jpg",
    "link": "https://stockx.com/puma-gel-lyte-203"
  },
  {
    "modello": "puma chuck taylor 204",
    "nome": "Puma Chuck Taylor 204",
    "sku": "PUCH0204",
    "prezzo": "363",
    "immagine": "https://images.stockx.com/images/Puma-Chuck Taylor-204.jpg",
    "link": "https://stockx.com/puma-chuck taylor-204"
  },
  {
    "modello": "reebok gel-lyte 205",
    "nome": "Reebok Gel-Lyte 205",
    "sku": "REGE0205",
    "prezzo": "371",
    "immagine": "https://images.stockx.com/images/Reebok-Gel-Lyte-205.jpg",
    "link": "https://stockx.com/reebok-gel-lyte-205"
  },
  {
    "modello": "new balance retro 206",
    "nome": "New Balance Retro 206",
    "sku": "NERE0206",
    "prezzo": "122",
    "immagine": "https://images.stockx.com/images/New Balance-Retro-206.jpg",
    "link": "https://stockx.com/new balance-retro-206"
  },
  {
    "modello": "jordan gel-lyte 207",
    "nome": "Jordan Gel-Lyte 207",
    "sku": "JOGE0207",
    "prezzo": "97",
    "immagine": "https://images.stockx.com/images/Jordan-Gel-Lyte-207.jpg",
    "link": "https://stockx.com/jordan-gel-lyte-207"
  },
  {
    "modello": "puma yeezy 208",
    "nome": "Puma Yeezy 208",
    "sku": "PUYE0208",
    "prezzo": "233",
    "immagine": "https://images.stockx.com/images/Puma-Yeezy-208.jpg",
    "link": "https://stockx.com/puma-yeezy-208"
  },
  {
    "modello": "nike retro 209",
    "nome": "Nike Retro 209",
    "sku": "NIRE0209",
    "prezzo": "297",
    "immagine": "https://images.stockx.com/images/Nike-Retro-209.jpg",
    "link": "https://stockx.com/nike-retro-209"
  },
  {
    "modello": "nike dunk 210",
    "nome": "Nike Dunk 210",
    "sku": "NIDU0210",
    "prezzo": "210",
    "immagine": "https://images.stockx.com/images/Nike-Dunk-210.jpg",
    "link": "https://stockx.com/nike-dunk-210"
  },
  {
    "modello": "new balance retro 211",
    "nome": "New Balance Retro 211",
    "sku": "NERE0211",
    "prezzo": "214",
    "immagine": "https://images.stockx.com/images/New Balance-Retro-211.jpg",
    "link": "https://stockx.com/new balance-retro-211"
  },
  {
    "modello": "asics dunk 212",
    "nome": "Asics Dunk 212",
    "sku": "ASDU0212",
    "prezzo": "341",
    "immagine": "https://images.stockx.com/images/Asics-Dunk-212.jpg",
    "link": "https://stockx.com/asics-dunk-212"
  },
  {
    "modello": "new balance ultra boost 213",
    "nome": "New Balance Ultra Boost 213",
    "sku": "NEUL0213",
    "prezzo": "160",
    "immagine": "https://images.stockx.com/images/New Balance-Ultra Boost-213.jpg",
    "link": "https://stockx.com/new balance-ultra boost-213"
  },
  {
    "modello": "adidas retro 214",
    "nome": "Adidas Retro 214",
    "sku": "ADRE0214",
    "prezzo": "321",
    "immagine": "https://images.stockx.com/images/Adidas-Retro-214.jpg",
    "link": "https://stockx.com/adidas-retro-214"
  },
  {
    "modello": "jordan yeezy 215",
    "nome": "Jordan Yeezy 215",
    "sku": "JOYE0215",
    "prezzo": "370",
    "immagine": "https://images.stockx.com/images/Jordan-Yeezy-215.jpg",
    "link": "https://stockx.com/jordan-yeezy-215"
  },
  {
    "modello": "reebok dunk 216",
    "nome": "Reebok Dunk 216",
    "sku": "REDU0216",
    "prezzo": "260",
    "immagine": "https://images.stockx.com/images/Reebok-Dunk-216.jpg",
    "link": "https://stockx.com/reebok-dunk-216"
  },
  {
    "modello": "jordan chuck taylor 217",
    "nome": "Jordan Chuck Taylor 217",
    "sku": "JOCH0217",
    "prezzo": "233",
    "immagine": "https://images.stockx.com/images/Jordan-Chuck Taylor-217.jpg",
    "link": "https://stockx.com/jordan-chuck taylor-217"
  },
  {
    "modello": "adidas yeezy 218",
    "nome": "Adidas Yeezy 218",
    "sku": "ADYE0218",
    "prezzo": "187",
    "immagine": "https://images.stockx.com/images/Adidas-Yeezy-218.jpg",
    "link": "https://stockx.com/adidas-yeezy-218"
  },
  {
    "modello": "reebok gel-lyte 219",
    "nome": "Reebok Gel-Lyte 219",
    "sku": "REGE0219",
    "prezzo": "347",
    "immagine": "https://images.stockx.com/images/Reebok-Gel-Lyte-219.jpg",
    "link": "https://stockx.com/reebok-gel-lyte-219"
  },
  {
    "modello": "puma yeezy 220",
    "nome": "Puma Yeezy 220",
    "sku": "PUYE0220",
    "prezzo": "225",
    "immagine": "https://images.stockx.com/images/Puma-Yeezy-220.jpg",
    "link": "https://stockx.com/puma-yeezy-220"
  },
  {
    "modello": "nike yeezy 221",
    "nome": "Nike Yeezy 221",
    "sku": "NIYE0221",
    "prezzo": "394",
    "immagine": "https://images.stockx.com/images/Nike-Yeezy-221.jpg",
    "link": "https://stockx.com/nike-yeezy-221"
  },
  {
    "modello": "reebok retro 222",
    "nome": "Reebok Retro 222",
    "sku": "RERE0222",
    "prezzo": "304",
    "immagine": "https://images.stockx.com/images/Reebok-Retro-222.jpg",
    "link": "https://stockx.com/reebok-retro-222"
  },
  {
    "modello": "adidas air max 223",
    "nome": "Adidas Air Max 223",
    "sku": "ADAI0223",
    "prezzo": "313",
    "immagine": "https://images.stockx.com/images/Adidas-Air Max-223.jpg",
    "link": "https://stockx.com/adidas-air max-223"
  },
  {
    "modello": "new balance dunk 224",
    "nome": "New Balance Dunk 224",
    "sku": "NEDU0224",
    "prezzo": "233",
    "immagine": "https://images.stockx.com/images/New Balance-Dunk-224.jpg",
    "link": "https://stockx.com/new balance-dunk-224"
  },
  {
    "modello": "reebok dunk 225",
    "nome": "Reebok Dunk 225",
    "sku": "REDU0225",
    "prezzo": "323",
    "immagine": "https://images.stockx.com/images/Reebok-Dunk-225.jpg",
    "link": "https://stockx.com/reebok-dunk-225"
  },
  {
    "modello": "adidas air max 226",
    "nome": "Adidas Air Max 226",
    "sku": "ADAI0226",
    "prezzo": "81",
    "immagine": "https://images.stockx.com/images/Adidas-Air Max-226.jpg",
    "link": "https://stockx.com/adidas-air max-226"
  },
  {
    "modello": "converse dunk 227",
    "nome": "Converse Dunk 227",
    "sku": "CODU0227",
    "prezzo": "151",
    "immagine": "https://images.stockx.com/images/Converse-Dunk-227.jpg",
    "link": "https://stockx.com/converse-dunk-227"
  },
  {
    "modello": "converse air max 228",
    "nome": "Converse Air Max 228",
    "sku": "COAI0228",
    "prezzo": "250",
    "immagine": "https://images.stockx.com/images/Converse-Air Max-228.jpg",
    "link": "https://stockx.com/converse-air max-228"
  },
  {
    "modello": "adidas retro 229",
    "nome": "Adidas Retro 229",
    "sku": "ADRE0229",
    "prezzo": "152",
    "immagine": "https://images.stockx.com/images/Adidas-Retro-229.jpg",
    "link": "https://stockx.com/adidas-retro-229"
  },
  {
    "modello": "puma chuck taylor 230",
    "nome": "Puma Chuck Taylor 230",
    "sku": "PUCH0230",
    "prezzo": "386",
    "immagine": "https://images.stockx.com/images/Puma-Chuck Taylor-230.jpg",
    "link": "https://stockx.com/puma-chuck taylor-230"
  },
  {
    "modello": "asics gel-lyte 231",
    "nome": "Asics Gel-Lyte 231",
    "sku": "ASGE0231",
    "prezzo": "128",
    "immagine": "https://images.stockx.com/images/Asics-Gel-Lyte-231.jpg",
    "link": "https://stockx.com/asics-gel-lyte-231"
  },
  {
    "modello": "nike dunk 232",
    "nome": "Nike Dunk 232",
    "sku": "NIDU0232",
    "prezzo": "101",
    "immagine": "https://images.stockx.com/images/Nike-Dunk-232.jpg",
    "link": "https://stockx.com/nike-dunk-232"
  },
  {
    "modello": "adidas retro 233",
    "nome": "Adidas Retro 233",
    "sku": "ADRE0233",
    "prezzo": "321",
    "immagine": "https://images.stockx.com/images/Adidas-Retro-233.jpg",
    "link": "https://stockx.com/adidas-retro-233"
  },
  {
    "modello": "new balance gel-lyte 234",
    "nome": "New Balance Gel-Lyte 234",
    "sku": "NEGE0234",
    "prezzo": "361",
    "immagine": "https://images.stockx.com/images/New Balance-Gel-Lyte-234.jpg",
    "link": "https://stockx.com/new balance-gel-lyte-234"
  },
  {
    "modello": "puma yeezy 235",
    "nome": "Puma Yeezy 235",
    "sku": "PUYE0235",
    "prezzo": "277",
    "immagine": "https://images.stockx.com/images/Puma-Yeezy-235.jpg",
    "link": "https://stockx.com/puma-yeezy-235"
  },
  {
    "modello": "converse ultra boost 236",
    "nome": "Converse Ultra Boost 236",
    "sku": "COUL0236",
    "prezzo": "318",
    "immagine": "https://images.stockx.com/images/Converse-Ultra Boost-236.jpg",
    "link": "https://stockx.com/converse-ultra boost-236"
  },
  {
    "modello": "asics retro 237",
    "nome": "Asics Retro 237",
    "sku": "ASRE0237",
    "prezzo": "121",
    "immagine": "https://images.stockx.com/images/Asics-Retro-237.jpg",
    "link": "https://stockx.com/asics-retro-237"
  },
  {
    "modello": "asics ultra boost 238",
    "nome": "Asics Ultra Boost 238",
    "sku": "ASUL0238",
    "prezzo": "347",
    "immagine": "https://images.stockx.com/images/Asics-Ultra Boost-238.jpg",
    "link": "https://stockx.com/asics-ultra boost-238"
  },
  {
    "modello": "asics yeezy 239",
    "nome": "Asics Yeezy 239",
    "sku": "ASYE0239",
    "prezzo": "260",
    "immagine": "https://images.stockx.com/images/Asics-Yeezy-239.jpg",
    "link": "https://stockx.com/asics-yeezy-239"
  },
  {
    "modello": "converse retro 240",
    "nome": "Converse Retro 240",
    "sku": "CORE0240",
    "prezzo": "84",
    "immagine": "https://images.stockx.com/images/Converse-Retro-240.jpg",
    "link": "https://stockx.com/converse-retro-240"
  },
  {
    "modello": "reebok dunk 241",
    "nome": "Reebok Dunk 241",
    "sku": "REDU0241",
    "prezzo": "80",
    "immagine": "https://images.stockx.com/images/Reebok-Dunk-241.jpg",
    "link": "https://stockx.com/reebok-dunk-241"
  },
  {
    "modello": "adidas air max 242",
    "nome": "Adidas Air Max 242",
    "sku": "ADAI0242",
    "prezzo": "106",
    "immagine": "https://images.stockx.com/images/Adidas-Air Max-242.jpg",
    "link": "https://stockx.com/adidas-air max-242"
  },
  {
    "modello": "new balance chuck taylor 243",
    "nome": "New Balance Chuck Taylor 243",
    "sku": "NECH0243",
    "prezzo": "181",
    "immagine": "https://images.stockx.com/images/New Balance-Chuck Taylor-243.jpg",
    "link": "https://stockx.com/new balance-chuck taylor-243"
  },
  {
    "modello": "nike gel-lyte 244",
    "nome": "Nike Gel-Lyte 244",
    "sku": "NIGE0244",
    "prezzo": "272",
    "immagine": "https://images.stockx.com/images/Nike-Gel-Lyte-244.jpg",
    "link": "https://stockx.com/nike-gel-lyte-244"
  },
  {
    "modello": "asics gel-lyte 245",
    "nome": "Asics Gel-Lyte 245",
    "sku": "ASGE0245",
    "prezzo": "265",
    "immagine": "https://images.stockx.com/images/Asics-Gel-Lyte-245.jpg",
    "link": "https://stockx.com/asics-gel-lyte-245"
  },
  {
    "modello": "reebok classic 246",
    "nome": "Reebok Classic 246",
    "sku": "RECL0246",
    "prezzo": "315",
    "immagine": "https://images.stockx.com/images/Reebok-Classic-246.jpg",
    "link": "https://stockx.com/reebok-classic-246"
  },
  {
    "modello": "jordan gel-lyte 247",
    "nome": "Jordan Gel-Lyte 247",
    "sku": "JOGE0247",
    "prezzo": "185",
    "immagine": "https://images.stockx.com/images/Jordan-Gel-Lyte-247.jpg",
    "link": "https://stockx.com/jordan-gel-lyte-247"
  },
  {
    "modello": "puma classic 248",
    "nome": "Puma Classic 248",
    "sku": "PUCL0248",
    "prezzo": "150",
    "immagine": "https://images.stockx.com/images/Puma-Classic-248.jpg",
    "link": "https://stockx.com/puma-classic-248"
  },
  {
    "modello": "asics chuck taylor 249",
    "nome": "Asics Chuck Taylor 249",
    "sku": "ASCH0249",
    "prezzo": "388",
    "immagine": "https://images.stockx.com/images/Asics-Chuck Taylor-249.jpg",
    "link": "https://stockx.com/asics-chuck taylor-249"
  },
  {
    "modello": "new balance yeezy 250",
    "nome": "New Balance Yeezy 250",
    "sku": "NEYE0250",
    "prezzo": "125",
    "immagine": "https://images.stockx.com/images/New Balance-Yeezy-250.jpg",
    "link": "https://stockx.com/new balance-yeezy-250"
  },
  {
    "modello": "new balance air max 251",
    "nome": "New Balance Air Max 251",
    "sku": "NEAI0251",
    "prezzo": "138",
    "immagine": "https://images.stockx.com/images/New Balance-Air Max-251.jpg",
    "link": "https://stockx.com/new balance-air max-251"
  },
  {
    "modello": "reebok air max 252",
    "nome": "Reebok Air Max 252",
    "sku": "REAI0252",
    "prezzo": "278",
    "immagine": "https://images.stockx.com/images/Reebok-Air Max-252.jpg",
    "link": "https://stockx.com/reebok-air max-252"
  },
  {
    "modello": "new balance classic 253",
    "nome": "New Balance Classic 253",
    "sku": "NECL0253",
    "prezzo": "207",
    "immagine": "https://images.stockx.com/images/New Balance-Classic-253.jpg",
    "link": "https://stockx.com/new balance-classic-253"
  },
  {
    "modello": "puma classic 254",
    "nome": "Puma Classic 254",
    "sku": "PUCL0254",
    "prezzo": "291",
    "immagine": "https://images.stockx.com/images/Puma-Classic-254.jpg",
    "link": "https://stockx.com/puma-classic-254"
  },
  {
    "modello": "nike yeezy 255",
    "nome": "Nike Yeezy 255",
    "sku": "NIYE0255",
    "prezzo": "138",
    "immagine": "https://images.stockx.com/images/Nike-Yeezy-255.jpg",
    "link": "https://stockx.com/nike-yeezy-255"
  },
  {
    "modello": "jordan gel-lyte 256",
    "nome": "Jordan Gel-Lyte 256",
    "sku": "JOGE0256",
    "prezzo": "204",
    "immagine": "https://images.stockx.com/images/Jordan-Gel-Lyte-256.jpg",
    "link": "https://stockx.com/jordan-gel-lyte-256"
  },
  {
    "modello": "jordan dunk 257",
    "nome": "Jordan Dunk 257",
    "sku": "JODU0257",
    "prezzo": "311",
    "immagine": "https://images.stockx.com/images/Jordan-Dunk-257.jpg",
    "link": "https://stockx.com/jordan-dunk-257"
  },
  {
    "modello": "puma ultra boost 258",
    "nome": "Puma Ultra Boost 258",
    "sku": "PUUL0258",
    "prezzo": "313",
    "immagine": "https://images.stockx.com/images/Puma-Ultra Boost-258.jpg",
    "link": "https://stockx.com/puma-ultra boost-258"
  },
  {
    "modello": "nike chuck taylor 259",
    "nome": "Nike Chuck Taylor 259",
    "sku": "NICH0259",
    "prezzo": "256",
    "immagine": "https://images.stockx.com/images/Nike-Chuck Taylor-259.jpg",
    "link": "https://stockx.com/nike-chuck taylor-259"
  },
  {
    "modello": "asics classic 260",
    "nome": "Asics Classic 260",
    "sku": "ASCL0260",
    "prezzo": "291",
    "immagine": "https://images.stockx.com/images/Asics-Classic-260.jpg",
    "link": "https://stockx.com/asics-classic-260"
  },
  {
    "modello": "asics gel-lyte 261",
    "nome": "Asics Gel-Lyte 261",
    "sku": "ASGE0261",
    "prezzo": "99",
    "immagine": "https://images.stockx.com/images/Asics-Gel-Lyte-261.jpg",
    "link": "https://stockx.com/asics-gel-lyte-261"
  },
  {
    "modello": "adidas yeezy 262",
    "nome": "Adidas Yeezy 262",
    "sku": "ADYE0262",
    "prezzo": "266",
    "immagine": "https://images.stockx.com/images/Adidas-Yeezy-262.jpg",
    "link": "https://stockx.com/adidas-yeezy-262"
  },
  {
    "modello": "converse ultra boost 263",
    "nome": "Converse Ultra Boost 263",
    "sku": "COUL0263",
    "prezzo": "300",
    "immagine": "https://images.stockx.com/images/Converse-Ultra Boost-263.jpg",
    "link": "https://stockx.com/converse-ultra boost-263"
  },
  {
    "modello": "puma ultra boost 264",
    "nome": "Puma Ultra Boost 264",
    "sku": "PUUL0264",
    "prezzo": "345",
    "immagine": "https://images.stockx.com/images/Puma-Ultra Boost-264.jpg",
    "link": "https://stockx.com/puma-ultra boost-264"
  },
  {
    "modello": "converse air max 265",
    "nome": "Converse Air Max 265",
    "sku": "COAI0265",
    "prezzo": "192",
    "immagine": "https://images.stockx.com/images/Converse-Air Max-265.jpg",
    "link": "https://stockx.com/converse-air max-265"
  },
  {
    "modello": "new balance gel-lyte 266",
    "nome": "New Balance Gel-Lyte 266",
    "sku": "NEGE0266",
    "prezzo": "193",
    "immagine": "https://images.stockx.com/images/New Balance-Gel-Lyte-266.jpg",
    "link": "https://stockx.com/new balance-gel-lyte-266"
  },
  {
    "modello": "adidas ultra boost 267",
    "nome": "Adidas Ultra Boost 267",
    "sku": "ADUL0267",
    "prezzo": "304",
    "immagine": "https://images.stockx.com/images/Adidas-Ultra Boost-267.jpg",
    "link": "https://stockx.com/adidas-ultra boost-267"
  },
  {
    "modello": "converse ultra boost 268",
    "nome": "Converse Ultra Boost 268",
    "sku": "COUL0268",
    "prezzo": "222",
    "immagine": "https://images.stockx.com/images/Converse-Ultra Boost-268.jpg",
    "link": "https://stockx.com/converse-ultra boost-268"
  },
  {
    "modello": "nike air max 269",
    "nome": "Nike Air Max 269",
    "sku": "NIAI0269",
    "prezzo": "364",
    "immagine": "https://images.stockx.com/images/Nike-Air Max-269.jpg",
    "link": "https://stockx.com/nike-air max-269"
  },
  {
    "modello": "new balance retro 270",
    "nome": "New Balance Retro 270",
    "sku": "NERE0270",
    "prezzo": "128",
    "immagine": "https://images.stockx.com/images/New Balance-Retro-270.jpg",
    "link": "https://stockx.com/new balance-retro-270"
  },
  {
    "modello": "new balance gel-lyte 271",
    "nome": "New Balance Gel-Lyte 271",
    "sku": "NEGE0271",
    "prezzo": "270",
    "immagine": "https://images.stockx.com/images/New Balance-Gel-Lyte-271.jpg",
    "link": "https://stockx.com/new balance-gel-lyte-271"
  },
  {
    "modello": "reebok retro 272",
    "nome": "Reebok Retro 272",
    "sku": "RERE0272",
    "prezzo": "323",
    "immagine": "https://images.stockx.com/images/Reebok-Retro-272.jpg",
    "link": "https://stockx.com/reebok-retro-272"
  },
  {
    "modello": "nike dunk 273",
    "nome": "Nike Dunk 273",
    "sku": "NIDU0273",
    "prezzo": "116",
    "immagine": "https://images.stockx.com/images/Nike-Dunk-273.jpg",
    "link": "https://stockx.com/nike-dunk-273"
  },
  {
    "modello": "asics gel-lyte 274",
    "nome": "Asics Gel-Lyte 274",
    "sku": "ASGE0274",
    "prezzo": "373",
    "immagine": "https://images.stockx.com/images/Asics-Gel-Lyte-274.jpg",
    "link": "https://stockx.com/asics-gel-lyte-274"
  },
  {
    "modello": "jordan air max 275",
    "nome": "Jordan Air Max 275",
    "sku": "JOAI0275",
    "prezzo": "168",
    "immagine": "https://images.stockx.com/images/Jordan-Air Max-275.jpg",
    "link": "https://stockx.com/jordan-air max-275"
  },
  {
    "modello": "nike gel-lyte 276",
    "nome": "Nike Gel-Lyte 276",
    "sku": "NIGE0276",
    "prezzo": "314",
    "immagine": "https://images.stockx.com/images/Nike-Gel-Lyte-276.jpg",
    "link": "https://stockx.com/nike-gel-lyte-276"
  },
  {
    "modello": "adidas air max 277",
    "nome": "Adidas Air Max 277",
    "sku": "ADAI0277",
    "prezzo": "226",
    "immagine": "https://images.stockx.com/images/Adidas-Air Max-277.jpg",
    "link": "https://stockx.com/adidas-air max-277"
  },
  {
    "modello": "converse retro 278",
    "nome": "Converse Retro 278",
    "sku": "CORE0278",
    "prezzo": "360",
    "immagine": "https://images.stockx.com/images/Converse-Retro-278.jpg",
    "link": "https://stockx.com/converse-retro-278"
  },
  {
    "modello": "converse gel-lyte 279",
    "nome": "Converse Gel-Lyte 279",
    "sku": "COGE0279",
    "prezzo": "86",
    "immagine": "https://images.stockx.com/images/Converse-Gel-Lyte-279.jpg",
    "link": "https://stockx.com/converse-gel-lyte-279"
  },
  {
    "modello": "nike yeezy 280",
    "nome": "Nike Yeezy 280",
    "sku": "NIYE0280",
    "prezzo": "92",
    "immagine": "https://images.stockx.com/images/Nike-Yeezy-280.jpg",
    "link": "https://stockx.com/nike-yeezy-280"
  },
  {
    "modello": "puma air max 281",
    "nome": "Puma Air Max 281",
    "sku": "PUAI0281",
    "prezzo": "309",
    "immagine": "https://images.stockx.com/images/Puma-Air Max-281.jpg",
    "link": "https://stockx.com/puma-air max-281"
  },
  {
    "modello": "reebok dunk 282",
    "nome": "Reebok Dunk 282",
    "sku": "REDU0282",
    "prezzo": "369",
    "immagine": "https://images.stockx.com/images/Reebok-Dunk-282.jpg",
    "link": "https://stockx.com/reebok-dunk-282"
  },
  {
    "modello": "nike ultra boost 283",
    "nome": "Nike Ultra Boost 283",
    "sku": "NIUL0283",
    "prezzo": "378",
    "immagine": "https://images.stockx.com/images/Nike-Ultra Boost-283.jpg",
    "link": "https://stockx.com/nike-ultra boost-283"
  },
  {
    "modello": "reebok air max 284",
    "nome": "Reebok Air Max 284",
    "sku": "REAI0284",
    "prezzo": "237",
    "immagine": "https://images.stockx.com/images/Reebok-Air Max-284.jpg",
    "link": "https://stockx.com/reebok-air max-284"
  },
  {
    "modello": "nike air max 285",
    "nome": "Nike Air Max 285",
    "sku": "NIAI0285",
    "prezzo": "393",
    "immagine": "https://images.stockx.com/images/Nike-Air Max-285.jpg",
    "link": "https://stockx.com/nike-air max-285"
  },
  {
    "modello": "reebok air max 286",
    "nome": "Reebok Air Max 286",
    "sku": "REAI0286",
    "prezzo": "179",
    "immagine": "https://images.stockx.com/images/Reebok-Air Max-286.jpg",
    "link": "https://stockx.com/reebok-air max-286"
  },
  {
    "modello": "asics chuck taylor 287",
    "nome": "Asics Chuck Taylor 287",
    "sku": "ASCH0287",
    "prezzo": "224",
    "immagine": "https://images.stockx.com/images/Asics-Chuck Taylor-287.jpg",
    "link": "https://stockx.com/asics-chuck taylor-287"
  },
  {
    "modello": "jordan dunk 288",
    "nome": "Jordan Dunk 288",
    "sku": "JODU0288",
    "prezzo": "82",
    "immagine": "https://images.stockx.com/images/Jordan-Dunk-288.jpg",
    "link": "https://stockx.com/jordan-dunk-288"
  },
  {
    "modello": "nike chuck taylor 289",
    "nome": "Nike Chuck Taylor 289",
    "sku": "NICH0289",
    "prezzo": "324",
    "immagine": "https://images.stockx.com/images/Nike-Chuck Taylor-289.jpg",
    "link": "https://stockx.com/nike-chuck taylor-289"
  },
  {
    "modello": "jordan chuck taylor 290",
    "nome": "Jordan Chuck Taylor 290",
    "sku": "JOCH0290",
    "prezzo": "113",
    "immagine": "https://images.stockx.com/images/Jordan-Chuck Taylor-290.jpg",
    "link": "https://stockx.com/jordan-chuck taylor-290"
  },
  {
    "modello": "reebok ultra boost 291",
    "nome": "Reebok Ultra Boost 291",
    "sku": "REUL0291",
    "prezzo": "165",
    "immagine": "https://images.stockx.com/images/Reebok-Ultra Boost-291.jpg",
    "link": "https://stockx.com/reebok-ultra boost-291"
  },
  {
    "modello": "converse gel-lyte 292",
    "nome": "Converse Gel-Lyte 292",
    "sku": "COGE0292",
    "prezzo": "334",
    "immagine": "https://images.stockx.com/images/Converse-Gel-Lyte-292.jpg",
    "link": "https://stockx.com/converse-gel-lyte-292"
  },
  {
    "modello": "asics air max 293",
    "nome": "Asics Air Max 293",
    "sku": "ASAI0293",
    "prezzo": "309",
    "immagine": "https://images.stockx.com/images/Asics-Air Max-293.jpg",
    "link": "https://stockx.com/asics-air max-293"
  },
  {
    "modello": "converse dunk 294",
    "nome": "Converse Dunk 294",
    "sku": "CODU0294",
    "prezzo": "205",
    "immagine": "https://images.stockx.com/images/Converse-Dunk-294.jpg",
    "link": "https://stockx.com/converse-dunk-294"
  },
  {
    "modello": "puma classic 295",
    "nome": "Puma Classic 295",
    "sku": "PUCL0295",
    "prezzo": "230",
    "immagine": "https://images.stockx.com/images/Puma-Classic-295.jpg",
    "link": "https://stockx.com/puma-classic-295"
  },
  {
    "modello": "nike ultra boost 296",
    "nome": "Nike Ultra Boost 296",
    "sku": "NIUL0296",
    "prezzo": "326",
    "immagine": "https://images.stockx.com/images/Nike-Ultra Boost-296.jpg",
    "link": "https://stockx.com/nike-ultra boost-296"
  },
  {
    "modello": "puma retro 297",
    "nome": "Puma Retro 297",
    "sku": "PURE0297",
    "prezzo": "327",
    "immagine": "https://images.stockx.com/images/Puma-Retro-297.jpg",
    "link": "https://stockx.com/puma-retro-297"
  },
  {
    "modello": "jordan ultra boost 298",
    "nome": "Jordan Ultra Boost 298",
    "sku": "JOUL0298",
    "prezzo": "272",
    "immagine": "https://images.stockx.com/images/Jordan-Ultra Boost-298.jpg",
    "link": "https://stockx.com/jordan-ultra boost-298"
  },
  {
    "modello": "adidas ultra boost 299",
    "nome": "Adidas Ultra Boost 299",
    "sku": "ADUL0299",
    "prezzo": "229",
    "immagine": "https://images.stockx.com/images/Adidas-Ultra Boost-299.jpg",
    "link": "https://stockx.com/adidas-ultra boost-299"
  },
  {
    "modello": "adidas dunk 300",
    "nome": "Adidas Dunk 300",
    "sku": "ADDU0300",
    "prezzo": "173",
    "immagine": "https://images.stockx.com/images/Adidas-Dunk-300.jpg",
    "link": "https://stockx.com/adidas-dunk-300"
  },
  {
    "modello": "new balance yeezy 301",
    "nome": "New Balance Yeezy 301",
    "sku": "NEYE0301",
    "prezzo": "83",
    "immagine": "https://images.stockx.com/images/New Balance-Yeezy-301.jpg",
    "link": "https://stockx.com/new balance-yeezy-301"
  },
  {
    "modello": "reebok gel-lyte 302",
    "nome": "Reebok Gel-Lyte 302",
    "sku": "REGE0302",
    "prezzo": "296",
    "immagine": "https://images.stockx.com/images/Reebok-Gel-Lyte-302.jpg",
    "link": "https://stockx.com/reebok-gel-lyte-302"
  },
  {
    "modello": "reebok chuck taylor 303",
    "nome": "Reebok Chuck Taylor 303",
    "sku": "RECH0303",
    "prezzo": "341",
    "immagine": "https://images.stockx.com/images/Reebok-Chuck Taylor-303.jpg",
    "link": "https://stockx.com/reebok-chuck taylor-303"
  },
  {
    "modello": "new balance classic 304",
    "nome": "New Balance Classic 304",
    "sku": "NECL0304",
    "prezzo": "360",
    "immagine": "https://images.stockx.com/images/New Balance-Classic-304.jpg",
    "link": "https://stockx.com/new balance-classic-304"
  },
  {
    "modello": "asics classic 305",
    "nome": "Asics Classic 305",
    "sku": "ASCL0305",
    "prezzo": "137",
    "immagine": "https://images.stockx.com/images/Asics-Classic-305.jpg",
    "link": "https://stockx.com/asics-classic-305"
  },
  {
    "modello": "jordan retro 306",
    "nome": "Jordan Retro 306",
    "sku": "JORE0306",
    "prezzo": "277",
    "immagine": "https://images.stockx.com/images/Jordan-Retro-306.jpg",
    "link": "https://stockx.com/jordan-retro-306"
  },
  {
    "modello": "converse air max 307",
    "nome": "Converse Air Max 307",
    "sku": "COAI0307",
    "prezzo": "171",
    "immagine": "https://images.stockx.com/images/Converse-Air Max-307.jpg",
    "link": "https://stockx.com/converse-air max-307"
  },
  {
    "modello": "converse retro 308",
    "nome": "Converse Retro 308",
    "sku": "CORE0308",
    "prezzo": "96",
    "immagine": "https://images.stockx.com/images/Converse-Retro-308.jpg",
    "link": "https://stockx.com/converse-retro-308"
  },
  {
    "modello": "converse retro 309",
    "nome": "Converse Retro 309",
    "sku": "CORE0309",
    "prezzo": "354",
    "immagine": "https://images.stockx.com/images/Converse-Retro-309.jpg",
    "link": "https://stockx.com/converse-retro-309"
  },
  {
    "modello": "asics classic 310",
    "nome": "Asics Classic 310",
    "sku": "ASCL0310",
    "prezzo": "289",
    "immagine": "https://images.stockx.com/images/Asics-Classic-310.jpg",
    "link": "https://stockx.com/asics-classic-310"
  },
  {
    "modello": "puma ultra boost 311",
    "nome": "Puma Ultra Boost 311",
    "sku": "PUUL0311",
    "prezzo": "168",
    "immagine": "https://images.stockx.com/images/Puma-Ultra Boost-311.jpg",
    "link": "https://stockx.com/puma-ultra boost-311"
  },
  {
    "modello": "nike ultra boost 312",
    "nome": "Nike Ultra Boost 312",
    "sku": "NIUL0312",
    "prezzo": "92",
    "immagine": "https://images.stockx.com/images/Nike-Ultra Boost-312.jpg",
    "link": "https://stockx.com/nike-ultra boost-312"
  },
  {
    "modello": "nike classic 313",
    "nome": "Nike Classic 313",
    "sku": "NICL0313",
    "prezzo": "382",
    "immagine": "https://images.stockx.com/images/Nike-Classic-313.jpg",
    "link": "https://stockx.com/nike-classic-313"
  },
  {
    "modello": "converse chuck taylor 314",
    "nome": "Converse Chuck Taylor 314",
    "sku": "COCH0314",
    "prezzo": "226",
    "immagine": "https://images.stockx.com/images/Converse-Chuck Taylor-314.jpg",
    "link": "https://stockx.com/converse-chuck taylor-314"
  },
  {
    "modello": "jordan dunk 315",
    "nome": "Jordan Dunk 315",
    "sku": "JODU0315",
    "prezzo": "279",
    "immagine": "https://images.stockx.com/images/Jordan-Dunk-315.jpg",
    "link": "https://stockx.com/jordan-dunk-315"
  },
  {
    "modello": "adidas yeezy 316",
    "nome": "Adidas Yeezy 316",
    "sku": "ADYE0316",
    "prezzo": "106",
    "immagine": "https://images.stockx.com/images/Adidas-Yeezy-316.jpg",
    "link": "https://stockx.com/adidas-yeezy-316"
  },
  {
    "modello": "jordan classic 317",
    "nome": "Jordan Classic 317",
    "sku": "JOCL0317",
    "prezzo": "230",
    "immagine": "https://images.stockx.com/images/Jordan-Classic-317.jpg",
    "link": "https://stockx.com/jordan-classic-317"
  },
  {
    "modello": "jordan classic 318",
    "nome": "Jordan Classic 318",
    "sku": "JOCL0318",
    "prezzo": "259",
    "immagine": "https://images.stockx.com/images/Jordan-Classic-318.jpg",
    "link": "https://stockx.com/jordan-classic-318"
  },
  {
    "modello": "nike air max 319",
    "nome": "Nike Air Max 319",
    "sku": "NIAI0319",
    "prezzo": "337",
    "immagine": "https://images.stockx.com/images/Nike-Air Max-319.jpg",
    "link": "https://stockx.com/nike-air max-319"
  },
  {
    "modello": "reebok classic 320",
    "nome": "Reebok Classic 320",
    "sku": "RECL0320",
    "prezzo": "193",
    "immagine": "https://images.stockx.com/images/Reebok-Classic-320.jpg",
    "link": "https://stockx.com/reebok-classic-320"
  },
  {
    "modello": "new balance classic 321",
    "nome": "New Balance Classic 321",
    "sku": "NECL0321",
    "prezzo": "218",
    "immagine": "https://images.stockx.com/images/New Balance-Classic-321.jpg",
    "link": "https://stockx.com/new balance-classic-321"
  },
  {
    "modello": "jordan dunk 322",
    "nome": "Jordan Dunk 322",
    "sku": "JODU0322",
    "prezzo": "242",
    "immagine": "https://images.stockx.com/images/Jordan-Dunk-322.jpg",
    "link": "https://stockx.com/jordan-dunk-322"
  },
  {
    "modello": "puma ultra boost 323",
    "nome": "Puma Ultra Boost 323",
    "sku": "PUUL0323",
    "prezzo": "232",
    "immagine": "https://images.stockx.com/images/Puma-Ultra Boost-323.jpg",
    "link": "https://stockx.com/puma-ultra boost-323"
  },
  {
    "modello": "puma ultra boost 324",
    "nome": "Puma Ultra Boost 324",
    "sku": "PUUL0324",
    "prezzo": "156",
    "immagine": "https://images.stockx.com/images/Puma-Ultra Boost-324.jpg",
    "link": "https://stockx.com/puma-ultra boost-324"
  },
  {
    "modello": "reebok chuck taylor 325",
    "nome": "Reebok Chuck Taylor 325",
    "sku": "RECH0325",
    "prezzo": "367",
    "immagine": "https://images.stockx.com/images/Reebok-Chuck Taylor-325.jpg",
    "link": "https://stockx.com/reebok-chuck taylor-325"
  },
  {
    "modello": "nike chuck taylor 326",
    "nome": "Nike Chuck Taylor 326",
    "sku": "NICH0326",
    "prezzo": "294",
    "immagine": "https://images.stockx.com/images/Nike-Chuck Taylor-326.jpg",
    "link": "https://stockx.com/nike-chuck taylor-326"
  },
  {
    "modello": "new balance retro 327",
    "nome": "New Balance Retro 327",
    "sku": "NERE0327",
    "prezzo": "274",
    "immagine": "https://images.stockx.com/images/New Balance-Retro-327.jpg",
    "link": "https://stockx.com/new balance-retro-327"
  },
  {
    "modello": "asics yeezy 328",
    "nome": "Asics Yeezy 328",
    "sku": "ASYE0328",
    "prezzo": "170",
    "immagine": "https://images.stockx.com/images/Asics-Yeezy-328.jpg",
    "link": "https://stockx.com/asics-yeezy-328"
  },
  {
    "modello": "jordan retro 329",
    "nome": "Jordan Retro 329",
    "sku": "JORE0329",
    "prezzo": "245",
    "immagine": "https://images.stockx.com/images/Jordan-Retro-329.jpg",
    "link": "https://stockx.com/jordan-retro-329"
  },
  {
    "modello": "asics chuck taylor 330",
    "nome": "Asics Chuck Taylor 330",
    "sku": "ASCH0330",
    "prezzo": "149",
    "immagine": "https://images.stockx.com/images/Asics-Chuck Taylor-330.jpg",
    "link": "https://stockx.com/asics-chuck taylor-330"
  },
  {
    "modello": "new balance ultra boost 331",
    "nome": "New Balance Ultra Boost 331",
    "sku": "NEUL0331",
    "prezzo": "363",
    "immagine": "https://images.stockx.com/images/New Balance-Ultra Boost-331.jpg",
    "link": "https://stockx.com/new balance-ultra boost-331"
  },
  {
    "modello": "new balance retro 332",
    "nome": "New Balance Retro 332",
    "sku": "NERE0332",
    "prezzo": "336",
    "immagine": "https://images.stockx.com/images/New Balance-Retro-332.jpg",
    "link": "https://stockx.com/new balance-retro-332"
  },
  {
    "modello": "new balance retro 333",
    "nome": "New Balance Retro 333",
    "sku": "NERE0333",
    "prezzo": "378",
    "immagine": "https://images.stockx.com/images/New Balance-Retro-333.jpg",
    "link": "https://stockx.com/new balance-retro-333"
  },
  {
    "modello": "converse chuck taylor 334",
    "nome": "Converse Chuck Taylor 334",
    "sku": "COCH0334",
    "prezzo": "366",
    "immagine": "https://images.stockx.com/images/Converse-Chuck Taylor-334.jpg",
    "link": "https://stockx.com/converse-chuck taylor-334"
  },
  {
    "modello": "puma ultra boost 335",
    "nome": "Puma Ultra Boost 335",
    "sku": "PUUL0335",
    "prezzo": "267",
    "immagine": "https://images.stockx.com/images/Puma-Ultra Boost-335.jpg",
    "link": "https://stockx.com/puma-ultra boost-335"
  },
  {
    "modello": "converse air max 336",
    "nome": "Converse Air Max 336",
    "sku": "COAI0336",
    "prezzo": "162",
    "immagine": "https://images.stockx.com/images/Converse-Air Max-336.jpg",
    "link": "https://stockx.com/converse-air max-336"
  },
  {
    "modello": "adidas retro 337",
    "nome": "Adidas Retro 337",
    "sku": "ADRE0337",
    "prezzo": "150",
    "immagine": "https://images.stockx.com/images/Adidas-Retro-337.jpg",
    "link": "https://stockx.com/adidas-retro-337"
  },
  {
    "modello": "reebok gel-lyte 338",
    "nome": "Reebok Gel-Lyte 338",
    "sku": "REGE0338",
    "prezzo": "144",
    "immagine": "https://images.stockx.com/images/Reebok-Gel-Lyte-338.jpg",
    "link": "https://stockx.com/reebok-gel-lyte-338"
  },
  {
    "modello": "puma ultra boost 339",
    "nome": "Puma Ultra Boost 339",
    "sku": "PUUL0339",
    "prezzo": "228",
    "immagine": "https://images.stockx.com/images/Puma-Ultra Boost-339.jpg",
    "link": "https://stockx.com/puma-ultra boost-339"
  },
  {
    "modello": "converse ultra boost 340",
    "nome": "Converse Ultra Boost 340",
    "sku": "COUL0340",
    "prezzo": "155",
    "immagine": "https://images.stockx.com/images/Converse-Ultra Boost-340.jpg",
    "link": "https://stockx.com/converse-ultra boost-340"
  },
  {
    "modello": "reebok gel-lyte 341",
    "nome": "Reebok Gel-Lyte 341",
    "sku": "REGE0341",
    "prezzo": "202",
    "immagine": "https://images.stockx.com/images/Reebok-Gel-Lyte-341.jpg",
    "link": "https://stockx.com/reebok-gel-lyte-341"
  },
  {
    "modello": "jordan yeezy 342",
    "nome": "Jordan Yeezy 342",
    "sku": "JOYE0342",
    "prezzo": "343",
    "immagine": "https://images.stockx.com/images/Jordan-Yeezy-342.jpg",
    "link": "https://stockx.com/jordan-yeezy-342"
  },
  {
    "modello": "new balance gel-lyte 343",
    "nome": "New Balance Gel-Lyte 343",
    "sku": "NEGE0343",
    "prezzo": "237",
    "immagine": "https://images.stockx.com/images/New Balance-Gel-Lyte-343.jpg",
    "link": "https://stockx.com/new balance-gel-lyte-343"
  },
  {
    "modello": "jordan air max 344",
    "nome": "Jordan Air Max 344",
    "sku": "JOAI0344",
    "prezzo": "307",
    "immagine": "https://images.stockx.com/images/Jordan-Air Max-344.jpg",
    "link": "https://stockx.com/jordan-air max-344"
  },
  {
    "modello": "reebok ultra boost 345",
    "nome": "Reebok Ultra Boost 345",
    "sku": "REUL0345",
    "prezzo": "313",
    "immagine": "https://images.stockx.com/images/Reebok-Ultra Boost-345.jpg",
    "link": "https://stockx.com/reebok-ultra boost-345"
  },
  {
    "modello": "puma gel-lyte 346",
    "nome": "Puma Gel-Lyte 346",
    "sku": "PUGE0346",
    "prezzo": "195",
    "immagine": "https://images.stockx.com/images/Puma-Gel-Lyte-346.jpg",
    "link": "https://stockx.com/puma-gel-lyte-346"
  },
  {
    "modello": "puma ultra boost 347",
    "nome": "Puma Ultra Boost 347",
    "sku": "PUUL0347",
    "prezzo": "128",
    "immagine": "https://images.stockx.com/images/Puma-Ultra Boost-347.jpg",
    "link": "https://stockx.com/puma-ultra boost-347"
  },
  {
    "modello": "jordan air max 348",
    "nome": "Jordan Air Max 348",
    "sku": "JOAI0348",
    "prezzo": "359",
    "immagine": "https://images.stockx.com/images/Jordan-Air Max-348.jpg",
    "link": "https://stockx.com/jordan-air max-348"
  },
  {
    "modello": "asics retro 349",
    "nome": "Asics Retro 349",
    "sku": "ASRE0349",
    "prezzo": "277",
    "immagine": "https://images.stockx.com/images/Asics-Retro-349.jpg",
    "link": "https://stockx.com/asics-retro-349"
  },
  {
    "modello": "puma air max 350",
    "nome": "Puma Air Max 350",
    "sku": "PUAI0350",
    "prezzo": "297",
    "immagine": "https://images.stockx.com/images/Puma-Air Max-350.jpg",
    "link": "https://stockx.com/puma-air max-350"
  },
  {
    "modello": "reebok gel-lyte 351",
    "nome": "Reebok Gel-Lyte 351",
    "sku": "REGE0351",
    "prezzo": "268",
    "immagine": "https://images.stockx.com/images/Reebok-Gel-Lyte-351.jpg",
    "link": "https://stockx.com/reebok-gel-lyte-351"
  },
  {
    "modello": "converse classic 352",
    "nome": "Converse Classic 352",
    "sku": "COCL0352",
    "prezzo": "134",
    "immagine": "https://images.stockx.com/images/Converse-Classic-352.jpg",
    "link": "https://stockx.com/converse-classic-352"
  },
  {
    "modello": "adidas ultra boost 353",
    "nome": "Adidas Ultra Boost 353",
    "sku": "ADUL0353",
    "prezzo": "262",
    "immagine": "https://images.stockx.com/images/Adidas-Ultra Boost-353.jpg",
    "link": "https://stockx.com/adidas-ultra boost-353"
  },
  {
    "modello": "puma ultra boost 354",
    "nome": "Puma Ultra Boost 354",
    "sku": "PUUL0354",
    "prezzo": "200",
    "immagine": "https://images.stockx.com/images/Puma-Ultra Boost-354.jpg",
    "link": "https://stockx.com/puma-ultra boost-354"
  },
  {
    "modello": "nike air max 355",
    "nome": "Nike Air Max 355",
    "sku": "NIAI0355",
    "prezzo": "255",
    "immagine": "https://images.stockx.com/images/Nike-Air Max-355.jpg",
    "link": "https://stockx.com/nike-air max-355"
  },
  {
    "modello": "puma classic 356",
    "nome": "Puma Classic 356",
    "sku": "PUCL0356",
    "prezzo": "218",
    "immagine": "https://images.stockx.com/images/Puma-Classic-356.jpg",
    "link": "https://stockx.com/puma-classic-356"
  },
  {
    "modello": "reebok gel-lyte 357",
    "nome": "Reebok Gel-Lyte 357",
    "sku": "REGE0357",
    "prezzo": "276",
    "immagine": "https://images.stockx.com/images/Reebok-Gel-Lyte-357.jpg",
    "link": "https://stockx.com/reebok-gel-lyte-357"
  },
  {
    "modello": "jordan dunk 358",
    "nome": "Jordan Dunk 358",
    "sku": "JODU0358",
    "prezzo": "186",
    "immagine": "https://images.stockx.com/images/Jordan-Dunk-358.jpg",
    "link": "https://stockx.com/jordan-dunk-358"
  },
  {
    "modello": "nike dunk 359",
    "nome": "Nike Dunk 359",
    "sku": "NIDU0359",
    "prezzo": "260",
    "immagine": "https://images.stockx.com/images/Nike-Dunk-359.jpg",
    "link": "https://stockx.com/nike-dunk-359"
  },
  {
    "modello": "converse chuck taylor 360",
    "nome": "Converse Chuck Taylor 360",
    "sku": "COCH0360",
    "prezzo": "133",
    "immagine": "https://images.stockx.com/images/Converse-Chuck Taylor-360.jpg",
    "link": "https://stockx.com/converse-chuck taylor-360"
  },
  {
    "modello": "jordan dunk 361",
    "nome": "Jordan Dunk 361",
    "sku": "JODU0361",
    "prezzo": "285",
    "immagine": "https://images.stockx.com/images/Jordan-Dunk-361.jpg",
    "link": "https://stockx.com/jordan-dunk-361"
  },
  {
    "modello": "jordan gel-lyte 362",
    "nome": "Jordan Gel-Lyte 362",
    "sku": "JOGE0362",
    "prezzo": "280",
    "immagine": "https://images.stockx.com/images/Jordan-Gel-Lyte-362.jpg",
    "link": "https://stockx.com/jordan-gel-lyte-362"
  },
  {
    "modello": "nike dunk 363",
    "nome": "Nike Dunk 363",
    "sku": "NIDU0363",
    "prezzo": "149",
    "immagine": "https://images.stockx.com/images/Nike-Dunk-363.jpg",
    "link": "https://stockx.com/nike-dunk-363"
  },
  {
    "modello": "new balance gel-lyte 364",
    "nome": "New Balance Gel-Lyte 364",
    "sku": "NEGE0364",
    "prezzo": "229",
    "immagine": "https://images.stockx.com/images/New Balance-Gel-Lyte-364.jpg",
    "link": "https://stockx.com/new balance-gel-lyte-364"
  },
  {
    "modello": "jordan yeezy 365",
    "nome": "Jordan Yeezy 365",
    "sku": "JOYE0365",
    "prezzo": "284",
    "immagine": "https://images.stockx.com/images/Jordan-Yeezy-365.jpg",
    "link": "https://stockx.com/jordan-yeezy-365"
  },
  {
    "modello": "reebok chuck taylor 366",
    "nome": "Reebok Chuck Taylor 366",
    "sku": "RECH0366",
    "prezzo": "174",
    "immagine": "https://images.stockx.com/images/Reebok-Chuck Taylor-366.jpg",
    "link": "https://stockx.com/reebok-chuck taylor-366"
  },
  {
    "modello": "converse gel-lyte 367",
    "nome": "Converse Gel-Lyte 367",
    "sku": "COGE0367",
    "prezzo": "116",
    "immagine": "https://images.stockx.com/images/Converse-Gel-Lyte-367.jpg",
    "link": "https://stockx.com/converse-gel-lyte-367"
  },
  {
    "modello": "nike classic 368",
    "nome": "Nike Classic 368",
    "sku": "NICL0368",
    "prezzo": "301",
    "immagine": "https://images.stockx.com/images/Nike-Classic-368.jpg",
    "link": "https://stockx.com/nike-classic-368"
  },
  {
    "modello": "converse yeezy 369",
    "nome": "Converse Yeezy 369",
    "sku": "COYE0369",
    "prezzo": "168",
    "immagine": "https://images.stockx.com/images/Converse-Yeezy-369.jpg",
    "link": "https://stockx.com/converse-yeezy-369"
  },
  {
    "modello": "nike gel-lyte 370",
    "nome": "Nike Gel-Lyte 370",
    "sku": "NIGE0370",
    "prezzo": "228",
    "immagine": "https://images.stockx.com/images/Nike-Gel-Lyte-370.jpg",
    "link": "https://stockx.com/nike-gel-lyte-370"
  },
  {
    "modello": "new balance retro 371",
    "nome": "New Balance Retro 371",
    "sku": "NERE0371",
    "prezzo": "147",
    "immagine": "https://images.stockx.com/images/New Balance-Retro-371.jpg",
    "link": "https://stockx.com/new balance-retro-371"
  },
  {
    "modello": "nike ultra boost 372",
    "nome": "Nike Ultra Boost 372",
    "sku": "NIUL0372",
    "prezzo": "319",
    "immagine": "https://images.stockx.com/images/Nike-Ultra Boost-372.jpg",
    "link": "https://stockx.com/nike-ultra boost-372"
  },
  {
    "modello": "new balance dunk 373",
    "nome": "New Balance Dunk 373",
    "sku": "NEDU0373",
    "prezzo": "166",
    "immagine": "https://images.stockx.com/images/New Balance-Dunk-373.jpg",
    "link": "https://stockx.com/new balance-dunk-373"
  },
  {
    "modello": "nike ultra boost 374",
    "nome": "Nike Ultra Boost 374",
    "sku": "NIUL0374",
    "prezzo": "324",
    "immagine": "https://images.stockx.com/images/Nike-Ultra Boost-374.jpg",
    "link": "https://stockx.com/nike-ultra boost-374"
  },
  {
    "modello": "reebok retro 375",
    "nome": "Reebok Retro 375",
    "sku": "RERE0375",
    "prezzo": "272",
    "immagine": "https://images.stockx.com/images/Reebok-Retro-375.jpg",
    "link": "https://stockx.com/reebok-retro-375"
  },
  {
    "modello": "jordan yeezy 376",
    "nome": "Jordan Yeezy 376",
    "sku": "JOYE0376",
    "prezzo": "177",
    "immagine": "https://images.stockx.com/images/Jordan-Yeezy-376.jpg",
    "link": "https://stockx.com/jordan-yeezy-376"
  },
  {
    "modello": "puma ultra boost 377",
    "nome": "Puma Ultra Boost 377",
    "sku": "PUUL0377",
    "prezzo": "288",
    "immagine": "https://images.stockx.com/images/Puma-Ultra Boost-377.jpg",
    "link": "https://stockx.com/puma-ultra boost-377"
  },
  {
    "modello": "reebok ultra boost 378",
    "nome": "Reebok Ultra Boost 378",
    "sku": "REUL0378",
    "prezzo": "234",
    "immagine": "https://images.stockx.com/images/Reebok-Ultra Boost-378.jpg",
    "link": "https://stockx.com/reebok-ultra boost-378"
  },
  {
    "modello": "adidas retro 379",
    "nome": "Adidas Retro 379",
    "sku": "ADRE0379",
    "prezzo": "330",
    "immagine": "https://images.stockx.com/images/Adidas-Retro-379.jpg",
    "link": "https://stockx.com/adidas-retro-379"
  },
  {
    "modello": "asics gel-lyte 380",
    "nome": "Asics Gel-Lyte 380",
    "sku": "ASGE0380",
    "prezzo": "167",
    "immagine": "https://images.stockx.com/images/Asics-Gel-Lyte-380.jpg",
    "link": "https://stockx.com/asics-gel-lyte-380"
  },
  {
    "modello": "asics classic 381",
    "nome": "Asics Classic 381",
    "sku": "ASCL0381",
    "prezzo": "150",
    "immagine": "https://images.stockx.com/images/Asics-Classic-381.jpg",
    "link": "https://stockx.com/asics-classic-381"
  },
  {
    "modello": "puma air max 382",
    "nome": "Puma Air Max 382",
    "sku": "PUAI0382",
    "prezzo": "321",
    "immagine": "https://images.stockx.com/images/Puma-Air Max-382.jpg",
    "link": "https://stockx.com/puma-air max-382"
  },
  {
    "modello": "new balance dunk 383",
    "nome": "New Balance Dunk 383",
    "sku": "NEDU0383",
    "prezzo": "234",
    "immagine": "https://images.stockx.com/images/New Balance-Dunk-383.jpg",
    "link": "https://stockx.com/new balance-dunk-383"
  },
  {
    "modello": "reebok dunk 384",
    "nome": "Reebok Dunk 384",
    "sku": "REDU0384",
    "prezzo": "210",
    "immagine": "https://images.stockx.com/images/Reebok-Dunk-384.jpg",
    "link": "https://stockx.com/reebok-dunk-384"
  },
  {
    "modello": "asics air max 385",
    "nome": "Asics Air Max 385",
    "sku": "ASAI0385",
    "prezzo": "399",
    "immagine": "https://images.stockx.com/images/Asics-Air Max-385.jpg",
    "link": "https://stockx.com/asics-air max-385"
  },
  {
    "modello": "nike gel-lyte 386",
    "nome": "Nike Gel-Lyte 386",
    "sku": "NIGE0386",
    "prezzo": "219",
    "immagine": "https://images.stockx.com/images/Nike-Gel-Lyte-386.jpg",
    "link": "https://stockx.com/nike-gel-lyte-386"
  },
  {
    "modello": "asics ultra boost 387",
    "nome": "Asics Ultra Boost 387",
    "sku": "ASUL0387",
    "prezzo": "129",
    "immagine": "https://images.stockx.com/images/Asics-Ultra Boost-387.jpg",
    "link": "https://stockx.com/asics-ultra boost-387"
  },
  {
    "modello": "asics yeezy 388",
    "nome": "Asics Yeezy 388",
    "sku": "ASYE0388",
    "prezzo": "356",
    "immagine": "https://images.stockx.com/images/Asics-Yeezy-388.jpg",
    "link": "https://stockx.com/asics-yeezy-388"
  },
  {
    "modello": "converse retro 389",
    "nome": "Converse Retro 389",
    "sku": "CORE0389",
    "prezzo": "212",
    "immagine": "https://images.stockx.com/images/Converse-Retro-389.jpg",
    "link": "https://stockx.com/converse-retro-389"
  },
  {
    "modello": "converse chuck taylor 390",
    "nome": "Converse Chuck Taylor 390",
    "sku": "COCH0390",
    "prezzo": "180",
    "immagine": "https://images.stockx.com/images/Converse-Chuck Taylor-390.jpg",
    "link": "https://stockx.com/converse-chuck taylor-390"
  },
  {
    "modello": "converse gel-lyte 391",
    "nome": "Converse Gel-Lyte 391",
    "sku": "COGE0391",
    "prezzo": "232",
    "immagine": "https://images.stockx.com/images/Converse-Gel-Lyte-391.jpg",
    "link": "https://stockx.com/converse-gel-lyte-391"
  },
  {
    "modello": "puma gel-lyte 392",
    "nome": "Puma Gel-Lyte 392",
    "sku": "PUGE0392",
    "prezzo": "374",
    "immagine": "https://images.stockx.com/images/Puma-Gel-Lyte-392.jpg",
    "link": "https://stockx.com/puma-gel-lyte-392"
  },
  {
    "modello": "nike yeezy 393",
    "nome": "Nike Yeezy 393",
    "sku": "NIYE0393",
    "prezzo": "150",
    "immagine": "https://images.stockx.com/images/Nike-Yeezy-393.jpg",
    "link": "https://stockx.com/nike-yeezy-393"
  },
  {
    "modello": "reebok gel-lyte 394",
    "nome": "Reebok Gel-Lyte 394",
    "sku": "REGE0394",
    "prezzo": "273",
    "immagine": "https://images.stockx.com/images/Reebok-Gel-Lyte-394.jpg",
    "link": "https://stockx.com/reebok-gel-lyte-394"
  },
  {
    "modello": "new balance ultra boost 395",
    "nome": "New Balance Ultra Boost 395",
    "sku": "NEUL0395",
    "prezzo": "376",
    "immagine": "https://images.stockx.com/images/New Balance-Ultra Boost-395.jpg",
    "link": "https://stockx.com/new balance-ultra boost-395"
  },
  {
    "modello": "asics gel-lyte 396",
    "nome": "Asics Gel-Lyte 396",
    "sku": "ASGE0396",
    "prezzo": "192",
    "immagine": "https://images.stockx.com/images/Asics-Gel-Lyte-396.jpg",
    "link": "https://stockx.com/asics-gel-lyte-396"
  },
  {
    "modello": "adidas chuck taylor 397",
    "nome": "Adidas Chuck Taylor 397",
    "sku": "ADCH0397",
    "prezzo": "375",
    "immagine": "https://images.stockx.com/images/Adidas-Chuck Taylor-397.jpg",
    "link": "https://stockx.com/adidas-chuck taylor-397"
  },
  {
    "modello": "jordan air max 398",
    "nome": "Jordan Air Max 398",
    "sku": "JOAI0398",
    "prezzo": "136",
    "immagine": "https://images.stockx.com/images/Jordan-Air Max-398.jpg",
    "link": "https://stockx.com/jordan-air max-398"
  },
  {
    "modello": "adidas yeezy 399",
    "nome": "Adidas Yeezy 399",
    "sku": "ADYE0399",
    "prezzo": "352",
    "immagine": "https://images.stockx.com/images/Adidas-Yeezy-399.jpg",
    "link": "https://stockx.com/adidas-yeezy-399"
  },
  {
    "modello": "adidas yeezy 400",
    "nome": "Adidas Yeezy 400",
    "sku": "ADYE0400",
    "prezzo": "309",
    "immagine": "https://images.stockx.com/images/Adidas-Yeezy-400.jpg",
    "link": "https://stockx.com/adidas-yeezy-400"
  },
  {
    "modello": "nike ultra boost 401",
    "nome": "Nike Ultra Boost 401",
    "sku": "NIUL0401",
    "prezzo": "296",
    "immagine": "https://images.stockx.com/images/Nike-Ultra Boost-401.jpg",
    "link": "https://stockx.com/nike-ultra boost-401"
  },
  {
    "modello": "adidas classic 402",
    "nome": "Adidas Classic 402",
    "sku": "ADCL0402",
    "prezzo": "172",
    "immagine": "https://images.stockx.com/images/Adidas-Classic-402.jpg",
    "link": "https://stockx.com/adidas-classic-402"
  },
  {
    "modello": "nike retro 403",
    "nome": "Nike Retro 403",
    "sku": "NIRE0403",
    "prezzo": "325",
    "immagine": "https://images.stockx.com/images/Nike-Retro-403.jpg",
    "link": "https://stockx.com/nike-retro-403"
  },
  {
    "modello": "new balance ultra boost 404",
    "nome": "New Balance Ultra Boost 404",
    "sku": "NEUL0404",
    "prezzo": "347",
    "immagine": "https://images.stockx.com/images/New Balance-Ultra Boost-404.jpg",
    "link": "https://stockx.com/new balance-ultra boost-404"
  },
  {
    "modello": "puma yeezy 405",
    "nome": "Puma Yeezy 405",
    "sku": "PUYE0405",
    "prezzo": "300",
    "immagine": "https://images.stockx.com/images/Puma-Yeezy-405.jpg",
    "link": "https://stockx.com/puma-yeezy-405"
  },
  {
    "modello": "new balance dunk 406",
    "nome": "New Balance Dunk 406",
    "sku": "NEDU0406",
    "prezzo": "226",
    "immagine": "https://images.stockx.com/images/New Balance-Dunk-406.jpg",
    "link": "https://stockx.com/new balance-dunk-406"
  },
  {
    "modello": "converse gel-lyte 407",
    "nome": "Converse Gel-Lyte 407",
    "sku": "COGE0407",
    "prezzo": "82",
    "immagine": "https://images.stockx.com/images/Converse-Gel-Lyte-407.jpg",
    "link": "https://stockx.com/converse-gel-lyte-407"
  },
  {
    "modello": "jordan retro 408",
    "nome": "Jordan Retro 408",
    "sku": "JORE0408",
    "prezzo": "164",
    "immagine": "https://images.stockx.com/images/Jordan-Retro-408.jpg",
    "link": "https://stockx.com/jordan-retro-408"
  },
  {
    "modello": "puma yeezy 409",
    "nome": "Puma Yeezy 409",
    "sku": "PUYE0409",
    "prezzo": "239",
    "immagine": "https://images.stockx.com/images/Puma-Yeezy-409.jpg",
    "link": "https://stockx.com/puma-yeezy-409"
  },
  {
    "modello": "jordan gel-lyte 410",
    "nome": "Jordan Gel-Lyte 410",
    "sku": "JOGE0410",
    "prezzo": "138",
    "immagine": "https://images.stockx.com/images/Jordan-Gel-Lyte-410.jpg",
    "link": "https://stockx.com/jordan-gel-lyte-410"
  },
  {
    "modello": "adidas retro 411",
    "nome": "Adidas Retro 411",
    "sku": "ADRE0411",
    "prezzo": "193",
    "immagine": "https://images.stockx.com/images/Adidas-Retro-411.jpg",
    "link": "https://stockx.com/adidas-retro-411"
  },
  {
    "modello": "asics air max 412",
    "nome": "Asics Air Max 412",
    "sku": "ASAI0412",
    "prezzo": "367",
    "immagine": "https://images.stockx.com/images/Asics-Air Max-412.jpg",
    "link": "https://stockx.com/asics-air max-412"
  },
  {
    "modello": "converse air max 413",
    "nome": "Converse Air Max 413",
    "sku": "COAI0413",
    "prezzo": "317",
    "immagine": "https://images.stockx.com/images/Converse-Air Max-413.jpg",
    "link": "https://stockx.com/converse-air max-413"
  },
  {
    "modello": "new balance dunk 414",
    "nome": "New Balance Dunk 414",
    "sku": "NEDU0414",
    "prezzo": "272",
    "immagine": "https://images.stockx.com/images/New Balance-Dunk-414.jpg",
    "link": "https://stockx.com/new balance-dunk-414"
  },
  {
    "modello": "new balance chuck taylor 415",
    "nome": "New Balance Chuck Taylor 415",
    "sku": "NECH0415",
    "prezzo": "286",
    "immagine": "https://images.stockx.com/images/New Balance-Chuck Taylor-415.jpg",
    "link": "https://stockx.com/new balance-chuck taylor-415"
  },
  {
    "modello": "adidas dunk 416",
    "nome": "Adidas Dunk 416",
    "sku": "ADDU0416",
    "prezzo": "246",
    "immagine": "https://images.stockx.com/images/Adidas-Dunk-416.jpg",
    "link": "https://stockx.com/adidas-dunk-416"
  },
  {
    "modello": "nike classic 417",
    "nome": "Nike Classic 417",
    "sku": "NICL0417",
    "prezzo": "154",
    "immagine": "https://images.stockx.com/images/Nike-Classic-417.jpg",
    "link": "https://stockx.com/nike-classic-417"
  },
  {
    "modello": "puma air max 418",
    "nome": "Puma Air Max 418",
    "sku": "PUAI0418",
    "prezzo": "287",
    "immagine": "https://images.stockx.com/images/Puma-Air Max-418.jpg",
    "link": "https://stockx.com/puma-air max-418"
  },
  {
    "modello": "converse chuck taylor 419",
    "nome": "Converse Chuck Taylor 419",
    "sku": "COCH0419",
    "prezzo": "389",
    "immagine": "https://images.stockx.com/images/Converse-Chuck Taylor-419.jpg",
    "link": "https://stockx.com/converse-chuck taylor-419"
  },
  {
    "modello": "asics yeezy 420",
    "nome": "Asics Yeezy 420",
    "sku": "ASYE0420",
    "prezzo": "239",
    "immagine": "https://images.stockx.com/images/Asics-Yeezy-420.jpg",
    "link": "https://stockx.com/asics-yeezy-420"
  },
  {
    "modello": "puma yeezy 421",
    "nome": "Puma Yeezy 421",
    "sku": "PUYE0421",
    "prezzo": "155",
    "immagine": "https://images.stockx.com/images/Puma-Yeezy-421.jpg",
    "link": "https://stockx.com/puma-yeezy-421"
  },
  {
    "modello": "nike yeezy 422",
    "nome": "Nike Yeezy 422",
    "sku": "NIYE0422",
    "prezzo": "227",
    "immagine": "https://images.stockx.com/images/Nike-Yeezy-422.jpg",
    "link": "https://stockx.com/nike-yeezy-422"
  },
  {
    "modello": "puma ultra boost 423",
    "nome": "Puma Ultra Boost 423",
    "sku": "PUUL0423",
    "prezzo": "333",
    "immagine": "https://images.stockx.com/images/Puma-Ultra Boost-423.jpg",
    "link": "https://stockx.com/puma-ultra boost-423"
  },
  {
    "modello": "adidas classic 424",
    "nome": "Adidas Classic 424",
    "sku": "ADCL0424",
    "prezzo": "176",
    "immagine": "https://images.stockx.com/images/Adidas-Classic-424.jpg",
    "link": "https://stockx.com/adidas-classic-424"
  },
  {
    "modello": "puma air max 425",
    "nome": "Puma Air Max 425",
    "sku": "PUAI0425",
    "prezzo": "365",
    "immagine": "https://images.stockx.com/images/Puma-Air Max-425.jpg",
    "link": "https://stockx.com/puma-air max-425"
  },
  {
    "modello": "nike classic 426",
    "nome": "Nike Classic 426",
    "sku": "NICL0426",
    "prezzo": "92",
    "immagine": "https://images.stockx.com/images/Nike-Classic-426.jpg",
    "link": "https://stockx.com/nike-classic-426"
  },
  {
    "modello": "nike dunk 427",
    "nome": "Nike Dunk 427",
    "sku": "NIDU0427",
    "prezzo": "262",
    "immagine": "https://images.stockx.com/images/Nike-Dunk-427.jpg",
    "link": "https://stockx.com/nike-dunk-427"
  },
  {
    "modello": "reebok ultra boost 428",
    "nome": "Reebok Ultra Boost 428",
    "sku": "REUL0428",
    "prezzo": "347",
    "immagine": "https://images.stockx.com/images/Reebok-Ultra Boost-428.jpg",
    "link": "https://stockx.com/reebok-ultra boost-428"
  },
  {
    "modello": "nike air max 429",
    "nome": "Nike Air Max 429",
    "sku": "NIAI0429",
    "prezzo": "375",
    "immagine": "https://images.stockx.com/images/Nike-Air Max-429.jpg",
    "link": "https://stockx.com/nike-air max-429"
  },
  {
    "modello": "jordan air max 430",
    "nome": "Jordan Air Max 430",
    "sku": "JOAI0430",
    "prezzo": "190",
    "immagine": "https://images.stockx.com/images/Jordan-Air Max-430.jpg",
    "link": "https://stockx.com/jordan-air max-430"
  },
  {
    "modello": "new balance air max 431",
    "nome": "New Balance Air Max 431",
    "sku": "NEAI0431",
    "prezzo": "195",
    "immagine": "https://images.stockx.com/images/New Balance-Air Max-431.jpg",
    "link": "https://stockx.com/new balance-air max-431"
  },
  {
    "modello": "puma yeezy 432",
    "nome": "Puma Yeezy 432",
    "sku": "PUYE0432",
    "prezzo": "342",
    "immagine": "https://images.stockx.com/images/Puma-Yeezy-432.jpg",
    "link": "https://stockx.com/puma-yeezy-432"
  },
  {
    "modello": "asics yeezy 433",
    "nome": "Asics Yeezy 433",
    "sku": "ASYE0433",
    "prezzo": "274",
    "immagine": "https://images.stockx.com/images/Asics-Yeezy-433.jpg",
    "link": "https://stockx.com/asics-yeezy-433"
  },
  {
    "modello": "puma dunk 434",
    "nome": "Puma Dunk 434",
    "sku": "PUDU0434",
    "prezzo": "381",
    "immagine": "https://images.stockx.com/images/Puma-Dunk-434.jpg",
    "link": "https://stockx.com/puma-dunk-434"
  },
  {
    "modello": "asics dunk 435",
    "nome": "Asics Dunk 435",
    "sku": "ASDU0435",
    "prezzo": "195",
    "immagine": "https://images.stockx.com/images/Asics-Dunk-435.jpg",
    "link": "https://stockx.com/asics-dunk-435"
  },
  {
    "modello": "converse gel-lyte 436",
    "nome": "Converse Gel-Lyte 436",
    "sku": "COGE0436",
    "prezzo": "388",
    "immagine": "https://images.stockx.com/images/Converse-Gel-Lyte-436.jpg",
    "link": "https://stockx.com/converse-gel-lyte-436"
  },
  {
    "modello": "nike classic 437",
    "nome": "Nike Classic 437",
    "sku": "NICL0437",
    "prezzo": "274",
    "immagine": "https://images.stockx.com/images/Nike-Classic-437.jpg",
    "link": "https://stockx.com/nike-classic-437"
  },
  {
    "modello": "converse retro 438",
    "nome": "Converse Retro 438",
    "sku": "CORE0438",
    "prezzo": "298",
    "immagine": "https://images.stockx.com/images/Converse-Retro-438.jpg",
    "link": "https://stockx.com/converse-retro-438"
  },
  {
    "modello": "puma gel-lyte 439",
    "nome": "Puma Gel-Lyte 439",
    "sku": "PUGE0439",
    "prezzo": "87",
    "immagine": "https://images.stockx.com/images/Puma-Gel-Lyte-439.jpg",
    "link": "https://stockx.com/puma-gel-lyte-439"
  },
  {
    "modello": "converse classic 440",
    "nome": "Converse Classic 440",
    "sku": "COCL0440",
    "prezzo": "152",
    "immagine": "https://images.stockx.com/images/Converse-Classic-440.jpg",
    "link": "https://stockx.com/converse-classic-440"
  },
  {
    "modello": "reebok chuck taylor 441",
    "nome": "Reebok Chuck Taylor 441",
    "sku": "RECH0441",
    "prezzo": "322",
    "immagine": "https://images.stockx.com/images/Reebok-Chuck Taylor-441.jpg",
    "link": "https://stockx.com/reebok-chuck taylor-441"
  },
  {
    "modello": "puma chuck taylor 442",
    "nome": "Puma Chuck Taylor 442",
    "sku": "PUCH0442",
    "prezzo": "347",
    "immagine": "https://images.stockx.com/images/Puma-Chuck Taylor-442.jpg",
    "link": "https://stockx.com/puma-chuck taylor-442"
  },
  {
    "modello": "puma classic 443",
    "nome": "Puma Classic 443",
    "sku": "PUCL0443",
    "prezzo": "340",
    "immagine": "https://images.stockx.com/images/Puma-Classic-443.jpg",
    "link": "https://stockx.com/puma-classic-443"
  },
  {
    "modello": "adidas yeezy 444",
    "nome": "Adidas Yeezy 444",
    "sku": "ADYE0444",
    "prezzo": "274",
    "immagine": "https://images.stockx.com/images/Adidas-Yeezy-444.jpg",
    "link": "https://stockx.com/adidas-yeezy-444"
  },
  {
    "modello": "adidas ultra boost 445",
    "nome": "Adidas Ultra Boost 445",
    "sku": "ADUL0445",
    "prezzo": "115",
    "immagine": "https://images.stockx.com/images/Adidas-Ultra Boost-445.jpg",
    "link": "https://stockx.com/adidas-ultra boost-445"
  },
  {
    "modello": "converse ultra boost 446",
    "nome": "Converse Ultra Boost 446",
    "sku": "COUL0446",
    "prezzo": "327",
    "immagine": "https://images.stockx.com/images/Converse-Ultra Boost-446.jpg",
    "link": "https://stockx.com/converse-ultra boost-446"
  },
  {
    "modello": "converse yeezy 447",
    "nome": "Converse Yeezy 447",
    "sku": "COYE0447",
    "prezzo": "368",
    "immagine": "https://images.stockx.com/images/Converse-Yeezy-447.jpg",
    "link": "https://stockx.com/converse-yeezy-447"
  },
  {
    "modello": "nike chuck taylor 448",
    "nome": "Nike Chuck Taylor 448",
    "sku": "NICH0448",
    "prezzo": "361",
    "immagine": "https://images.stockx.com/images/Nike-Chuck Taylor-448.jpg",
    "link": "https://stockx.com/nike-chuck taylor-448"
  },
  {
    "modello": "new balance gel-lyte 449",
    "nome": "New Balance Gel-Lyte 449",
    "sku": "NEGE0449",
    "prezzo": "137",
    "immagine": "https://images.stockx.com/images/New Balance-Gel-Lyte-449.jpg",
    "link": "https://stockx.com/new balance-gel-lyte-449"
  },
  {
    "modello": "asics retro 450",
    "nome": "Asics Retro 450",
    "sku": "ASRE0450",
    "prezzo": "150",
    "immagine": "https://images.stockx.com/images/Asics-Retro-450.jpg",
    "link": "https://stockx.com/asics-retro-450"
  },
  {
    "modello": "nike yeezy 451",
    "nome": "Nike Yeezy 451",
    "sku": "NIYE0451",
    "prezzo": "366",
    "immagine": "https://images.stockx.com/images/Nike-Yeezy-451.jpg",
    "link": "https://stockx.com/nike-yeezy-451"
  },
  {
    "modello": "converse classic 452",
    "nome": "Converse Classic 452",
    "sku": "COCL0452",
    "prezzo": "120",
    "immagine": "https://images.stockx.com/images/Converse-Classic-452.jpg",
    "link": "https://stockx.com/converse-classic-452"
  },
  {
    "modello": "converse air max 453",
    "nome": "Converse Air Max 453",
    "sku": "COAI0453",
    "prezzo": "343",
    "immagine": "https://images.stockx.com/images/Converse-Air Max-453.jpg",
    "link": "https://stockx.com/converse-air max-453"
  },
  {
    "modello": "new balance ultra boost 454",
    "nome": "New Balance Ultra Boost 454",
    "sku": "NEUL0454",
    "prezzo": "378",
    "immagine": "https://images.stockx.com/images/New Balance-Ultra Boost-454.jpg",
    "link": "https://stockx.com/new balance-ultra boost-454"
  },
  {
    "modello": "reebok classic 455",
    "nome": "Reebok Classic 455",
    "sku": "RECL0455",
    "prezzo": "328",
    "immagine": "https://images.stockx.com/images/Reebok-Classic-455.jpg",
    "link": "https://stockx.com/reebok-classic-455"
  },
  {
    "modello": "reebok classic 456",
    "nome": "Reebok Classic 456",
    "sku": "RECL0456",
    "prezzo": "165",
    "immagine": "https://images.stockx.com/images/Reebok-Classic-456.jpg",
    "link": "https://stockx.com/reebok-classic-456"
  },
  {
    "modello": "puma chuck taylor 457",
    "nome": "Puma Chuck Taylor 457",
    "sku": "PUCH0457",
    "prezzo": "190",
    "immagine": "https://images.stockx.com/images/Puma-Chuck Taylor-457.jpg",
    "link": "https://stockx.com/puma-chuck taylor-457"
  },
  {
    "modello": "puma classic 458",
    "nome": "Puma Classic 458",
    "sku": "PUCL0458",
    "prezzo": "215",
    "immagine": "https://images.stockx.com/images/Puma-Classic-458.jpg",
    "link": "https://stockx.com/puma-classic-458"
  },
  {
    "modello": "nike gel-lyte 459",
    "nome": "Nike Gel-Lyte 459",
    "sku": "NIGE0459",
    "prezzo": "386",
    "immagine": "https://images.stockx.com/images/Nike-Gel-Lyte-459.jpg",
    "link": "https://stockx.com/nike-gel-lyte-459"
  },
  {
    "modello": "nike chuck taylor 460",
    "nome": "Nike Chuck Taylor 460",
    "sku": "NICH0460",
    "prezzo": "133",
    "immagine": "https://images.stockx.com/images/Nike-Chuck Taylor-460.jpg",
    "link": "https://stockx.com/nike-chuck taylor-460"
  },
  {
    "modello": "puma dunk 461",
    "nome": "Puma Dunk 461",
    "sku": "PUDU0461",
    "prezzo": "127",
    "immagine": "https://images.stockx.com/images/Puma-Dunk-461.jpg",
    "link": "https://stockx.com/puma-dunk-461"
  },
  {
    "modello": "nike dunk 462",
    "nome": "Nike Dunk 462",
    "sku": "NIDU0462",
    "prezzo": "232",
    "immagine": "https://images.stockx.com/images/Nike-Dunk-462.jpg",
    "link": "https://stockx.com/nike-dunk-462"
  },
  {
    "modello": "reebok air max 463",
    "nome": "Reebok Air Max 463",
    "sku": "REAI0463",
    "prezzo": "358",
    "immagine": "https://images.stockx.com/images/Reebok-Air Max-463.jpg",
    "link": "https://stockx.com/reebok-air max-463"
  },
  {
    "modello": "jordan yeezy 464",
    "nome": "Jordan Yeezy 464",
    "sku": "JOYE0464",
    "prezzo": "370",
    "immagine": "https://images.stockx.com/images/Jordan-Yeezy-464.jpg",
    "link": "https://stockx.com/jordan-yeezy-464"
  },
  {
    "modello": "converse air max 465",
    "nome": "Converse Air Max 465",
    "sku": "COAI0465",
    "prezzo": "114",
    "immagine": "https://images.stockx.com/images/Converse-Air Max-465.jpg",
    "link": "https://stockx.com/converse-air max-465"
  },
  {
    "modello": "adidas yeezy 466",
    "nome": "Adidas Yeezy 466",
    "sku": "ADYE0466",
    "prezzo": "158",
    "immagine": "https://images.stockx.com/images/Adidas-Yeezy-466.jpg",
    "link": "https://stockx.com/adidas-yeezy-466"
  },
  {
    "modello": "new balance gel-lyte 467",
    "nome": "New Balance Gel-Lyte 467",
    "sku": "NEGE0467",
    "prezzo": "369",
    "immagine": "https://images.stockx.com/images/New Balance-Gel-Lyte-467.jpg",
    "link": "https://stockx.com/new balance-gel-lyte-467"
  },
  {
    "modello": "nike classic 468",
    "nome": "Nike Classic 468",
    "sku": "NICL0468",
    "prezzo": "141",
    "immagine": "https://images.stockx.com/images/Nike-Classic-468.jpg",
    "link": "https://stockx.com/nike-classic-468"
  },
  {
    "modello": "converse yeezy 469",
    "nome": "Converse Yeezy 469",
    "sku": "COYE0469",
    "prezzo": "250",
    "immagine": "https://images.stockx.com/images/Converse-Yeezy-469.jpg",
    "link": "https://stockx.com/converse-yeezy-469"
  },
  {
    "modello": "new balance air max 470",
    "nome": "New Balance Air Max 470",
    "sku": "NEAI0470",
    "prezzo": "353",
    "immagine": "https://images.stockx.com/images/New Balance-Air Max-470.jpg",
    "link": "https://stockx.com/new balance-air max-470"
  },
  {
    "modello": "puma gel-lyte 471",
    "nome": "Puma Gel-Lyte 471",
    "sku": "PUGE0471",
    "prezzo": "233",
    "immagine": "https://images.stockx.com/images/Puma-Gel-Lyte-471.jpg",
    "link": "https://stockx.com/puma-gel-lyte-471"
  },
  {
    "modello": "new balance dunk 472",
    "nome": "New Balance Dunk 472",
    "sku": "NEDU0472",
    "prezzo": "337",
    "immagine": "https://images.stockx.com/images/New Balance-Dunk-472.jpg",
    "link": "https://stockx.com/new balance-dunk-472"
  },
  {
    "modello": "adidas retro 473",
    "nome": "Adidas Retro 473",
    "sku": "ADRE0473",
    "prezzo": "292",
    "immagine": "https://images.stockx.com/images/Adidas-Retro-473.jpg",
    "link": "https://stockx.com/adidas-retro-473"
  },
  {
    "modello": "jordan dunk 474",
    "nome": "Jordan Dunk 474",
    "sku": "JODU0474",
    "prezzo": "215",
    "immagine": "https://images.stockx.com/images/Jordan-Dunk-474.jpg",
    "link": "https://stockx.com/jordan-dunk-474"
  },
  {
    "modello": "adidas chuck taylor 475",
    "nome": "Adidas Chuck Taylor 475",
    "sku": "ADCH0475",
    "prezzo": "331",
    "immagine": "https://images.stockx.com/images/Adidas-Chuck Taylor-475.jpg",
    "link": "https://stockx.com/adidas-chuck taylor-475"
  },
  {
    "modello": "jordan air max 476",
    "nome": "Jordan Air Max 476",
    "sku": "JOAI0476",
    "prezzo": "124",
    "immagine": "https://images.stockx.com/images/Jordan-Air Max-476.jpg",
    "link": "https://stockx.com/jordan-air max-476"
  },
  {
    "modello": "reebok ultra boost 477",
    "nome": "Reebok Ultra Boost 477",
    "sku": "REUL0477",
    "prezzo": "123",
    "immagine": "https://images.stockx.com/images/Reebok-Ultra Boost-477.jpg",
    "link": "https://stockx.com/reebok-ultra boost-477"
  },
  {
    "modello": "adidas retro 478",
    "nome": "Adidas Retro 478",
    "sku": "ADRE0478",
    "prezzo": "206",
    "immagine": "https://images.stockx.com/images/Adidas-Retro-478.jpg",
    "link": "https://stockx.com/adidas-retro-478"
  },
  {
    "modello": "puma gel-lyte 479",
    "nome": "Puma Gel-Lyte 479",
    "sku": "PUGE0479",
    "prezzo": "322",
    "immagine": "https://images.stockx.com/images/Puma-Gel-Lyte-479.jpg",
    "link": "https://stockx.com/puma-gel-lyte-479"
  },
  {
    "modello": "converse chuck taylor 480",
    "nome": "Converse Chuck Taylor 480",
    "sku": "COCH0480",
    "prezzo": "249",
    "immagine": "https://images.stockx.com/images/Converse-Chuck Taylor-480.jpg",
    "link": "https://stockx.com/converse-chuck taylor-480"
  },
  {
    "modello": "converse retro 481",
    "nome": "Converse Retro 481",
    "sku": "CORE0481",
    "prezzo": "86",
    "immagine": "https://images.stockx.com/images/Converse-Retro-481.jpg",
    "link": "https://stockx.com/converse-retro-481"
  },
  {
    "modello": "adidas air max 482",
    "nome": "Adidas Air Max 482",
    "sku": "ADAI0482",
    "prezzo": "270",
    "immagine": "https://images.stockx.com/images/Adidas-Air Max-482.jpg",
    "link": "https://stockx.com/adidas-air max-482"
  },
  {
    "modello": "converse chuck taylor 483",
    "nome": "Converse Chuck Taylor 483",
    "sku": "COCH0483",
    "prezzo": "176",
    "immagine": "https://images.stockx.com/images/Converse-Chuck Taylor-483.jpg",
    "link": "https://stockx.com/converse-chuck taylor-483"
  },
  {
    "modello": "converse classic 484",
    "nome": "Converse Classic 484",
    "sku": "COCL0484",
    "prezzo": "316",
    "immagine": "https://images.stockx.com/images/Converse-Classic-484.jpg",
    "link": "https://stockx.com/converse-classic-484"
  },
  {
    "modello": "reebok yeezy 485",
    "nome": "Reebok Yeezy 485",
    "sku": "REYE0485",
    "prezzo": "395",
    "immagine": "https://images.stockx.com/images/Reebok-Yeezy-485.jpg",
    "link": "https://stockx.com/reebok-yeezy-485"
  },
  {
    "modello": "asics dunk 486",
    "nome": "Asics Dunk 486",
    "sku": "ASDU0486",
    "prezzo": "82",
    "immagine": "https://images.stockx.com/images/Asics-Dunk-486.jpg",
    "link": "https://stockx.com/asics-dunk-486"
  },
  {
    "modello": "puma ultra boost 487",
    "nome": "Puma Ultra Boost 487",
    "sku": "PUUL0487",
    "prezzo": "154",
    "immagine": "https://images.stockx.com/images/Puma-Ultra Boost-487.jpg",
    "link": "https://stockx.com/puma-ultra boost-487"
  },
  {
    "modello": "asics dunk 488",
    "nome": "Asics Dunk 488",
    "sku": "ASDU0488",
    "prezzo": "343",
    "immagine": "https://images.stockx.com/images/Asics-Dunk-488.jpg",
    "link": "https://stockx.com/asics-dunk-488"
  },
  {
    "modello": "converse ultra boost 489",
    "nome": "Converse Ultra Boost 489",
    "sku": "COUL0489",
    "prezzo": "230",
    "immagine": "https://images.stockx.com/images/Converse-Ultra Boost-489.jpg",
    "link": "https://stockx.com/converse-ultra boost-489"
  },
  {
    "modello": "new balance ultra boost 490",
    "nome": "New Balance Ultra Boost 490",
    "sku": "NEUL0490",
    "prezzo": "173",
    "immagine": "https://images.stockx.com/images/New Balance-Ultra Boost-490.jpg",
    "link": "https://stockx.com/new balance-ultra boost-490"
  },
  {
    "modello": "converse retro 491",
    "nome": "Converse Retro 491",
    "sku": "CORE0491",
    "prezzo": "109",
    "immagine": "https://images.stockx.com/images/Converse-Retro-491.jpg",
    "link": "https://stockx.com/converse-retro-491"
  },
  {
    "modello": "puma yeezy 492",
    "nome": "Puma Yeezy 492",
    "sku": "PUYE0492",
    "prezzo": "348",
    "immagine": "https://images.stockx.com/images/Puma-Yeezy-492.jpg",
    "link": "https://stockx.com/puma-yeezy-492"
  },
  {
    "modello": "jordan retro 493",
    "nome": "Jordan Retro 493",
    "sku": "JORE0493",
    "prezzo": "175",
    "immagine": "https://images.stockx.com/images/Jordan-Retro-493.jpg",
    "link": "https://stockx.com/jordan-retro-493"
  },
  {
    "modello": "converse dunk 494",
    "nome": "Converse Dunk 494",
    "sku": "CODU0494",
    "prezzo": "135",
    "immagine": "https://images.stockx.com/images/Converse-Dunk-494.jpg",
    "link": "https://stockx.com/converse-dunk-494"
  },
  {
    "modello": "new balance ultra boost 495",
    "nome": "New Balance Ultra Boost 495",
    "sku": "NEUL0495",
    "prezzo": "148",
    "immagine": "https://images.stockx.com/images/New Balance-Ultra Boost-495.jpg",
    "link": "https://stockx.com/new balance-ultra boost-495"
  },
  {
    "modello": "jordan dunk 496",
    "nome": "Jordan Dunk 496",
    "sku": "JODU0496",
    "prezzo": "294",
    "immagine": "https://images.stockx.com/images/Jordan-Dunk-496.jpg",
    "link": "https://stockx.com/jordan-dunk-496"
  },
  {
    "modello": "converse air max 497",
    "nome": "Converse Air Max 497",
    "sku": "COAI0497",
    "prezzo": "368",
    "immagine": "https://images.stockx.com/images/Converse-Air Max-497.jpg",
    "link": "https://stockx.com/converse-air max-497"
  },
  {
    "modello": "nike yeezy 498",
    "nome": "Nike Yeezy 498",
    "sku": "NIYE0498",
    "prezzo": "209",
    "immagine": "https://images.stockx.com/images/Nike-Yeezy-498.jpg",
    "link": "https://stockx.com/nike-yeezy-498"
  },
  {
    "modello": "converse dunk 499",
    "nome": "Converse Dunk 499",
    "sku": "CODU0499",
    "prezzo": "393",
    "immagine": "https://images.stockx.com/images/Converse-Dunk-499.jpg",
    "link": "https://stockx.com/converse-dunk-499"
  },
  {
    "modello": "asics air max 500",
    "nome": "Asics Air Max 500",
    "sku": "ASAI0500",
    "prezzo": "363",
    "immagine": "https://images.stockx.com/images/Asics-Air Max-500.jpg",
    "link": "https://stockx.com/asics-air max-500"
  },
  {
    "modello": "jordan ultra boost 501",
    "nome": "Jordan Ultra Boost 501",
    "sku": "JOUL0501",
    "prezzo": "357",
    "immagine": "https://images.stockx.com/images/Jordan-Ultra Boost-501.jpg",
    "link": "https://stockx.com/jordan-ultra boost-501"
  },
  {
    "modello": "asics chuck taylor 502",
    "nome": "Asics Chuck Taylor 502",
    "sku": "ASCH0502",
    "prezzo": "345",
    "immagine": "https://images.stockx.com/images/Asics-Chuck Taylor-502.jpg",
    "link": "https://stockx.com/asics-chuck taylor-502"
  },
  {
    "modello": "jordan retro 503",
    "nome": "Jordan Retro 503",
    "sku": "JORE0503",
    "prezzo": "172",
    "immagine": "https://images.stockx.com/images/Jordan-Retro-503.jpg",
    "link": "https://stockx.com/jordan-retro-503"
  },
  {
    "modello": "reebok chuck taylor 504",
    "nome": "Reebok Chuck Taylor 504",
    "sku": "RECH0504",
    "prezzo": "368",
    "immagine": "https://images.stockx.com/images/Reebok-Chuck Taylor-504.jpg",
    "link": "https://stockx.com/reebok-chuck taylor-504"
  },
  {
    "modello": "new balance ultra boost 505",
    "nome": "New Balance Ultra Boost 505",
    "sku": "NEUL0505",
    "prezzo": "239",
    "immagine": "https://images.stockx.com/images/New Balance-Ultra Boost-505.jpg",
    "link": "https://stockx.com/new balance-ultra boost-505"
  },
  {
    "modello": "asics ultra boost 506",
    "nome": "Asics Ultra Boost 506",
    "sku": "ASUL0506",
    "prezzo": "305",
    "immagine": "https://images.stockx.com/images/Asics-Ultra Boost-506.jpg",
    "link": "https://stockx.com/asics-ultra boost-506"
  },
  {
    "modello": "reebok retro 507",
    "nome": "Reebok Retro 507",
    "sku": "RERE0507",
    "prezzo": "129",
    "immagine": "https://images.stockx.com/images/Reebok-Retro-507.jpg",
    "link": "https://stockx.com/reebok-retro-507"
  },
  {
    "modello": "reebok retro 508",
    "nome": "Reebok Retro 508",
    "sku": "RERE0508",
    "prezzo": "397",
    "immagine": "https://images.stockx.com/images/Reebok-Retro-508.jpg",
    "link": "https://stockx.com/reebok-retro-508"
  },
  {
    "modello": "asics retro 509",
    "nome": "Asics Retro 509",
    "sku": "ASRE0509",
    "prezzo": "219",
    "immagine": "https://images.stockx.com/images/Asics-Retro-509.jpg",
    "link": "https://stockx.com/asics-retro-509"
  },
  {
    "modello": "asics ultra boost 510",
    "nome": "Asics Ultra Boost 510",
    "sku": "ASUL0510",
    "prezzo": "339",
    "immagine": "https://images.stockx.com/images/Asics-Ultra Boost-510.jpg",
    "link": "https://stockx.com/asics-ultra boost-510"
  },
  {
    "modello": "reebok dunk 511",
    "nome": "Reebok Dunk 511",
    "sku": "REDU0511",
    "prezzo": "117",
    "immagine": "https://images.stockx.com/images/Reebok-Dunk-511.jpg",
    "link": "https://stockx.com/reebok-dunk-511"
  },
  {
    "modello": "asics yeezy 512",
    "nome": "Asics Yeezy 512",
    "sku": "ASYE0512",
    "prezzo": "137",
    "immagine": "https://images.stockx.com/images/Asics-Yeezy-512.jpg",
    "link": "https://stockx.com/asics-yeezy-512"
  },
  {
    "modello": "nike retro 513",
    "nome": "Nike Retro 513",
    "sku": "NIRE0513",
    "prezzo": "308",
    "immagine": "https://images.stockx.com/images/Nike-Retro-513.jpg",
    "link": "https://stockx.com/nike-retro-513"
  },
  {
    "modello": "adidas ultra boost 514",
    "nome": "Adidas Ultra Boost 514",
    "sku": "ADUL0514",
    "prezzo": "354",
    "immagine": "https://images.stockx.com/images/Adidas-Ultra Boost-514.jpg",
    "link": "https://stockx.com/adidas-ultra boost-514"
  },
  {
    "modello": "converse gel-lyte 515",
    "nome": "Converse Gel-Lyte 515",
    "sku": "COGE0515",
    "prezzo": "231",
    "immagine": "https://images.stockx.com/images/Converse-Gel-Lyte-515.jpg",
    "link": "https://stockx.com/converse-gel-lyte-515"
  },
  {
    "modello": "new balance air max 516",
    "nome": "New Balance Air Max 516",
    "sku": "NEAI0516",
    "prezzo": "139",
    "immagine": "https://images.stockx.com/images/New Balance-Air Max-516.jpg",
    "link": "https://stockx.com/new balance-air max-516"
  },
  {
    "modello": "asics yeezy 517",
    "nome": "Asics Yeezy 517",
    "sku": "ASYE0517",
    "prezzo": "252",
    "immagine": "https://images.stockx.com/images/Asics-Yeezy-517.jpg",
    "link": "https://stockx.com/asics-yeezy-517"
  },
  {
    "modello": "puma dunk 518",
    "nome": "Puma Dunk 518",
    "sku": "PUDU0518",
    "prezzo": "254",
    "immagine": "https://images.stockx.com/images/Puma-Dunk-518.jpg",
    "link": "https://stockx.com/puma-dunk-518"
  },
  {
    "modello": "jordan ultra boost 519",
    "nome": "Jordan Ultra Boost 519",
    "sku": "JOUL0519",
    "prezzo": "369",
    "immagine": "https://images.stockx.com/images/Jordan-Ultra Boost-519.jpg",
    "link": "https://stockx.com/jordan-ultra boost-519"
  },
  {
    "modello": "puma gel-lyte 520",
    "nome": "Puma Gel-Lyte 520",
    "sku": "PUGE0520",
    "prezzo": "120",
    "immagine": "https://images.stockx.com/images/Puma-Gel-Lyte-520.jpg",
    "link": "https://stockx.com/puma-gel-lyte-520"
  },
  {
    "modello": "jordan ultra boost 521",
    "nome": "Jordan Ultra Boost 521",
    "sku": "JOUL0521",
    "prezzo": "119",
    "immagine": "https://images.stockx.com/images/Jordan-Ultra Boost-521.jpg",
    "link": "https://stockx.com/jordan-ultra boost-521"
  },
  {
    "modello": "new balance classic 522",
    "nome": "New Balance Classic 522",
    "sku": "NECL0522",
    "prezzo": "194",
    "immagine": "https://images.stockx.com/images/New Balance-Classic-522.jpg",
    "link": "https://stockx.com/new balance-classic-522"
  },
  {
    "modello": "asics gel-lyte 523",
    "nome": "Asics Gel-Lyte 523",
    "sku": "ASGE0523",
    "prezzo": "314",
    "immagine": "https://images.stockx.com/images/Asics-Gel-Lyte-523.jpg",
    "link": "https://stockx.com/asics-gel-lyte-523"
  },
  {
    "modello": "puma classic 524",
    "nome": "Puma Classic 524",
    "sku": "PUCL0524",
    "prezzo": "346",
    "immagine": "https://images.stockx.com/images/Puma-Classic-524.jpg",
    "link": "https://stockx.com/puma-classic-524"
  },
  {
    "modello": "nike gel-lyte 525",
    "nome": "Nike Gel-Lyte 525",
    "sku": "NIGE0525",
    "prezzo": "164",
    "immagine": "https://images.stockx.com/images/Nike-Gel-Lyte-525.jpg",
    "link": "https://stockx.com/nike-gel-lyte-525"
  },
  {
    "modello": "adidas yeezy 526",
    "nome": "Adidas Yeezy 526",
    "sku": "ADYE0526",
    "prezzo": "232",
    "immagine": "https://images.stockx.com/images/Adidas-Yeezy-526.jpg",
    "link": "https://stockx.com/adidas-yeezy-526"
  },
  {
    "modello": "asics yeezy 527",
    "nome": "Asics Yeezy 527",
    "sku": "ASYE0527",
    "prezzo": "325",
    "immagine": "https://images.stockx.com/images/Asics-Yeezy-527.jpg",
    "link": "https://stockx.com/asics-yeezy-527"
  },
  {
    "modello": "puma retro 528",
    "nome": "Puma Retro 528",
    "sku": "PURE0528",
    "prezzo": "135",
    "immagine": "https://images.stockx.com/images/Puma-Retro-528.jpg",
    "link": "https://stockx.com/puma-retro-528"
  },
  {
    "modello": "reebok classic 529",
    "nome": "Reebok Classic 529",
    "sku": "RECL0529",
    "prezzo": "194",
    "immagine": "https://images.stockx.com/images/Reebok-Classic-529.jpg",
    "link": "https://stockx.com/reebok-classic-529"
  },
  {
    "modello": "reebok chuck taylor 530",
    "nome": "Reebok Chuck Taylor 530",
    "sku": "RECH0530",
    "prezzo": "369",
    "immagine": "https://images.stockx.com/images/Reebok-Chuck Taylor-530.jpg",
    "link": "https://stockx.com/reebok-chuck taylor-530"
  },
  {
    "modello": "jordan air max 531",
    "nome": "Jordan Air Max 531",
    "sku": "JOAI0531",
    "prezzo": "268",
    "immagine": "https://images.stockx.com/images/Jordan-Air Max-531.jpg",
    "link": "https://stockx.com/jordan-air max-531"
  },
  {
    "modello": "adidas yeezy 532",
    "nome": "Adidas Yeezy 532",
    "sku": "ADYE0532",
    "prezzo": "315",
    "immagine": "https://images.stockx.com/images/Adidas-Yeezy-532.jpg",
    "link": "https://stockx.com/adidas-yeezy-532"
  },
  {
    "modello": "puma air max 533",
    "nome": "Puma Air Max 533",
    "sku": "PUAI0533",
    "prezzo": "338",
    "immagine": "https://images.stockx.com/images/Puma-Air Max-533.jpg",
    "link": "https://stockx.com/puma-air max-533"
  },
  {
    "modello": "converse dunk 534",
    "nome": "Converse Dunk 534",
    "sku": "CODU0534",
    "prezzo": "391",
    "immagine": "https://images.stockx.com/images/Converse-Dunk-534.jpg",
    "link": "https://stockx.com/converse-dunk-534"
  },
  {
    "modello": "reebok ultra boost 535",
    "nome": "Reebok Ultra Boost 535",
    "sku": "REUL0535",
    "prezzo": "227",
    "immagine": "https://images.stockx.com/images/Reebok-Ultra Boost-535.jpg",
    "link": "https://stockx.com/reebok-ultra boost-535"
  },
  {
    "modello": "asics chuck taylor 536",
    "nome": "Asics Chuck Taylor 536",
    "sku": "ASCH0536",
    "prezzo": "108",
    "immagine": "https://images.stockx.com/images/Asics-Chuck Taylor-536.jpg",
    "link": "https://stockx.com/asics-chuck taylor-536"
  },
  {
    "modello": "asics ultra boost 537",
    "nome": "Asics Ultra Boost 537",
    "sku": "ASUL0537",
    "prezzo": "189",
    "immagine": "https://images.stockx.com/images/Asics-Ultra Boost-537.jpg",
    "link": "https://stockx.com/asics-ultra boost-537"
  },
  {
    "modello": "new balance yeezy 538",
    "nome": "New Balance Yeezy 538",
    "sku": "NEYE0538",
    "prezzo": "196",
    "immagine": "https://images.stockx.com/images/New Balance-Yeezy-538.jpg",
    "link": "https://stockx.com/new balance-yeezy-538"
  },
  {
    "modello": "jordan retro 539",
    "nome": "Jordan Retro 539",
    "sku": "JORE0539",
    "prezzo": "212",
    "immagine": "https://images.stockx.com/images/Jordan-Retro-539.jpg",
    "link": "https://stockx.com/jordan-retro-539"
  },
  {
    "modello": "adidas chuck taylor 540",
    "nome": "Adidas Chuck Taylor 540",
    "sku": "ADCH0540",
    "prezzo": "290",
    "immagine": "https://images.stockx.com/images/Adidas-Chuck Taylor-540.jpg",
    "link": "https://stockx.com/adidas-chuck taylor-540"
  },
  {
    "modello": "nike retro 541",
    "nome": "Nike Retro 541",
    "sku": "NIRE0541",
    "prezzo": "275",
    "immagine": "https://images.stockx.com/images/Nike-Retro-541.jpg",
    "link": "https://stockx.com/nike-retro-541"
  },
  {
    "modello": "adidas classic 542",
    "nome": "Adidas Classic 542",
    "sku": "ADCL0542",
    "prezzo": "326",
    "immagine": "https://images.stockx.com/images/Adidas-Classic-542.jpg",
    "link": "https://stockx.com/adidas-classic-542"
  },
  {
    "modello": "puma dunk 543",
    "nome": "Puma Dunk 543",
    "sku": "PUDU0543",
    "prezzo": "396",
    "immagine": "https://images.stockx.com/images/Puma-Dunk-543.jpg",
    "link": "https://stockx.com/puma-dunk-543"
  },
  {
    "modello": "new balance dunk 544",
    "nome": "New Balance Dunk 544",
    "sku": "NEDU0544",
    "prezzo": "162",
    "immagine": "https://images.stockx.com/images/New Balance-Dunk-544.jpg",
    "link": "https://stockx.com/new balance-dunk-544"
  },
  {
    "modello": "new balance retro 545",
    "nome": "New Balance Retro 545",
    "sku": "NERE0545",
    "prezzo": "239",
    "immagine": "https://images.stockx.com/images/New Balance-Retro-545.jpg",
    "link": "https://stockx.com/new balance-retro-545"
  },
  {
    "modello": "reebok air max 546",
    "nome": "Reebok Air Max 546",
    "sku": "REAI0546",
    "prezzo": "298",
    "immagine": "https://images.stockx.com/images/Reebok-Air Max-546.jpg",
    "link": "https://stockx.com/reebok-air max-546"
  },
  {
    "modello": "jordan chuck taylor 547",
    "nome": "Jordan Chuck Taylor 547",
    "sku": "JOCH0547",
    "prezzo": "295",
    "immagine": "https://images.stockx.com/images/Jordan-Chuck Taylor-547.jpg",
    "link": "https://stockx.com/jordan-chuck taylor-547"
  },
  {
    "modello": "nike chuck taylor 548",
    "nome": "Nike Chuck Taylor 548",
    "sku": "NICH0548",
    "prezzo": "389",
    "immagine": "https://images.stockx.com/images/Nike-Chuck Taylor-548.jpg",
    "link": "https://stockx.com/nike-chuck taylor-548"
  },
  {
    "modello": "nike air max 549",
    "nome": "Nike Air Max 549",
    "sku": "NIAI0549",
    "prezzo": "324",
    "immagine": "https://images.stockx.com/images/Nike-Air Max-549.jpg",
    "link": "https://stockx.com/nike-air max-549"
  },
  {
    "modello": "reebok yeezy 550",
    "nome": "Reebok Yeezy 550",
    "sku": "REYE0550",
    "prezzo": "228",
    "immagine": "https://images.stockx.com/images/Reebok-Yeezy-550.jpg",
    "link": "https://stockx.com/reebok-yeezy-550"
  },
  {
    "modello": "nike chuck taylor 551",
    "nome": "Nike Chuck Taylor 551",
    "sku": "NICH0551",
    "prezzo": "235",
    "immagine": "https://images.stockx.com/images/Nike-Chuck Taylor-551.jpg",
    "link": "https://stockx.com/nike-chuck taylor-551"
  },
  {
    "modello": "new balance dunk 552",
    "nome": "New Balance Dunk 552",
    "sku": "NEDU0552",
    "prezzo": "376",
    "immagine": "https://images.stockx.com/images/New Balance-Dunk-552.jpg",
    "link": "https://stockx.com/new balance-dunk-552"
  },
  {
    "modello": "reebok ultra boost 553",
    "nome": "Reebok Ultra Boost 553",
    "sku": "REUL0553",
    "prezzo": "183",
    "immagine": "https://images.stockx.com/images/Reebok-Ultra Boost-553.jpg",
    "link": "https://stockx.com/reebok-ultra boost-553"
  },
  {
    "modello": "new balance retro 554",
    "nome": "New Balance Retro 554",
    "sku": "NERE0554",
    "prezzo": "165",
    "immagine": "https://images.stockx.com/images/New Balance-Retro-554.jpg",
    "link": "https://stockx.com/new balance-retro-554"
  },
  {
    "modello": "new balance ultra boost 555",
    "nome": "New Balance Ultra Boost 555",
    "sku": "NEUL0555",
    "prezzo": "96",
    "immagine": "https://images.stockx.com/images/New Balance-Ultra Boost-555.jpg",
    "link": "https://stockx.com/new balance-ultra boost-555"
  },
  {
    "modello": "converse chuck taylor 556",
    "nome": "Converse Chuck Taylor 556",
    "sku": "COCH0556",
    "prezzo": "229",
    "immagine": "https://images.stockx.com/images/Converse-Chuck Taylor-556.jpg",
    "link": "https://stockx.com/converse-chuck taylor-556"
  },
  {
    "modello": "converse retro 557",
    "nome": "Converse Retro 557",
    "sku": "CORE0557",
    "prezzo": "88",
    "immagine": "https://images.stockx.com/images/Converse-Retro-557.jpg",
    "link": "https://stockx.com/converse-retro-557"
  },
  {
    "modello": "jordan yeezy 558",
    "nome": "Jordan Yeezy 558",
    "sku": "JOYE0558",
    "prezzo": "375",
    "immagine": "https://images.stockx.com/images/Jordan-Yeezy-558.jpg",
    "link": "https://stockx.com/jordan-yeezy-558"
  },
  {
    "modello": "nike chuck taylor 559",
    "nome": "Nike Chuck Taylor 559",
    "sku": "NICH0559",
    "prezzo": "106",
    "immagine": "https://images.stockx.com/images/Nike-Chuck Taylor-559.jpg",
    "link": "https://stockx.com/nike-chuck taylor-559"
  },
  {
    "modello": "nike gel-lyte 560",
    "nome": "Nike Gel-Lyte 560",
    "sku": "NIGE0560",
    "prezzo": "109",
    "immagine": "https://images.stockx.com/images/Nike-Gel-Lyte-560.jpg",
    "link": "https://stockx.com/nike-gel-lyte-560"
  },
  {
    "modello": "jordan ultra boost 561",
    "nome": "Jordan Ultra Boost 561",
    "sku": "JOUL0561",
    "prezzo": "343",
    "immagine": "https://images.stockx.com/images/Jordan-Ultra Boost-561.jpg",
    "link": "https://stockx.com/jordan-ultra boost-561"
  },
  {
    "modello": "adidas ultra boost 562",
    "nome": "Adidas Ultra Boost 562",
    "sku": "ADUL0562",
    "prezzo": "107",
    "immagine": "https://images.stockx.com/images/Adidas-Ultra Boost-562.jpg",
    "link": "https://stockx.com/adidas-ultra boost-562"
  },
  {
    "modello": "adidas gel-lyte 563",
    "nome": "Adidas Gel-Lyte 563",
    "sku": "ADGE0563",
    "prezzo": "153",
    "immagine": "https://images.stockx.com/images/Adidas-Gel-Lyte-563.jpg",
    "link": "https://stockx.com/adidas-gel-lyte-563"
  },
  {
    "modello": "jordan retro 564",
    "nome": "Jordan Retro 564",
    "sku": "JORE0564",
    "prezzo": "280",
    "immagine": "https://images.stockx.com/images/Jordan-Retro-564.jpg",
    "link": "https://stockx.com/jordan-retro-564"
  },
  {
    "modello": "new balance air max 565",
    "nome": "New Balance Air Max 565",
    "sku": "NEAI0565",
    "prezzo": "123",
    "immagine": "https://images.stockx.com/images/New Balance-Air Max-565.jpg",
    "link": "https://stockx.com/new balance-air max-565"
  },
  {
    "modello": "nike yeezy 566",
    "nome": "Nike Yeezy 566",
    "sku": "NIYE0566",
    "prezzo": "250",
    "immagine": "https://images.stockx.com/images/Nike-Yeezy-566.jpg",
    "link": "https://stockx.com/nike-yeezy-566"
  },
  {
    "modello": "nike yeezy 567",
    "nome": "Nike Yeezy 567",
    "sku": "NIYE0567",
    "prezzo": "388",
    "immagine": "https://images.stockx.com/images/Nike-Yeezy-567.jpg",
    "link": "https://stockx.com/nike-yeezy-567"
  },
  {
    "modello": "asics air max 568",
    "nome": "Asics Air Max 568",
    "sku": "ASAI0568",
    "prezzo": "242",
    "immagine": "https://images.stockx.com/images/Asics-Air Max-568.jpg",
    "link": "https://stockx.com/asics-air max-568"
  },
  {
    "modello": "nike dunk 569",
    "nome": "Nike Dunk 569",
    "sku": "NIDU0569",
    "prezzo": "167",
    "immagine": "https://images.stockx.com/images/Nike-Dunk-569.jpg",
    "link": "https://stockx.com/nike-dunk-569"
  },
  {
    "modello": "converse air max 570",
    "nome": "Converse Air Max 570",
    "sku": "COAI0570",
    "prezzo": "291",
    "immagine": "https://images.stockx.com/images/Converse-Air Max-570.jpg",
    "link": "https://stockx.com/converse-air max-570"
  },
  {
    "modello": "asics chuck taylor 571",
    "nome": "Asics Chuck Taylor 571",
    "sku": "ASCH0571",
    "prezzo": "335",
    "immagine": "https://images.stockx.com/images/Asics-Chuck Taylor-571.jpg",
    "link": "https://stockx.com/asics-chuck taylor-571"
  },
  {
    "modello": "asics retro 572",
    "nome": "Asics Retro 572",
    "sku": "ASRE0572",
    "prezzo": "130",
    "immagine": "https://images.stockx.com/images/Asics-Retro-572.jpg",
    "link": "https://stockx.com/asics-retro-572"
  },
  {
    "modello": "converse dunk 573",
    "nome": "Converse Dunk 573",
    "sku": "CODU0573",
    "prezzo": "123",
    "immagine": "https://images.stockx.com/images/Converse-Dunk-573.jpg",
    "link": "https://stockx.com/converse-dunk-573"
  },
  {
    "modello": "reebok chuck taylor 574",
    "nome": "Reebok Chuck Taylor 574",
    "sku": "RECH0574",
    "prezzo": "309",
    "immagine": "https://images.stockx.com/images/Reebok-Chuck Taylor-574.jpg",
    "link": "https://stockx.com/reebok-chuck taylor-574"
  },
  {
    "modello": "jordan dunk 575",
    "nome": "Jordan Dunk 575",
    "sku": "JODU0575",
    "prezzo": "104",
    "immagine": "https://images.stockx.com/images/Jordan-Dunk-575.jpg",
    "link": "https://stockx.com/jordan-dunk-575"
  },
  {
    "modello": "asics ultra boost 576",
    "nome": "Asics Ultra Boost 576",
    "sku": "ASUL0576",
    "prezzo": "347",
    "immagine": "https://images.stockx.com/images/Asics-Ultra Boost-576.jpg",
    "link": "https://stockx.com/asics-ultra boost-576"
  },
  {
    "modello": "reebok chuck taylor 577",
    "nome": "Reebok Chuck Taylor 577",
    "sku": "RECH0577",
    "prezzo": "100",
    "immagine": "https://images.stockx.com/images/Reebok-Chuck Taylor-577.jpg",
    "link": "https://stockx.com/reebok-chuck taylor-577"
  },
  {
    "modello": "asics gel-lyte 578",
    "nome": "Asics Gel-Lyte 578",
    "sku": "ASGE0578",
    "prezzo": "396",
    "immagine": "https://images.stockx.com/images/Asics-Gel-Lyte-578.jpg",
    "link": "https://stockx.com/asics-gel-lyte-578"
  },
  {
    "modello": "converse dunk 579",
    "nome": "Converse Dunk 579",
    "sku": "CODU0579",
    "prezzo": "376",
    "immagine": "https://images.stockx.com/images/Converse-Dunk-579.jpg",
    "link": "https://stockx.com/converse-dunk-579"
  },
  {
    "modello": "adidas air max 580",
    "nome": "Adidas Air Max 580",
    "sku": "ADAI0580",
    "prezzo": "130",
    "immagine": "https://images.stockx.com/images/Adidas-Air Max-580.jpg",
    "link": "https://stockx.com/adidas-air max-580"
  },
  {
    "modello": "reebok air max 581",
    "nome": "Reebok Air Max 581",
    "sku": "REAI0581",
    "prezzo": "363",
    "immagine": "https://images.stockx.com/images/Reebok-Air Max-581.jpg",
    "link": "https://stockx.com/reebok-air max-581"
  },
  {
    "modello": "converse dunk 582",
    "nome": "Converse Dunk 582",
    "sku": "CODU0582",
    "prezzo": "241",
    "immagine": "https://images.stockx.com/images/Converse-Dunk-582.jpg",
    "link": "https://stockx.com/converse-dunk-582"
  },
  {
    "modello": "new balance air max 583",
    "nome": "New Balance Air Max 583",
    "sku": "NEAI0583",
    "prezzo": "334",
    "immagine": "https://images.stockx.com/images/New Balance-Air Max-583.jpg",
    "link": "https://stockx.com/new balance-air max-583"
  },
  {
    "modello": "puma ultra boost 584",
    "nome": "Puma Ultra Boost 584",
    "sku": "PUUL0584",
    "prezzo": "180",
    "immagine": "https://images.stockx.com/images/Puma-Ultra Boost-584.jpg",
    "link": "https://stockx.com/puma-ultra boost-584"
  },
  {
    "modello": "adidas air max 585",
    "nome": "Adidas Air Max 585",
    "sku": "ADAI0585",
    "prezzo": "183",
    "immagine": "https://images.stockx.com/images/Adidas-Air Max-585.jpg",
    "link": "https://stockx.com/adidas-air max-585"
  },
  {
    "modello": "reebok retro 586",
    "nome": "Reebok Retro 586",
    "sku": "RERE0586",
    "prezzo": "361",
    "immagine": "https://images.stockx.com/images/Reebok-Retro-586.jpg",
    "link": "https://stockx.com/reebok-retro-586"
  },
  {
    "modello": "nike dunk 587",
    "nome": "Nike Dunk 587",
    "sku": "NIDU0587",
    "prezzo": "223",
    "immagine": "https://images.stockx.com/images/Nike-Dunk-587.jpg",
    "link": "https://stockx.com/nike-dunk-587"
  },
  {
    "modello": "puma gel-lyte 588",
    "nome": "Puma Gel-Lyte 588",
    "sku": "PUGE0588",
    "prezzo": "220",
    "immagine": "https://images.stockx.com/images/Puma-Gel-Lyte-588.jpg",
    "link": "https://stockx.com/puma-gel-lyte-588"
  },
  {
    "modello": "adidas retro 589",
    "nome": "Adidas Retro 589",
    "sku": "ADRE0589",
    "prezzo": "395",
    "immagine": "https://images.stockx.com/images/Adidas-Retro-589.jpg",
    "link": "https://stockx.com/adidas-retro-589"
  },
  {
    "modello": "asics ultra boost 590",
    "nome": "Asics Ultra Boost 590",
    "sku": "ASUL0590",
    "prezzo": "151",
    "immagine": "https://images.stockx.com/images/Asics-Ultra Boost-590.jpg",
    "link": "https://stockx.com/asics-ultra boost-590"
  },
  {
    "modello": "new balance air max 591",
    "nome": "New Balance Air Max 591",
    "sku": "NEAI0591",
    "prezzo": "195",
    "immagine": "https://images.stockx.com/images/New Balance-Air Max-591.jpg",
    "link": "https://stockx.com/new balance-air max-591"
  },
  {
    "modello": "jordan gel-lyte 592",
    "nome": "Jordan Gel-Lyte 592",
    "sku": "JOGE0592",
    "prezzo": "241",
    "immagine": "https://images.stockx.com/images/Jordan-Gel-Lyte-592.jpg",
    "link": "https://stockx.com/jordan-gel-lyte-592"
  },
  {
    "modello": "converse yeezy 593",
    "nome": "Converse Yeezy 593",
    "sku": "COYE0593",
    "prezzo": "162",
    "immagine": "https://images.stockx.com/images/Converse-Yeezy-593.jpg",
    "link": "https://stockx.com/converse-yeezy-593"
  },
  {
    "modello": "converse gel-lyte 594",
    "nome": "Converse Gel-Lyte 594",
    "sku": "COGE0594",
    "prezzo": "232",
    "immagine": "https://images.stockx.com/images/Converse-Gel-Lyte-594.jpg",
    "link": "https://stockx.com/converse-gel-lyte-594"
  },
  {
    "modello": "converse yeezy 595",
    "nome": "Converse Yeezy 595",
    "sku": "COYE0595",
    "prezzo": "99",
    "immagine": "https://images.stockx.com/images/Converse-Yeezy-595.jpg",
    "link": "https://stockx.com/converse-yeezy-595"
  },
  {
    "modello": "nike ultra boost 596",
    "nome": "Nike Ultra Boost 596",
    "sku": "NIUL0596",
    "prezzo": "293",
    "immagine": "https://images.stockx.com/images/Nike-Ultra Boost-596.jpg",
    "link": "https://stockx.com/nike-ultra boost-596"
  },
  {
    "modello": "puma yeezy 597",
    "nome": "Puma Yeezy 597",
    "sku": "PUYE0597",
    "prezzo": "358",
    "immagine": "https://images.stockx.com/images/Puma-Yeezy-597.jpg",
    "link": "https://stockx.com/puma-yeezy-597"
  },
  {
    "modello": "converse chuck taylor 598",
    "nome": "Converse Chuck Taylor 598",
    "sku": "COCH0598",
    "prezzo": "195",
    "immagine": "https://images.stockx.com/images/Converse-Chuck Taylor-598.jpg",
    "link": "https://stockx.com/converse-chuck taylor-598"
  },
  {
    "modello": "adidas air max 599",
    "nome": "Adidas Air Max 599",
    "sku": "ADAI0599",
    "prezzo": "311",
    "immagine": "https://images.stockx.com/images/Adidas-Air Max-599.jpg",
    "link": "https://stockx.com/adidas-air max-599"
  },
  {
    "modello": "reebok dunk 600",
    "nome": "Reebok Dunk 600",
    "sku": "REDU0600",
    "prezzo": "235",
    "immagine": "https://images.stockx.com/images/Reebok-Dunk-600.jpg",
    "link": "https://stockx.com/reebok-dunk-600"
  },
  {
    "modello": "puma chuck taylor 601",
    "nome": "Puma Chuck Taylor 601",
    "sku": "PUCH0601",
    "prezzo": "143",
    "immagine": "https://images.stockx.com/images/Puma-Chuck Taylor-601.jpg",
    "link": "https://stockx.com/puma-chuck taylor-601"
  },
  {
    "modello": "reebok air max 602",
    "nome": "Reebok Air Max 602",
    "sku": "REAI0602",
    "prezzo": "400",
    "immagine": "https://images.stockx.com/images/Reebok-Air Max-602.jpg",
    "link": "https://stockx.com/reebok-air max-602"
  },
  {
    "modello": "converse chuck taylor 603",
    "nome": "Converse Chuck Taylor 603",
    "sku": "COCH0603",
    "prezzo": "151",
    "immagine": "https://images.stockx.com/images/Converse-Chuck Taylor-603.jpg",
    "link": "https://stockx.com/converse-chuck taylor-603"
  },
  {
    "modello": "adidas gel-lyte 604",
    "nome": "Adidas Gel-Lyte 604",
    "sku": "ADGE0604",
    "prezzo": "249",
    "immagine": "https://images.stockx.com/images/Adidas-Gel-Lyte-604.jpg",
    "link": "https://stockx.com/adidas-gel-lyte-604"
  },
  {
    "modello": "reebok ultra boost 605",
    "nome": "Reebok Ultra Boost 605",
    "sku": "REUL0605",
    "prezzo": "98",
    "immagine": "https://images.stockx.com/images/Reebok-Ultra Boost-605.jpg",
    "link": "https://stockx.com/reebok-ultra boost-605"
  },
  {
    "modello": "adidas classic 606",
    "nome": "Adidas Classic 606",
    "sku": "ADCL0606",
    "prezzo": "355",
    "immagine": "https://images.stockx.com/images/Adidas-Classic-606.jpg",
    "link": "https://stockx.com/adidas-classic-606"
  },
  {
    "modello": "reebok classic 607",
    "nome": "Reebok Classic 607",
    "sku": "RECL0607",
    "prezzo": "244",
    "immagine": "https://images.stockx.com/images/Reebok-Classic-607.jpg",
    "link": "https://stockx.com/reebok-classic-607"
  },
  {
    "modello": "puma classic 608",
    "nome": "Puma Classic 608",
    "sku": "PUCL0608",
    "prezzo": "193",
    "immagine": "https://images.stockx.com/images/Puma-Classic-608.jpg",
    "link": "https://stockx.com/puma-classic-608"
  },
  {
    "modello": "jordan air max 609",
    "nome": "Jordan Air Max 609",
    "sku": "JOAI0609",
    "prezzo": "366",
    "immagine": "https://images.stockx.com/images/Jordan-Air Max-609.jpg",
    "link": "https://stockx.com/jordan-air max-609"
  },
  {
    "modello": "converse retro 610",
    "nome": "Converse Retro 610",
    "sku": "CORE0610",
    "prezzo": "122",
    "immagine": "https://images.stockx.com/images/Converse-Retro-610.jpg",
    "link": "https://stockx.com/converse-retro-610"
  },
  {
    "modello": "converse gel-lyte 611",
    "nome": "Converse Gel-Lyte 611",
    "sku": "COGE0611",
    "prezzo": "328",
    "immagine": "https://images.stockx.com/images/Converse-Gel-Lyte-611.jpg",
    "link": "https://stockx.com/converse-gel-lyte-611"
  },
  {
    "modello": "converse chuck taylor 612",
    "nome": "Converse Chuck Taylor 612",
    "sku": "COCH0612",
    "prezzo": "340",
    "immagine": "https://images.stockx.com/images/Converse-Chuck Taylor-612.jpg",
    "link": "https://stockx.com/converse-chuck taylor-612"
  },
  {
    "modello": "reebok ultra boost 613",
    "nome": "Reebok Ultra Boost 613",
    "sku": "REUL0613",
    "prezzo": "231",
    "immagine": "https://images.stockx.com/images/Reebok-Ultra Boost-613.jpg",
    "link": "https://stockx.com/reebok-ultra boost-613"
  },
  {
    "modello": "nike air max 614",
    "nome": "Nike Air Max 614",
    "sku": "NIAI0614",
    "prezzo": "329",
    "immagine": "https://images.stockx.com/images/Nike-Air Max-614.jpg",
    "link": "https://stockx.com/nike-air max-614"
  },
  {
    "modello": "nike chuck taylor 615",
    "nome": "Nike Chuck Taylor 615",
    "sku": "NICH0615",
    "prezzo": "330",
    "immagine": "https://images.stockx.com/images/Nike-Chuck Taylor-615.jpg",
    "link": "https://stockx.com/nike-chuck taylor-615"
  },
  {
    "modello": "adidas dunk 616",
    "nome": "Adidas Dunk 616",
    "sku": "ADDU0616",
    "prezzo": "174",
    "immagine": "https://images.stockx.com/images/Adidas-Dunk-616.jpg",
    "link": "https://stockx.com/adidas-dunk-616"
  },
  {
    "modello": "converse classic 617",
    "nome": "Converse Classic 617",
    "sku": "COCL0617",
    "prezzo": "222",
    "immagine": "https://images.stockx.com/images/Converse-Classic-617.jpg",
    "link": "https://stockx.com/converse-classic-617"
  },
  {
    "modello": "puma ultra boost 618",
    "nome": "Puma Ultra Boost 618",
    "sku": "PUUL0618",
    "prezzo": "105",
    "immagine": "https://images.stockx.com/images/Puma-Ultra Boost-618.jpg",
    "link": "https://stockx.com/puma-ultra boost-618"
  },
  {
    "modello": "adidas air max 619",
    "nome": "Adidas Air Max 619",
    "sku": "ADAI0619",
    "prezzo": "189",
    "immagine": "https://images.stockx.com/images/Adidas-Air Max-619.jpg",
    "link": "https://stockx.com/adidas-air max-619"
  },
  {
    "modello": "nike air max 620",
    "nome": "Nike Air Max 620",
    "sku": "NIAI0620",
    "prezzo": "355",
    "immagine": "https://images.stockx.com/images/Nike-Air Max-620.jpg",
    "link": "https://stockx.com/nike-air max-620"
  },
  {
    "modello": "puma yeezy 621",
    "nome": "Puma Yeezy 621",
    "sku": "PUYE0621",
    "prezzo": "168",
    "immagine": "https://images.stockx.com/images/Puma-Yeezy-621.jpg",
    "link": "https://stockx.com/puma-yeezy-621"
  },
  {
    "modello": "nike retro 622",
    "nome": "Nike Retro 622",
    "sku": "NIRE0622",
    "prezzo": "157",
    "immagine": "https://images.stockx.com/images/Nike-Retro-622.jpg",
    "link": "https://stockx.com/nike-retro-622"
  },
  {
    "modello": "converse dunk 623",
    "nome": "Converse Dunk 623",
    "sku": "CODU0623",
    "prezzo": "82",
    "immagine": "https://images.stockx.com/images/Converse-Dunk-623.jpg",
    "link": "https://stockx.com/converse-dunk-623"
  },
  {
    "modello": "adidas retro 624",
    "nome": "Adidas Retro 624",
    "sku": "ADRE0624",
    "prezzo": "179",
    "immagine": "https://images.stockx.com/images/Adidas-Retro-624.jpg",
    "link": "https://stockx.com/adidas-retro-624"
  },
  {
    "modello": "adidas yeezy 625",
    "nome": "Adidas Yeezy 625",
    "sku": "ADYE0625",
    "prezzo": "369",
    "immagine": "https://images.stockx.com/images/Adidas-Yeezy-625.jpg",
    "link": "https://stockx.com/adidas-yeezy-625"
  },
  {
    "modello": "nike yeezy 626",
    "nome": "Nike Yeezy 626",
    "sku": "NIYE0626",
    "prezzo": "215",
    "immagine": "https://images.stockx.com/images/Nike-Yeezy-626.jpg",
    "link": "https://stockx.com/nike-yeezy-626"
  },
  {
    "modello": "nike classic 627",
    "nome": "Nike Classic 627",
    "sku": "NICL0627",
    "prezzo": "218",
    "immagine": "https://images.stockx.com/images/Nike-Classic-627.jpg",
    "link": "https://stockx.com/nike-classic-627"
  },
  {
    "modello": "converse gel-lyte 628",
    "nome": "Converse Gel-Lyte 628",
    "sku": "COGE0628",
    "prezzo": "355",
    "immagine": "https://images.stockx.com/images/Converse-Gel-Lyte-628.jpg",
    "link": "https://stockx.com/converse-gel-lyte-628"
  },
  {
    "modello": "asics classic 629",
    "nome": "Asics Classic 629",
    "sku": "ASCL0629",
    "prezzo": "219",
    "immagine": "https://images.stockx.com/images/Asics-Classic-629.jpg",
    "link": "https://stockx.com/asics-classic-629"
  },
  {
    "modello": "reebok classic 630",
    "nome": "Reebok Classic 630",
    "sku": "RECL0630",
    "prezzo": "350",
    "immagine": "https://images.stockx.com/images/Reebok-Classic-630.jpg",
    "link": "https://stockx.com/reebok-classic-630"
  },
  {
    "modello": "nike chuck taylor 631",
    "nome": "Nike Chuck Taylor 631",
    "sku": "NICH0631",
    "prezzo": "301",
    "immagine": "https://images.stockx.com/images/Nike-Chuck Taylor-631.jpg",
    "link": "https://stockx.com/nike-chuck taylor-631"
  },
  {
    "modello": "new balance gel-lyte 632",
    "nome": "New Balance Gel-Lyte 632",
    "sku": "NEGE0632",
    "prezzo": "395",
    "immagine": "https://images.stockx.com/images/New Balance-Gel-Lyte-632.jpg",
    "link": "https://stockx.com/new balance-gel-lyte-632"
  },
  {
    "modello": "puma retro 633",
    "nome": "Puma Retro 633",
    "sku": "PURE0633",
    "prezzo": "225",
    "immagine": "https://images.stockx.com/images/Puma-Retro-633.jpg",
    "link": "https://stockx.com/puma-retro-633"
  },
  {
    "modello": "puma classic 634",
    "nome": "Puma Classic 634",
    "sku": "PUCL0634",
    "prezzo": "400",
    "immagine": "https://images.stockx.com/images/Puma-Classic-634.jpg",
    "link": "https://stockx.com/puma-classic-634"
  },
  {
    "modello": "reebok dunk 635",
    "nome": "Reebok Dunk 635",
    "sku": "REDU0635",
    "prezzo": "157",
    "immagine": "https://images.stockx.com/images/Reebok-Dunk-635.jpg",
    "link": "https://stockx.com/reebok-dunk-635"
  },
  {
    "modello": "puma yeezy 636",
    "nome": "Puma Yeezy 636",
    "sku": "PUYE0636",
    "prezzo": "82",
    "immagine": "https://images.stockx.com/images/Puma-Yeezy-636.jpg",
    "link": "https://stockx.com/puma-yeezy-636"
  },
  {
    "modello": "nike gel-lyte 637",
    "nome": "Nike Gel-Lyte 637",
    "sku": "NIGE0637",
    "prezzo": "306",
    "immagine": "https://images.stockx.com/images/Nike-Gel-Lyte-637.jpg",
    "link": "https://stockx.com/nike-gel-lyte-637"
  },
  {
    "modello": "asics gel-lyte 638",
    "nome": "Asics Gel-Lyte 638",
    "sku": "ASGE0638",
    "prezzo": "384",
    "immagine": "https://images.stockx.com/images/Asics-Gel-Lyte-638.jpg",
    "link": "https://stockx.com/asics-gel-lyte-638"
  },
  {
    "modello": "adidas yeezy 639",
    "nome": "Adidas Yeezy 639",
    "sku": "ADYE0639",
    "prezzo": "376",
    "immagine": "https://images.stockx.com/images/Adidas-Yeezy-639.jpg",
    "link": "https://stockx.com/adidas-yeezy-639"
  },
  {
    "modello": "adidas dunk 640",
    "nome": "Adidas Dunk 640",
    "sku": "ADDU0640",
    "prezzo": "123",
    "immagine": "https://images.stockx.com/images/Adidas-Dunk-640.jpg",
    "link": "https://stockx.com/adidas-dunk-640"
  },
  {
    "modello": "nike dunk 641",
    "nome": "Nike Dunk 641",
    "sku": "NIDU0641",
    "prezzo": "149",
    "immagine": "https://images.stockx.com/images/Nike-Dunk-641.jpg",
    "link": "https://stockx.com/nike-dunk-641"
  },
  {
    "modello": "new balance ultra boost 642",
    "nome": "New Balance Ultra Boost 642",
    "sku": "NEUL0642",
    "prezzo": "114",
    "immagine": "https://images.stockx.com/images/New Balance-Ultra Boost-642.jpg",
    "link": "https://stockx.com/new balance-ultra boost-642"
  },
  {
    "modello": "adidas classic 643",
    "nome": "Adidas Classic 643",
    "sku": "ADCL0643",
    "prezzo": "340",
    "immagine": "https://images.stockx.com/images/Adidas-Classic-643.jpg",
    "link": "https://stockx.com/adidas-classic-643"
  },
  {
    "modello": "puma chuck taylor 644",
    "nome": "Puma Chuck Taylor 644",
    "sku": "PUCH0644",
    "prezzo": "367",
    "immagine": "https://images.stockx.com/images/Puma-Chuck Taylor-644.jpg",
    "link": "https://stockx.com/puma-chuck taylor-644"
  },
  {
    "modello": "reebok retro 645",
    "nome": "Reebok Retro 645",
    "sku": "RERE0645",
    "prezzo": "349",
    "immagine": "https://images.stockx.com/images/Reebok-Retro-645.jpg",
    "link": "https://stockx.com/reebok-retro-645"
  },
  {
    "modello": "nike ultra boost 646",
    "nome": "Nike Ultra Boost 646",
    "sku": "NIUL0646",
    "prezzo": "145",
    "immagine": "https://images.stockx.com/images/Nike-Ultra Boost-646.jpg",
    "link": "https://stockx.com/nike-ultra boost-646"
  },
  {
    "modello": "new balance dunk 647",
    "nome": "New Balance Dunk 647",
    "sku": "NEDU0647",
    "prezzo": "219",
    "immagine": "https://images.stockx.com/images/New Balance-Dunk-647.jpg",
    "link": "https://stockx.com/new balance-dunk-647"
  },
  {
    "modello": "converse yeezy 648",
    "nome": "Converse Yeezy 648",
    "sku": "COYE0648",
    "prezzo": "132",
    "immagine": "https://images.stockx.com/images/Converse-Yeezy-648.jpg",
    "link": "https://stockx.com/converse-yeezy-648"
  },
  {
    "modello": "reebok retro 649",
    "nome": "Reebok Retro 649",
    "sku": "RERE0649",
    "prezzo": "268",
    "immagine": "https://images.stockx.com/images/Reebok-Retro-649.jpg",
    "link": "https://stockx.com/reebok-retro-649"
  },
  {
    "modello": "puma air max 650",
    "nome": "Puma Air Max 650",
    "sku": "PUAI0650",
    "prezzo": "215",
    "immagine": "https://images.stockx.com/images/Puma-Air Max-650.jpg",
    "link": "https://stockx.com/puma-air max-650"
  },
  {
    "modello": "new balance yeezy 651",
    "nome": "New Balance Yeezy 651",
    "sku": "NEYE0651",
    "prezzo": "266",
    "immagine": "https://images.stockx.com/images/New Balance-Yeezy-651.jpg",
    "link": "https://stockx.com/new balance-yeezy-651"
  },
  {
    "modello": "adidas classic 652",
    "nome": "Adidas Classic 652",
    "sku": "ADCL0652",
    "prezzo": "138",
    "immagine": "https://images.stockx.com/images/Adidas-Classic-652.jpg",
    "link": "https://stockx.com/adidas-classic-652"
  },
  {
    "modello": "reebok chuck taylor 653",
    "nome": "Reebok Chuck Taylor 653",
    "sku": "RECH0653",
    "prezzo": "135",
    "immagine": "https://images.stockx.com/images/Reebok-Chuck Taylor-653.jpg",
    "link": "https://stockx.com/reebok-chuck taylor-653"
  },
  {
    "modello": "asics retro 654",
    "nome": "Asics Retro 654",
    "sku": "ASRE0654",
    "prezzo": "364",
    "immagine": "https://images.stockx.com/images/Asics-Retro-654.jpg",
    "link": "https://stockx.com/asics-retro-654"
  },
  {
    "modello": "nike ultra boost 655",
    "nome": "Nike Ultra Boost 655",
    "sku": "NIUL0655",
    "prezzo": "87",
    "immagine": "https://images.stockx.com/images/Nike-Ultra Boost-655.jpg",
    "link": "https://stockx.com/nike-ultra boost-655"
  },
  {
    "modello": "jordan classic 656",
    "nome": "Jordan Classic 656",
    "sku": "JOCL0656",
    "prezzo": "157",
    "immagine": "https://images.stockx.com/images/Jordan-Classic-656.jpg",
    "link": "https://stockx.com/jordan-classic-656"
  },
  {
    "modello": "new balance gel-lyte 657",
    "nome": "New Balance Gel-Lyte 657",
    "sku": "NEGE0657",
    "prezzo": "182",
    "immagine": "https://images.stockx.com/images/New Balance-Gel-Lyte-657.jpg",
    "link": "https://stockx.com/new balance-gel-lyte-657"
  },
  {
    "modello": "reebok gel-lyte 658",
    "nome": "Reebok Gel-Lyte 658",
    "sku": "REGE0658",
    "prezzo": "187",
    "immagine": "https://images.stockx.com/images/Reebok-Gel-Lyte-658.jpg",
    "link": "https://stockx.com/reebok-gel-lyte-658"
  },
  {
    "modello": "adidas retro 659",
    "nome": "Adidas Retro 659",
    "sku": "ADRE0659",
    "prezzo": "101",
    "immagine": "https://images.stockx.com/images/Adidas-Retro-659.jpg",
    "link": "https://stockx.com/adidas-retro-659"
  },
  {
    "modello": "reebok chuck taylor 660",
    "nome": "Reebok Chuck Taylor 660",
    "sku": "RECH0660",
    "prezzo": "259",
    "immagine": "https://images.stockx.com/images/Reebok-Chuck Taylor-660.jpg",
    "link": "https://stockx.com/reebok-chuck taylor-660"
  },
  {
    "modello": "asics gel-lyte 661",
    "nome": "Asics Gel-Lyte 661",
    "sku": "ASGE0661",
    "prezzo": "339",
    "immagine": "https://images.stockx.com/images/Asics-Gel-Lyte-661.jpg",
    "link": "https://stockx.com/asics-gel-lyte-661"
  },
  {
    "modello": "asics ultra boost 662",
    "nome": "Asics Ultra Boost 662",
    "sku": "ASUL0662",
    "prezzo": "212",
    "immagine": "https://images.stockx.com/images/Asics-Ultra Boost-662.jpg",
    "link": "https://stockx.com/asics-ultra boost-662"
  },
  {
    "modello": "adidas yeezy 663",
    "nome": "Adidas Yeezy 663",
    "sku": "ADYE0663",
    "prezzo": "153",
    "immagine": "https://images.stockx.com/images/Adidas-Yeezy-663.jpg",
    "link": "https://stockx.com/adidas-yeezy-663"
  },
  {
    "modello": "nike retro 664",
    "nome": "Nike Retro 664",
    "sku": "NIRE0664",
    "prezzo": "317",
    "immagine": "https://images.stockx.com/images/Nike-Retro-664.jpg",
    "link": "https://stockx.com/nike-retro-664"
  },
  {
    "modello": "reebok air max 665",
    "nome": "Reebok Air Max 665",
    "sku": "REAI0665",
    "prezzo": "293",
    "immagine": "https://images.stockx.com/images/Reebok-Air Max-665.jpg",
    "link": "https://stockx.com/reebok-air max-665"
  },
  {
    "modello": "jordan retro 666",
    "nome": "Jordan Retro 666",
    "sku": "JORE0666",
    "prezzo": "232",
    "immagine": "https://images.stockx.com/images/Jordan-Retro-666.jpg",
    "link": "https://stockx.com/jordan-retro-666"
  },
  {
    "modello": "converse classic 667",
    "nome": "Converse Classic 667",
    "sku": "COCL0667",
    "prezzo": "132",
    "immagine": "https://images.stockx.com/images/Converse-Classic-667.jpg",
    "link": "https://stockx.com/converse-classic-667"
  },
  {
    "modello": "jordan dunk 668",
    "nome": "Jordan Dunk 668",
    "sku": "JODU0668",
    "prezzo": "325",
    "immagine": "https://images.stockx.com/images/Jordan-Dunk-668.jpg",
    "link": "https://stockx.com/jordan-dunk-668"
  },
  {
    "modello": "reebok chuck taylor 669",
    "nome": "Reebok Chuck Taylor 669",
    "sku": "RECH0669",
    "prezzo": "300",
    "immagine": "https://images.stockx.com/images/Reebok-Chuck Taylor-669.jpg",
    "link": "https://stockx.com/reebok-chuck taylor-669"
  },
  {
    "modello": "asics ultra boost 670",
    "nome": "Asics Ultra Boost 670",
    "sku": "ASUL0670",
    "prezzo": "285",
    "immagine": "https://images.stockx.com/images/Asics-Ultra Boost-670.jpg",
    "link": "https://stockx.com/asics-ultra boost-670"
  },
  {
    "modello": "adidas ultra boost 671",
    "nome": "Adidas Ultra Boost 671",
    "sku": "ADUL0671",
    "prezzo": "385",
    "immagine": "https://images.stockx.com/images/Adidas-Ultra Boost-671.jpg",
    "link": "https://stockx.com/adidas-ultra boost-671"
  },
  {
    "modello": "converse classic 672",
    "nome": "Converse Classic 672",
    "sku": "COCL0672",
    "prezzo": "206",
    "immagine": "https://images.stockx.com/images/Converse-Classic-672.jpg",
    "link": "https://stockx.com/converse-classic-672"
  },
  {
    "modello": "puma air max 673",
    "nome": "Puma Air Max 673",
    "sku": "PUAI0673",
    "prezzo": "109",
    "immagine": "https://images.stockx.com/images/Puma-Air Max-673.jpg",
    "link": "https://stockx.com/puma-air max-673"
  },
  {
    "modello": "jordan dunk 674",
    "nome": "Jordan Dunk 674",
    "sku": "JODU0674",
    "prezzo": "338",
    "immagine": "https://images.stockx.com/images/Jordan-Dunk-674.jpg",
    "link": "https://stockx.com/jordan-dunk-674"
  },
  {
    "modello": "puma dunk 675",
    "nome": "Puma Dunk 675",
    "sku": "PUDU0675",
    "prezzo": "119",
    "immagine": "https://images.stockx.com/images/Puma-Dunk-675.jpg",
    "link": "https://stockx.com/puma-dunk-675"
  },
  {
    "modello": "puma retro 676",
    "nome": "Puma Retro 676",
    "sku": "PURE0676",
    "prezzo": "364",
    "immagine": "https://images.stockx.com/images/Puma-Retro-676.jpg",
    "link": "https://stockx.com/puma-retro-676"
  },
  {
    "modello": "jordan chuck taylor 677",
    "nome": "Jordan Chuck Taylor 677",
    "sku": "JOCH0677",
    "prezzo": "307",
    "immagine": "https://images.stockx.com/images/Jordan-Chuck Taylor-677.jpg",
    "link": "https://stockx.com/jordan-chuck taylor-677"
  },
  {
    "modello": "asics air max 678",
    "nome": "Asics Air Max 678",
    "sku": "ASAI0678",
    "prezzo": "192",
    "immagine": "https://images.stockx.com/images/Asics-Air Max-678.jpg",
    "link": "https://stockx.com/asics-air max-678"
  },
  {
    "modello": "new balance retro 679",
    "nome": "New Balance Retro 679",
    "sku": "NERE0679",
    "prezzo": "101",
    "immagine": "https://images.stockx.com/images/New Balance-Retro-679.jpg",
    "link": "https://stockx.com/new balance-retro-679"
  },
  {
    "modello": "reebok chuck taylor 680",
    "nome": "Reebok Chuck Taylor 680",
    "sku": "RECH0680",
    "prezzo": "247",
    "immagine": "https://images.stockx.com/images/Reebok-Chuck Taylor-680.jpg",
    "link": "https://stockx.com/reebok-chuck taylor-680"
  },
  {
    "modello": "nike yeezy 681",
    "nome": "Nike Yeezy 681",
    "sku": "NIYE0681",
    "prezzo": "191",
    "immagine": "https://images.stockx.com/images/Nike-Yeezy-681.jpg",
    "link": "https://stockx.com/nike-yeezy-681"
  },
  {
    "modello": "asics retro 682",
    "nome": "Asics Retro 682",
    "sku": "ASRE0682",
    "prezzo": "364",
    "immagine": "https://images.stockx.com/images/Asics-Retro-682.jpg",
    "link": "https://stockx.com/asics-retro-682"
  },
  {
    "modello": "converse ultra boost 683",
    "nome": "Converse Ultra Boost 683",
    "sku": "COUL0683",
    "prezzo": "101",
    "immagine": "https://images.stockx.com/images/Converse-Ultra Boost-683.jpg",
    "link": "https://stockx.com/converse-ultra boost-683"
  },
  {
    "modello": "asics chuck taylor 684",
    "nome": "Asics Chuck Taylor 684",
    "sku": "ASCH0684",
    "prezzo": "187",
    "immagine": "https://images.stockx.com/images/Asics-Chuck Taylor-684.jpg",
    "link": "https://stockx.com/asics-chuck taylor-684"
  },
  {
    "modello": "new balance gel-lyte 685",
    "nome": "New Balance Gel-Lyte 685",
    "sku": "NEGE0685",
    "prezzo": "348",
    "immagine": "https://images.stockx.com/images/New Balance-Gel-Lyte-685.jpg",
    "link": "https://stockx.com/new balance-gel-lyte-685"
  },
  {
    "modello": "jordan classic 686",
    "nome": "Jordan Classic 686",
    "sku": "JOCL0686",
    "prezzo": "176",
    "immagine": "https://images.stockx.com/images/Jordan-Classic-686.jpg",
    "link": "https://stockx.com/jordan-classic-686"
  },
  {
    "modello": "reebok yeezy 687",
    "nome": "Reebok Yeezy 687",
    "sku": "REYE0687",
    "prezzo": "197",
    "immagine": "https://images.stockx.com/images/Reebok-Yeezy-687.jpg",
    "link": "https://stockx.com/reebok-yeezy-687"
  },
  {
    "modello": "adidas dunk 688",
    "nome": "Adidas Dunk 688",
    "sku": "ADDU0688",
    "prezzo": "234",
    "immagine": "https://images.stockx.com/images/Adidas-Dunk-688.jpg",
    "link": "https://stockx.com/adidas-dunk-688"
  },
  {
    "modello": "puma gel-lyte 689",
    "nome": "Puma Gel-Lyte 689",
    "sku": "PUGE0689",
    "prezzo": "380",
    "immagine": "https://images.stockx.com/images/Puma-Gel-Lyte-689.jpg",
    "link": "https://stockx.com/puma-gel-lyte-689"
  },
  {
    "modello": "asics chuck taylor 690",
    "nome": "Asics Chuck Taylor 690",
    "sku": "ASCH0690",
    "prezzo": "112",
    "immagine": "https://images.stockx.com/images/Asics-Chuck Taylor-690.jpg",
    "link": "https://stockx.com/asics-chuck taylor-690"
  },
  {
    "modello": "adidas yeezy 691",
    "nome": "Adidas Yeezy 691",
    "sku": "ADYE0691",
    "prezzo": "304",
    "immagine": "https://images.stockx.com/images/Adidas-Yeezy-691.jpg",
    "link": "https://stockx.com/adidas-yeezy-691"
  },
  {
    "modello": "converse ultra boost 692",
    "nome": "Converse Ultra Boost 692",
    "sku": "COUL0692",
    "prezzo": "321",
    "immagine": "https://images.stockx.com/images/Converse-Ultra Boost-692.jpg",
    "link": "https://stockx.com/converse-ultra boost-692"
  },
  {
    "modello": "nike dunk 693",
    "nome": "Nike Dunk 693",
    "sku": "NIDU0693",
    "prezzo": "365",
    "immagine": "https://images.stockx.com/images/Nike-Dunk-693.jpg",
    "link": "https://stockx.com/nike-dunk-693"
  },
  {
    "modello": "reebok retro 694",
    "nome": "Reebok Retro 694",
    "sku": "RERE0694",
    "prezzo": "282",
    "immagine": "https://images.stockx.com/images/Reebok-Retro-694.jpg",
    "link": "https://stockx.com/reebok-retro-694"
  },
  {
    "modello": "adidas retro 695",
    "nome": "Adidas Retro 695",
    "sku": "ADRE0695",
    "prezzo": "290",
    "immagine": "https://images.stockx.com/images/Adidas-Retro-695.jpg",
    "link": "https://stockx.com/adidas-retro-695"
  },
  {
    "modello": "adidas ultra boost 696",
    "nome": "Adidas Ultra Boost 696",
    "sku": "ADUL0696",
    "prezzo": "223",
    "immagine": "https://images.stockx.com/images/Adidas-Ultra Boost-696.jpg",
    "link": "https://stockx.com/adidas-ultra boost-696"
  },
  {
    "modello": "converse gel-lyte 697",
    "nome": "Converse Gel-Lyte 697",
    "sku": "COGE0697",
    "prezzo": "153",
    "immagine": "https://images.stockx.com/images/Converse-Gel-Lyte-697.jpg",
    "link": "https://stockx.com/converse-gel-lyte-697"
  },
  {
    "modello": "converse retro 698",
    "nome": "Converse Retro 698",
    "sku": "CORE0698",
    "prezzo": "237",
    "immagine": "https://images.stockx.com/images/Converse-Retro-698.jpg",
    "link": "https://stockx.com/converse-retro-698"
  },
  {
    "modello": "puma dunk 699",
    "nome": "Puma Dunk 699",
    "sku": "PUDU0699",
    "prezzo": "170",
    "immagine": "https://images.stockx.com/images/Puma-Dunk-699.jpg",
    "link": "https://stockx.com/puma-dunk-699"
  },
  {
    "modello": "asics dunk 700",
    "nome": "Asics Dunk 700",
    "sku": "ASDU0700",
    "prezzo": "131",
    "immagine": "https://images.stockx.com/images/Asics-Dunk-700.jpg",
    "link": "https://stockx.com/asics-dunk-700"
  },
  {
    "modello": "puma gel-lyte 701",
    "nome": "Puma Gel-Lyte 701",
    "sku": "PUGE0701",
    "prezzo": "251",
    "immagine": "https://images.stockx.com/images/Puma-Gel-Lyte-701.jpg",
    "link": "https://stockx.com/puma-gel-lyte-701"
  },
  {
    "modello": "adidas air max 702",
    "nome": "Adidas Air Max 702",
    "sku": "ADAI0702",
    "prezzo": "138",
    "immagine": "https://images.stockx.com/images/Adidas-Air Max-702.jpg",
    "link": "https://stockx.com/adidas-air max-702"
  },
  {
    "modello": "adidas classic 703",
    "nome": "Adidas Classic 703",
    "sku": "ADCL0703",
    "prezzo": "386",
    "immagine": "https://images.stockx.com/images/Adidas-Classic-703.jpg",
    "link": "https://stockx.com/adidas-classic-703"
  },
  {
    "modello": "puma yeezy 704",
    "nome": "Puma Yeezy 704",
    "sku": "PUYE0704",
    "prezzo": "269",
    "immagine": "https://images.stockx.com/images/Puma-Yeezy-704.jpg",
    "link": "https://stockx.com/puma-yeezy-704"
  },
  {
    "modello": "adidas chuck taylor 705",
    "nome": "Adidas Chuck Taylor 705",
    "sku": "ADCH0705",
    "prezzo": "239",
    "immagine": "https://images.stockx.com/images/Adidas-Chuck Taylor-705.jpg",
    "link": "https://stockx.com/adidas-chuck taylor-705"
  },
  {
    "modello": "nike chuck taylor 706",
    "nome": "Nike Chuck Taylor 706",
    "sku": "NICH0706",
    "prezzo": "118",
    "immagine": "https://images.stockx.com/images/Nike-Chuck Taylor-706.jpg",
    "link": "https://stockx.com/nike-chuck taylor-706"
  },
  {
    "modello": "adidas chuck taylor 707",
    "nome": "Adidas Chuck Taylor 707",
    "sku": "ADCH0707",
    "prezzo": "109",
    "immagine": "https://images.stockx.com/images/Adidas-Chuck Taylor-707.jpg",
    "link": "https://stockx.com/adidas-chuck taylor-707"
  },
  {
    "modello": "jordan retro 708",
    "nome": "Jordan Retro 708",
    "sku": "JORE0708",
    "prezzo": "346",
    "immagine": "https://images.stockx.com/images/Jordan-Retro-708.jpg",
    "link": "https://stockx.com/jordan-retro-708"
  },
  {
    "modello": "jordan ultra boost 709",
    "nome": "Jordan Ultra Boost 709",
    "sku": "JOUL0709",
    "prezzo": "338",
    "immagine": "https://images.stockx.com/images/Jordan-Ultra Boost-709.jpg",
    "link": "https://stockx.com/jordan-ultra boost-709"
  },
  {
    "modello": "new balance classic 710",
    "nome": "New Balance Classic 710",
    "sku": "NECL0710",
    "prezzo": "290",
    "immagine": "https://images.stockx.com/images/New Balance-Classic-710.jpg",
    "link": "https://stockx.com/new balance-classic-710"
  },
  {
    "modello": "adidas yeezy 711",
    "nome": "Adidas Yeezy 711",
    "sku": "ADYE0711",
    "prezzo": "338",
    "immagine": "https://images.stockx.com/images/Adidas-Yeezy-711.jpg",
    "link": "https://stockx.com/adidas-yeezy-711"
  },
  {
    "modello": "asics dunk 712",
    "nome": "Asics Dunk 712",
    "sku": "ASDU0712",
    "prezzo": "157",
    "immagine": "https://images.stockx.com/images/Asics-Dunk-712.jpg",
    "link": "https://stockx.com/asics-dunk-712"
  },
  {
    "modello": "jordan yeezy 713",
    "nome": "Jordan Yeezy 713",
    "sku": "JOYE0713",
    "prezzo": "300",
    "immagine": "https://images.stockx.com/images/Jordan-Yeezy-713.jpg",
    "link": "https://stockx.com/jordan-yeezy-713"
  },
  {
    "modello": "puma chuck taylor 714",
    "nome": "Puma Chuck Taylor 714",
    "sku": "PUCH0714",
    "prezzo": "172",
    "immagine": "https://images.stockx.com/images/Puma-Chuck Taylor-714.jpg",
    "link": "https://stockx.com/puma-chuck taylor-714"
  },
  {
    "modello": "new balance chuck taylor 715",
    "nome": "New Balance Chuck Taylor 715",
    "sku": "NECH0715",
    "prezzo": "287",
    "immagine": "https://images.stockx.com/images/New Balance-Chuck Taylor-715.jpg",
    "link": "https://stockx.com/new balance-chuck taylor-715"
  },
  {
    "modello": "nike retro 716",
    "nome": "Nike Retro 716",
    "sku": "NIRE0716",
    "prezzo": "252",
    "immagine": "https://images.stockx.com/images/Nike-Retro-716.jpg",
    "link": "https://stockx.com/nike-retro-716"
  },
  {
    "modello": "asics gel-lyte 717",
    "nome": "Asics Gel-Lyte 717",
    "sku": "ASGE0717",
    "prezzo": "392",
    "immagine": "https://images.stockx.com/images/Asics-Gel-Lyte-717.jpg",
    "link": "https://stockx.com/asics-gel-lyte-717"
  },
  {
    "modello": "jordan chuck taylor 718",
    "nome": "Jordan Chuck Taylor 718",
    "sku": "JOCH0718",
    "prezzo": "289",
    "immagine": "https://images.stockx.com/images/Jordan-Chuck Taylor-718.jpg",
    "link": "https://stockx.com/jordan-chuck taylor-718"
  },
  {
    "modello": "asics gel-lyte 719",
    "nome": "Asics Gel-Lyte 719",
    "sku": "ASGE0719",
    "prezzo": "191",
    "immagine": "https://images.stockx.com/images/Asics-Gel-Lyte-719.jpg",
    "link": "https://stockx.com/asics-gel-lyte-719"
  },
  {
    "modello": "jordan dunk 720",
    "nome": "Jordan Dunk 720",
    "sku": "JODU0720",
    "prezzo": "180",
    "immagine": "https://images.stockx.com/images/Jordan-Dunk-720.jpg",
    "link": "https://stockx.com/jordan-dunk-720"
  },
  {
    "modello": "new balance classic 721",
    "nome": "New Balance Classic 721",
    "sku": "NECL0721",
    "prezzo": "388",
    "immagine": "https://images.stockx.com/images/New Balance-Classic-721.jpg",
    "link": "https://stockx.com/new balance-classic-721"
  },
  {
    "modello": "converse classic 722",
    "nome": "Converse Classic 722",
    "sku": "COCL0722",
    "prezzo": "152",
    "immagine": "https://images.stockx.com/images/Converse-Classic-722.jpg",
    "link": "https://stockx.com/converse-classic-722"
  },
  {
    "modello": "reebok ultra boost 723",
    "nome": "Reebok Ultra Boost 723",
    "sku": "REUL0723",
    "prezzo": "229",
    "immagine": "https://images.stockx.com/images/Reebok-Ultra Boost-723.jpg",
    "link": "https://stockx.com/reebok-ultra boost-723"
  },
  {
    "modello": "asics air max 724",
    "nome": "Asics Air Max 724",
    "sku": "ASAI0724",
    "prezzo": "202",
    "immagine": "https://images.stockx.com/images/Asics-Air Max-724.jpg",
    "link": "https://stockx.com/asics-air max-724"
  },
  {
    "modello": "jordan yeezy 725",
    "nome": "Jordan Yeezy 725",
    "sku": "JOYE0725",
    "prezzo": "392",
    "immagine": "https://images.stockx.com/images/Jordan-Yeezy-725.jpg",
    "link": "https://stockx.com/jordan-yeezy-725"
  },
  {
    "modello": "new balance gel-lyte 726",
    "nome": "New Balance Gel-Lyte 726",
    "sku": "NEGE0726",
    "prezzo": "151",
    "immagine": "https://images.stockx.com/images/New Balance-Gel-Lyte-726.jpg",
    "link": "https://stockx.com/new balance-gel-lyte-726"
  },
  {
    "modello": "reebok dunk 727",
    "nome": "Reebok Dunk 727",
    "sku": "REDU0727",
    "prezzo": "275",
    "immagine": "https://images.stockx.com/images/Reebok-Dunk-727.jpg",
    "link": "https://stockx.com/reebok-dunk-727"
  },
  {
    "modello": "nike chuck taylor 728",
    "nome": "Nike Chuck Taylor 728",
    "sku": "NICH0728",
    "prezzo": "375",
    "immagine": "https://images.stockx.com/images/Nike-Chuck Taylor-728.jpg",
    "link": "https://stockx.com/nike-chuck taylor-728"
  },
  {
    "modello": "puma yeezy 729",
    "nome": "Puma Yeezy 729",
    "sku": "PUYE0729",
    "prezzo": "214",
    "immagine": "https://images.stockx.com/images/Puma-Yeezy-729.jpg",
    "link": "https://stockx.com/puma-yeezy-729"
  },
  {
    "modello": "adidas retro 730",
    "nome": "Adidas Retro 730",
    "sku": "ADRE0730",
    "prezzo": "84",
    "immagine": "https://images.stockx.com/images/Adidas-Retro-730.jpg",
    "link": "https://stockx.com/adidas-retro-730"
  },
  {
    "modello": "converse ultra boost 731",
    "nome": "Converse Ultra Boost 731",
    "sku": "COUL0731",
    "prezzo": "112",
    "immagine": "https://images.stockx.com/images/Converse-Ultra Boost-731.jpg",
    "link": "https://stockx.com/converse-ultra boost-731"
  },
  {
    "modello": "nike yeezy 732",
    "nome": "Nike Yeezy 732",
    "sku": "NIYE0732",
    "prezzo": "173",
    "immagine": "https://images.stockx.com/images/Nike-Yeezy-732.jpg",
    "link": "https://stockx.com/nike-yeezy-732"
  },
  {
    "modello": "reebok dunk 733",
    "nome": "Reebok Dunk 733",
    "sku": "REDU0733",
    "prezzo": "109",
    "immagine": "https://images.stockx.com/images/Reebok-Dunk-733.jpg",
    "link": "https://stockx.com/reebok-dunk-733"
  },
  {
    "modello": "nike retro 734",
    "nome": "Nike Retro 734",
    "sku": "NIRE0734",
    "prezzo": "205",
    "immagine": "https://images.stockx.com/images/Nike-Retro-734.jpg",
    "link": "https://stockx.com/nike-retro-734"
  },
  {
    "modello": "reebok gel-lyte 735",
    "nome": "Reebok Gel-Lyte 735",
    "sku": "REGE0735",
    "prezzo": "348",
    "immagine": "https://images.stockx.com/images/Reebok-Gel-Lyte-735.jpg",
    "link": "https://stockx.com/reebok-gel-lyte-735"
  },
  {
    "modello": "new balance dunk 736",
    "nome": "New Balance Dunk 736",
    "sku": "NEDU0736",
    "prezzo": "382",
    "immagine": "https://images.stockx.com/images/New Balance-Dunk-736.jpg",
    "link": "https://stockx.com/new balance-dunk-736"
  },
  {
    "modello": "new balance retro 737",
    "nome": "New Balance Retro 737",
    "sku": "NERE0737",
    "prezzo": "288",
    "immagine": "https://images.stockx.com/images/New Balance-Retro-737.jpg",
    "link": "https://stockx.com/new balance-retro-737"
  },
  {
    "modello": "puma classic 738",
    "nome": "Puma Classic 738",
    "sku": "PUCL0738",
    "prezzo": "134",
    "immagine": "https://images.stockx.com/images/Puma-Classic-738.jpg",
    "link": "https://stockx.com/puma-classic-738"
  },
  {
    "modello": "new balance ultra boost 739",
    "nome": "New Balance Ultra Boost 739",
    "sku": "NEUL0739",
    "prezzo": "206",
    "immagine": "https://images.stockx.com/images/New Balance-Ultra Boost-739.jpg",
    "link": "https://stockx.com/new balance-ultra boost-739"
  },
  {
    "modello": "converse ultra boost 740",
    "nome": "Converse Ultra Boost 740",
    "sku": "COUL0740",
    "prezzo": "218",
    "immagine": "https://images.stockx.com/images/Converse-Ultra Boost-740.jpg",
    "link": "https://stockx.com/converse-ultra boost-740"
  },
  {
    "modello": "nike dunk 741",
    "nome": "Nike Dunk 741",
    "sku": "NIDU0741",
    "prezzo": "167",
    "immagine": "https://images.stockx.com/images/Nike-Dunk-741.jpg",
    "link": "https://stockx.com/nike-dunk-741"
  },
  {
    "modello": "puma air max 742",
    "nome": "Puma Air Max 742",
    "sku": "PUAI0742",
    "prezzo": "256",
    "immagine": "https://images.stockx.com/images/Puma-Air Max-742.jpg",
    "link": "https://stockx.com/puma-air max-742"
  },
  {
    "modello": "adidas classic 743",
    "nome": "Adidas Classic 743",
    "sku": "ADCL0743",
    "prezzo": "201",
    "immagine": "https://images.stockx.com/images/Adidas-Classic-743.jpg",
    "link": "https://stockx.com/adidas-classic-743"
  },
  {
    "modello": "asics gel-lyte 744",
    "nome": "Asics Gel-Lyte 744",
    "sku": "ASGE0744",
    "prezzo": "320",
    "immagine": "https://images.stockx.com/images/Asics-Gel-Lyte-744.jpg",
    "link": "https://stockx.com/asics-gel-lyte-744"
  },
  {
    "modello": "reebok ultra boost 745",
    "nome": "Reebok Ultra Boost 745",
    "sku": "REUL0745",
    "prezzo": "290",
    "immagine": "https://images.stockx.com/images/Reebok-Ultra Boost-745.jpg",
    "link": "https://stockx.com/reebok-ultra boost-745"
  },
  {
    "modello": "asics ultra boost 746",
    "nome": "Asics Ultra Boost 746",
    "sku": "ASUL0746",
    "prezzo": "187",
    "immagine": "https://images.stockx.com/images/Asics-Ultra Boost-746.jpg",
    "link": "https://stockx.com/asics-ultra boost-746"
  },
  {
    "modello": "reebok gel-lyte 747",
    "nome": "Reebok Gel-Lyte 747",
    "sku": "REGE0747",
    "prezzo": "295",
    "immagine": "https://images.stockx.com/images/Reebok-Gel-Lyte-747.jpg",
    "link": "https://stockx.com/reebok-gel-lyte-747"
  },
  {
    "modello": "converse classic 748",
    "nome": "Converse Classic 748",
    "sku": "COCL0748",
    "prezzo": "229",
    "immagine": "https://images.stockx.com/images/Converse-Classic-748.jpg",
    "link": "https://stockx.com/converse-classic-748"
  },
  {
    "modello": "asics ultra boost 749",
    "nome": "Asics Ultra Boost 749",
    "sku": "ASUL0749",
    "prezzo": "335",
    "immagine": "https://images.stockx.com/images/Asics-Ultra Boost-749.jpg",
    "link": "https://stockx.com/asics-ultra boost-749"
  },
  {
    "modello": "adidas dunk 750",
    "nome": "Adidas Dunk 750",
    "sku": "ADDU0750",
    "prezzo": "238",
    "immagine": "https://images.stockx.com/images/Adidas-Dunk-750.jpg",
    "link": "https://stockx.com/adidas-dunk-750"
  },
  {
    "modello": "reebok retro 751",
    "nome": "Reebok Retro 751",
    "sku": "RERE0751",
    "prezzo": "97",
    "immagine": "https://images.stockx.com/images/Reebok-Retro-751.jpg",
    "link": "https://stockx.com/reebok-retro-751"
  },
  {
    "modello": "asics ultra boost 752",
    "nome": "Asics Ultra Boost 752",
    "sku": "ASUL0752",
    "prezzo": "310",
    "immagine": "https://images.stockx.com/images/Asics-Ultra Boost-752.jpg",
    "link": "https://stockx.com/asics-ultra boost-752"
  },
  {
    "modello": "reebok chuck taylor 753",
    "nome": "Reebok Chuck Taylor 753",
    "sku": "RECH0753",
    "prezzo": "338",
    "immagine": "https://images.stockx.com/images/Reebok-Chuck Taylor-753.jpg",
    "link": "https://stockx.com/reebok-chuck taylor-753"
  },
  {
    "modello": "nike classic 754",
    "nome": "Nike Classic 754",
    "sku": "NICL0754",
    "prezzo": "378",
    "immagine": "https://images.stockx.com/images/Nike-Classic-754.jpg",
    "link": "https://stockx.com/nike-classic-754"
  },
  {
    "modello": "reebok classic 755",
    "nome": "Reebok Classic 755",
    "sku": "RECL0755",
    "prezzo": "202",
    "immagine": "https://images.stockx.com/images/Reebok-Classic-755.jpg",
    "link": "https://stockx.com/reebok-classic-755"
  },
  {
    "modello": "adidas yeezy 756",
    "nome": "Adidas Yeezy 756",
    "sku": "ADYE0756",
    "prezzo": "311",
    "immagine": "https://images.stockx.com/images/Adidas-Yeezy-756.jpg",
    "link": "https://stockx.com/adidas-yeezy-756"
  },
  {
    "modello": "converse yeezy 757",
    "nome": "Converse Yeezy 757",
    "sku": "COYE0757",
    "prezzo": "164",
    "immagine": "https://images.stockx.com/images/Converse-Yeezy-757.jpg",
    "link": "https://stockx.com/converse-yeezy-757"
  },
  {
    "modello": "new balance ultra boost 758",
    "nome": "New Balance Ultra Boost 758",
    "sku": "NEUL0758",
    "prezzo": "225",
    "immagine": "https://images.stockx.com/images/New Balance-Ultra Boost-758.jpg",
    "link": "https://stockx.com/new balance-ultra boost-758"
  },
  {
    "modello": "asics dunk 759",
    "nome": "Asics Dunk 759",
    "sku": "ASDU0759",
    "prezzo": "274",
    "immagine": "https://images.stockx.com/images/Asics-Dunk-759.jpg",
    "link": "https://stockx.com/asics-dunk-759"
  },
  {
    "modello": "puma gel-lyte 760",
    "nome": "Puma Gel-Lyte 760",
    "sku": "PUGE0760",
    "prezzo": "103",
    "immagine": "https://images.stockx.com/images/Puma-Gel-Lyte-760.jpg",
    "link": "https://stockx.com/puma-gel-lyte-760"
  },
  {
    "modello": "adidas air max 761",
    "nome": "Adidas Air Max 761",
    "sku": "ADAI0761",
    "prezzo": "205",
    "immagine": "https://images.stockx.com/images/Adidas-Air Max-761.jpg",
    "link": "https://stockx.com/adidas-air max-761"
  },
  {
    "modello": "reebok chuck taylor 762",
    "nome": "Reebok Chuck Taylor 762",
    "sku": "RECH0762",
    "prezzo": "134",
    "immagine": "https://images.stockx.com/images/Reebok-Chuck Taylor-762.jpg",
    "link": "https://stockx.com/reebok-chuck taylor-762"
  },
  {
    "modello": "nike chuck taylor 763",
    "nome": "Nike Chuck Taylor 763",
    "sku": "NICH0763",
    "prezzo": "147",
    "immagine": "https://images.stockx.com/images/Nike-Chuck Taylor-763.jpg",
    "link": "https://stockx.com/nike-chuck taylor-763"
  },
  {
    "modello": "new balance yeezy 764",
    "nome": "New Balance Yeezy 764",
    "sku": "NEYE0764",
    "prezzo": "305",
    "immagine": "https://images.stockx.com/images/New Balance-Yeezy-764.jpg",
    "link": "https://stockx.com/new balance-yeezy-764"
  },
  {
    "modello": "jordan ultra boost 765",
    "nome": "Jordan Ultra Boost 765",
    "sku": "JOUL0765",
    "prezzo": "358",
    "immagine": "https://images.stockx.com/images/Jordan-Ultra Boost-765.jpg",
    "link": "https://stockx.com/jordan-ultra boost-765"
  },
  {
    "modello": "adidas air max 766",
    "nome": "Adidas Air Max 766",
    "sku": "ADAI0766",
    "prezzo": "288",
    "immagine": "https://images.stockx.com/images/Adidas-Air Max-766.jpg",
    "link": "https://stockx.com/adidas-air max-766"
  },
  {
    "modello": "adidas gel-lyte 767",
    "nome": "Adidas Gel-Lyte 767",
    "sku": "ADGE0767",
    "prezzo": "229",
    "immagine": "https://images.stockx.com/images/Adidas-Gel-Lyte-767.jpg",
    "link": "https://stockx.com/adidas-gel-lyte-767"
  },
  {
    "modello": "new balance ultra boost 768",
    "nome": "New Balance Ultra Boost 768",
    "sku": "NEUL0768",
    "prezzo": "305",
    "immagine": "https://images.stockx.com/images/New Balance-Ultra Boost-768.jpg",
    "link": "https://stockx.com/new balance-ultra boost-768"
  },
  {
    "modello": "nike air max 769",
    "nome": "Nike Air Max 769",
    "sku": "NIAI0769",
    "prezzo": "258",
    "immagine": "https://images.stockx.com/images/Nike-Air Max-769.jpg",
    "link": "https://stockx.com/nike-air max-769"
  },
  {
    "modello": "asics retro 770",
    "nome": "Asics Retro 770",
    "sku": "ASRE0770",
    "prezzo": "144",
    "immagine": "https://images.stockx.com/images/Asics-Retro-770.jpg",
    "link": "https://stockx.com/asics-retro-770"
  },
  {
    "modello": "converse dunk 771",
    "nome": "Converse Dunk 771",
    "sku": "CODU0771",
    "prezzo": "107",
    "immagine": "https://images.stockx.com/images/Converse-Dunk-771.jpg",
    "link": "https://stockx.com/converse-dunk-771"
  },
  {
    "modello": "reebok retro 772",
    "nome": "Reebok Retro 772",
    "sku": "RERE0772",
    "prezzo": "168",
    "immagine": "https://images.stockx.com/images/Reebok-Retro-772.jpg",
    "link": "https://stockx.com/reebok-retro-772"
  },
  {
    "modello": "asics classic 773",
    "nome": "Asics Classic 773",
    "sku": "ASCL0773",
    "prezzo": "260",
    "immagine": "https://images.stockx.com/images/Asics-Classic-773.jpg",
    "link": "https://stockx.com/asics-classic-773"
  },
  {
    "modello": "new balance yeezy 774",
    "nome": "New Balance Yeezy 774",
    "sku": "NEYE0774",
    "prezzo": "364",
    "immagine": "https://images.stockx.com/images/New Balance-Yeezy-774.jpg",
    "link": "https://stockx.com/new balance-yeezy-774"
  },
  {
    "modello": "converse chuck taylor 775",
    "nome": "Converse Chuck Taylor 775",
    "sku": "COCH0775",
    "prezzo": "287",
    "immagine": "https://images.stockx.com/images/Converse-Chuck Taylor-775.jpg",
    "link": "https://stockx.com/converse-chuck taylor-775"
  },
  {
    "modello": "jordan yeezy 776",
    "nome": "Jordan Yeezy 776",
    "sku": "JOYE0776",
    "prezzo": "389",
    "immagine": "https://images.stockx.com/images/Jordan-Yeezy-776.jpg",
    "link": "https://stockx.com/jordan-yeezy-776"
  },
  {
    "modello": "adidas yeezy 777",
    "nome": "Adidas Yeezy 777",
    "sku": "ADYE0777",
    "prezzo": "216",
    "immagine": "https://images.stockx.com/images/Adidas-Yeezy-777.jpg",
    "link": "https://stockx.com/adidas-yeezy-777"
  },
  {
    "modello": "reebok gel-lyte 778",
    "nome": "Reebok Gel-Lyte 778",
    "sku": "REGE0778",
    "prezzo": "136",
    "immagine": "https://images.stockx.com/images/Reebok-Gel-Lyte-778.jpg",
    "link": "https://stockx.com/reebok-gel-lyte-778"
  },
  {
    "modello": "nike yeezy 779",
    "nome": "Nike Yeezy 779",
    "sku": "NIYE0779",
    "prezzo": "131",
    "immagine": "https://images.stockx.com/images/Nike-Yeezy-779.jpg",
    "link": "https://stockx.com/nike-yeezy-779"
  },
  {
    "modello": "asics ultra boost 780",
    "nome": "Asics Ultra Boost 780",
    "sku": "ASUL0780",
    "prezzo": "287",
    "immagine": "https://images.stockx.com/images/Asics-Ultra Boost-780.jpg",
    "link": "https://stockx.com/asics-ultra boost-780"
  },
  {
    "modello": "reebok ultra boost 781",
    "nome": "Reebok Ultra Boost 781",
    "sku": "REUL0781",
    "prezzo": "321",
    "immagine": "https://images.stockx.com/images/Reebok-Ultra Boost-781.jpg",
    "link": "https://stockx.com/reebok-ultra boost-781"
  },
  {
    "modello": "jordan air max 782",
    "nome": "Jordan Air Max 782",
    "sku": "JOAI0782",
    "prezzo": "195",
    "immagine": "https://images.stockx.com/images/Jordan-Air Max-782.jpg",
    "link": "https://stockx.com/jordan-air max-782"
  },
  {
    "modello": "puma yeezy 783",
    "nome": "Puma Yeezy 783",
    "sku": "PUYE0783",
    "prezzo": "104",
    "immagine": "https://images.stockx.com/images/Puma-Yeezy-783.jpg",
    "link": "https://stockx.com/puma-yeezy-783"
  },
  {
    "modello": "jordan dunk 784",
    "nome": "Jordan Dunk 784",
    "sku": "JODU0784",
    "prezzo": "193",
    "immagine": "https://images.stockx.com/images/Jordan-Dunk-784.jpg",
    "link": "https://stockx.com/jordan-dunk-784"
  },
  {
    "modello": "puma air max 785",
    "nome": "Puma Air Max 785",
    "sku": "PUAI0785",
    "prezzo": "279",
    "immagine": "https://images.stockx.com/images/Puma-Air Max-785.jpg",
    "link": "https://stockx.com/puma-air max-785"
  },
  {
    "modello": "jordan chuck taylor 786",
    "nome": "Jordan Chuck Taylor 786",
    "sku": "JOCH0786",
    "prezzo": "169",
    "immagine": "https://images.stockx.com/images/Jordan-Chuck Taylor-786.jpg",
    "link": "https://stockx.com/jordan-chuck taylor-786"
  },
  {
    "modello": "reebok dunk 787",
    "nome": "Reebok Dunk 787",
    "sku": "REDU0787",
    "prezzo": "330",
    "immagine": "https://images.stockx.com/images/Reebok-Dunk-787.jpg",
    "link": "https://stockx.com/reebok-dunk-787"
  },
  {
    "modello": "converse yeezy 788",
    "nome": "Converse Yeezy 788",
    "sku": "COYE0788",
    "prezzo": "245",
    "immagine": "https://images.stockx.com/images/Converse-Yeezy-788.jpg",
    "link": "https://stockx.com/converse-yeezy-788"
  },
  {
    "modello": "converse dunk 789",
    "nome": "Converse Dunk 789",
    "sku": "CODU0789",
    "prezzo": "365",
    "immagine": "https://images.stockx.com/images/Converse-Dunk-789.jpg",
    "link": "https://stockx.com/converse-dunk-789"
  },
  {
    "modello": "adidas retro 790",
    "nome": "Adidas Retro 790",
    "sku": "ADRE0790",
    "prezzo": "389",
    "immagine": "https://images.stockx.com/images/Adidas-Retro-790.jpg",
    "link": "https://stockx.com/adidas-retro-790"
  },
  {
    "modello": "reebok gel-lyte 791",
    "nome": "Reebok Gel-Lyte 791",
    "sku": "REGE0791",
    "prezzo": "345",
    "immagine": "https://images.stockx.com/images/Reebok-Gel-Lyte-791.jpg",
    "link": "https://stockx.com/reebok-gel-lyte-791"
  },
  {
    "modello": "new balance air max 792",
    "nome": "New Balance Air Max 792",
    "sku": "NEAI0792",
    "prezzo": "255",
    "immagine": "https://images.stockx.com/images/New Balance-Air Max-792.jpg",
    "link": "https://stockx.com/new balance-air max-792"
  },
  {
    "modello": "puma retro 793",
    "nome": "Puma Retro 793",
    "sku": "PURE0793",
    "prezzo": "113",
    "immagine": "https://images.stockx.com/images/Puma-Retro-793.jpg",
    "link": "https://stockx.com/puma-retro-793"
  },
  {
    "modello": "adidas retro 794",
    "nome": "Adidas Retro 794",
    "sku": "ADRE0794",
    "prezzo": "139",
    "immagine": "https://images.stockx.com/images/Adidas-Retro-794.jpg",
    "link": "https://stockx.com/adidas-retro-794"
  },
  {
    "modello": "asics yeezy 795",
    "nome": "Asics Yeezy 795",
    "sku": "ASYE0795",
    "prezzo": "191",
    "immagine": "https://images.stockx.com/images/Asics-Yeezy-795.jpg",
    "link": "https://stockx.com/asics-yeezy-795"
  },
  {
    "modello": "new balance air max 796",
    "nome": "New Balance Air Max 796",
    "sku": "NEAI0796",
    "prezzo": "335",
    "immagine": "https://images.stockx.com/images/New Balance-Air Max-796.jpg",
    "link": "https://stockx.com/new balance-air max-796"
  },
  {
    "modello": "nike classic 797",
    "nome": "Nike Classic 797",
    "sku": "NICL0797",
    "prezzo": "155",
    "immagine": "https://images.stockx.com/images/Nike-Classic-797.jpg",
    "link": "https://stockx.com/nike-classic-797"
  },
  {
    "modello": "asics ultra boost 798",
    "nome": "Asics Ultra Boost 798",
    "sku": "ASUL0798",
    "prezzo": "263",
    "immagine": "https://images.stockx.com/images/Asics-Ultra Boost-798.jpg",
    "link": "https://stockx.com/asics-ultra boost-798"
  },
  {
    "modello": "puma classic 799",
    "nome": "Puma Classic 799",
    "sku": "PUCL0799",
    "prezzo": "187",
    "immagine": "https://images.stockx.com/images/Puma-Classic-799.jpg",
    "link": "https://stockx.com/puma-classic-799"
  },
  {
    "modello": "puma classic 800",
    "nome": "Puma Classic 800",
    "sku": "PUCL0800",
    "prezzo": "334",
    "immagine": "https://images.stockx.com/images/Puma-Classic-800.jpg",
    "link": "https://stockx.com/puma-classic-800"
  },
  {
    "modello": "reebok yeezy 801",
    "nome": "Reebok Yeezy 801",
    "sku": "REYE0801",
    "prezzo": "307",
    "immagine": "https://images.stockx.com/images/Reebok-Yeezy-801.jpg",
    "link": "https://stockx.com/reebok-yeezy-801"
  },
  {
    "modello": "converse air max 802",
    "nome": "Converse Air Max 802",
    "sku": "COAI0802",
    "prezzo": "135",
    "immagine": "https://images.stockx.com/images/Converse-Air Max-802.jpg",
    "link": "https://stockx.com/converse-air max-802"
  },
  {
    "modello": "reebok gel-lyte 803",
    "nome": "Reebok Gel-Lyte 803",
    "sku": "REGE0803",
    "prezzo": "308",
    "immagine": "https://images.stockx.com/images/Reebok-Gel-Lyte-803.jpg",
    "link": "https://stockx.com/reebok-gel-lyte-803"
  },
  {
    "modello": "adidas retro 804",
    "nome": "Adidas Retro 804",
    "sku": "ADRE0804",
    "prezzo": "242",
    "immagine": "https://images.stockx.com/images/Adidas-Retro-804.jpg",
    "link": "https://stockx.com/adidas-retro-804"
  },
  {
    "modello": "asics ultra boost 805",
    "nome": "Asics Ultra Boost 805",
    "sku": "ASUL0805",
    "prezzo": "353",
    "immagine": "https://images.stockx.com/images/Asics-Ultra Boost-805.jpg",
    "link": "https://stockx.com/asics-ultra boost-805"
  },
  {
    "modello": "adidas ultra boost 806",
    "nome": "Adidas Ultra Boost 806",
    "sku": "ADUL0806",
    "prezzo": "191",
    "immagine": "https://images.stockx.com/images/Adidas-Ultra Boost-806.jpg",
    "link": "https://stockx.com/adidas-ultra boost-806"
  },
  {
    "modello": "asics classic 807",
    "nome": "Asics Classic 807",
    "sku": "ASCL0807",
    "prezzo": "182",
    "immagine": "https://images.stockx.com/images/Asics-Classic-807.jpg",
    "link": "https://stockx.com/asics-classic-807"
  },
  {
    "modello": "jordan gel-lyte 808",
    "nome": "Jordan Gel-Lyte 808",
    "sku": "JOGE0808",
    "prezzo": "363",
    "immagine": "https://images.stockx.com/images/Jordan-Gel-Lyte-808.jpg",
    "link": "https://stockx.com/jordan-gel-lyte-808"
  },
  {
    "modello": "nike chuck taylor 809",
    "nome": "Nike Chuck Taylor 809",
    "sku": "NICH0809",
    "prezzo": "390",
    "immagine": "https://images.stockx.com/images/Nike-Chuck Taylor-809.jpg",
    "link": "https://stockx.com/nike-chuck taylor-809"
  },
  {
    "modello": "jordan retro 810",
    "nome": "Jordan Retro 810",
    "sku": "JORE0810",
    "prezzo": "140",
    "immagine": "https://images.stockx.com/images/Jordan-Retro-810.jpg",
    "link": "https://stockx.com/jordan-retro-810"
  },
  {
    "modello": "asics retro 811",
    "nome": "Asics Retro 811",
    "sku": "ASRE0811",
    "prezzo": "143",
    "immagine": "https://images.stockx.com/images/Asics-Retro-811.jpg",
    "link": "https://stockx.com/asics-retro-811"
  },
  {
    "modello": "reebok retro 812",
    "nome": "Reebok Retro 812",
    "sku": "RERE0812",
    "prezzo": "286",
    "immagine": "https://images.stockx.com/images/Reebok-Retro-812.jpg",
    "link": "https://stockx.com/reebok-retro-812"
  },
  {
    "modello": "jordan gel-lyte 813",
    "nome": "Jordan Gel-Lyte 813",
    "sku": "JOGE0813",
    "prezzo": "235",
    "immagine": "https://images.stockx.com/images/Jordan-Gel-Lyte-813.jpg",
    "link": "https://stockx.com/jordan-gel-lyte-813"
  },
  {
    "modello": "adidas dunk 814",
    "nome": "Adidas Dunk 814",
    "sku": "ADDU0814",
    "prezzo": "181",
    "immagine": "https://images.stockx.com/images/Adidas-Dunk-814.jpg",
    "link": "https://stockx.com/adidas-dunk-814"
  },
  {
    "modello": "asics retro 815",
    "nome": "Asics Retro 815",
    "sku": "ASRE0815",
    "prezzo": "336",
    "immagine": "https://images.stockx.com/images/Asics-Retro-815.jpg",
    "link": "https://stockx.com/asics-retro-815"
  },
  {
    "modello": "adidas gel-lyte 816",
    "nome": "Adidas Gel-Lyte 816",
    "sku": "ADGE0816",
    "prezzo": "308",
    "immagine": "https://images.stockx.com/images/Adidas-Gel-Lyte-816.jpg",
    "link": "https://stockx.com/adidas-gel-lyte-816"
  },
  {
    "modello": "converse yeezy 817",
    "nome": "Converse Yeezy 817",
    "sku": "COYE0817",
    "prezzo": "301",
    "immagine": "https://images.stockx.com/images/Converse-Yeezy-817.jpg",
    "link": "https://stockx.com/converse-yeezy-817"
  },
  {
    "modello": "converse air max 818",
    "nome": "Converse Air Max 818",
    "sku": "COAI0818",
    "prezzo": "89",
    "immagine": "https://images.stockx.com/images/Converse-Air Max-818.jpg",
    "link": "https://stockx.com/converse-air max-818"
  },
  {
    "modello": "asics gel-lyte 819",
    "nome": "Asics Gel-Lyte 819",
    "sku": "ASGE0819",
    "prezzo": "245",
    "immagine": "https://images.stockx.com/images/Asics-Gel-Lyte-819.jpg",
    "link": "https://stockx.com/asics-gel-lyte-819"
  },
  {
    "modello": "reebok yeezy 820",
    "nome": "Reebok Yeezy 820",
    "sku": "REYE0820",
    "prezzo": "212",
    "immagine": "https://images.stockx.com/images/Reebok-Yeezy-820.jpg",
    "link": "https://stockx.com/reebok-yeezy-820"
  },
  {
    "modello": "converse classic 821",
    "nome": "Converse Classic 821",
    "sku": "COCL0821",
    "prezzo": "384",
    "immagine": "https://images.stockx.com/images/Converse-Classic-821.jpg",
    "link": "https://stockx.com/converse-classic-821"
  },
  {
    "modello": "asics ultra boost 822",
    "nome": "Asics Ultra Boost 822",
    "sku": "ASUL0822",
    "prezzo": "239",
    "immagine": "https://images.stockx.com/images/Asics-Ultra Boost-822.jpg",
    "link": "https://stockx.com/asics-ultra boost-822"
  },
  {
    "modello": "jordan retro 823",
    "nome": "Jordan Retro 823",
    "sku": "JORE0823",
    "prezzo": "215",
    "immagine": "https://images.stockx.com/images/Jordan-Retro-823.jpg",
    "link": "https://stockx.com/jordan-retro-823"
  },
  {
    "modello": "new balance gel-lyte 824",
    "nome": "New Balance Gel-Lyte 824",
    "sku": "NEGE0824",
    "prezzo": "165",
    "immagine": "https://images.stockx.com/images/New Balance-Gel-Lyte-824.jpg",
    "link": "https://stockx.com/new balance-gel-lyte-824"
  },
  {
    "modello": "converse gel-lyte 825",
    "nome": "Converse Gel-Lyte 825",
    "sku": "COGE0825",
    "prezzo": "304",
    "immagine": "https://images.stockx.com/images/Converse-Gel-Lyte-825.jpg",
    "link": "https://stockx.com/converse-gel-lyte-825"
  },
  {
    "modello": "new balance classic 826",
    "nome": "New Balance Classic 826",
    "sku": "NECL0826",
    "prezzo": "231",
    "immagine": "https://images.stockx.com/images/New Balance-Classic-826.jpg",
    "link": "https://stockx.com/new balance-classic-826"
  },
  {
    "modello": "puma dunk 827",
    "nome": "Puma Dunk 827",
    "sku": "PUDU0827",
    "prezzo": "397",
    "immagine": "https://images.stockx.com/images/Puma-Dunk-827.jpg",
    "link": "https://stockx.com/puma-dunk-827"
  },
  {
    "modello": "jordan yeezy 828",
    "nome": "Jordan Yeezy 828",
    "sku": "JOYE0828",
    "prezzo": "324",
    "immagine": "https://images.stockx.com/images/Jordan-Yeezy-828.jpg",
    "link": "https://stockx.com/jordan-yeezy-828"
  },
  {
    "modello": "puma chuck taylor 829",
    "nome": "Puma Chuck Taylor 829",
    "sku": "PUCH0829",
    "prezzo": "349",
    "immagine": "https://images.stockx.com/images/Puma-Chuck Taylor-829.jpg",
    "link": "https://stockx.com/puma-chuck taylor-829"
  },
  {
    "modello": "new balance air max 830",
    "nome": "New Balance Air Max 830",
    "sku": "NEAI0830",
    "prezzo": "207",
    "immagine": "https://images.stockx.com/images/New Balance-Air Max-830.jpg",
    "link": "https://stockx.com/new balance-air max-830"
  },
  {
    "modello": "jordan air max 831",
    "nome": "Jordan Air Max 831",
    "sku": "JOAI0831",
    "prezzo": "85",
    "immagine": "https://images.stockx.com/images/Jordan-Air Max-831.jpg",
    "link": "https://stockx.com/jordan-air max-831"
  },
  {
    "modello": "reebok classic 832",
    "nome": "Reebok Classic 832",
    "sku": "RECL0832",
    "prezzo": "204",
    "immagine": "https://images.stockx.com/images/Reebok-Classic-832.jpg",
    "link": "https://stockx.com/reebok-classic-832"
  },
  {
    "modello": "new balance yeezy 833",
    "nome": "New Balance Yeezy 833",
    "sku": "NEYE0833",
    "prezzo": "134",
    "immagine": "https://images.stockx.com/images/New Balance-Yeezy-833.jpg",
    "link": "https://stockx.com/new balance-yeezy-833"
  },
  {
    "modello": "jordan air max 834",
    "nome": "Jordan Air Max 834",
    "sku": "JOAI0834",
    "prezzo": "344",
    "immagine": "https://images.stockx.com/images/Jordan-Air Max-834.jpg",
    "link": "https://stockx.com/jordan-air max-834"
  },
  {
    "modello": "converse dunk 835",
    "nome": "Converse Dunk 835",
    "sku": "CODU0835",
    "prezzo": "151",
    "immagine": "https://images.stockx.com/images/Converse-Dunk-835.jpg",
    "link": "https://stockx.com/converse-dunk-835"
  },
  {
    "modello": "adidas dunk 836",
    "nome": "Adidas Dunk 836",
    "sku": "ADDU0836",
    "prezzo": "271",
    "immagine": "https://images.stockx.com/images/Adidas-Dunk-836.jpg",
    "link": "https://stockx.com/adidas-dunk-836"
  },
  {
    "modello": "converse gel-lyte 837",
    "nome": "Converse Gel-Lyte 837",
    "sku": "COGE0837",
    "prezzo": "351",
    "immagine": "https://images.stockx.com/images/Converse-Gel-Lyte-837.jpg",
    "link": "https://stockx.com/converse-gel-lyte-837"
  },
  {
    "modello": "adidas retro 838",
    "nome": "Adidas Retro 838",
    "sku": "ADRE0838",
    "prezzo": "199",
    "immagine": "https://images.stockx.com/images/Adidas-Retro-838.jpg",
    "link": "https://stockx.com/adidas-retro-838"
  },
  {
    "modello": "adidas dunk 839",
    "nome": "Adidas Dunk 839",
    "sku": "ADDU0839",
    "prezzo": "125",
    "immagine": "https://images.stockx.com/images/Adidas-Dunk-839.jpg",
    "link": "https://stockx.com/adidas-dunk-839"
  },
  {
    "modello": "jordan gel-lyte 840",
    "nome": "Jordan Gel-Lyte 840",
    "sku": "JOGE0840",
    "prezzo": "365",
    "immagine": "https://images.stockx.com/images/Jordan-Gel-Lyte-840.jpg",
    "link": "https://stockx.com/jordan-gel-lyte-840"
  },
  {
    "modello": "reebok chuck taylor 841",
    "nome": "Reebok Chuck Taylor 841",
    "sku": "RECH0841",
    "prezzo": "381",
    "immagine": "https://images.stockx.com/images/Reebok-Chuck Taylor-841.jpg",
    "link": "https://stockx.com/reebok-chuck taylor-841"
  },
  {
    "modello": "jordan yeezy 842",
    "nome": "Jordan Yeezy 842",
    "sku": "JOYE0842",
    "prezzo": "227",
    "immagine": "https://images.stockx.com/images/Jordan-Yeezy-842.jpg",
    "link": "https://stockx.com/jordan-yeezy-842"
  },
  {
    "modello": "converse chuck taylor 843",
    "nome": "Converse Chuck Taylor 843",
    "sku": "COCH0843",
    "prezzo": "195",
    "immagine": "https://images.stockx.com/images/Converse-Chuck Taylor-843.jpg",
    "link": "https://stockx.com/converse-chuck taylor-843"
  },
  {
    "modello": "adidas ultra boost 844",
    "nome": "Adidas Ultra Boost 844",
    "sku": "ADUL0844",
    "prezzo": "173",
    "immagine": "https://images.stockx.com/images/Adidas-Ultra Boost-844.jpg",
    "link": "https://stockx.com/adidas-ultra boost-844"
  },
  {
    "modello": "jordan air max 845",
    "nome": "Jordan Air Max 845",
    "sku": "JOAI0845",
    "prezzo": "322",
    "immagine": "https://images.stockx.com/images/Jordan-Air Max-845.jpg",
    "link": "https://stockx.com/jordan-air max-845"
  },
  {
    "modello": "adidas dunk 846",
    "nome": "Adidas Dunk 846",
    "sku": "ADDU0846",
    "prezzo": "354",
    "immagine": "https://images.stockx.com/images/Adidas-Dunk-846.jpg",
    "link": "https://stockx.com/adidas-dunk-846"
  },
  {
    "modello": "adidas classic 847",
    "nome": "Adidas Classic 847",
    "sku": "ADCL0847",
    "prezzo": "378",
    "immagine": "https://images.stockx.com/images/Adidas-Classic-847.jpg",
    "link": "https://stockx.com/adidas-classic-847"
  },
  {
    "modello": "converse chuck taylor 848",
    "nome": "Converse Chuck Taylor 848",
    "sku": "COCH0848",
    "prezzo": "200",
    "immagine": "https://images.stockx.com/images/Converse-Chuck Taylor-848.jpg",
    "link": "https://stockx.com/converse-chuck taylor-848"
  },
  {
    "modello": "new balance dunk 849",
    "nome": "New Balance Dunk 849",
    "sku": "NEDU0849",
    "prezzo": "113",
    "immagine": "https://images.stockx.com/images/New Balance-Dunk-849.jpg",
    "link": "https://stockx.com/new balance-dunk-849"
  },
  {
    "modello": "new balance retro 850",
    "nome": "New Balance Retro 850",
    "sku": "NERE0850",
    "prezzo": "280",
    "immagine": "https://images.stockx.com/images/New Balance-Retro-850.jpg",
    "link": "https://stockx.com/new balance-retro-850"
  },
  {
    "modello": "nike ultra boost 851",
    "nome": "Nike Ultra Boost 851",
    "sku": "NIUL0851",
    "prezzo": "263",
    "immagine": "https://images.stockx.com/images/Nike-Ultra Boost-851.jpg",
    "link": "https://stockx.com/nike-ultra boost-851"
  },
  {
    "modello": "reebok ultra boost 852",
    "nome": "Reebok Ultra Boost 852",
    "sku": "REUL0852",
    "prezzo": "172",
    "immagine": "https://images.stockx.com/images/Reebok-Ultra Boost-852.jpg",
    "link": "https://stockx.com/reebok-ultra boost-852"
  },
  {
    "modello": "nike chuck taylor 853",
    "nome": "Nike Chuck Taylor 853",
    "sku": "NICH0853",
    "prezzo": "288",
    "immagine": "https://images.stockx.com/images/Nike-Chuck Taylor-853.jpg",
    "link": "https://stockx.com/nike-chuck taylor-853"
  },
  {
    "modello": "asics dunk 854",
    "nome": "Asics Dunk 854",
    "sku": "ASDU0854",
    "prezzo": "376",
    "immagine": "https://images.stockx.com/images/Asics-Dunk-854.jpg",
    "link": "https://stockx.com/asics-dunk-854"
  },
  {
    "modello": "converse yeezy 855",
    "nome": "Converse Yeezy 855",
    "sku": "COYE0855",
    "prezzo": "364",
    "immagine": "https://images.stockx.com/images/Converse-Yeezy-855.jpg",
    "link": "https://stockx.com/converse-yeezy-855"
  },
  {
    "modello": "nike retro 856",
    "nome": "Nike Retro 856",
    "sku": "NIRE0856",
    "prezzo": "86",
    "immagine": "https://images.stockx.com/images/Nike-Retro-856.jpg",
    "link": "https://stockx.com/nike-retro-856"
  },
  {
    "modello": "nike yeezy 857",
    "nome": "Nike Yeezy 857",
    "sku": "NIYE0857",
    "prezzo": "342",
    "immagine": "https://images.stockx.com/images/Nike-Yeezy-857.jpg",
    "link": "https://stockx.com/nike-yeezy-857"
  },
  {
    "modello": "nike classic 858",
    "nome": "Nike Classic 858",
    "sku": "NICL0858",
    "prezzo": "114",
    "immagine": "https://images.stockx.com/images/Nike-Classic-858.jpg",
    "link": "https://stockx.com/nike-classic-858"
  },
  {
    "modello": "asics classic 859",
    "nome": "Asics Classic 859",
    "sku": "ASCL0859",
    "prezzo": "263",
    "immagine": "https://images.stockx.com/images/Asics-Classic-859.jpg",
    "link": "https://stockx.com/asics-classic-859"
  },
  {
    "modello": "converse yeezy 860",
    "nome": "Converse Yeezy 860",
    "sku": "COYE0860",
    "prezzo": "363",
    "immagine": "https://images.stockx.com/images/Converse-Yeezy-860.jpg",
    "link": "https://stockx.com/converse-yeezy-860"
  },
  {
    "modello": "converse ultra boost 861",
    "nome": "Converse Ultra Boost 861",
    "sku": "COUL0861",
    "prezzo": "260",
    "immagine": "https://images.stockx.com/images/Converse-Ultra Boost-861.jpg",
    "link": "https://stockx.com/converse-ultra boost-861"
  },
  {
    "modello": "adidas air max 862",
    "nome": "Adidas Air Max 862",
    "sku": "ADAI0862",
    "prezzo": "165",
    "immagine": "https://images.stockx.com/images/Adidas-Air Max-862.jpg",
    "link": "https://stockx.com/adidas-air max-862"
  },
  {
    "modello": "reebok chuck taylor 863",
    "nome": "Reebok Chuck Taylor 863",
    "sku": "RECH0863",
    "prezzo": "100",
    "immagine": "https://images.stockx.com/images/Reebok-Chuck Taylor-863.jpg",
    "link": "https://stockx.com/reebok-chuck taylor-863"
  },
  {
    "modello": "reebok air max 864",
    "nome": "Reebok Air Max 864",
    "sku": "REAI0864",
    "prezzo": "400",
    "immagine": "https://images.stockx.com/images/Reebok-Air Max-864.jpg",
    "link": "https://stockx.com/reebok-air max-864"
  },
  {
    "modello": "nike dunk 865",
    "nome": "Nike Dunk 865",
    "sku": "NIDU0865",
    "prezzo": "211",
    "immagine": "https://images.stockx.com/images/Nike-Dunk-865.jpg",
    "link": "https://stockx.com/nike-dunk-865"
  },
  {
    "modello": "puma chuck taylor 866",
    "nome": "Puma Chuck Taylor 866",
    "sku": "PUCH0866",
    "prezzo": "140",
    "immagine": "https://images.stockx.com/images/Puma-Chuck Taylor-866.jpg",
    "link": "https://stockx.com/puma-chuck taylor-866"
  },
  {
    "modello": "asics yeezy 867",
    "nome": "Asics Yeezy 867",
    "sku": "ASYE0867",
    "prezzo": "399",
    "immagine": "https://images.stockx.com/images/Asics-Yeezy-867.jpg",
    "link": "https://stockx.com/asics-yeezy-867"
  },
  {
    "modello": "adidas ultra boost 868",
    "nome": "Adidas Ultra Boost 868",
    "sku": "ADUL0868",
    "prezzo": "144",
    "immagine": "https://images.stockx.com/images/Adidas-Ultra Boost-868.jpg",
    "link": "https://stockx.com/adidas-ultra boost-868"
  },
  {
    "modello": "reebok air max 869",
    "nome": "Reebok Air Max 869",
    "sku": "REAI0869",
    "prezzo": "233",
    "immagine": "https://images.stockx.com/images/Reebok-Air Max-869.jpg",
    "link": "https://stockx.com/reebok-air max-869"
  },
  {
    "modello": "reebok classic 870",
    "nome": "Reebok Classic 870",
    "sku": "RECL0870",
    "prezzo": "216",
    "immagine": "https://images.stockx.com/images/Reebok-Classic-870.jpg",
    "link": "https://stockx.com/reebok-classic-870"
  },
  {
    "modello": "puma ultra boost 871",
    "nome": "Puma Ultra Boost 871",
    "sku": "PUUL0871",
    "prezzo": "82",
    "immagine": "https://images.stockx.com/images/Puma-Ultra Boost-871.jpg",
    "link": "https://stockx.com/puma-ultra boost-871"
  },
  {
    "modello": "nike air max 872",
    "nome": "Nike Air Max 872",
    "sku": "NIAI0872",
    "prezzo": "163",
    "immagine": "https://images.stockx.com/images/Nike-Air Max-872.jpg",
    "link": "https://stockx.com/nike-air max-872"
  },
  {
    "modello": "adidas classic 873",
    "nome": "Adidas Classic 873",
    "sku": "ADCL0873",
    "prezzo": "151",
    "immagine": "https://images.stockx.com/images/Adidas-Classic-873.jpg",
    "link": "https://stockx.com/adidas-classic-873"
  },
  {
    "modello": "adidas classic 874",
    "nome": "Adidas Classic 874",
    "sku": "ADCL0874",
    "prezzo": "352",
    "immagine": "https://images.stockx.com/images/Adidas-Classic-874.jpg",
    "link": "https://stockx.com/adidas-classic-874"
  },
  {
    "modello": "asics dunk 875",
    "nome": "Asics Dunk 875",
    "sku": "ASDU0875",
    "prezzo": "391",
    "immagine": "https://images.stockx.com/images/Asics-Dunk-875.jpg",
    "link": "https://stockx.com/asics-dunk-875"
  },
  {
    "modello": "new balance chuck taylor 876",
    "nome": "New Balance Chuck Taylor 876",
    "sku": "NECH0876",
    "prezzo": "384",
    "immagine": "https://images.stockx.com/images/New Balance-Chuck Taylor-876.jpg",
    "link": "https://stockx.com/new balance-chuck taylor-876"
  },
  {
    "modello": "adidas dunk 877",
    "nome": "Adidas Dunk 877",
    "sku": "ADDU0877",
    "prezzo": "118",
    "immagine": "https://images.stockx.com/images/Adidas-Dunk-877.jpg",
    "link": "https://stockx.com/adidas-dunk-877"
  },
  {
    "modello": "reebok air max 878",
    "nome": "Reebok Air Max 878",
    "sku": "REAI0878",
    "prezzo": "164",
    "immagine": "https://images.stockx.com/images/Reebok-Air Max-878.jpg",
    "link": "https://stockx.com/reebok-air max-878"
  },
  {
    "modello": "converse air max 879",
    "nome": "Converse Air Max 879",
    "sku": "COAI0879",
    "prezzo": "382",
    "immagine": "https://images.stockx.com/images/Converse-Air Max-879.jpg",
    "link": "https://stockx.com/converse-air max-879"
  },
  {
    "modello": "jordan yeezy 880",
    "nome": "Jordan Yeezy 880",
    "sku": "JOYE0880",
    "prezzo": "293",
    "immagine": "https://images.stockx.com/images/Jordan-Yeezy-880.jpg",
    "link": "https://stockx.com/jordan-yeezy-880"
  },
  {
    "modello": "adidas yeezy 881",
    "nome": "Adidas Yeezy 881",
    "sku": "ADYE0881",
    "prezzo": "129",
    "immagine": "https://images.stockx.com/images/Adidas-Yeezy-881.jpg",
    "link": "https://stockx.com/adidas-yeezy-881"
  },
  {
    "modello": "new balance retro 882",
    "nome": "New Balance Retro 882",
    "sku": "NERE0882",
    "prezzo": "165",
    "immagine": "https://images.stockx.com/images/New Balance-Retro-882.jpg",
    "link": "https://stockx.com/new balance-retro-882"
  },
  {
    "modello": "new balance yeezy 883",
    "nome": "New Balance Yeezy 883",
    "sku": "NEYE0883",
    "prezzo": "83",
    "immagine": "https://images.stockx.com/images/New Balance-Yeezy-883.jpg",
    "link": "https://stockx.com/new balance-yeezy-883"
  },
  {
    "modello": "converse classic 884",
    "nome": "Converse Classic 884",
    "sku": "COCL0884",
    "prezzo": "162",
    "immagine": "https://images.stockx.com/images/Converse-Classic-884.jpg",
    "link": "https://stockx.com/converse-classic-884"
  },
  {
    "modello": "jordan yeezy 885",
    "nome": "Jordan Yeezy 885",
    "sku": "JOYE0885",
    "prezzo": "254",
    "immagine": "https://images.stockx.com/images/Jordan-Yeezy-885.jpg",
    "link": "https://stockx.com/jordan-yeezy-885"
  },
  {
    "modello": "adidas ultra boost 886",
    "nome": "Adidas Ultra Boost 886",
    "sku": "ADUL0886",
    "prezzo": "150",
    "immagine": "https://images.stockx.com/images/Adidas-Ultra Boost-886.jpg",
    "link": "https://stockx.com/adidas-ultra boost-886"
  },
  {
    "modello": "converse chuck taylor 887",
    "nome": "Converse Chuck Taylor 887",
    "sku": "COCH0887",
    "prezzo": "235",
    "immagine": "https://images.stockx.com/images/Converse-Chuck Taylor-887.jpg",
    "link": "https://stockx.com/converse-chuck taylor-887"
  },
  {
    "modello": "new balance retro 888",
    "nome": "New Balance Retro 888",
    "sku": "NERE0888",
    "prezzo": "128",
    "immagine": "https://images.stockx.com/images/New Balance-Retro-888.jpg",
    "link": "https://stockx.com/new balance-retro-888"
  },
  {
    "modello": "adidas dunk 889",
    "nome": "Adidas Dunk 889",
    "sku": "ADDU0889",
    "prezzo": "181",
    "immagine": "https://images.stockx.com/images/Adidas-Dunk-889.jpg",
    "link": "https://stockx.com/adidas-dunk-889"
  },
  {
    "modello": "puma dunk 890",
    "nome": "Puma Dunk 890",
    "sku": "PUDU0890",
    "prezzo": "316",
    "immagine": "https://images.stockx.com/images/Puma-Dunk-890.jpg",
    "link": "https://stockx.com/puma-dunk-890"
  },
  {
    "modello": "nike classic 891",
    "nome": "Nike Classic 891",
    "sku": "NICL0891",
    "prezzo": "303",
    "immagine": "https://images.stockx.com/images/Nike-Classic-891.jpg",
    "link": "https://stockx.com/nike-classic-891"
  },
  {
    "modello": "adidas air max 892",
    "nome": "Adidas Air Max 892",
    "sku": "ADAI0892",
    "prezzo": "364",
    "immagine": "https://images.stockx.com/images/Adidas-Air Max-892.jpg",
    "link": "https://stockx.com/adidas-air max-892"
  },
  {
    "modello": "new balance chuck taylor 893",
    "nome": "New Balance Chuck Taylor 893",
    "sku": "NECH0893",
    "prezzo": "265",
    "immagine": "https://images.stockx.com/images/New Balance-Chuck Taylor-893.jpg",
    "link": "https://stockx.com/new balance-chuck taylor-893"
  },
  {
    "modello": "new balance classic 894",
    "nome": "New Balance Classic 894",
    "sku": "NECL0894",
    "prezzo": "272",
    "immagine": "https://images.stockx.com/images/New Balance-Classic-894.jpg",
    "link": "https://stockx.com/new balance-classic-894"
  },
  {
    "modello": "puma classic 895",
    "nome": "Puma Classic 895",
    "sku": "PUCL0895",
    "prezzo": "235",
    "immagine": "https://images.stockx.com/images/Puma-Classic-895.jpg",
    "link": "https://stockx.com/puma-classic-895"
  },
  {
    "modello": "nike air max 896",
    "nome": "Nike Air Max 896",
    "sku": "NIAI0896",
    "prezzo": "256",
    "immagine": "https://images.stockx.com/images/Nike-Air Max-896.jpg",
    "link": "https://stockx.com/nike-air max-896"
  },
  {
    "modello": "asics classic 897",
    "nome": "Asics Classic 897",
    "sku": "ASCL0897",
    "prezzo": "350",
    "immagine": "https://images.stockx.com/images/Asics-Classic-897.jpg",
    "link": "https://stockx.com/asics-classic-897"
  },
  {
    "modello": "jordan gel-lyte 898",
    "nome": "Jordan Gel-Lyte 898",
    "sku": "JOGE0898",
    "prezzo": "351",
    "immagine": "https://images.stockx.com/images/Jordan-Gel-Lyte-898.jpg",
    "link": "https://stockx.com/jordan-gel-lyte-898"
  },
  {
    "modello": "jordan yeezy 899",
    "nome": "Jordan Yeezy 899",
    "sku": "JOYE0899",
    "prezzo": "152",
    "immagine": "https://images.stockx.com/images/Jordan-Yeezy-899.jpg",
    "link": "https://stockx.com/jordan-yeezy-899"
  },
  {
    "modello": "converse ultra boost 900",
    "nome": "Converse Ultra Boost 900",
    "sku": "COUL0900",
    "prezzo": "96",
    "immagine": "https://images.stockx.com/images/Converse-Ultra Boost-900.jpg",
    "link": "https://stockx.com/converse-ultra boost-900"
  },
  {
    "modello": "converse classic 901",
    "nome": "Converse Classic 901",
    "sku": "COCL0901",
    "prezzo": "350",
    "immagine": "https://images.stockx.com/images/Converse-Classic-901.jpg",
    "link": "https://stockx.com/converse-classic-901"
  },
  {
    "modello": "converse gel-lyte 902",
    "nome": "Converse Gel-Lyte 902",
    "sku": "COGE0902",
    "prezzo": "221",
    "immagine": "https://images.stockx.com/images/Converse-Gel-Lyte-902.jpg",
    "link": "https://stockx.com/converse-gel-lyte-902"
  },
  {
    "modello": "new balance gel-lyte 903",
    "nome": "New Balance Gel-Lyte 903",
    "sku": "NEGE0903",
    "prezzo": "231",
    "immagine": "https://images.stockx.com/images/New Balance-Gel-Lyte-903.jpg",
    "link": "https://stockx.com/new balance-gel-lyte-903"
  },
  {
    "modello": "asics classic 904",
    "nome": "Asics Classic 904",
    "sku": "ASCL0904",
    "prezzo": "85",
    "immagine": "https://images.stockx.com/images/Asics-Classic-904.jpg",
    "link": "https://stockx.com/asics-classic-904"
  },
  {
    "modello": "asics air max 905",
    "nome": "Asics Air Max 905",
    "sku": "ASAI0905",
    "prezzo": "344",
    "immagine": "https://images.stockx.com/images/Asics-Air Max-905.jpg",
    "link": "https://stockx.com/asics-air max-905"
  },
  {
    "modello": "puma retro 906",
    "nome": "Puma Retro 906",
    "sku": "PURE0906",
    "prezzo": "352",
    "immagine": "https://images.stockx.com/images/Puma-Retro-906.jpg",
    "link": "https://stockx.com/puma-retro-906"
  },
  {
    "modello": "reebok yeezy 907",
    "nome": "Reebok Yeezy 907",
    "sku": "REYE0907",
    "prezzo": "94",
    "immagine": "https://images.stockx.com/images/Reebok-Yeezy-907.jpg",
    "link": "https://stockx.com/reebok-yeezy-907"
  },
  {
    "modello": "reebok air max 908",
    "nome": "Reebok Air Max 908",
    "sku": "REAI0908",
    "prezzo": "279",
    "immagine": "https://images.stockx.com/images/Reebok-Air Max-908.jpg",
    "link": "https://stockx.com/reebok-air max-908"
  },
  {
    "modello": "new balance dunk 909",
    "nome": "New Balance Dunk 909",
    "sku": "NEDU0909",
    "prezzo": "297",
    "immagine": "https://images.stockx.com/images/New Balance-Dunk-909.jpg",
    "link": "https://stockx.com/new balance-dunk-909"
  },
  {
    "modello": "converse yeezy 910",
    "nome": "Converse Yeezy 910",
    "sku": "COYE0910",
    "prezzo": "345",
    "immagine": "https://images.stockx.com/images/Converse-Yeezy-910.jpg",
    "link": "https://stockx.com/converse-yeezy-910"
  },
  {
    "modello": "asics classic 911",
    "nome": "Asics Classic 911",
    "sku": "ASCL0911",
    "prezzo": "273",
    "immagine": "https://images.stockx.com/images/Asics-Classic-911.jpg",
    "link": "https://stockx.com/asics-classic-911"
  },
  {
    "modello": "asics chuck taylor 912",
    "nome": "Asics Chuck Taylor 912",
    "sku": "ASCH0912",
    "prezzo": "129",
    "immagine": "https://images.stockx.com/images/Asics-Chuck Taylor-912.jpg",
    "link": "https://stockx.com/asics-chuck taylor-912"
  },
  {
    "modello": "nike dunk 913",
    "nome": "Nike Dunk 913",
    "sku": "NIDU0913",
    "prezzo": "358",
    "immagine": "https://images.stockx.com/images/Nike-Dunk-913.jpg",
    "link": "https://stockx.com/nike-dunk-913"
  },
  {
    "modello": "reebok dunk 914",
    "nome": "Reebok Dunk 914",
    "sku": "REDU0914",
    "prezzo": "149",
    "immagine": "https://images.stockx.com/images/Reebok-Dunk-914.jpg",
    "link": "https://stockx.com/reebok-dunk-914"
  },
  {
    "modello": "jordan classic 915",
    "nome": "Jordan Classic 915",
    "sku": "JOCL0915",
    "prezzo": "151",
    "immagine": "https://images.stockx.com/images/Jordan-Classic-915.jpg",
    "link": "https://stockx.com/jordan-classic-915"
  },
  {
    "modello": "adidas yeezy 916",
    "nome": "Adidas Yeezy 916",
    "sku": "ADYE0916",
    "prezzo": "315",
    "immagine": "https://images.stockx.com/images/Adidas-Yeezy-916.jpg",
    "link": "https://stockx.com/adidas-yeezy-916"
  },
  {
    "modello": "nike gel-lyte 917",
    "nome": "Nike Gel-Lyte 917",
    "sku": "NIGE0917",
    "prezzo": "231",
    "immagine": "https://images.stockx.com/images/Nike-Gel-Lyte-917.jpg",
    "link": "https://stockx.com/nike-gel-lyte-917"
  },
  {
    "modello": "nike classic 918",
    "nome": "Nike Classic 918",
    "sku": "NICL0918",
    "prezzo": "230",
    "immagine": "https://images.stockx.com/images/Nike-Classic-918.jpg",
    "link": "https://stockx.com/nike-classic-918"
  },
  {
    "modello": "converse yeezy 919",
    "nome": "Converse Yeezy 919",
    "sku": "COYE0919",
    "prezzo": "254",
    "immagine": "https://images.stockx.com/images/Converse-Yeezy-919.jpg",
    "link": "https://stockx.com/converse-yeezy-919"
  },
  {
    "modello": "jordan gel-lyte 920",
    "nome": "Jordan Gel-Lyte 920",
    "sku": "JOGE0920",
    "prezzo": "97",
    "immagine": "https://images.stockx.com/images/Jordan-Gel-Lyte-920.jpg",
    "link": "https://stockx.com/jordan-gel-lyte-920"
  },
  {
    "modello": "reebok gel-lyte 921",
    "nome": "Reebok Gel-Lyte 921",
    "sku": "REGE0921",
    "prezzo": "375",
    "immagine": "https://images.stockx.com/images/Reebok-Gel-Lyte-921.jpg",
    "link": "https://stockx.com/reebok-gel-lyte-921"
  },
  {
    "modello": "new balance gel-lyte 922",
    "nome": "New Balance Gel-Lyte 922",
    "sku": "NEGE0922",
    "prezzo": "100",
    "immagine": "https://images.stockx.com/images/New Balance-Gel-Lyte-922.jpg",
    "link": "https://stockx.com/new balance-gel-lyte-922"
  },
  {
    "modello": "converse classic 923",
    "nome": "Converse Classic 923",
    "sku": "COCL0923",
    "prezzo": "174",
    "immagine": "https://images.stockx.com/images/Converse-Classic-923.jpg",
    "link": "https://stockx.com/converse-classic-923"
  },
  {
    "modello": "converse yeezy 924",
    "nome": "Converse Yeezy 924",
    "sku": "COYE0924",
    "prezzo": "319",
    "immagine": "https://images.stockx.com/images/Converse-Yeezy-924.jpg",
    "link": "https://stockx.com/converse-yeezy-924"
  },
  {
    "modello": "puma ultra boost 925",
    "nome": "Puma Ultra Boost 925",
    "sku": "PUUL0925",
    "prezzo": "229",
    "immagine": "https://images.stockx.com/images/Puma-Ultra Boost-925.jpg",
    "link": "https://stockx.com/puma-ultra boost-925"
  },
  {
    "modello": "asics air max 926",
    "nome": "Asics Air Max 926",
    "sku": "ASAI0926",
    "prezzo": "378",
    "immagine": "https://images.stockx.com/images/Asics-Air Max-926.jpg",
    "link": "https://stockx.com/asics-air max-926"
  },
  {
    "modello": "puma gel-lyte 927",
    "nome": "Puma Gel-Lyte 927",
    "sku": "PUGE0927",
    "prezzo": "239",
    "immagine": "https://images.stockx.com/images/Puma-Gel-Lyte-927.jpg",
    "link": "https://stockx.com/puma-gel-lyte-927"
  },
  {
    "modello": "new balance dunk 928",
    "nome": "New Balance Dunk 928",
    "sku": "NEDU0928",
    "prezzo": "213",
    "immagine": "https://images.stockx.com/images/New Balance-Dunk-928.jpg",
    "link": "https://stockx.com/new balance-dunk-928"
  },
  {
    "modello": "new balance gel-lyte 929",
    "nome": "New Balance Gel-Lyte 929",
    "sku": "NEGE0929",
    "prezzo": "193",
    "immagine": "https://images.stockx.com/images/New Balance-Gel-Lyte-929.jpg",
    "link": "https://stockx.com/new balance-gel-lyte-929"
  },
  {
    "modello": "new balance gel-lyte 930",
    "nome": "New Balance Gel-Lyte 930",
    "sku": "NEGE0930",
    "prezzo": "262",
    "immagine": "https://images.stockx.com/images/New Balance-Gel-Lyte-930.jpg",
    "link": "https://stockx.com/new balance-gel-lyte-930"
  },
  {
    "modello": "nike gel-lyte 931",
    "nome": "Nike Gel-Lyte 931",
    "sku": "NIGE0931",
    "prezzo": "166",
    "immagine": "https://images.stockx.com/images/Nike-Gel-Lyte-931.jpg",
    "link": "https://stockx.com/nike-gel-lyte-931"
  },
  {
    "modello": "asics ultra boost 932",
    "nome": "Asics Ultra Boost 932",
    "sku": "ASUL0932",
    "prezzo": "394",
    "immagine": "https://images.stockx.com/images/Asics-Ultra Boost-932.jpg",
    "link": "https://stockx.com/asics-ultra boost-932"
  },
  {
    "modello": "asics yeezy 933",
    "nome": "Asics Yeezy 933",
    "sku": "ASYE0933",
    "prezzo": "234",
    "immagine": "https://images.stockx.com/images/Asics-Yeezy-933.jpg",
    "link": "https://stockx.com/asics-yeezy-933"
  },
  {
    "modello": "jordan classic 934",
    "nome": "Jordan Classic 934",
    "sku": "JOCL0934",
    "prezzo": "261",
    "immagine": "https://images.stockx.com/images/Jordan-Classic-934.jpg",
    "link": "https://stockx.com/jordan-classic-934"
  },
  {
    "modello": "reebok retro 935",
    "nome": "Reebok Retro 935",
    "sku": "RERE0935",
    "prezzo": "192",
    "immagine": "https://images.stockx.com/images/Reebok-Retro-935.jpg",
    "link": "https://stockx.com/reebok-retro-935"
  },
  {
    "modello": "puma dunk 936",
    "nome": "Puma Dunk 936",
    "sku": "PUDU0936",
    "prezzo": "155",
    "immagine": "https://images.stockx.com/images/Puma-Dunk-936.jpg",
    "link": "https://stockx.com/puma-dunk-936"
  },
  {
    "modello": "asics ultra boost 937",
    "nome": "Asics Ultra Boost 937",
    "sku": "ASUL0937",
    "prezzo": "104",
    "immagine": "https://images.stockx.com/images/Asics-Ultra Boost-937.jpg",
    "link": "https://stockx.com/asics-ultra boost-937"
  },
  {
    "modello": "nike air max 938",
    "nome": "Nike Air Max 938",
    "sku": "NIAI0938",
    "prezzo": "154",
    "immagine": "https://images.stockx.com/images/Nike-Air Max-938.jpg",
    "link": "https://stockx.com/nike-air max-938"
  },
  {
    "modello": "jordan classic 939",
    "nome": "Jordan Classic 939",
    "sku": "JOCL0939",
    "prezzo": "93",
    "immagine": "https://images.stockx.com/images/Jordan-Classic-939.jpg",
    "link": "https://stockx.com/jordan-classic-939"
  },
  {
    "modello": "jordan gel-lyte 940",
    "nome": "Jordan Gel-Lyte 940",
    "sku": "JOGE0940",
    "prezzo": "356",
    "immagine": "https://images.stockx.com/images/Jordan-Gel-Lyte-940.jpg",
    "link": "https://stockx.com/jordan-gel-lyte-940"
  },
  {
    "modello": "adidas classic 941",
    "nome": "Adidas Classic 941",
    "sku": "ADCL0941",
    "prezzo": "179",
    "immagine": "https://images.stockx.com/images/Adidas-Classic-941.jpg",
    "link": "https://stockx.com/adidas-classic-941"
  },
  {
    "modello": "reebok air max 942",
    "nome": "Reebok Air Max 942",
    "sku": "REAI0942",
    "prezzo": "353",
    "immagine": "https://images.stockx.com/images/Reebok-Air Max-942.jpg",
    "link": "https://stockx.com/reebok-air max-942"
  },
  {
    "modello": "asics air max 943",
    "nome": "Asics Air Max 943",
    "sku": "ASAI0943",
    "prezzo": "105",
    "immagine": "https://images.stockx.com/images/Asics-Air Max-943.jpg",
    "link": "https://stockx.com/asics-air max-943"
  },
  {
    "modello": "converse classic 944",
    "nome": "Converse Classic 944",
    "sku": "COCL0944",
    "prezzo": "386",
    "immagine": "https://images.stockx.com/images/Converse-Classic-944.jpg",
    "link": "https://stockx.com/converse-classic-944"
  },
  {
    "modello": "reebok yeezy 945",
    "nome": "Reebok Yeezy 945",
    "sku": "REYE0945",
    "prezzo": "106",
    "immagine": "https://images.stockx.com/images/Reebok-Yeezy-945.jpg",
    "link": "https://stockx.com/reebok-yeezy-945"
  },
  {
    "modello": "adidas ultra boost 946",
    "nome": "Adidas Ultra Boost 946",
    "sku": "ADUL0946",
    "prezzo": "133",
    "immagine": "https://images.stockx.com/images/Adidas-Ultra Boost-946.jpg",
    "link": "https://stockx.com/adidas-ultra boost-946"
  },
  {
    "modello": "reebok yeezy 947",
    "nome": "Reebok Yeezy 947",
    "sku": "REYE0947",
    "prezzo": "362",
    "immagine": "https://images.stockx.com/images/Reebok-Yeezy-947.jpg",
    "link": "https://stockx.com/reebok-yeezy-947"
  },
  {
    "modello": "puma gel-lyte 948",
    "nome": "Puma Gel-Lyte 948",
    "sku": "PUGE0948",
    "prezzo": "235",
    "immagine": "https://images.stockx.com/images/Puma-Gel-Lyte-948.jpg",
    "link": "https://stockx.com/puma-gel-lyte-948"
  },
  {
    "modello": "nike yeezy 949",
    "nome": "Nike Yeezy 949",
    "sku": "NIYE0949",
    "prezzo": "270",
    "immagine": "https://images.stockx.com/images/Nike-Yeezy-949.jpg",
    "link": "https://stockx.com/nike-yeezy-949"
  },
  {
    "modello": "converse yeezy 950",
    "nome": "Converse Yeezy 950",
    "sku": "COYE0950",
    "prezzo": "102",
    "immagine": "https://images.stockx.com/images/Converse-Yeezy-950.jpg",
    "link": "https://stockx.com/converse-yeezy-950"
  },
  {
    "modello": "jordan gel-lyte 951",
    "nome": "Jordan Gel-Lyte 951",
    "sku": "JOGE0951",
    "prezzo": "206",
    "immagine": "https://images.stockx.com/images/Jordan-Gel-Lyte-951.jpg",
    "link": "https://stockx.com/jordan-gel-lyte-951"
  },
  {
    "modello": "jordan ultra boost 952",
    "nome": "Jordan Ultra Boost 952",
    "sku": "JOUL0952",
    "prezzo": "250",
    "immagine": "https://images.stockx.com/images/Jordan-Ultra Boost-952.jpg",
    "link": "https://stockx.com/jordan-ultra boost-952"
  },
  {
    "modello": "nike dunk 953",
    "nome": "Nike Dunk 953",
    "sku": "NIDU0953",
    "prezzo": "119",
    "immagine": "https://images.stockx.com/images/Nike-Dunk-953.jpg",
    "link": "https://stockx.com/nike-dunk-953"
  },
  {
    "modello": "reebok gel-lyte 954",
    "nome": "Reebok Gel-Lyte 954",
    "sku": "REGE0954",
    "prezzo": "250",
    "immagine": "https://images.stockx.com/images/Reebok-Gel-Lyte-954.jpg",
    "link": "https://stockx.com/reebok-gel-lyte-954"
  },
  {
    "modello": "puma yeezy 955",
    "nome": "Puma Yeezy 955",
    "sku": "PUYE0955",
    "prezzo": "118",
    "immagine": "https://images.stockx.com/images/Puma-Yeezy-955.jpg",
    "link": "https://stockx.com/puma-yeezy-955"
  },
  {
    "modello": "puma air max 956",
    "nome": "Puma Air Max 956",
    "sku": "PUAI0956",
    "prezzo": "376",
    "immagine": "https://images.stockx.com/images/Puma-Air Max-956.jpg",
    "link": "https://stockx.com/puma-air max-956"
  },
  {
    "modello": "asics classic 957",
    "nome": "Asics Classic 957",
    "sku": "ASCL0957",
    "prezzo": "235",
    "immagine": "https://images.stockx.com/images/Asics-Classic-957.jpg",
    "link": "https://stockx.com/asics-classic-957"
  },
  {
    "modello": "adidas yeezy 958",
    "nome": "Adidas Yeezy 958",
    "sku": "ADYE0958",
    "prezzo": "392",
    "immagine": "https://images.stockx.com/images/Adidas-Yeezy-958.jpg",
    "link": "https://stockx.com/adidas-yeezy-958"
  },
  {
    "modello": "converse retro 959",
    "nome": "Converse Retro 959",
    "sku": "CORE0959",
    "prezzo": "351",
    "immagine": "https://images.stockx.com/images/Converse-Retro-959.jpg",
    "link": "https://stockx.com/converse-retro-959"
  },
  {
    "modello": "reebok yeezy 960",
    "nome": "Reebok Yeezy 960",
    "sku": "REYE0960",
    "prezzo": "229",
    "immagine": "https://images.stockx.com/images/Reebok-Yeezy-960.jpg",
    "link": "https://stockx.com/reebok-yeezy-960"
  },
  {
    "modello": "asics ultra boost 961",
    "nome": "Asics Ultra Boost 961",
    "sku": "ASUL0961",
    "prezzo": "209",
    "immagine": "https://images.stockx.com/images/Asics-Ultra Boost-961.jpg",
    "link": "https://stockx.com/asics-ultra boost-961"
  },
  {
    "modello": "converse retro 962",
    "nome": "Converse Retro 962",
    "sku": "CORE0962",
    "prezzo": "136",
    "immagine": "https://images.stockx.com/images/Converse-Retro-962.jpg",
    "link": "https://stockx.com/converse-retro-962"
  },
  {
    "modello": "puma chuck taylor 963",
    "nome": "Puma Chuck Taylor 963",
    "sku": "PUCH0963",
    "prezzo": "218",
    "immagine": "https://images.stockx.com/images/Puma-Chuck Taylor-963.jpg",
    "link": "https://stockx.com/puma-chuck taylor-963"
  },
  {
    "modello": "jordan yeezy 964",
    "nome": "Jordan Yeezy 964",
    "sku": "JOYE0964",
    "prezzo": "171",
    "immagine": "https://images.stockx.com/images/Jordan-Yeezy-964.jpg",
    "link": "https://stockx.com/jordan-yeezy-964"
  },
  {
    "modello": "new balance air max 965",
    "nome": "New Balance Air Max 965",
    "sku": "NEAI0965",
    "prezzo": "389",
    "immagine": "https://images.stockx.com/images/New Balance-Air Max-965.jpg",
    "link": "https://stockx.com/new balance-air max-965"
  },
  {
    "modello": "asics air max 966",
    "nome": "Asics Air Max 966",
    "sku": "ASAI0966",
    "prezzo": "359",
    "immagine": "https://images.stockx.com/images/Asics-Air Max-966.jpg",
    "link": "https://stockx.com/asics-air max-966"
  },
  {
    "modello": "reebok yeezy 967",
    "nome": "Reebok Yeezy 967",
    "sku": "REYE0967",
    "prezzo": "366",
    "immagine": "https://images.stockx.com/images/Reebok-Yeezy-967.jpg",
    "link": "https://stockx.com/reebok-yeezy-967"
  },
  {
    "modello": "reebok air max 968",
    "nome": "Reebok Air Max 968",
    "sku": "REAI0968",
    "prezzo": "103",
    "immagine": "https://images.stockx.com/images/Reebok-Air Max-968.jpg",
    "link": "https://stockx.com/reebok-air max-968"
  },
  {
    "modello": "adidas chuck taylor 969",
    "nome": "Adidas Chuck Taylor 969",
    "sku": "ADCH0969",
    "prezzo": "151",
    "immagine": "https://images.stockx.com/images/Adidas-Chuck Taylor-969.jpg",
    "link": "https://stockx.com/adidas-chuck taylor-969"
  },
  {
    "modello": "adidas chuck taylor 970",
    "nome": "Adidas Chuck Taylor 970",
    "sku": "ADCH0970",
    "prezzo": "236",
    "immagine": "https://images.stockx.com/images/Adidas-Chuck Taylor-970.jpg",
    "link": "https://stockx.com/adidas-chuck taylor-970"
  },
  {
    "modello": "asics chuck taylor 971",
    "nome": "Asics Chuck Taylor 971",
    "sku": "ASCH0971",
    "prezzo": "163",
    "immagine": "https://images.stockx.com/images/Asics-Chuck Taylor-971.jpg",
    "link": "https://stockx.com/asics-chuck taylor-971"
  },
  {
    "modello": "reebok chuck taylor 972",
    "nome": "Reebok Chuck Taylor 972",
    "sku": "RECH0972",
    "prezzo": "367",
    "immagine": "https://images.stockx.com/images/Reebok-Chuck Taylor-972.jpg",
    "link": "https://stockx.com/reebok-chuck taylor-972"
  },
  {
    "modello": "jordan gel-lyte 973",
    "nome": "Jordan Gel-Lyte 973",
    "sku": "JOGE0973",
    "prezzo": "148",
    "immagine": "https://images.stockx.com/images/Jordan-Gel-Lyte-973.jpg",
    "link": "https://stockx.com/jordan-gel-lyte-973"
  },
  {
    "modello": "nike gel-lyte 974",
    "nome": "Nike Gel-Lyte 974",
    "sku": "NIGE0974",
    "prezzo": "132",
    "immagine": "https://images.stockx.com/images/Nike-Gel-Lyte-974.jpg",
    "link": "https://stockx.com/nike-gel-lyte-974"
  },
  {
    "modello": "nike gel-lyte 975",
    "nome": "Nike Gel-Lyte 975",
    "sku": "NIGE0975",
    "prezzo": "229",
    "immagine": "https://images.stockx.com/images/Nike-Gel-Lyte-975.jpg",
    "link": "https://stockx.com/nike-gel-lyte-975"
  },
  {
    "modello": "reebok classic 976",
    "nome": "Reebok Classic 976",
    "sku": "RECL0976",
    "prezzo": "250",
    "immagine": "https://images.stockx.com/images/Reebok-Classic-976.jpg",
    "link": "https://stockx.com/reebok-classic-976"
  },
  {
    "modello": "new balance air max 977",
    "nome": "New Balance Air Max 977",
    "sku": "NEAI0977",
    "prezzo": "202",
    "immagine": "https://images.stockx.com/images/New Balance-Air Max-977.jpg",
    "link": "https://stockx.com/new balance-air max-977"
  },
  {
    "modello": "asics ultra boost 978",
    "nome": "Asics Ultra Boost 978",
    "sku": "ASUL0978",
    "prezzo": "285",
    "immagine": "https://images.stockx.com/images/Asics-Ultra Boost-978.jpg",
    "link": "https://stockx.com/asics-ultra boost-978"
  },
  {
    "modello": "nike retro 979",
    "nome": "Nike Retro 979",
    "sku": "NIRE0979",
    "prezzo": "284",
    "immagine": "https://images.stockx.com/images/Nike-Retro-979.jpg",
    "link": "https://stockx.com/nike-retro-979"
  },
  {
    "modello": "nike dunk 980",
    "nome": "Nike Dunk 980",
    "sku": "NIDU0980",
    "prezzo": "313",
    "immagine": "https://images.stockx.com/images/Nike-Dunk-980.jpg",
    "link": "https://stockx.com/nike-dunk-980"
  },
  {
    "modello": "converse classic 981",
    "nome": "Converse Classic 981",
    "sku": "COCL0981",
    "prezzo": "365",
    "immagine": "https://images.stockx.com/images/Converse-Classic-981.jpg",
    "link": "https://stockx.com/converse-classic-981"
  },
  {
    "modello": "adidas retro 982",
    "nome": "Adidas Retro 982",
    "sku": "ADRE0982",
    "prezzo": "281",
    "immagine": "https://images.stockx.com/images/Adidas-Retro-982.jpg",
    "link": "https://stockx.com/adidas-retro-982"
  },
  {
    "modello": "jordan gel-lyte 983",
    "nome": "Jordan Gel-Lyte 983",
    "sku": "JOGE0983",
    "prezzo": "178",
    "immagine": "https://images.stockx.com/images/Jordan-Gel-Lyte-983.jpg",
    "link": "https://stockx.com/jordan-gel-lyte-983"
  },
  {
    "modello": "converse classic 984",
    "nome": "Converse Classic 984",
    "sku": "COCL0984",
    "prezzo": "225",
    "immagine": "https://images.stockx.com/images/Converse-Classic-984.jpg",
    "link": "https://stockx.com/converse-classic-984"
  },
  {
    "modello": "jordan dunk 985",
    "nome": "Jordan Dunk 985",
    "sku": "JODU0985",
    "prezzo": "304",
    "immagine": "https://images.stockx.com/images/Jordan-Dunk-985.jpg",
    "link": "https://stockx.com/jordan-dunk-985"
  },
  {
    "modello": "converse chuck taylor 986",
    "nome": "Converse Chuck Taylor 986",
    "sku": "COCH0986",
    "prezzo": "278",
    "immagine": "https://images.stockx.com/images/Converse-Chuck Taylor-986.jpg",
    "link": "https://stockx.com/converse-chuck taylor-986"
  },
  {
    "modello": "converse classic 987",
    "nome": "Converse Classic 987",
    "sku": "COCL0987",
    "prezzo": "306",
    "immagine": "https://images.stockx.com/images/Converse-Classic-987.jpg",
    "link": "https://stockx.com/converse-classic-987"
  },
  {
    "modello": "jordan retro 988",
    "nome": "Jordan Retro 988",
    "sku": "JORE0988",
    "prezzo": "355",
    "immagine": "https://images.stockx.com/images/Jordan-Retro-988.jpg",
    "link": "https://stockx.com/jordan-retro-988"
  },
  {
    "modello": "asics yeezy 989",
    "nome": "Asics Yeezy 989",
    "sku": "ASYE0989",
    "prezzo": "167",
    "immagine": "https://images.stockx.com/images/Asics-Yeezy-989.jpg",
    "link": "https://stockx.com/asics-yeezy-989"
  },
  {
    "modello": "converse yeezy 990",
    "nome": "Converse Yeezy 990",
    "sku": "COYE0990",
    "prezzo": "313",
    "immagine": "https://images.stockx.com/images/Converse-Yeezy-990.jpg",
    "link": "https://stockx.com/converse-yeezy-990"
  },
  {
    "modello": "adidas ultra boost 991",
    "nome": "Adidas Ultra Boost 991",
    "sku": "ADUL0991",
    "prezzo": "240",
    "immagine": "https://images.stockx.com/images/Adidas-Ultra Boost-991.jpg",
    "link": "https://stockx.com/adidas-ultra boost-991"
  },
  {
    "modello": "asics gel-lyte 992",
    "nome": "Asics Gel-Lyte 992",
    "sku": "ASGE0992",
    "prezzo": "82",
    "immagine": "https://images.stockx.com/images/Asics-Gel-Lyte-992.jpg",
    "link": "https://stockx.com/asics-gel-lyte-992"
  },
  {
    "modello": "puma chuck taylor 993",
    "nome": "Puma Chuck Taylor 993",
    "sku": "PUCH0993",
    "prezzo": "178",
    "immagine": "https://images.stockx.com/images/Puma-Chuck Taylor-993.jpg",
    "link": "https://stockx.com/puma-chuck taylor-993"
  },
  {
    "modello": "jordan retro 994",
    "nome": "Jordan Retro 994",
    "sku": "JORE0994",
    "prezzo": "204",
    "immagine": "https://images.stockx.com/images/Jordan-Retro-994.jpg",
    "link": "https://stockx.com/jordan-retro-994"
  },
  {
    "modello": "jordan classic 995",
    "nome": "Jordan Classic 995",
    "sku": "JOCL0995",
    "prezzo": "391",
    "immagine": "https://images.stockx.com/images/Jordan-Classic-995.jpg",
    "link": "https://stockx.com/jordan-classic-995"
  },
  {
    "modello": "asics yeezy 996",
    "nome": "Asics Yeezy 996",
    "sku": "ASYE0996",
    "prezzo": "203",
    "immagine": "https://images.stockx.com/images/Asics-Yeezy-996.jpg",
    "link": "https://stockx.com/asics-yeezy-996"
  },
  {
    "modello": "jordan dunk 997",
    "nome": "Jordan Dunk 997",
    "sku": "JODU0997",
    "prezzo": "134",
    "immagine": "https://images.stockx.com/images/Jordan-Dunk-997.jpg",
    "link": "https://stockx.com/jordan-dunk-997"
  },
  {
    "modello": "converse ultra boost 998",
    "nome": "Converse Ultra Boost 998",
    "sku": "COUL0998",
    "prezzo": "87",
    "immagine": "https://images.stockx.com/images/Converse-Ultra Boost-998.jpg",
    "link": "https://stockx.com/converse-ultra boost-998"
  },
  {
    "modello": "nike gel-lyte 999",
    "nome": "Nike Gel-Lyte 999",
    "sku": "NIGE0999",
    "prezzo": "398",
    "immagine": "https://images.stockx.com/images/Nike-Gel-Lyte-999.jpg",
    "link": "https://stockx.com/nike-gel-lyte-999"
  },
  {
    "modello": "adidas retro 1000",
    "nome": "Adidas Retro 1000",
    "sku": "ADRE1000",
    "prezzo": "297",
    "immagine": "https://images.stockx.com/images/Adidas-Retro-1000.jpg",
    "link": "https://stockx.com/adidas-retro-1000"
  }
];

  if (!args.length) {
    return m.reply('Scrivi il nome della scarpa.\nEsempio: `.listino jordan 4 thunder`\nOppure `.listino immagine <SKU>` per vedere la foto.');
  }

  if (command === 'listino' && args[0].toLowerCase() === 'immagine' && args[1]) {
    const sku = args[1].toUpperCase();
    const scarpa = scarpe.find(s => s.sku === sku);
    if (!scarpa) return m.reply('❌ Immagine non trovata per questo SKU.');

    return conn.sendMessage(m.chat, {
      image: { url: scarpa.immagine },
      caption: `📷 *Immagine scarpa SKU $ADRE1000*`
    }, { quoted: m });
  }

  if (command === 'listino') {
    const query = args.join(' ').toLowerCase();
    const scarpa = scarpe.find(s => query.includes(s.modello));
    if (!scarpa) return m.reply('❌ Scarpa non trovata nel listino.');

    const messaggio = `👟 *${scarpa.nome}*\n🆔 SKU: ${scarpa.sku}\n💸 Prezzo medio: ${scarpa.prezzo} $\n🔗 ${scarpa.link}`;

    return conn.sendMessage(m.chat, {
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
  }

  if (command === 'listinoall') {
    const pagina = parseInt(args[0]) || 1;
    const perPagina = 100;
    const totali = scarpe.length;
    const pagineTotali = Math.ceil(totali / perPagina);

    if (pagina > pagineTotali || pagina < 1) {
      return m.reply(`📭 Fine elenco. Nessun altro modello disponibile per la pagina ${pagina}.`);
    }

    const inizio = (pagina - 1) * perPagina;
    const fine = pagina * perPagina;
    const lista = scarpe.slice(inizio, fine).map((s, i) => `${inizio + i + 1}. ${s.nome}`).join('\n');

    const messaggio = `📦 *LISTINO SCARPE* - Pagina ${pagina}/${pagineTotali}\n\n${lista}\n\n📦 Totali: ${totali} scarpe\n🆕 Nuove scarpe in arrivo`;

    return conn.sendMessage(m.chat, {
      text: messaggio,
      footer: 'Listino sneakers aggiornato.',
      headerType: 1
    }, { quoted: m });
  }
};

handler.command = /^listino(all)?$/i;
handler.help = ['listino <modello>', 'listino immagine <SKU>', 'listinoall [pagina]'];
handler.tags = ['shop'];

export default handler;
