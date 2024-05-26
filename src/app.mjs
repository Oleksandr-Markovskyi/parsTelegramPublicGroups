import "dotenv/config";
import { Builder, By } from "selenium-webdriver";

import { checkENV } from "./helpers/checkENV.mjs";
import { parsingHTML } from "./helpers/scripts/parsing.mjs";

let startMessageId;
let endMessageId;

async function run() {
  const driver = await new Builder().forBrowser("chrome").build();

  while (startMessageId >= endMessageId) {
    await driver.get(`${process.env.TARGET_GROUP}/${startMessageId}`);
    await driver.sleep(Number(process.env.TIME_OUT));

    try {
      const iframe = await driver.findElement(By.tagName("iframe"));
      await driver.switchTo().frame(iframe);

      const iframeDocumentHtml = await driver
        .findElement(By.tagName("html"))
        .getAttribute("outerHTML");

      await parsingHTML(iframeDocumentHtml, startMessageId);

      await driver.switchTo().defaultContent();
    } catch (err) {
      console.log("\n-------------------------------------------------------");
      console.error(`Error processing message number ${startMessageId}`);
      // console.error(`Error processing message number ${startMessageId}:`, err);
    }

    await driver.sleep(1000);

    startMessageId -= 1;
  }

  await driver.quit();
}

const errorFlag = checkENV();

if (!errorFlag) {
  startMessageId = Number(process.env.START_ID_MESSAGE);
  endMessageId = Number(process.env.END_ID_MESSAGE);
  run().catch(console.error);
} else {
  console.log("Errors in environment variables. Exiting.");
}
