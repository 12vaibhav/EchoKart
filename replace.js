import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace(/font-black/g, 'font-bold');
content = content.replace(/tracking-tighter/g, 'tracking-tight');
content = content.replace(/rounded-\[2rem\]/g, 'rounded-2xl');
content = content.replace(/rounded-\[2\.5rem\]/g, 'rounded-2xl');
fs.writeFileSync('src/App.tsx', content);
console.log('Done');
