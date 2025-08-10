const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, 'assets');
const BASE_IPFS_URL = 'https://gateway.lighthouse.storage/ipfs/bafybeif4dy4t2fid4u3pfqboasjhmy76otf5nwtsigr52p6aomvs46obga';

// Read all JSON files in the assets directory
fs.readdirSync(ASSETS_DIR).forEach(file => {
  if (file.endsWith('.json')) {
    const filePath = path.join(ASSETS_DIR, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Extract the filename without extension (e.g., "fatcat1" from "fatcat1.png")
    const currentImage = data.image;
    if (currentImage && currentImage.includes('.png')) {
      const filename = currentImage.replace('.png', '');
      const newImageUrl = `${BASE_IPFS_URL}/${filename}.png`;
      
      // Update the image field
      data.image = newImageUrl;
      
      // Write the updated data back to the file
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`Updated: ${file} - ${currentImage} -> ${newImageUrl}`);
    } else {
      console.log(`Skipped: ${file} - No valid image field found`);
    }
  }
});

console.log('Done updating image URLs in metadata files.'); 