// ═══════════════════════════════════════════════════════
//   VERA QR MENU — MENU-DATA.JS
//   Data sourced from picchiococktail.com
// ═══════════════════════════════════════════════════════

const MENU_DATA = {
  categories: [
    { id: 'specials',  label: 'Specials',   icon: '✦', en: 'Picchio Specials & Aperitifs' },
    { id: 'classic',   label: 'Classic',    icon: '◈', en: 'Classic Kokteyller' },
    { id: 'whiskey',   label: 'Whiskey',    icon: '◇', en: "Whiskey's" },
    { id: 'votka',     label: 'Votka',      icon: '◉', en: "Votka's" },
    { id: 'gin',       label: 'Gin & Rom',  icon: '◆', en: "Gin's & Rom's" },
    { id: 'bira',      label: 'Bira',       icon: '🍺', en: 'Şişe Biralar' },
    { id: 'sarap',     label: 'Şarap',      icon: '🍷', en: 'Şaraplar' },
    { id: 'likorler',  label: 'Likörler',   icon: '◑', en: 'Likör & Vermut' },
    { id: 'sicakkahve',label: 'Sıcak Alkolü',icon: '☕', en: 'Alkollü Sıcak Kahveler' },
    { id: 'shots',     label: 'Shot',       icon: '⚡', en: "Shot's" },
    { id: 'kahve',     label: 'Kahve',      icon: '☕', en: 'Kahveler & Sıcak İçecekler' },
    { id: 'alkolsuz',  label: 'Mokteyl',    icon: '🍹', en: 'Alkolsüz Mokteyller' },
    { id: 'soft',      label: 'Soft',       icon: '💧', en: 'Soft Drinks' },
    { id: 'yemek',     label: 'Yemek',      icon: '🍔', en: 'Yemek & Çerez' },
    { id: 'happyhour', label: 'Happy Hour', icon: '🎉', en: "Happy Hour's" },
  ],

  items: {
    specials: [
      {
        id: 'sp1', num: '01', name: 'CASPER',
        ingredients: ['Olmeca Silver', 'Limon Suyu', 'Bergamot', 'Vanilya', 'Şeftali', 'Vegan Foamer'],
        desc: 'Olmeca Silver tequila bazlı bu yaratıcı kokteyl, bergamot ve vanilyanın zarif birlikteliğini şeftali aromasıyla taçlandırır. Vegan foamer ile sunulan kadifemsi doku unutulmaz.',
        price: '₺399', tags: [{ label: 'İmza', type: 'gold' }], allergens: 'Yok.',
        imgCategory: 'signature'
      },
      {
        id: 'sp2', num: '02', name: 'COFFEİNA',
        ingredients: ['Havana Rum', 'Disaronno', 'Baileys', 'Kahlua', 'Krema', 'Muz'],
        desc: 'Havana rum\'un tropik karakteri, Disaronno ve Baileys\'in kremsi aromasıyla buluşuyor. Kahlua ve muz ile tamamlanan bu lüks içecek, bir dessert kokteylin doruğudur.',
        price: '₺449', tags: [{ label: 'Özel', type: 'gold' }], allergens: 'Süt ürünleri (Baileys, Krema).',
        imgCategory: 'signature'
      },
      {
        id: 'sp3', num: '03', name: 'FUEGO',
        ingredients: ['Pink Gin', 'White Peach', 'Lime Suyu', 'Vegan Foamer'],
        desc: 'Pink Gin\'in çiçeksi karakteri beyaz şeftali likörüyle alevleniyor. Lime\'ın keskinliği ve vegan foamer\'ın ipeksi dokusuyla bütünlenen bu kokteyl, ateş ve zarafetin dansıdır.',
        price: '₺399', tags: [{ label: 'Yaz', type: 'summer' }], allergens: 'Yok.',
        imgCategory: 'summer'
      },
      {
        id: 'sp4', num: '04', name: 'GRİNCH',
        ingredients: ['London Dry Gin', 'Kuzu Kulağı', 'Lime Suyu', 'Vegan Foamer'],
        desc: 'London Dry Gin\'e kuzu kulağı otunun yeşil tazeliği katılıyor. Lime\'ın ferahlığı ve vegan foamer\'ın köpüğüyle sunulan bu botanik harika, bahçenin ruhunu bardağa taşır.',
        price: '₺399', tags: [], allergens: 'Yok.',
        imgCategory: 'signature'
      },
      {
        id: 'sp5', num: '05', name: 'HELLİOS',
        ingredients: ['Absolut Raspberry', 'Ahududu Likörü', 'Orman Meyvesi', 'Lime Suyu', 'Vegan Foamer'],
        desc: 'Absolut Raspberry vodka ve ahududu likörünün intense berry karakteri, orman meyvelerinin vahşi aromasıyla buluşuyor. Güneş tanrısından ilham alan bu içecek ihtişamlıdır.',
        price: '₺399', tags: [], allergens: 'Yok.',
        imgCategory: 'summer'
      },
      {
        id: 'sp6', num: '06', name: 'PICCHİO STAR',
        ingredients: ['Absolut Vanilya', 'Passoa', 'Passion Fruit', 'Lime Suyu', 'Vegan Foamer'],
        desc: 'Absolut Vanilya ve Passoa\'nun passion fruit yoğunluğu, taze passion fruit ve lime\'ın tropik birlikteliğiyle yıldız gibi parlıyor. Picchio\'nun yıldız imzası.',
        price: '₺399', tags: [{ label: 'İmza', type: 'gold' }, { label: 'Yaz', type: 'summer' }], allergens: 'Yok.',
        imgCategory: 'summer'
      },
      {
        id: 'sp7', num: '07', name: 'THE SECRET',
        ingredients: ['...Sır...'],
        desc: 'İçindekiler gizli. Picchio\'nun en gizemli kokteyline kendinizi bırakın — her yudumda yeni bir sürpriz sizi bekliyor. Sadece deneyimleyenler bilir.',
        price: '₺399', tags: [{ label: 'Gizem', type: 'new' }], allergens: 'Sormayın.',
        imgCategory: 'signature'
      },
      {
        id: 'sp8', num: '08', name: 'APEROL SPRITZ',
        ingredients: ['Aperol', 'Prosecco', 'Soda'],
        desc: 'İtalya\'nın en ikonik aperitifi. Aperol\'ün turuncu bitterliği Prosecco\'nun zarif balonlarıyla dans ediyor. Yaz akşamlarının vazgeçilmezi.',
        price: '₺399', tags: [{ label: 'Klasik', type: 'gold' }], allergens: 'Sülfitler.',
        imgCategory: 'summer'
      },
      {
        id: 'sp9', num: '09', name: 'CAMPARI SPRITZ',
        ingredients: ['Campari', 'Prosecco', 'Soda'],
        desc: 'Campari\'nin derin kırmızısı ve karmaşık bitter aroması, Prosecco\'nun ferahlığıyla mükemmel denge buluyor. Aperitif saatlerinin kırmızı incisi.',
        price: '₺399', tags: [], allergens: 'Sülfitler.',
        imgCategory: 'summer'
      },
      {
        id: 'sp10', num: '10', name: 'HUGO SPRITZ',
        ingredients: ['St-Germain', 'Prosecco', 'Soda'],
        desc: 'St-Germain elderflower likörünün narin çiçek aroması ve Prosecco\'nun balonlu zarafeti — Hugo Spritz\'in büyülü formülü. Bahar ve yazın simgesi.',
        price: '₺399', tags: [{ label: 'Yaz', type: 'summer' }], allergens: 'Sülfitler.',
        imgCategory: 'summer'
      },
      {
        id: 'sp11', num: '11', name: 'LİMONCELLO SPRITZ',
        ingredients: ['Limoncello', 'Prosecco', 'Soda'],
        desc: 'Güney İtalya\'nın güneşini taşıyan limoncello, Prosecco\'nun köpüğüyle birleşiyor. Limonun canlı sarısı ve narenciyenin ferahlatıcı aroması bir arada.',
        price: '₺399', tags: [], allergens: 'Sülfitler.',
        imgCategory: 'summer'
      },
    ],

    classic: [
      {
        id: 'cl1', num: '01', name: 'BLUE LAGOON',
        ingredients: ['Votka', 'Limon Suyu', 'Limonata', 'Turunç Şurubu'],
        desc: 'Tropikal mavi rengiyle göz alıcı, limon ve turunç\'un taze birlikteliğiyle damak çelen Blue Lagoon — yaz kokteylerinin simgesi.',
        price: '₺399', tags: [], allergens: 'Yok.',
        imgCategory: 'summer'
      },
      {
        id: 'cl2', num: '02', name: 'BOULEVARDİER',
        ingredients: ['Bourbon Viski', 'Campari', 'Kırmızı Vermouth'],
        desc: 'Negroni\'nin bourbon versiyonu. Amerikan viskisinin vanilya tatlılığı, Campari\'nin acılığı ve kırmızı vermutun dansı — zarif ve kompleks.',
        price: '₺449', tags: [{ label: 'Premium', type: 'gold' }], allergens: 'Sülfitler.',
        imgCategory: 'signature'
      },
      {
        id: 'cl3', num: '03', name: 'CAMPARİ NEGRONİ',
        ingredients: ['Campari', 'Cin', 'Kırmızı Vermut'],
        desc: 'Kokteylin büyük klasiği — eşit ölçüde Campari, gin ve kırmızı vermut. Bitter, botanik ve aromatik; her yudumda karakterini ortaya koyan bir masterpiece.',
        price: '₺449', tags: [{ label: 'Klasik', type: 'gold' }], allergens: 'Sülfitler.',
        imgCategory: 'signature'
      },
      {
        id: 'cl4', num: '04', name: 'COSMOPOLİTAN',
        ingredients: ['Citron Votka', 'Triple Sec', 'Kızılcık Suyu', 'Lime Suyu'],
        desc: 'Sex and the City\'nin sembolik içeceği. Citron vodkanın limonlu karakteri, kızılcık suyu ile pembe-kırmızı rengini alıyor. Şık, keskin ve sofistike.',
        price: '₺399', tags: [], allergens: 'Yok.',
        imgCategory: 'summer'
      },
      {
        id: 'cl5', num: '05', name: 'DRY MARTİNİ',
        ingredients: ['Gin', 'Dry Vermouth', 'Yeşil Zeytin'],
        desc: 'Kokteyl geleneğinin kutsal içeceği. Soğuk gin ve bir damla dry vermouth — ne fazla ne az. Yeşil zeytin ya da limon kabuğuyla tamamlanan zamansız bir şaheser.',
        price: '₺399', tags: [{ label: 'Klasik', type: 'gold' }], allergens: 'Yok.',
        imgCategory: 'signature'
      },
      {
        id: 'cl6', num: '06', name: 'ESPRESSO MARTİNİ',
        ingredients: ['Votka', 'Kahlua', 'Şeker Şurubu', 'Espresso'],
        desc: 'Taze espresso, votka ve Kahlua\'nın buluşması. Köpüklü yüzeyi ve kahvenin yoğun aromasıyla gece\'nin vazgeçilmezi olan bu kokteyl sizi hem uyandırır hem büyüler.',
        price: '₺399', tags: [], allergens: 'Kafein.',
        imgCategory: 'signature'
      },
      {
        id: 'cl7', num: '07', name: 'GIN FIZZ',
        ingredients: ['Gin', 'Limon Suyu', 'Soda'],
        desc: 'Botanik gin, taze limon suyu ve soda\'nın köpüklü birlikteliği. Ferah, hafif ve serinletici — sıcak yaz günlerinin mükemmel tercihi.',
        price: '₺399', tags: [], allergens: 'Yok.',
        imgCategory: 'summer'
      },
      {
        id: 'cl8', num: '08', name: 'LONG ISLAND ICE TEA',
        ingredients: ['Votka', 'Cin', 'Tequila', 'Rom', 'Triple Sec', 'Lime Suyu', 'Cola'],
        desc: 'Beş farklı sert içkiyi bir arada barındıran bu Long Island\'ın rengi çay gibi görünse de içeriği çok farklı. Deneyimliler için cesaretli bir tercih.',
        price: '₺449', tags: [{ label: 'Güçlü', type: 'new' }], allergens: 'Yok.',
        imgCategory: 'signature'
      },
      {
        id: 'cl9', num: '09', name: 'LYNCHBURG LEMONADE',
        ingredients: ["Jack Daniel's", 'Triple Sec', 'Lime', 'Sprite'],
        desc: "Tennessee'nin ruhunu taşıyan Jack Daniel's, Triple Sec ve taze lime ile buluşuyor. Sprite'ın köpüklü ferahlığıyla tamamlanan bu içecek hafif ve keyiflidir.",
        price: '₺399', tags: [], allergens: 'Yok.',
        imgCategory: 'summer'
      },
      {
        id: 'cl10', num: '10', name: 'MARGARİTA',
        ingredients: ['Tequila', 'Triple Sec', 'Lime'],
        desc: 'Tüm zamanların en sevilen kokteyli. Tequila\'nın gövdesi, Triple Sec\'in portakal likörü ve taze lime suyu — tuz rimli bardakta servis edilen Meksika klasiği.',
        price: '₺399', tags: [{ label: 'Klasik', type: 'gold' }], allergens: 'Yok.',
        imgCategory: 'summer'
      },
      {
        id: 'cl11', num: '11', name: 'MOJİTO',
        ingredients: ['Rom', 'Lime', 'Nane', 'Şeker', 'Soda'],
        desc: 'Havana\'nın efsanevi içeceği. Taze nane, lime ve şeker küpü beyaz romla ezilip soda ile tamamlanıyor. Yaz\'ın en taze ve ferah kokteyline merhaba.',
        price: '₺399', tags: [{ label: 'Yaz', type: 'summer' }], allergens: 'Yok.',
        imgCategory: 'summer'
      },
      {
        id: 'cl12', num: '12', name: 'OLD FASHIONED',
        ingredients: ['Bourbon Viski', 'Şeker', 'Angostura Bitter'],
        desc: 'Tüm zamanların en eski kadehi. Şeker ve Angostura bitter ile hazırlanan bourbon, portakal kabuğuyla aromalanıyor. Sadeliğin ve derinliğin mükemmel dengesi.',
        price: '₺399', tags: [{ label: 'Klasik', type: 'gold' }], allergens: 'Yok.',
        imgCategory: 'signature'
      },
      {
        id: 'cl13', num: '13', name: 'PİNA COLADA',
        ingredients: ['Rom', 'Malibu', 'Ananas Suyu', 'Süt'],
        desc: 'Porto Rico\'nun ulusal içeceği — Karayip beyaz romu, Malibu hindistan cevizi likörü ve taze ananas suyunun tropikal cenneti. Gözlerinizi kapatın, sahildesiniz.',
        price: '₺399', tags: [{ label: 'Yaz', type: 'summer' }], allergens: 'Süt ürünleri.',
        imgCategory: 'summer'
      },
      {
        id: 'cl14', num: '14', name: 'SEX ON THE BEACH',
        ingredients: ['Votka', 'Archers', 'Portakal Suyu', 'Kızılcık Suyu'],
        desc: 'Şeftali schnapps\'ın tatlılığı, votkanın temizliği ve meyve sularının renkli canlılığıyla. Renkli katmanları ve tropikal tadıyla plaj kokteylinin simgesi.',
        price: '₺399', tags: [], allergens: 'Yok.',
        imgCategory: 'summer'
      },
      {
        id: 'cl15', num: '15', name: 'TEQUİLA SUNRISE',
        ingredients: ['Tequila', 'Portakal Suyu', 'Grenadine'],
        desc: 'Bardakta gün doğumunu tasvir eden bu ikonik görsel şölen — tequila ve portakal suyunun üzerine dökülen grenadine, renk geçişiyle gün doğumunu yansıtır.',
        price: '₺399', tags: [], allergens: 'Yok.',
        imgCategory: 'summer'
      },
      {
        id: 'cl16', num: '16', name: 'WHISKEY SOUR',
        ingredients: ['Viski', 'Limon Suyu', 'Şeker Şurubu'],
        desc: 'Viskinin zengin karakteri, limon suyunun ekşiliği ve şeker şurubunun tatlılığıyla mükemmel denge. Köpüklü yüzeyiyle sofistike bir klasik.',
        price: '₺399', tags: [{ label: 'Klasik', type: 'gold' }], allergens: 'Yok.',
        imgCategory: 'signature'
      },
    ],

    whiskey: [
      {
        id: 'wh1', num: '01', name: "JACK DANIEL'S",
        ingredients: ['Tennessee Whiskey', 'Tek 4.5cl / Duble 9cl'],
        desc: "Dünyaca ünlü Tennessee'nin siyah etiketli efsanesi. Jack Daniel's Old No.7, charcoal mellowing tekniğiyle yumuşatılmış, vanilla ve karamel notalarıyla dolu.",
        price: 'Tek ₺350 / Duble ₺550', tags: [{ label: 'Bestseller', type: 'gold' }], allergens: 'Yok.',
        imgCategory: 'signature'
      },
      {
        id: 'wh2', num: '02', name: 'CHİVAS REGAL',
        ingredients: ['Blended Scotch Whisky', 'Tek 4.5cl / Duble 9cl'],
        desc: "İskoçya'nın prestijli blended Scotch'u. Chivas Regal'in smooth ve meyvemsil karakteri, bal, armut ve vanilya notalarını bir arada sunuyor.",
        price: 'Tek ₺350 / Duble ₺550', tags: [], allergens: 'Yok.',
        imgCategory: 'signature'
      },
      {
        id: 'wh3', num: '03', name: 'CHİVAS 18',
        ingredients: ['Premium Blended Scotch', 'Tek 4.5cl / Duble 9cl'],
        desc: "Chivas Regal'in 18 yıllık prestijli versiyonu. Daha kompleks, daha zengin, daha sofistike — meşe ve kuru meyve notaları eşsiz bir derinlik sunuyor.",
        price: 'Tek ₺500 / Duble ₺750', tags: [{ label: 'Premium', type: 'gold' }], allergens: 'Yok.',
        imgCategory: 'signature'
      },
      {
        id: 'wh4', num: '04', name: 'GENTLEMAN JACK',
        ingredients: ['Double Mellowed Tennessee', 'Tek 4.5cl / Duble 9cl'],
        desc: "Jack Daniel's'ın double charcoal mellowed versiyonu — daha smooth, daha yumuşak, daha zarif. Vanilya ve meyvemsi aromalarıyla gentleman gibi davranır.",
        price: 'Tek ₺375 / Duble ₺575', tags: [{ label: 'Özel', type: 'gold' }], allergens: 'Yok.',
        imgCategory: 'signature'
      },
      {
        id: 'wh5', num: '05', name: 'J. WALKER BLACK LABEL',
        ingredients: ['Blended Scotch Whisky', 'Tek 4.5cl / Duble 9cl'],
        desc: "Johnnie Walker'ın ikonik siyah etiketi. 12 yıllık İskoç viskilerinin harmanından oluşan smooth ve zengin profil, meyvemsi ve tütsülü notalar içeriyor.",
        price: 'Tek ₺350 / Duble ₺550', tags: [], allergens: 'Yok.',
        imgCategory: 'signature'
      },
      {
        id: 'wh6', num: '06', name: "JACK DANIEL'S FİRE",
        ingredients: ['Cinnamon Whiskey', 'Tek 4.5cl / Duble 9cl'],
        desc: "Jack Daniel's'a tarçın likörü eklenmiş bu ateşli versiyon — tarifin içinde gerçek bir ısı var. Tarçının sıcaklığı Tennessee viskisiyle buluşuyor.",
        price: 'Tek ₺350 / Duble ₺550', tags: [{ label: 'Ateşli', type: 'new' }], allergens: 'Yok.',
        imgCategory: 'signature'
      },
      {
        id: 'wh7', num: '07', name: "JACK DANIEL'S HONEY",
        ingredients: ['Honey Whiskey', 'Tek 4.5cl / Duble 9cl'],
        desc: "Jack Daniel's Tennessee Honey, Lynchburg'un bal likörüyle harmanlanmış tatlı ve smooth bir deneyim. Vanilya ve bal notaları eşliğinde içim kolaylaşıyor.",
        price: 'Tek ₺350 / Duble ₺550', tags: [], allergens: 'Yok.',
        imgCategory: 'signature'
      },
      {
        id: 'wh8', num: '08', name: 'JAMESON',
        ingredients: ['Irish Whiskey', 'Tek 4.5cl / Duble 9cl'],
        desc: "İrlanda'nın en çok tercih edilen viskisi. Jameson'ın triple distilled smooth karakteri, hafif tatlı ve odunsu notalarıyla her damakta karşılık buluyor.",
        price: 'Tek ₺320 / Duble ₺510', tags: [], allergens: 'Yok.',
        imgCategory: 'signature'
      },
      {
        id: 'wh9', num: '09', name: 'JİM BEAM',
        ingredients: ['Kentucky Straight Bourbon', 'Tek 4.5cl / Duble 9cl'],
        desc: "Amerika'nın en çok satan bourbon'u. Jim Beam'in 4 yıllık meşe fıçıda olgunlaşmış karakteri, vanilya, karamel ve hafif tütsülü notalar taşıyor.",
        price: 'Tek ₺350 / Duble ₺550', tags: [], allergens: 'Yok.',
        imgCategory: 'signature'
      },
    ],

    votka: [
      {
        id: 'vt1', num: '01', name: 'ABSOLUT (5cl)',
        ingredients: ['İsveç Premium Vodka', '5cl'],
        desc: "İsveç'in simgesi Absolut Vodka — saf buğday ve kristal berraklığındaki su ile üretilen, temiz ve smooth bir votka deneyimi.",
        price: '₺300', tags: [], allergens: 'Buğday (gluten).',
        imgCategory: 'summer'
      },
      {
        id: 'vt2', num: '02', name: 'ABSOLUT CİTRON (5cl)',
        ingredients: ['Limon Aromalı Votka', '5cl'],
        desc: 'Absolut\'un limon aromalı varyantı — taze limon kabuğunun canlı kokusu ve doğal limon tadıyla. Martini ve Cosmopolitan\'ın vazgeçilmezi.',
        price: '₺300', tags: [], allergens: 'Buğday (gluten).',
        imgCategory: 'summer'
      },
      {
        id: 'vt3', num: '03', name: 'ABSOLUT RASPBERRY (5cl)',
        ingredients: ['Ahududu Aromalı Votka', '5cl'],
        desc: 'Absolut Raspberri — İsveç ahududusunun yoğun ve taze aromasıyla. Meyve kokteyllerinde ve shot\'larda vazgeçilmez olan bu votka canlı ve ferahtır.',
        price: '₺300', tags: [], allergens: 'Buğday (gluten).',
        imgCategory: 'summer'
      },
      {
        id: 'vt4', num: '04', name: 'ABSOLUT VANİLİA (5cl)',
        ingredients: ['Vanilya Aromalı Votka', '5cl'],
        desc: 'Madagaskar vanilya çekirdeklerinden ilham alan Absolut Vanilia, kremsi ve tatlı bir deneyim sunuyor. Espresso Martini ve dessert kokteylerinin sırrı.',
        price: '₺300', tags: [], allergens: 'Buğday (gluten).',
        imgCategory: 'signature'
      },
      {
        id: 'vt5', num: '05', name: 'BELVEDERE (5cl)',
        ingredients: ['Polonya Premium Rye Vodka', '5cl'],
        desc: "Polonya'nın ultra-premium rye vodkası. Belvedere'nin dört kez damıtılmış karakteri — arı, kremsi ve tamamen smooth. Lüks vodka deneyiminin zirvesi.",
        price: '₺450', tags: [{ label: 'Premium', type: 'gold' }], allergens: 'Çavdar (gluten).',
        imgCategory: 'signature'
      },
      {
        id: 'vt6', num: '06', name: 'SMİRNOFF (5cl)',
        ingredients: ['Triple Distilled Vodka', '5cl'],
        desc: 'Dünyada en çok tanınan vodka markası. Smirnoff\'un üç kez damıtılmış temiz ve nötr karakteri, her kokteyle mükemmel bir baz oluşturuyor.',
        price: '₺300', tags: [], allergens: 'Buğday (gluten).',
        imgCategory: 'summer'
      },
    ],

    gin: [
      {
        id: 'gn1', num: '01', name: 'BEEFEATER (5cl)',
        ingredients: ['London Dry Gin', '5cl'],
        desc: "Londra'nın klasik London Dry Gin'i — ardıç, kişniş ve angelica root ile aromatize edilmiş bu gin, tüm klasik gin kokteyllerinin temelini oluşturuyor.",
        price: '₺300', tags: [], allergens: 'Yok.',
        imgCategory: 'signature'
      },
      {
        id: 'gn2', num: '02', name: 'BEEFEATER PİNK (5cl)',
        ingredients: ['Çilek Aromalı Gin', '5cl'],
        desc: 'Beefeater\'ın pembe versiyonu — doğal çilek aroması ile çiçeksi bir profil. Gin & Tonic\'lerde pembe ve ferah bir deneyim sunan modern tercih.',
        price: '₺300', tags: [{ label: 'Yaz', type: 'summer' }], allergens: 'Yok.',
        imgCategory: 'summer'
      },
      {
        id: 'gn3', num: '03', name: 'BOMBAY SAPPHIRE (5cl)',
        ingredients: ['Premium London Dry Gin', '5cl'],
        desc: 'Mavi şişesiyle ikonikleşen Bombay Sapphire, 10 egzotik botanik içeriyor. Ardıç, limon kabuğu ve kişniş\'in zarif bütünlüğü smooth ve kompleks bir gin sunar.',
        price: '₺400', tags: [{ label: 'Premium', type: 'gold' }], allergens: 'Yok.',
        imgCategory: 'signature'
      },
      {
        id: 'gn4', num: '04', name: "GORDON'S (5cl)",
        ingredients: ['London Dry Gin', '5cl'],
        desc: "1769'dan bu yana üretilen Gordon's, ardıç ağırlıklı yapısıyla London Dry Gin\'in textbook örneğidir. Klasik Gin & Tonic\'in uygun fiyatlı mükemmel partneri.",
        price: '₺300', tags: [], allergens: 'Yok.',
        imgCategory: 'signature'
      },
      // ROM'S
      {
        id: 'rm1', num: '05', name: 'BACARDI (5cl)',
        ingredients: ['White Rum', '5cl'],
        desc: "Küba'nın dünyaca ünlü beyaz romu. Bacardi Superior'ın hafif ve smooth karakteri, Mojito ve Daiquiri'nin olmazsa olmazıdır.",
        price: '₺350', tags: [], allergens: 'Yok.',
        imgCategory: 'summer'
      },
      {
        id: 'rm2', num: '06', name: 'CAPTAIN MORGAN (5cl)',
        ingredients: ['Spiced Rum', '5cl'],
        desc: "Karadeniz korsanlarından ilham alan Captain Morgan'ın baharatlı karakteri — vanilya, tarçın ve baharatların füzyonu. Rum Cola\'nın kaptanı.",
        price: '₺350', tags: [], allergens: 'Yok.',
        imgCategory: 'summer'
      },
      {
        id: 'rm3', num: '07', name: 'HAVANA (5cl)',
        ingredients: ['Cuban Rum', '5cl'],
        desc: "Havana'nın resmi ruhu. Havana Club\'ın şeker kamışından üretilen otantik Küba romu — Mojito'yu gerçek kılan o eşsiz karakter.",
        price: '₺350', tags: [], allergens: 'Yok.',
        imgCategory: 'summer'
      },
      {
        id: 'rm4', num: '08', name: 'HENNESSY',
        ingredients: ['VS Cognac', 'Tek / Duble'],
        desc: "Dünyanın en çok satan cognac'ı. Hennessy VS'nin meyvemsil ve çiçeksi karakteri, meşe fıçısından aldığı vanilyalı notalar ile tamamlanıyor.",
        price: 'Tek ₺400 / Duble ₺600', tags: [{ label: 'Premium', type: 'gold' }], allergens: 'Sülfitler.',
        imgCategory: 'signature'
      },
    ],

    bira: [
      {
        id: 'br1', num: '01', name: 'CARLSBERG ELEPHANT',
        ingredients: ['Strong Lager', '50cl'],
        desc: "Carlsberg'in güçlü lager serisi — hafifçe daha yüksek alkol içeriğiyle cesur bir bira deneyimi sunan fil etiketli seçenek.",
        price: '₺250', tags: [], allergens: 'Gluten (arpa).', imgCategory: 'summer'
      },
      {
        id: 'br2', num: '02', name: 'CARLSBERG (50cl)',
        ingredients: ['Premium Lager', '50cl'],
        desc: 'Danimarkalı efsane. Carlsberg\'in classic lager formülü — ferah, dengeli ve her damağa hitap eden evrensel tercih.',
        price: '₺169', tags: [], allergens: 'Gluten.', imgCategory: 'summer'
      },
      {
        id: 'br3', num: '03', name: 'TUBORG GOLD (50cl)',
        ingredients: ['Premium Lager', '50cl'],
        desc: 'Tuborg\'un altın standartı. Yeşil şişesiyle tanınan bu Danimarkalı lager, hafif tatlı ve ferah yapısıyla en popüler bira seçeneklerinden biri.',
        price: '₺159', tags: [], allergens: 'Gluten.', imgCategory: 'summer'
      },
      {
        id: 'br4', num: '04', name: 'TUBORG SMOOTH',
        ingredients: ['Smooth Lager'],
        desc: 'Tuborg\'un özel smooth serisi — daha yumuşak, daha az acı ve çok daha ferah bir içim deneyimi sunan modern bira tercihi.',
        price: '₺200', tags: [], allergens: 'Gluten.', imgCategory: 'summer'
      },
      {
        id: 'br5', num: '05', name: 'FREDERIK BROWN ALE (35cl)',
        ingredients: ['Craft Brown Ale', '35cl'],
        desc: 'Craft bira dünyasından Frederik\'in Brown Ale\'i — kahverengi rengi ve karamel, çikolata notalarıyla zengin ve maltlı bir deneyim.',
        price: '₺229', tags: [{ label: 'Craft', type: 'new' }], allergens: 'Gluten.', imgCategory: 'signature'
      },
      {
        id: 'br6', num: '06', name: 'FREDERIK IPA (35cl)',
        ingredients: ['India Pale Ale', '35cl'],
        desc: 'Frederik\'in hoppy IPA\'si — çiçeksi ve tropikal hop aromaları, bitter finish ve yüksek karmaşıklık. Craft bira tutkunlarının tercihi.',
        price: '₺229', tags: [{ label: 'Craft', type: 'new' }], allergens: 'Gluten.', imgCategory: 'signature'
      },
      {
        id: 'br7', num: '07', name: 'WEIHENSTEPHAN HEFEWEIZEN (33cl)',
        ingredients: ['Bavarian Wheat Beer', '33cl'],
        desc: "Dünyanın en eski bira fabrikasından — Weihenstephan'ın efsanevi buğday birası. Muz ve karanfil notaları, kremsi köpüğü ile Bavyera geleneğinin özeti.",
        price: '₺239', tags: [{ label: 'Özel', type: 'gold' }], allergens: 'Gluten, Buğday.', imgCategory: 'summer'
      },
      {
        id: 'br8', num: '08', name: 'GUINNESS KUTU (44cl)',
        ingredients: ['Irish Dry Stout', '44cl'],
        desc: "Dublin'den gelen bu siyah kadife — azot gazıyla oluşan kremsi köpük, kahve ve çikolata notaları ile Guinness, biraların en ikonik şaheseridir.",
        price: '₺279', tags: [{ label: 'İkonik', type: 'gold' }], allergens: 'Gluten.', imgCategory: 'signature'
      },
      {
        id: 'br9', num: '09', name: '1664 BLANC (33cl)',
        ingredients: ['French Wheat Beer', '33cl'],
        desc: 'Fransız zarafeti bardağa yansıyor — 1664 Blanc\'ın buğday birası, narenciye ve kişniş notalarıyla hafif ve ferah. Yaz aylarının Avrupa favorisi.',
        price: '₺229', tags: [], allergens: 'Gluten, Buğday.', imgCategory: 'summer'
      },
      {
        id: 'br10', num: '10', name: 'DESPERADOS (33cl)',
        ingredients: ['Tequila Flavoured Beer', '33cl'],
        desc: 'Biranın tequila ile buluşması — Desperados, tequila aromasıyla tatlandırılmış Meksika ruhlu bir lager. Parti içeceklerinin vazgeçilmezi.',
        price: '₺239', tags: [], allergens: 'Gluten.', imgCategory: 'summer'
      },
    ],

    sarap: [
      {
        id: 'sr1', num: '01', name: 'CABERNET SAUVIGNON',
        ingredients: ['Chateau C. Cabernet Sauvignon', '75cl'],
        desc: 'Kırmızı şarabın kraliçesi. Kuru vişne, çikolata ve karabiber notalarıyla güçlü yapılı bu Cabernet Sauvignon, özel anların ve derin sohbetlerin şarabıdır.',
        price: 'Kadeh ₺200 / Şişe ₺899', tags: [], allergens: 'Sülfitler.', imgCategory: 'signature'
      },
      {
        id: 'sr2', num: '02', name: 'CHARDONNAY',
        ingredients: ['Chateau Crico Chardonnay', '75cl'],
        desc: 'Beyaz şarabın dünyanın her köşesinde tanınan lezzeti. Elma, armut ve hafif meşe aromasıyla bu Chardonnay, deniz ürünleri ve hafif yemeklerle mükemmel eşleşir.',
        price: 'Kadeh ₺200 / Şişe ₺899', tags: [], allergens: 'Sülfitler.', imgCategory: 'summer'
      },
      {
        id: 'sr3', num: '03', name: 'PINOT NOIR',
        ingredients: ['Chateau Crico Pinot Noir', '75cl'],
        desc: 'Zarif Pinot Noir — kiraz, çilek ve toprak notalarıyla hafif ama kompleks. Bordo\'nun DNA\'sını taşıyan bu zarif kırmızı, etkileyici bir şarap deneyimi sunuyor.',
        price: 'Kadeh ₺200 / Şişe ₺899', tags: [{ label: 'Özel', type: 'gold' }], allergens: 'Sülfitler.', imgCategory: 'signature'
      },
      {
        id: 'sr4', num: '04', name: 'PREMIUM ROSÉ',
        ingredients: ['Chateau Crico Premium Rose', '75cl'],
        desc: 'Yazın rengi pembe. Bu Premium Rosé, çilek ve şeftali notaları, taze asidite ve kuru finish ile yaz akşamlarının en şık seçeneğidir.',
        price: 'Kadeh ₺200 / Şişe ₺899', tags: [{ label: 'Yaz', type: 'summer' }], allergens: 'Sülfitler.', imgCategory: 'summer'
      },
      {
        id: 'sr5', num: '05', name: 'SAUVIGNON BLANC',
        ingredients: ['Chateau Crico Sauvignon Blanc', '75cl'],
        desc: 'Limon, misket limonu ve çimlenmiş notalarıyla ferah ve vibrant bu Sauvignon Blanc, Yeni Dünya tarzında üretilmiş ve kesinlikle serinletici.',
        price: 'Kadeh ₺200 / Şişe ₺899', tags: [], allergens: 'Sülfitler.', imgCategory: 'summer'
      },
      {
        id: 'sr6', num: '06', name: 'SYRAH',
        ingredients: ['Chateau Crico Syrah', '75cl'],
        desc: 'Koyu kırmızı, yoğun ve baharatlı — Syrah\'nın karabiber, siyah meyve ve violas notaları güçlü bir karakter çiziyor. Steak ve kırmızı et severlerin şarabı.',
        price: 'Kadeh ₺200 / Şişe ₺899', tags: [], allergens: 'Sülfitler.', imgCategory: 'signature'
      },
      {
        id: 'sr7', num: '07', name: 'SANGRİA BEYAZ',
        ingredients: ['Beyaz Şarap', 'Rom', 'Mevsim Meyveleri'],
        desc: 'İspanya\'nın eğlenceli içeceği — beyaz şarap, rom ve taze mevsim meyvelerinin renkli buluşması. Serinletici, meyvemsil ve her ziyafete uygun.',
        price: 'Kadeh ₺250 / Şişe ₺1099', tags: [{ label: 'Paylaşım', type: 'summer' }], allergens: 'Sülfitler.', imgCategory: 'summer'
      },
      {
        id: 'sr8', num: '08', name: 'SANGRİA KIRMIZI',
        ingredients: ['Kırmızı Şarap', 'Vodka', 'Mevsim Meyveleri'],
        desc: 'Kırmızı şarap ve vodkanın mevsim meyveleriyle zenginleştirildiği bu kırmızı Sangria — renkli, dolu ve festival ruhlu. Büyük gruplar için mükemmel.',
        price: 'Kadeh ₺250 / Şişe ₺1099', tags: [{ label: 'Paylaşım', type: 'summer' }], allergens: 'Sülfitler.', imgCategory: 'summer'
      },
      {
        id: 'sr9', num: '09', name: 'SANGRİA ROSE',
        ingredients: ['Rose Şarap', 'Pink Gin', 'Mevsim Meyveleri'],
        desc: 'Pembe Rosé ve Pink Gin\'in romantik birlikteliği, mevsim meyvelerinin renkli katkısıyla — bu Rosé Sangria yaz\'ın en çekici içeceği olmaya aday.',
        price: 'Kadeh ₺250 / Şişe ₺1099', tags: [{ label: 'Yaz', type: 'summer' }, { label: 'Paylaşım', type: 'summer' }], allergens: 'Sülfitler.', imgCategory: 'summer'
      },
    ],

    likorler: [
      {
        id: 'lk1', num: '01', name: 'BİALEYS', ingredients: ['Irish Cream Liqueur'],
        desc: "İrlanda'nın en ünlü kremalı likörü — whiskey, krema ve kakao\'nun eşsiz birlikteliği. Soğuk ya da sıcak, ice ile ya da düz servis edilen kadifemsi lezzet.",
        price: '₺275', tags: [], allergens: 'Süt ürünleri.', imgCategory: 'signature'
      },
      {
        id: 'lk2', num: '02', name: 'MALİBU', ingredients: ['Coconut Rum Liqueur'],
        desc: "Karayipler'den gelen hindistan cevizi likörü — beyaz rum bazlı, tatlı ve tropik. Pina Colada ve tropikal kokteyllerin vazgeçilmez malzemesi.",
        price: '₺250', tags: [], allergens: 'Yok.', imgCategory: 'summer'
      },
      {
        id: 'lk3', num: '03', name: 'KAHLUA', ingredients: ['Coffee Rum Liqueur'],
        desc: 'Meksika\'nın dünyaca ünlü kahve likörü — şeker kamışı ruhu, Arabica kahve ve vanilyanın birlikteliği. Espresso Martini\'nin en önemli malzemesi.',
        price: '₺250', tags: [], allergens: 'Yok.', imgCategory: 'signature'
      },
      {
        id: 'lk4', num: '04', name: 'LİMONCELLO', ingredients: ['Italian Lemon Liqueur'],
        desc: "Güney İtalya'nın limon bahçelerinden — Amalfi limonlarının kabuğuyla yapılan bu altın rengi likör, keskin limon aroması ve tatlı finish'iyle nefis.",
        price: '₺250', tags: [], allergens: 'Yok.', imgCategory: 'summer'
      },
      {
        id: 'lk5', num: '05', name: 'DİSARONNO', ingredients: ['Amaretto Liqueur'],
        desc: "İtalya'nın efsanevi badem likörü — Disaronno Originale'nin vanilya, badem ve kayısı aromaları ona eşsiz bir karmaşıklık kazandırıyor. Sıcak içeceklerin sırrı.",
        price: '₺300', tags: [], allergens: 'Badem.', imgCategory: 'signature'
      },
      {
        id: 'lk6', num: '06', name: 'DİSARONNO', ingredients: ['Amaretto Liqueur'],
        desc: "İtalya'nın efsanevi badem likörü — Disaronno Originale'nin vanilya, badem ve kayısı aromaları ona eşsiz bir karmaşıklık kazandırıyor.",
        price: '₺300', tags: [], allergens: 'Badem.', imgCategory: 'signature'
      },
    ],

    sicakkahve: [
      {
        id: 'sk1', num: '01', name: 'BİALEYS COFFEE',
        ingredients: ['Baileys', 'Sıcak Kahve', 'Süt Köpüğü'],
        desc: "Baileys'in kremsi likörü sıcak kahvenin buharıyla buluşuyor — süt köpüğüyle tamamlanan bu içecek, kış akşamlarının en lüks kucaklamasıdır.",
        price: '₺399', tags: [], allergens: 'Süt ürünleri.', imgCategory: 'signature'
      },
      {
        id: 'sk2', num: '02', name: 'IRISH COFFEE',
        ingredients: ['İrlanda Viski', 'Sıcak Kahve', 'Krema'],
        desc: "Dublin havalimanında doğan bu klasik — sıcak kahve, İrlanda viskisi ve üstüne hafifçe yüzdürülmüş krema. İrlanda'nın en sıcak kucağı.",
        price: '₺399', tags: [{ label: 'Klasik', type: 'gold' }], allergens: 'Süt ürünleri.', imgCategory: 'signature'
      },
      {
        id: 'sk3', num: '03', name: 'PİCCHİO COFFEE',
        ingredients: ['Seçkin İçerik', 'Picchio İmza'],
        desc: "Picchio'nun özel alkollü sıcak kahve tarifi — baristamızın titizlikle hazırladığı imza içeceği. Detaylar için barmenimize sorun.",
        price: '₺399', tags: [{ label: 'İmza', type: 'gold' }], allergens: 'Sormayın.', imgCategory: 'signature'
      },
    ],

    shots: [
      {
        id: 'sh1', num: '01', name: 'JÄGERMEISTER',
        ingredients: ['56 Botanik Likör', '2cl'],
        desc: "56 farklı botanik bitkiyle hazırlanan Alman klasiği — acı, tatlı ve baharatlı notaların eşsiz bütünlüğü. Soğuk servis edilmesi şart.",
        price: '₺175', tags: [], allergens: 'Yok.', imgCategory: 'signature'
      },
      {
        id: 'sh2', num: '02', name: 'JÄGERMEISTER MANİFEST',
        ingredients: ['Premium Jäger', '2cl'],
        desc: "Jägermeister'ın premium versiyonu — meşe fıçısında olgunlaştırılmış, daha yumuşak ve daha kompleks bir Jäger deneyimi. Gerçek Jäger tutkunları için.",
        price: '₺225', tags: [{ label: 'Premium', type: 'gold' }], allergens: 'Yok.', imgCategory: 'signature'
      },
      {
        id: 'sh3', num: '03', name: 'F-16 (KARAMELLİ)',
        ingredients: ['Karamel Shot'],
        desc: 'Tatlı karamel aromasıyla uçan bu shot, adını savaş uçağından alıyor — hız ve güç bir arada. Tatlı sever misafirler için en popüler seçenek.',
        price: '₺175', tags: [], allergens: 'Yok.', imgCategory: 'summer'
      },
      {
        id: 'sh4', num: '04', name: 'PİCCHİO SHOT',
        ingredients: ['Gizli İçerik'],
        desc: "Picchio'nun imza shot'u — içindekiler sır, ama etkisi kesin. Barmenimizin özel tarifi her gece sürpriz olabilir.",
        price: '₺175', tags: [{ label: 'İmza', type: 'gold' }], allergens: 'Bilinmiyor.', imgCategory: 'signature'
      },
    ],

    kahve: [
      {
        id: 'kh1', num: '01', name: 'AMERICANO', ingredients: ['Espresso', 'Sıcak/Soğuk Su'],
        desc: 'Espresso\'nun suyla seyreltilmesiyle hazırlanan Americano — sade ama karakterli, uzun ama yoğun bir kahve deneyimi.', price: '₺189',
        tags: [], allergens: 'Kafein.', imgCategory: 'signature'
      },
      {
        id: 'kh2', num: '02', name: 'CAPPUCCINO', ingredients: ['Espresso', 'Buharlı Süt', 'Süt Köpüğü'],
        desc: 'İtalyan kahve geleneğinin sembolü — eşit ölçüde espresso, buharlı süt ve süt köpüğü. Kahve saatinizin en klasik tercihlerinden biri.', price: '₺199',
        tags: [], allergens: 'Süt.', imgCategory: 'signature'
      },
      {
        id: 'kh3', num: '03', name: 'LATTE', ingredients: ['Espresso', 'Bol Buharlı Süt'],
        desc: 'Bol süt köpüğü ve hafif espresso — latte severler için yumuşak ve kremsi başlangıç. İstediğiniz aromayı ekleyerek kişiselleştirebilirsiniz.', price: '₺199',
        tags: [], allergens: 'Süt.', imgCategory: 'signature'
      },
      {
        id: 'kh4', num: '04', name: 'VANİLLA LATTE', ingredients: ['Espresso', 'Vanilya Şurubu', 'Buharlı Süt'],
        desc: "Madagascar vanilya şurubunun kremsi tatlılığı espresso ile buluşuyor. Kahve dünyasının en popüler aromalı latte'si.", price: '₺209',
        tags: [], allergens: 'Süt.', imgCategory: 'signature'
      },
      {
        id: 'kh5', num: '05', name: 'CARAMEL LATTE', ingredients: ['Espresso', 'Karamel Şurubu', 'Buharlı Süt'],
        desc: 'Karamel şurubunun tatlı derinliği ve espresso\'nun yoğunluğu bir arada — tatlı kahve severlerin favorisi olan Caramel Latte.', price: '₺209',
        tags: [], allergens: 'Süt.', imgCategory: 'signature'
      },
      {
        id: 'kh6', num: '06', name: 'MOCHA', ingredients: ['Espresso', 'Çikolata', 'Buharlı Süt'],
        desc: 'Espresso ve çikolatanın lezzetli birlikteliği — Mocha, kahve ve tatlı arası o nefis noktada duruyor. Bir bardakta hem kahve hem tatlı.', price: '₺229',
        tags: [], allergens: 'Süt, Kakao.', imgCategory: 'signature'
      },
      {
        id: 'kh7', num: '07', name: 'CARAMEL MACCHIATO', ingredients: ['Espresso', 'Karamel', 'Buharlı Süt'],
        desc: 'Buharlı sütün üzerine damlatılan espresso ve karamel sosu — görsel şölen ve lezzet birlikteliği. Sıcak veya soğuk tercih edebilirsiniz.', price: '₺229',
        tags: [], allergens: 'Süt.', imgCategory: 'signature'
      },
      {
        id: 'kh8', num: '08', name: 'TÜRK KAHVESİ', ingredients: ['Seylan Kahvesi', 'Geleneksel Pişirme'],
        desc: 'Yüzyıllık geleneğin bardağa yansıması — geleneksel yöntemle hazırlanan Türk kahvesi, köpüklü yüzeyiyle servis edilir. Lokum ile.', price: '₺149',
        tags: [{ label: 'Gelenek', type: 'gold' }], allergens: 'Kafein.', imgCategory: 'signature'
      },
      {
        id: 'kh9', num: '09', name: 'ESPRESSO', ingredients: ['Çift Çekim Espresso'],
        desc: 'Kahvenin özü ve ruhu — sıkıştırılmış kahve tozundan basınçla çekilen yoğun ve lezzetli espresso. Tek veya çift seçeneğiyle.', price: 'Single ₺169 / Double ₺179',
        tags: [], allergens: 'Kafein.', imgCategory: 'signature'
      },
      {
        id: 'kh10', num: '10', name: 'SALEP', ingredients: ['Salep Tozu', 'Sıcak Süt', 'Tarçın'],
        desc: 'Türk kış geleneğinin sıcaklığı — orchis kökünden elde edilen salep tozu ile hazırlanan bu kremsi ve sıcak içecek, üzerine tarçın serpilerek servis edilir.', price: '₺149',
        tags: [], allergens: 'Süt.', imgCategory: 'signature'
      },
      {
        id: 'kh11', num: '11', name: 'SICAK ÇİKOLATA', ingredients: ['Premium Kakao', 'Sıcak Süt'],
        desc: 'Soğuk gecelerin en sıcak kucağı — premium kakao ve sıcak sütün kremsi birlikteliği. Üzerine tarçın veya marshmallow ile kişiselleştirebilirsiniz.', price: '₺149',
        tags: [], allergens: 'Süt, Kakao.', imgCategory: 'signature'
      },
    ],

    alkolsuz: [
      {
        id: 'ak1', num: '01', name: 'BERRY HİBİSCUS',
        ingredients: ['Hibiskus', 'Orman Meyveleri', 'Limon', 'Sparkling'],
        desc: 'Hibiskus çiçeğinin derin pembesi ile orman meyvelerinin vahşi aroması bir arada. Alkolsüz ama karakteri tam bir kokteyl deneyimi.',
        price: '₺249', tags: [], allergens: 'Yok.', imgCategory: 'summer'
      },
      {
        id: 'ak2', num: '02', name: 'CİCİ BEBE',
        ingredients: ['Taze Meyveler', 'Şurup', 'Soda'],
        desc: "Adı kadar sevimli — taze meyveler ve renkli şurupların çocuksu neşesiyle hazırlanan bu alkolsüz içecek, tüm yaşlara hitap ediyor.",
        price: '₺249', tags: [], allergens: 'Yok.', imgCategory: 'summer'
      },
      {
        id: 'ak3', num: '03', name: 'MANGO PASSION FRUIT',
        ingredients: ['Taze Mango', 'Passion Fruit', 'Limon', 'Soda'],
        desc: 'Tropikal mango ve passion fruit\'un ekzotik dansı — limon\'un ferahlığıyla dengelenen bu alkolsüz kokteyl yaz\'ın en neşeli içeceğidir.',
        price: '₺249', tags: [{ label: 'Yaz', type: 'summer' }], allergens: 'Yok.', imgCategory: 'summer'
      },
      {
        id: 'ak4', num: '04', name: 'MİLKSHAKE',
        ingredients: ['Dondurma', 'Süt', 'Seçilen Aroma'],
        desc: 'Kremsi dondurma ve soğuk sütün birlikteliği — çikolata, çilek veya vanilyadan birini seçin. Nostaljik ve doyurucu bir alkolsüz keyif.',
        price: '₺249', tags: [], allergens: 'Süt, Laktoz.', imgCategory: 'summer'
      },
      {
        id: 'ak5', num: '05', name: 'COOL LİME',
        ingredients: ['Taze Misket Limonu', 'Nane', 'Şeker', 'Soda'],
        desc: 'Misket limonunun keskin tazeliği ve taze nanenin serinletici aroması bir arada — şekersiz tercih için barmenimize söyleyin. En ferah alkolsüz seçenek.',
        price: '₺249', tags: [{ label: 'Yaz', type: 'summer' }], allergens: 'Yok.', imgCategory: 'summer'
      },
    ],

    soft: [
      {
        id: 'sf1', num: '01', name: 'COCA COLA', ingredients: ['330ml Kutu'],
        desc: 'Dünyanın en tanınan içeceği. Soğuk servis.', price: '₺149', tags: [], allergens: 'Kafein.', imgCategory: 'summer'
      },
      {
        id: 'sf2', num: '02', name: 'RED BULL CLASSIC', ingredients: ['250ml'],
        desc: 'Enerji içeceğinin efsanesi — kafein, taurin ve B vitaminleri ile zihinsel ve fiziksel performansı destekler.', price: '₺169', tags: [], allergens: 'Kafein, Taurin.', imgCategory: 'summer'
      },
      {
        id: 'sf3', num: '03', name: 'SCHWEPPES TONIC', ingredients: ['200ml'],
        desc: 'Cin & Tonik\'in olmazsa olmazı — Schweppes Indian Tonic, quinine acılığı ve ferah karbonasyonuyla premium tonic standartını belirliyor.', price: '₺159', tags: [], allergens: 'Yok.', imgCategory: 'summer'
      },
      {
        id: 'sf4', num: '04', name: 'SODA', ingredients: ['200ml'],
        desc: 'Saf karbonasyon — kokteyllerde seyreltici veya düz içecek olarak kullanılan temiz ve ferah soda.', price: '₺89', tags: [], allergens: 'Yok.', imgCategory: 'summer'
      },
      {
        id: 'sf5', num: '05', name: 'FANTA', ingredients: ['330ml'],
        desc: 'Portakal aromasının ferahlığı — Fanta\'nın tanıdık turuncu tadı.', price: '₺149', tags: [], allergens: 'Yok.', imgCategory: 'summer'
      },
      {
        id: 'sf6', num: '06', name: 'SPRİTE', ingredients: ['330ml'],
        desc: 'Limon-misket limonu karbonasyonunun serinletici tazeliği.', price: '₺149', tags: [], allergens: 'Yok.', imgCategory: 'summer'
      },
    ],

    yemek: [
      {
        id: 'ym1', num: '01', name: 'PİCCHİO HAMBURGERİ',
        ingredients: ['Picchio Özel Burger', 'El Yapımı'],
        desc: "Picchio'nun imza hamburgeri — özel hazırlanmış köfte, taze malzemeler ve ev yapımı sos ile. Barın en sevilen yemeği.",
        price: '₺300', tags: [{ label: 'İmza', type: 'gold' }], allergens: 'Gluten, Et.', imgCategory: 'summer'
      },
      {
        id: 'ym2', num: '02', name: 'PİCCHİO CHEESE BURGER',
        ingredients: ['Burger', 'Özel Peynir', 'El Yapımı'],
        desc: "Picchio'nun imza burgerine eklenen özel eritme peyniri katmanı — lezzeti bir üst seviyeye taşıyan cheeseburgerin Picchio versiyonu.",
        price: '₺325', tags: [], allergens: 'Gluten, Et, Süt.', imgCategory: 'summer'
      },
      {
        id: 'ym3', num: '03', name: 'ÇITIR TAVUK',
        ingredients: ['Çıtır Paneli Tavuk', 'Dip Sos'],
        desc: 'Özel baharatlarla panellenmiş çıtır tavuk parçaları — mükemmel bir atıştırmalık ya da ana yemek alternatifi. Dip sos ile servis edilir.',
        price: '₺350', tags: [], allergens: 'Gluten, Tavuk.', imgCategory: 'summer'
      },
      {
        id: 'ym4', num: '04', name: 'PENNE BOLONEZ',
        ingredients: ['Penne Makarna', 'Et Sosu', 'Parmesan'],
        desc: 'İtalyan klasiğinin bar versiyonu — al dente penne ve zengin kıymalı domates sosu üzerine Parmesan serpilmiş doyurucu bir pasta.',
        price: '₺350', tags: [], allergens: 'Gluten, Et.', imgCategory: 'signature'
      },
      {
        id: 'ym5', num: '05', name: 'PENNE ALFREDO',
        ingredients: ['Penne Makarna', 'Alfredo Sos', 'Parmesan'],
        desc: 'Kremsi Alfredo sosu ve al dente penne — sütün, tereyağının ve Parmesan\'ın zarif birlikteliği. Hafif ama doyurucu bir akşam yemeği.',
        price: '₺350', tags: [], allergens: 'Gluten, Süt.', imgCategory: 'signature'
      },
      {
        id: 'ym6', num: '06', name: 'PATATES TABABI',
        ingredients: ['Çıtır Patates', 'Dip Sos'],
        desc: 'Klasik çıtır patates tabağı — içeceklerin mükemmel eşlikçisi. Dip sos seçeneğiyle gelir.',
        price: '₺200', tags: [], allergens: 'Gluten.', imgCategory: 'summer'
      },
      {
        id: 'ym7', num: '07', name: 'PİCCHİO BİRA TABABI',
        ingredients: ['Seçkin Atıştırmalıklar', 'Dip Soslar'],
        desc: "Picchio'nun özel hazırladığı atıştırmalık tabağı — bira veya içeceklerinizle mükemmel eşleşen seçkin çerez ve mezeler.",
        price: '₺400', tags: [{ label: 'Paylaşım', type: 'gold' }], allergens: 'Çeşitli.', imgCategory: 'summer'
      },
      {
        id: 'ym8', num: '08', name: 'ANTEP FISTIĞI',
        ingredients: ['Tuzlu Antep Fıstığı'],
        desc: 'Premium Gaziantep antep fıstığı — kokteyllerinizin yanında en iyi atıştırmalık.',
        price: '₺300', tags: [], allergens: 'Fıstık.', imgCategory: 'summer'
      },
      {
        id: 'ym9', num: '09', name: 'KARIŞIK LUX',
        ingredients: ['Kuruyemiş Karışımı', 'Premium Seçki'],
        desc: 'Badem, kaju, fındık ve daha fazlasının lüks karışımı — içeceklerinizin en şık eşlikçisi.',
        price: '₺200', tags: [{ label: 'Lüks', type: 'gold' }], allergens: 'Çeşitli kuruyemiş.', imgCategory: 'summer'
      },
    ],

    happyhour: [
      {
        id: 'hh1', num: '01', name: 'TÜM HAFTA 1+1 GRİNCH',
        ingredients: ['London Dry Gin', 'Kuzu Kulağı', 'Lime Suyu', 'Vegan Foamer'],
        desc: 'Tüm hafta boyunca geçerli! Grinch alın, bir tane daha bizden — haftalık en favori teklifimiz.',
        price: '₺600 (2 Adet)', tags: [{ label: 'Her Gün!', type: 'summer' }], allergens: 'Yok.', imgCategory: 'signature'
      },
      {
        id: 'hh2', num: '02', name: 'PAZARTESİ 1+1 TEQUİLA SUNRISE',
        ingredients: ['Tequila', 'Portakal Suyu', 'Grenadine'],
        desc: 'Pazartesi moralini yükselt! Tequila Sunrise iki kişilik tadın tek kişilik fiyatıyla. Haftanın en güzel başlangıcı.',
        price: '₺600 (2 Adet)', tags: [{ label: 'Pazartesi', type: 'new' }], allergens: 'Yok.', imgCategory: 'summer'
      },
      {
        id: 'hh3', num: '03', name: 'SALI 1+1 FUEGO',
        ingredients: ['Pink Gin', 'White Peach', 'Lime Suyu', 'Vegan Foamer'],
        desc: 'Salı alevleniyor! Fuego\'nun ateşini paylaş — arkadaşınla bir tane al, bir tanesi hediyemiz.',
        price: '₺600 (2 Adet)', tags: [{ label: 'Salı', type: 'new' }], allergens: 'Yok.', imgCategory: 'summer'
      },
      {
        id: 'hh4', num: '04', name: 'ÇARŞAMBA 1+1 WHISKEY SOUR',
        ingredients: ['Viski', 'Limon Suyu', 'Şeker Şurubu'],
        desc: "Haftanın ortasında viski keyfi! Whiskey Sour'un ekşi-tatlı dengesini seviyor musun? Çarşamba günleri iki kat neşe.",
        price: '₺600 (2 Adet)', tags: [{ label: 'Çarşamba', type: 'new' }], allergens: 'Yok.', imgCategory: 'signature'
      },
      {
        id: 'hh5', num: '05', name: 'PERŞEMBE 1+1 THE SECRET',
        ingredients: ['...Sır...'],
        desc: "The Secret'ın gizemini çöz — perşembe akşamları bu ikonik içecekten iki tane, tek fiyata. Sır dolu bir gece için mükemmel başlangıç.",
        price: '₺600 (2 Adet)', tags: [{ label: 'Perşembe', type: 'new' }], allergens: 'Sormayın.', imgCategory: 'signature'
      },
      {
        id: 'hh6', num: '06', name: 'CUMA 1+1 TÜM SPRİTZ',
        ingredients: ['Aperol / Campari / Hugo / Limoncello Spritz'],
        desc: 'Cuma geldi, spritz vakti! Dört farklı spritz çeşidinden istediğini seç — biri senden biri bizden. Hafta sonu ruhunu cuma ile başlatıyoruz!',
        price: '₺600 (2 Adet)', tags: [{ label: 'Cuma', type: 'summer' }], allergens: 'Sülfitler.', imgCategory: 'summer'
      },
      {
        id: 'hh7', num: '07', name: 'YERLİ BİRALAR',
        ingredients: ['Yerli Bira Çeşitleri'],
        desc: 'Happy Hour boyunca yerli biralar için özel fiyat — kokteyl olmadan da harika bir Picchio gecesi geçirebilirsiniz.',
        price: '₺150', tags: [], allergens: 'Gluten.', imgCategory: 'summer'
      },
    ],
  }
};
