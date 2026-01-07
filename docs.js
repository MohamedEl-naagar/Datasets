import fs from "fs/promises";
import mammoth from "mammoth";
import path from "path";

let chats = [];

async function readFiles() {
  try {
    const data = await fs.readdir("Data");
    chats = data;
  } catch (err) {
    console.log(err);
  }
}

async function readDocxAsJson() {
  try {
    const folder = "./Hojuzat";
    await fs.mkdir(folder, { recursive: true });

    for (const element of chats) {
      const result = await mammoth.extractRawText({ path: `./Data/${element}` });
      const rawText = result.value;
      const cleaned = rawText.replace(/\r/g, "").trim();
      const jsonData = JSON.parse(cleaned);

      console.log("JSON parsed successfully");

      const name = jsonData.meta.contact.phone_number;
      const filePath = path.join(folder, `${name}.json`);

      await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), "utf-8");
      console.log(" File saved to folder:", filePath);
    }
  } catch (err) {
    console.error("Error:", err.message);
  }
}

async function main() {
  await readFiles();
  await readDocxAsJson();
}

main();
