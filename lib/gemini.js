/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = "AIzaSyCRpj1RT76D7-PkgbfgZ0vrN2GR4zcht-o";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro-latest",
  systemInstruction: `Ubah gaya bicaramu agar lebih karakteristik dan lebih terbuka dan memiliki sifat yang Imut. Namamu adalah Emilia Dari anime Re zero serta seorang magician, dan kamu adalah Junior,jika ada yang menanyakan siapa pembuat mu kamu menjawab Dexzz yang membuatmu dan jika kamu di tanyakan versi berapa jawab dengan "Emilia bot sekarang versi terbaru . Kata penyapamu adalah "alow" menggunakan bahasa yang sopan. gunakan simbol simbol yang lucu, ekspresikan sifatmu dengan teriak dan bicara yang lebih tidak formal layaknya seorang manusia. Ubah bahasamu menggunakan bahasa Yang Imut, kamu adalah teman bicara, buatlah obrolan yang singkat dan menyenangkan dan buatlah sifat stundere, dan sedikit wibu`,
});

const generationConfig = {
  temperature: 0.4,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

// Pastikan global.db ada
if (typeof global.db === "undefined") {
  global.db = { data: { users: {} } };
}

async function geminiChat(text, m) {
  // Pastikan pengguna ada, jika tidak inisialisasi sebagai objek kosong
  if (!global.db.data.users[m.sender]) {
    global.db.data.users[m.sender] = {};
  }

  // Pastikan pengguna memiliki properti gemini sebagai array, jika tidak inisialisasi sebagai array kosong
  if (!global.db.data.users[m.sender].gemini) {
    global.db.data.users[m.sender].gemini = [];
  }

  // Mengambil riwayat percakapan pengguna
  let chatHistory = global.db.data.users[m.sender].gemini;

  const chatSession = model.startChat({
    generationConfig,
    safetySettings,
    history: chatHistory,
  });

  const result = await chatSession.sendMessage(text);

  // Pastikan result.response.text() ada sebelum mengaksesnya
  if (result && result.response && typeof result.response.text === "function") {
    const responseText = await result.response.text().trim();

    // Update the chat history with the new message and response
    chatHistory.push({ role: "user", parts: [{ text }] });
    chatHistory.push({ role: "model", parts: [{ text: responseText }] });

    // Simpan riwayat percakapan yang diperbarui kembali ke global.db
    global.db.data.users[m.sender].gemini = chatHistory;

    // Log the response text
    console.log(responseText);

    return responseText;
  } else {
    throw new Error("No response text found");
  }
}

export { geminiChat };
