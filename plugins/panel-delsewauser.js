/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/*
 * @Author: Cifumo
 * @Web: https://rest.cifumo.biz.id
 */

/*import fs from "fs";

function deletePanelUser(userid) {
  const filename = "./database/datapanel.json";
  const fileContent = fs.readFileSync(filename, "utf8");

  const data = JSON.parse(fileContent);
  const panel = data.panel;

  if (panel[userid]) {
    delete panel[userid];
    fs.writeFileSync(filename, JSON.stringify(data));
    console.log(`User with ID ${userid} has been removed from datapanel.json`);
  } else {
    console.log(`User with ID ${userid} not found in datapanel.json`);
  }
}

let handler = (m, { usedPrefix, command, text }) => {
  const userid = text.trim();

  if (!userid) {
    return m.reply("Please provide user ID");
  }

  deletePanelUser(userid);

  return m.reply(`User with ID ${userid} has been removed from datapanel.json`);
};

handler.tags = ["panel"];
handler.command = ["delsewauser"];
handler.owner = true;

export default handler;
*/