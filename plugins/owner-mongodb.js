/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

import mongoose from "mongoose";
import fs from "fs";

const handler = async (m, { conn }) => {
  try {
    await upload();
    m.reply("success");
  } catch (e) {
    m.reply(e.message);
  }
};
handler.command = ["upmongodb", "uptomongodb"];
handler.help = ["uptomongodb"];
handler.tags = ["owner"];
handler.owner = true;
export default handler;

async function upload() {
  const uri = global.mongodb;

  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", async function () {
    console.log("Successfully connected to MongoDB!");

    // Membaca file database.json
    const jsonData = fs.readFileSync("database.json", "utf8");

    const dataSchema = new mongoose.Schema({
      data: {
        type: Object,
        required: true,
        default: JSON.parse(jsonData),
      },
    });

    const DataModel = mongoose.model(global.dbName, "datas");

    try {
      const result = await DataModel.create({});
      console.log("Data successfully inserted:", result);
    } catch (err) {
      console.error(err);
    } finally {
      mongoose.disconnect();
    }
  });
}
