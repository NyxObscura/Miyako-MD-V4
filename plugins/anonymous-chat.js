/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
async function handler(m, { command, usedPrefix }) {
  command = command.toLowerCase();
  this.anonymous = this.anonymous ? this.anonymous : {};
  let footer = `\n_Ketik ${usedPrefix}next Untuk Lanjut_\n_Ketik ${usedPrefix}leave Untuk Keluar_`;
  switch (command) {
    case "next":
    case "leave": {
      let room = Object.values(this.anonymous).find((room) =>
        room.check(m.sender),
      );
      if (!room)
        return this.reply(
          m.chat,
          `Kamu tidak sedang berada di anonymous chat\n${footer}`,
          m,
        );
      m.reply("Ok");
      let other = room.other(m.sender);
      if (other)
        await this.reply(other, `Partner meninggalkan chat\n${footer}`, m);
      delete this.anonymous[room.id];
      if (command === "leave") break;
    }
    case "start": {
      if (Object.values(this.anonymous).find((room) => room.check(m.sender)))
        return this.reply(
          m.chat,
          `Kamu masih berada di dalam anonymous chat, menunggu partner\n${footer}`,
          m,
        );
      let room = Object.values(this.anonymous).find(
        (room) => room.state === "WAITING" && !room.check(m.sender),
      );
      if (room) {
        await this.reply(room.a, `Partner ditemukan!\n${footer}`, m);
        room.b = m.sender;
        room.state = "CHATTING";
        await this.reply(room.b, `Partner ditemukan!\n${footer}`, m);
      } else {
        let id = +new Date();
        this.anonymous[id] = {
          id,
          a: m.sender,
          b: "",
          state: "WAITING",
          check: function (who = "") {
            return [this.a, this.b].includes(who);
          },
          other: function (who = "") {
            return who === this.a ? this.b : who === this.b ? this.a : "";
          },
        };
        await this.reply(m.chat, `Menunggu partner...\n${footer}`, m);
      }
      break;
    }
  }
}
handler.help = ["start", "leave", "next"];
handler.tags = ["anonymous"];
handler.command = ["start", "leave", "next"];

handler.private = true;

export default handler;
