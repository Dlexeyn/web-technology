const puppeteer = require("puppeteer");

(async () => {
	const browser = await puppeteer.launch({
		headless: true
	});
	const page = await browser.newPage()
	await page.goto("http://localhost:3000/login");

	await page.waitForSelector("#login");
	await page.type('#login', 'Алексей');
	await page.click('#btnLogin');
	await page.screenshot({ path: 'screenshot1.png'});

	await page.waitForSelector("#profile-content");
	await page.screenshot({ path: 'screenshot2.png'});

	await page.waitForSelector("#transaction-btn-1");

	await page.click('#transaction-btn-1');
	await page.screenshot({ path: 'screenshot3.png'});

	await page.waitForTimeout(4000);
	await page.screenshot({ path: 'screenshot4.png'});

	await browser.close();
})();
