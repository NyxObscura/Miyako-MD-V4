/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/

let handler = async (m, { conn, text }) => {
  let args = text.split("\n").map((arg) => arg.trim());
  let name = args[0];
  let values = args.slice(1);

  if (!name) {
    return m.reply(`*Contoh pemakaian:*
.poll text
text1
text2
seterusnya...

⌕ Contoh:
.poll best game
free fire
mobile legends
call of duty mobile
pubg mobile`);
    return;
  }

  if (values.length < 2) {
    m.reply(`*Berikan minimal 2 kata yang ingin dipoll*\n\n⌕ Contoh:\n.poll mending mana\npaolo maldini\nsergio ramos`);
    return;
  }

  let poll = {
    name: name,
    values: values,
    selectableCount: true,
  };

  conn.sendMessage(m.chat, {
    poll: poll,
  });
};
handler.help = ["poll"];
handler.tags = ["group"];
handler.command = /^(poll|polling)$/i;
handler.group = true;

export default handler;
