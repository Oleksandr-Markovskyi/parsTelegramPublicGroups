import { fnSaveFile } from "../file/saveFile.mjs";
import * as cheerio from "cheerio";

const data = [];
let fileNumber = 1;
let count = 0;

export function parsingHTML(htmlBlock, messageId) {
  return new Promise(async (resolve) => {
    const $ = cheerio.load(htmlBlock);
    const photo = $(".tgme_widget_message_user img").attr("src");
    const sanitizedPhoto = photo && photo.startsWith("https://") ? photo : null;
    const name = $(".tgme_widget_message_author_name span").text().trim();
    const link = $(".tgme_widget_message_author_name").attr("href");
    const dateTime = $("time.datetime").attr("datetime");
    const message = $(".tgme_widget_message_text.js-message_text")
      .text()
      .trim();

    let profile = {
      message_link: `${process.env.TARGET_GROUP}/${messageId}`,
      date_time: dateTime || null,
      name: name || null,
      link: link || null,
      photo: sanitizedPhoto || null,
      message: message || null,
    };

    if (count === Number(process.env.MAX_POSTS_IN_FILE)) {
      fileNumber += 1;
      count = 0;
      data.length = 0;
    }

    data.push(profile);
    await fnSaveFile(data, fileNumber);

    count += 1;

    console.log("\n=======================================================");
    console.log("Profile:", profile);

    resolve();
  });
}
