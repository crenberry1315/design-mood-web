const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const htmlPath = path.join(__dirname, 'public', 'store-map-vector.html');
const outPngPath = path.join(__dirname, 'public', 'store-map-vector.png');

console.log('HTML Path:', htmlPath);
console.log('Output PNG Path:', outPngPath);

const args = [
  '--headless',
  '--disable-gpu',
  '--window-size=1200,900',
  `--screenshot=${outPngPath}`,
  `file:///${htmlPath.replace(/\\/g, '/')}`
];

const proc = spawn(edgePath, args);

proc.on('close', (code) => {
  console.log('Child process exited with code:', code);
  if (fs.existsSync(outPngPath)) {
    console.log('PNG successfully created at:', outPngPath);
    // Copy to store-map-raw.png and store-map.png
    const rawPath = path.join(__dirname, 'public', 'store-map-raw.png');
    const mapPath = path.join(__dirname, 'public', 'store-map.png');
    const rootRawPath = path.join(__dirname, 'store-map-raw.png');
    const rootMapPath = path.join(__dirname, 'store-map.png');
    
    fs.copyFileSync(outPngPath, rawPath);
    fs.copyFileSync(outPngPath, mapPath);
    fs.copyFileSync(outPngPath, rootRawPath);
    fs.copyFileSync(outPngPath, rootMapPath);
    console.log('Copied PNG to all store-map targets!');
  } else {
    console.error('PNG creation failed!');
  }
});
