const fs = require('fs');
(async () => {
    try {
        const puppeteer = require('puppeteer');
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        
        await page.goto('http://localhost:3001/dashboard/products', { waitUntil: 'domcontentloaded', timeout: 8000 });
        const rootHTML1 = await page.evaluate(() => document.getElementById('root')?.innerHTML);
        
        await page.goto('http://localhost:3001/product', { waitUntil: 'domcontentloaded', timeout: 8000 });
        const rootHTML2 = await page.evaluate(() => document.getElementById('root')?.innerHTML);

        console.log('DASHBOARD HTML:', rootHTML1?.substring(0, 500) || 'EMPTY');
        if (rootHTML1?.includes('Application Crashed')) console.log('DASHBOARD CRASHED');

        console.log('PRODUCT HTML:', rootHTML2?.substring(0, 500) || 'EMPTY');
        if (rootHTML2?.includes('Application Crashed')) console.log('PRODUCT CRASHED');

        await browser.close();
    } catch(e) {
        console.error("Puppeteer fail", e);
    }
})();
