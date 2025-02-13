/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import axios from "axios";

let handler = async (m, { text, conn, args, usedPrefix, command }) => {
  // Periksa apakah ada pesan yang di-reply
  let html = text;
  if (m.quoted) {
    html = m.quoted.text;
  }

  if (!html) return m.reply(`*[ Html Nya Mana Jir ]*`)

  try {
    const imageUrl = await htmlToImage(html, ""); // Kosongkan CSS jika tidak diperlukan
    if (imageUrl) {
      await conn.sendFile(
        m.chat,
        imageUrl,
        "image.png",
        "Ini adalah gambar hasil konversi HTML to Image",
      );
    } else {
      await conn.reply(m.chat, "Gagal membuat gambar.", null);
    }
  } catch (error) {
    console.error("Error:", error);
    await conn.reply(m.chat, "Terjadi kesalahan.", null);
  }
};

handler.help = ["html2img"].map((a) => a + " *[Html To Image]*");
handler.tags = ["tools"];
handler.command = ["htmltoimg", "html2img"];
export default handler;

async function htmlToImage(html, css) {
  try {
    const response = await axios.post(
      "https://htmlcsstoimage.com/demo_run",
      {
        html: html,
        console_mode: "",
        url: "",
        css: css ? css : "",
        selector: "",
        ms_delay: "",
        render_when_ready: "false",
        viewport_height: "",
        viewport_width: "",
        google_fonts: "",
        device_scale: "",
      },
      {
        headers: {
          cookie:
            "_hcti_website_session=SFhp%2FC3qpFOizmifGuqCaeHU5CGGm3fe2AOrGjkgLzK5xmme5U87lIrQvaSAsTh%2BIiWePfEjeRS2mQSemfqXDkca4SBEq0VMfidbgOrve6Ijivp8iPzoyVIxsG4wHncopQ5gdPDe45sYPJUZ%2FWoNhiYfNKg6XpTIBTbu4OQ7VmDQ8mxaNMukgYSB2%2FtNim%2BcRoE%2B9woQBO0unxrNYy0oRf3bKQbqhCDVUJ5iRYm4Dd4yIOkj1nNv39VQrcebkAAp9sPPrbsMGguP%2Bp9eiXGqxQPS5ycYlqK%2B2Zz8FU8%3D--MJPaMU59qWTaoEzF--Wjee8Ftq%2B%2FChRFKnsVi2Ow%3D%3D; _ga_JLLLQJL669=GS1.1.1711473771.1.0.1711473771.0.0.0; _ga=GA1.2.535741333.1711473772; _gid=GA1.2.601778978.1711473772; _gat_gtag_UA_32961413_2=1",
          "x-csrf-token":
            "pO7JhtS8osD491DfzpbVYXzThWKZjPoXXFBi69aJnlFRHIO9UGP7Gj9Y93xItqiCHzisYobEoWqcFqZqGVJsow",
        },
      },
    );

    return response.data.url;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
