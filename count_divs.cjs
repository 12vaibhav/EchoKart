
const fs = require('fs');
const content = fs.readFileSync('c:/Users/VaibhavDhiman/Echokart/src/pages/dashboard/ProductsManagement.tsx', 'utf8');
const opens = (content.match(/<div/g) || []).length;
const closes = (content.match(/<\/div>/g) || []).length;
console.log(`Opens: ${opens}, Closes: ${closes}`);
