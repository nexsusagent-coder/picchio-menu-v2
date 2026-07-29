const fs = require('fs');
const path = require('path');

const csvPath = 'C:\\Users\\boone\\Downloads\\urunler_2026-07-18.csv';
const jsonPath = path.join(__dirname, 'menu-data.json');

// CSV dosyasını oku
const csvContent = fs.readFileSync(csvPath, 'utf-8');
const lines = csvContent.split(/\r?\n/).filter(line => line.trim().length > 0);

// Çift tırnak duyarlı CSV satır ayırıcı
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

// Alerjenleri eşleştir
function mapAllergens(allergenStr) {
  if (!allergenStr) return [];
  const list = allergenStr.split(',').map(s => s.trim().toLowerCase());
  const mapped = [];
  for (const item of list) {
    if (item.includes('süt') || item.includes('peynir') || item.includes('krema') || item.includes('lact')) mapped.push('milk');
    else if (item.includes('gluten') || item.includes('glüten')) mapped.push('gluten');
    else if (item.includes('yumurta')) mapped.push('egg');
    else if (item.includes('balık')) mapped.push('fish');
    else if (item.includes('kabuklu')) mapped.push('shellfish');
    else if (item.includes('kuruyemiş') || item.includes('yemiş') || item.includes('fıstık') || item.includes('badem')) mapped.push('tree_nuts');
    else if (item.includes('susam')) mapped.push('sesame');
    else if (item.includes('soya')) mapped.push('soy');
    else if (item.includes('sülfit')) mapped.push('sulfites');
    else if (item.includes('hardal')) mapped.push('mustard');
    else if (item.includes('kereviz')) mapped.push('celery');
    else if (item.includes('alkol')) mapped.push('alcohol');
  }
  return [...new Set(mapped)];
}

// Kategori eşleştirmeleri ve İngilizce başlıkları
const categoryMeta = {
  "ALKOLSUZ MOKTEYLLER": { name: "Alkolsüz Kokteyller", titleEn: "Mocktails" },
  "KAHVELER & SICAK İÇECEKLER": { name: "Kahve & Sıcak İçecekler", titleEn: "Coffee & Hot Drinks" },
  "VOTKA'S": { name: "Votka", titleEn: "Vodka" },
  "ROM'S & COGNAC": { name: "Rom & Konyak", titleEn: "Rum & Cognac" },
  "LİKÖR & VERMUT": { name: "Likör & Vermut", titleEn: "Liqueurs & Vermouth" },
  "ALKOLLÜ SICAK KAHVELER": { name: "Alkollü Sıcak Kahveler", titleEn: "Alcoholic Hot Coffees" },
  "GIN'S": { name: "Cin", titleEn: "Gin" },
  "CLASSIC KOKTEYL": { name: "Klasik Kokteyller", titleEn: "Classic Cocktails" },
  "ŞİŞE BİRALAR": { name: "Şişe Biralar", titleEn: "Bottled Beers" },
  "PICCHIO SPECIAL'S & APERITIFS": { name: "Picchio Specials", titleEn: "Picchio Specials & Aperitifs" },
  "ŞARAPLAR": { name: "Şaraplar", titleEn: "Wines" },
  "SOFT DRINKS": { name: "Soft İçecekler", titleEn: "Soft Drinks" },
  "WHISKEY'S": { name: "Viski", titleEn: "Whiskey" },
  "SHOT'S": { name: "Shotlar", titleEn: "Shots" },
  "YEMEK & ÇEREZ": { name: "Yemek & Atıştırmalıklar", titleEn: "Food & Snacks" },
  "HAPPY HOUR’s": { name: "Happy Hour", titleEn: "Happy Hour" }
};

const categoriesMap = {};

// Başlığı atla (0. satır)
for (let i = 1; i < lines.length; i++) {
  const cols = parseCSVLine(lines[i]);
  if (cols.length < 3) continue;

  const id = cols[0].replace(/"/g, '') || `item-${Date.now()}-${i}`;
  const rawCat = cols[1].replace(/"/g, '') || "DİĞER";
  const name = cols[2].replace(/"/g, '');
  const fiyat = cols[3].replace(/"/g, '');
  const fiyat2 = cols[4].replace(/"/g, '');
  const etiket1 = cols[5].replace(/"/g, '');
  const etiket2 = cols[6].replace(/"/g, '');
  const icerik = cols[7].replace(/"/g, '');
  const alerjenler = cols[8].replace(/"/g, '');
  const tat = cols[9].replace(/"/g, '');
  const servis = cols[10].replace(/"/g, '');
  const kalori = cols[11].replace(/"/g, '');
  const vegan = cols[12].replace(/"/g, '');
  const vejetaryen = cols[13].replace(/"/g, '');
  const favori = cols[14].replace(/"/g, '');
  const aktif = cols[15].replace(/"/g, '');
  const onerilen = cols[16].replace(/"/g, '');

  // Pasif olanları ekleme
  if (aktif === "Pasif") continue;

  // Fiyat biçimlendirme
  let priceText = '';
  if (fiyat) {
    let p1 = fiyat.includes('₺') ? fiyat : `${fiyat} ₺`;
    if (fiyat2) {
      let p2 = fiyat2.includes('₺') ? fiyat2 : `${fiyat2} ₺`;
      if (etiket1 && etiket2) {
        priceText = `${etiket1}: ${p1} / ${etiket2}: ${p2}`;
      } else {
        priceText = `${p1} / ${p2}`;
      }
    } else {
      if (etiket1) {
        priceText = `${p1} (${etiket1})`;
      } else {
        priceText = p1;
      }
    }
  }

  // Tat notları
  const tastesLike = tat ? tat.split(',').map(s => s.trim()).filter(Boolean) : [];

  // Alerjen ve besin değerleri
  const allergensMapped = mapAllergens(alerjenler);
  const isVegan = vegan === "Evet";
  const isVegetarian = vejetaryen === "Evet";
  const isFeatured = favori === "Evet" || onerilen === "Evet";

  let nutrition = null;
  if (kalori || allergensMapped.length || isVegan || isVegetarian || servis) {
    nutrition = {
      portionNote: servis || null,
      caloriesKcal: kalori ? Number(kalori) : null,
      proteinG: null,
      carbsG: null,
      fatG: null,
      allergens: allergensMapped,
      mayContain: []
    };
  }

  const item = {
    title: name,
    titleEn: null,
    description: icerik || null,
    descriptionEn: null,
    price: priceText || null,
    tastesLike,
    featured: isFeatured,
    nutrition
  };

  if (!categoriesMap[rawCat]) {
    const meta = categoryMeta[rawCat] || { name: rawCat, titleEn: null };
    categoriesMap[rawCat] = {
      id: `cat-${rawCat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      name: meta.name,
      titleEn: meta.titleEn,
      children: [],
      items: [],
      sideText: null,
      insideNote: null
    };
  }

  categoriesMap[rawCat].items.push(item);
}

// Liste haline getir
const categoriesList = Object.values(categoriesMap);

// menu-data.json dosyasına yaz
const outputData = { 
  version: Date.now(),
  categories: categoriesList 
};
fs.writeFileSync(jsonPath, JSON.stringify(outputData, null, 2), 'utf-8');

console.log(`\nBAŞARILI: ${categoriesList.length} kategori ve yüzlerce ürün başarıyla içe aktarıldı. Sürüm: ${outputData.version}`);
