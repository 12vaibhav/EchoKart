import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace(/fill-current/g, 'fill-[#ff9c1a] text-[#ff9c1a]');
content = content.replace(/text-gray-300/g, 'text-gray-200');
fs.writeFileSync('src/App.tsx', content);
console.log('Done');
