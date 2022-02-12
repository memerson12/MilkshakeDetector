const puppeteer = require('puppeteer');
const { v4: uuidv4 } = require('uuid');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config()

async function main() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({height: 695, width: 1440});
    await page.goto('https://get.cbord.com/wpi/full/login.php');
    await page.waitForSelector("#i0116");
    await page.type("#i0116", process.env.USERNAME);
    await page.click("#idSIButton9");
    await page.waitForSelector("#i0118");
    await page.type("#i0118", process.env.PASSWORD);
    await page.waitForTimeout(2000);
    await page.click("#idSIButton9");
    await page.waitForSelector("#bs-example-navbar-collapse-1 > ul:nth-child(1) > li:nth-child(2) > a");
    await page.goto("https://get.cbord.com/wpi/full/food_merchant.php?ID=014fef42-dd08-4799-88a0-487c402481b4");
    await page.waitForSelector("#food_merchant_menu_div > div > ul");
    const milkshakeOption = await page.$x("//a[contains(text(),'Milk Shake')]");
    await milkshakeOption[0].click();
    const milkshakeMenu = await page.$(`[class="tab-pane active"]`);
    if (milkshakeMenu && (await (await milkshakeMenu.getProperty('firstElementChild')).getProperty('childElementCount'))._remoteObject.value > 0) {
        console.log("Milkshake is ready!");
        await fetch(`https://api.groupme.com/v3/groups/85327648/messages?token=${process.env.GROUPME_TOKEN}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: {
                    source_guid: uuidv4(),
                    "text": "Milkshake is not ready!"
                }
            })
        });
    } else {
        console.log("Milkshake is not ready!");
        await fetch(`https://api.groupme.com/v3/groups/85327648/messages?token=${process.env.GROUPME_TOKEN}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: {
                    source_guid: uuidv4(),
                    "text": "Milkshake is not ready!"
                }
            })
        });
    }
    await browser.close();
}


main();
// test();
