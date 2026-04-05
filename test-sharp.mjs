
import sharp from 'sharp';
import fs from 'fs';

async function testSharp() {
  try {
    const inputPath = 'public/img/ai/ao-redor-do-portao.png';
    const outputPath = 'public/img/ai/test-output.webp';
    
    if (!fs.existsSync(inputPath)) {
      console.error('Input file does not exist');
      return;
    }

    await sharp(inputPath)
      .resize(400, 300, { fit: 'cover' })
      .webp({ quality: 80 })
      .toFile(outputPath);
    
    const stats = fs.statSync(outputPath);
    console.log('Success! Output size:', stats.size, 'bytes');
    fs.unlinkSync(outputPath);
  } catch (err) {
    console.error('Sharp error:', err);
  }
}

testSharp();
