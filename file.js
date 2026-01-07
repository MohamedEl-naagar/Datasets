import fs from "fs/promises";
import path from "path";

let chats = [];

async function readFiles() {
  try {
    chats = await fs.readdir("Hojuzat");
  } catch (err) {
    console.log(err);
  }
}

async function readFile() {
  try {
    for (const element of chats) {
      const message = [];

      const data = await fs.readFile(`./Hojuzat/${element}`, 'utf-8');
      const info = JSON.parse(data);

      for (let i = 0; i < info.payload.length; i++) {
        const item = info.payload[i];
        if (item?.sender?.type && item.sender.type !== "workflow" && item.content !== null) {
          message.push({
            sender: item.sender.type,
            content: item.content,
          });
        }
      }

      const name = info.meta.contact.phone_number;
      const filePath = path.join('DataSets', name + '.json');
      await fs.writeFile(filePath, JSON.stringify(message, null, 2), 'utf-8');
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

(async () => {
  await readFiles();
  console.log("Start processing...");
  await readFile();
})();
