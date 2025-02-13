import { CAINode } from 'cainode'

const token = global.tokencai || 'fb05cb8ac1e08192cd59f106ccf9ac5d18902e95'
const client = new CAINode()

//search
async function search(q) {
  await client.login(token)
  try {
    let anu = await client.character.search(q)
    return ({
      status: true,
      result: anu.characters
    })
  } catch (e) {
    return ({
      status: false,
      error: e.message
    })
  }
}

//create room
async function create_room(character_id) {
  await client.login(token)
  try {
    let cret = await client.group_chat.create(await generateUUID(), character_id)
    return ({
      status: true,
      result: {
        chat_id: cret.id,
        character_id: cret.characters[0].id
      }
    })
  } catch (e) {
    return ({
      status: false,
      error: e.message
    })
  }
}

async function chat(q, chat_id, character_id) {
  await client.login(token)
  try {
    let list = await client.group_chat.list()
    let find = await findRoom(list.rooms, chat_id, character_id)
    await client.group_chat.connect(find.id)
    let res = await client.group_chat.send_message(q)
    let turn = await client.group_chat.generate_turn()
    let rawContent = turn.push.pub.data.turn.candidates.find(candidate => candidate.candidate_id === turn.push.pub.data.turn.primary_candidate_id).raw_content;
    await client.group_chat.disconnect(find.id)
    return ({
      status: true,
      result: rawContent
    })
  } catch (e) {
    return ({
      status: false,
      error: e
    })
  }
  
}

async function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

async function findRoom(rooms, chatId, characterId) {
  // Iterasi setiap room
  return rooms.find(room => {
    // Periksa apakah chat_id sesuai
    if (room.id === chatId) {
      // Iterasi setiap karakter dalam room untuk mencari character_id yang sesuai
      return room.characters.some(character => character.id === characterId);
    }
    return false;
  });
};

export { search, create_room, chat }