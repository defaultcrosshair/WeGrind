const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));

  console.log("Navigating to app...");
  await page.goto('http://localhost:5173/');

  console.log("Waiting for app to load...");
  await page.waitForSelector('button');

  console.log("Clicking Leaderboard tab...");
  // Find the leaderboard button
  const buttons = await page.$$('button');
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.includes('Leaderboard')) {
      await btn.click();
      break;
    }
  }

  // Wait a bit for crash to happen
  await new Promise(r => setTimeout(r, 2000));
  
  await browser.close();
})();
