const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('requestfailed', request => {
    console.log(`REQUEST FAILED: ${request.url()} - ${request.failure()?.errorText || 'HTTP ' + request.response()?.status()}`)
  });
  
  page.on('response', response => {
    if (!response.ok()) {
      console.log(`HTTP ${response.status()} RESPONSE: ${response.url()}`);
    }
  });

  try {
    await page.goto('http://localhost:3001', { waitUntil: 'networkidle0', timeout: 5000 });
  } catch (err) {}
  
  const rootHTML = await page.evaluate(() => document.getElementById('root')?.innerHTML);
  console.log('ROOT HTML LENGTH:', rootHTML?.length);
  
  await browser.close();
})();
