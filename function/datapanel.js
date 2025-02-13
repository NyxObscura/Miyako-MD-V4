/* 
『WARNING』 WATERMARK INI TIDAK BOLEH DI HAPUS
* SCRIPT BY XENZ
* CODE BY XENZ
* NAMA SCRIPT MIYAKO-TSUKIYUKI
* JANGAN DI HAPUS KONTOL
* FOLLOW SALURAN XENZ
https://whatsapp.com/channel/0029ValeNDG0LKZLbAQZNs0i
*/
export function addDataPanel(nohp, userid, serverid, exppanel, srvid, ram, cpu, disk, admin, notif) {
  // Menambahkan objek "result" ke global.db.data.bots.panel
  global.db.data.bots.panel = Object.assign(global.db.data.bots.panel || {}, {
    [userid]: {
      "nohp": nohp,
      "userid": userid,
      "serverid": serverid,
      "exppanel": exppanel,
      "srvid": srvid,
      "ram": ram,
      "cpu": cpu,
      "disk": disk,
      "admin": admin,
      "notif": notif,
    }
  });
}

export function editExppanel(userid, newExppanel) {
  const panel = global.db.data.bots.panel;

  if (panel[userid]) {
    panel[userid].exppanel = newExppanel;
    console.log(`exppanel for user ${userid} updated to ${newExppanel}`);
  } else {
    console.log(`user ${userid} not found in global.db.data.bots.panel`);
  }
}

// Menghapus pemantauan file saat aplikasi dihentikan
process.on('SIGINT', () => {
  process.exit();
});

export default {
  addDataPanel
};