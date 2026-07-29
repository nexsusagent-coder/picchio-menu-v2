const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('C:\\\\Users\\\\boone\\\\.gemini\\\\antigravity-ide\\\\brain\\\\c25aa492-2341-4165-beef-02d04a0b89e9\\\\.system_generated\\\\steps\\\\1001\\\\content.md', 'utf-8');

const $ = cheerio.load(html);
const extracted = {};

$('h3').each((i, el) => {
    const titleNode = $(el).contents().filter(function() {
        return this.type === 'text';
    }).text().trim();
    
    const pNode = $(el).closest('.flex-col').find('p').first();
    const desc = pNode.text().trim();
    
    if (titleNode && desc && desc !== '...' && desc !== '...Secret...') {
        extracted[titleNode.toLowerCase()] = desc;
    }
});

console.log('Extracted items count:', Object.keys(extracted).length);

if (Object.keys(extracted).length > 0) {
    const dataPath = 'C:\\\\Users\\\\boone\\\\.gemini\\\\antigravity-ide\\\\scratch\\\\qr-menu\\\\menu-data.json';
    const menuData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    
    let updatedCount = 0;
    menuData.categories.forEach(cat => {
        cat.items.forEach(item => {
            const t = item.title.toLowerCase().trim();
            let matchedDesc = null;
            
            if (extracted[t]) {
                matchedDesc = extracted[t];
            } else {
                for (let key in extracted) {
                    if (t.startsWith(key + ' ') || t.startsWith(key + '(')) {
                        matchedDesc = extracted[key];
                        break;
                    }
                }
            }
            
            if (matchedDesc) {
                item.description = matchedDesc;
                updatedCount++;
            }
        });
    });
    
    fs.writeFileSync(dataPath, JSON.stringify(menuData, null, 2));
    console.log('Updated items in menu-data.json:', updatedCount);
}
