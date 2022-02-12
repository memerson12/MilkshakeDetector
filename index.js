const puppeteer = require('puppeteer');

async function main() {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setViewport({height: 695, width: 1440});
    await page.goto('https://get.cbord.com/wpi/full/login.php');
}
main()

