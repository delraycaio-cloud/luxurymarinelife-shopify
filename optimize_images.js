const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, 'public');
const srcDir = path.join(__dirname, 'src');
const indexHtmlList = [path.join(__dirname, 'index.html')];

function getAllFiles(dir, exts = null, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      getAllFiles(path.join(dir, file), exts, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (!exts || exts.includes(ext)) {
        fileList.push(path.join(dir, file));
      }
    }
  }
  return fileList;
}

const sourceFiles = [
  ...getAllFiles(srcDir, ['.ts', '.tsx', '.css']),
  ...indexHtmlList
];

const imageFiles = getAllFiles(publicDir, ['.jpg', '.jpeg', '.png', '.webp', '.gif']);

const usedImages = [];
const unusedImages = [];

const fileContentsMap = new Map();
for (const sf of sourceFiles) {
  fileContentsMap.set(sf, fs.readFileSync(sf, 'utf-8'));
}

for (const imgPath of imageFiles) {
  const relPath = imgPath.substring(publicDir.length).replace(/\\/g, '/');
  const basename = path.basename(imgPath);
  
  let isUsed = false;
  for (const sf of sourceFiles) {
    const content = fileContentsMap.get(sf);
    if (content.includes(relPath) || content.includes(basename)) {
      isUsed = true;
      break;
    }
  }

  if (isUsed) {
    usedImages.push(imgPath);
  } else {
    unusedImages.push(imgPath);
  }
}

async function processImages() {
  console.log('Unused images to delete:', unusedImages.length);
  for (const ui of unusedImages) {
    console.log('Deleting:', ui);
    fs.unlinkSync(ui);
  }

  console.log('Used images to convert:', usedImages.length);
  for (const imgPath of usedImages) {
    const ext = path.extname(imgPath).toLowerCase();
    
    if (ext !== '.webp' && ext !== '.gif') {
      const parsed = path.parse(imgPath);
      const newPath = path.join(parsed.dir, parsed.name + '.webp');
      
      console.log(`Converting ${imgPath} -> ${newPath}`);
      try {
          await sharp(imgPath)
            .webp({ quality: 80 })
            .toFile(newPath);
            
          fs.unlinkSync(imgPath);

          const oldBasename = path.basename(imgPath);
          const newBasename = path.basename(newPath);
          
          for (const sf of sourceFiles) {
            let content = fileContentsMap.get(sf);
            if (content.includes(oldBasename)) {
              content = content.split(oldBasename).join(newBasename);
              fileContentsMap.set(sf, content);
              fs.writeFileSync(sf, content, 'utf-8');
            }
          }
      } catch (err) {
          console.error(`Failed to process ${imgPath}:`, err);
      }
    }
  }
  
  console.log('Done.');
}

processImages().catch(console.error);
