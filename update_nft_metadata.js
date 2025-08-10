const fs = require('fs');
const path = require('path');

const NFTS_DIR = path.join(__dirname, 'public', 'img', 'NFTs');
const CREATOR_ADDRESS = 'EMFwnLLYNT4KKcT5yBhBesfLNkzks5d5DCUWe2gr1zdN';
const CREATOR_SHARE = 100;

fs.readdirSync(NFTS_DIR).forEach(file => {
  if (file.endsWith('.json')) {
    const filePath = path.join(NFTS_DIR, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    // Only add creators if not present or empty
    if (!data.creators || !Array.isArray(data.creators) || data.creators.length === 0) {
      data.creators = [
        {
          address: CREATOR_ADDRESS,
          share: CREATOR_SHARE
        }
      ];
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`Updated: ${file}`);
    } else {
      console.log(`Skipped (already has creators): ${file}`);
    }
  }
});

console.log('Done updating NFT metadata files.'); 