import fs from 'fs';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

async function createIco() {
  try {
    // 1. Convert SVG to high-res PNG
    await sharp('logo.svg')
      .resize(256, 256)
      .png()
      .toFile('temp.png');
      
    // 2. Use png-to-ico library to generate valid ICO
    const buf = await pngToIco('temp.png');
    
    // 3. Save as favicon.ico
    fs.writeFileSync('public/favicon.ico', buf);
    
    // 4. Cleanup temp file
    fs.unlinkSync('temp.png');
    
    console.log('Successfully created valid public/favicon.ico');
  } catch (err) {
    console.error('Error generating ICO:', err);
  }
}

createIco();
