const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

(async function(){
  const imagesDir = path.join(__dirname, '..', 'images');
  const images = ['kiki.png','totoro.png','haku.png'];
  const backupDir = path.join(imagesDir, 'backup_trim');
  const outDir = path.join(imagesDir, 'trimmed');
  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(backupDir, { recursive: true });

  for (const imgName of images) {
    const src = path.join(imagesDir, imgName);
    const backup = path.join(backupDir, imgName);
    if (!fs.existsSync(src)) {
      console.error('Missing:', src);
      continue;
    }
    try {
      fs.copyFileSync(src, backup);
      // write trimmed output to a separate folder to avoid file-lock rename errors
      const outPath = path.join(outDir, imgName);
      await sharp(src)
        .trim()
        .toFile(outPath);
      console.log('Trimmed ->', path.relative(__dirname, outPath));
    } catch (err) {
      console.error('Failed to trim', imgName, err.message);
    }
  }
})();