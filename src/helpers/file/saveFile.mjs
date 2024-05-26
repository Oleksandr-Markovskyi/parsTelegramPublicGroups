import fs from "fs";
import path from "path";

export async function fnSaveFile(data, fileNumber) {
  const filePath = path.resolve(
    `${process.env.OUTPUT_FOLDER}/${process.env.FILE_LOCAL_STORAGE}_${fileNumber}.json`
  );
  try {
    const jsonData = JSON.stringify(data, null, 2);
    await fs.promises.writeFile(filePath, jsonData);
    return { status: true };
  } catch (err) {
    console.error("Error saving file:", err);
    return { status: false };
  }
}
