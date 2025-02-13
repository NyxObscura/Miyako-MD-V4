async function resetLimit() {
  let user = global.db.data.users;
  let data = Object.keys(user).filter((number) => user[number].limit < 100);
  for (let number of data) {
    if (user[number].limit < 100) {
      user[number].limit = 100;
    }
  }
}

async function resetInvestPrice() {
  let invest = global.db.data.bots.invest.item;
  let data = Object.keys(invest);
  for (let name of data) {
    invest[name].hargaBefore = invest[name].harga;
  }
}

async function resetChatUser() {
  let user = global.db.data.users;
  let data = Object.keys(user).filter((number) => user[number].chat > 0);
  for (let number of data) {
    user[number].chat = 0;
  }
}

async function resetChatGc() {
  let chat = global.db.data.chats;
  let data = Object.keys(chat).filter((v) => v.endsWith("@g.us"));
  for (let number of data) {
    let user = chat[number].member;
    
    // Tambahkan pengecekan apakah user tidak undefined atau null dan merupakan object
    if (!user || typeof user !== 'object') continue;

    let data2 = Object.keys(user).filter((v) => user[v].chat > 0);
    for (let member of data2) {
      user[member].chat = 0;
    }
  }
}

export { resetLimit, resetInvestPrice, resetChatUser, resetChatGc };
