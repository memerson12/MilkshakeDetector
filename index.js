const puppeteer = require('puppeteer');
const {v4: uuidv4} = require('uuid');
const axios = require('axios').default;
require('dotenv').config()

const sendMessage = async (text) => {
    await axios.post(`https://api.groupme.com/v3/groups/85327648/messages?token=${process.env.GROUPME_TOKEN}`, {
        message: {
            source_guid: uuidv4(),
            text: text
        }
    }, {
        headers: {
            "Content-Type": "application/json"
        }
    });
}

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
    try {
        await page.waitForSelector("#food_merchant_menu_div > div > ul");
        const milkshakeOption = await page.$x("//a[contains(text(),'Milk Shake')]");
        await milkshakeOption[0].click();
        const milkshakeMenu = await page.$(`[class="tab-pane active"]`);
        if (milkshakeMenu && (await (await milkshakeMenu.getProperty('firstElementChild')).getProperty('childElementCount'))._remoteObject.value > 0) {
            await sendMessage("Milkshake is ready!");
        } else {
            await sendMessage("Milkshake is not ready!");
        }
    } catch (e) {
       await sendMessage("Error: No menu found");
    }
    await browser.close();
}


main();
