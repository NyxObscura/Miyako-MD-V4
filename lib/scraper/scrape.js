/**
 * DannTeam x EduCoding
 * Instagram: @dannstfu & @educoding_id
 * Libraries: D-Scrape — Updated
 * Thanks To: Danz, Miftah, Sanzy, Yanz, Rifza, etc
*/

import FormData from "form-data"
import axios from "axios"
import cheerio from "cheerio"
import qs from "qs"

global.creator = "@superdanzyyy"

async function tiktoks(query) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "POST",
        url: "https://tikwm.com/api/feed/search",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "Cookie": "current_language=en",
          "User-Agent": "Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
        },
        data: {
          keywords: query,
          count: 10,
          cursor: 0,
          HD: 1
        }
      })
      const videos = response.data.data.videos
      if (videos.length === 0) {
        reject("Tidak ada video ditemukan.")
      } else {
        const dann = Math.floor(Math.random() * videos.length)
        const videorndm = videos[dann]

        const result = {
          author: creator,
          title: videorndm.title,
          cover: videorndm.cover,
          origin_cover: videorndm.origin_cover,
          no_watermark: videorndm.play,
          watermark: videorndm.wmplay,
          music: videorndm.music
        }
        resolve(result)
      }
    } catch (error) {
      reject(error)
    }
  })
}

function ssweb(url, device) {
  return new Promise((resolve, reject) => {
    const baseURL = "https://www.screenshotmachine.com"
    const param = {
      url: url,
      device: device,
      cacheLimit: 0
    }
    axios({
      url: baseURL + "/capture.php",
      method: "POST",
      data: new URLSearchParams(Object.entries(param)),
      headers: {
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      }
    }).then((data) => {
      const cookies = data.headers["set-cookie"]
      if (data.data.status == "success") {
        axios.get(baseURL + "/" + data.data.link, {
          headers: {
            "cookie": cookies.join("")
          },
          responseType: "arraybuffer"
        }).then(({
            data
          }) => {
          resolve(data)
        })
      } else {
        reject()
      }
    }).catch(reject)
  })
}

function tebakGambar() {
  return new Promise(async(resolve,
    reject) => {
    axios.get("https://jawabantebakGambar.net/all-answers/")
    .then(({
      data
    }) => {
      const $ = cheerio.load(data)
      const result = []
      let random = Math.floor(Math.random() * 2836) + 2
      let link2 = "https://jawabantebakGambar.net"
      $(`#images > li:nth-child(${random}) > a`).each(function(a, b) {
        const img = link2 + $(b).find("img").attr("data-src")
        const jwb = $(b).find("img").attr("alt")
        result.push({
          author: creator,
          image: img,
          jawaban: jwb
        })

        resolve(result)
      })
    })
    .catch(reject)
  })
}

function BukaLapak(search) {
  return new Promise(async (resolve,
    reject) => {
    try {
      const {
        data
      } = await axios.get(`https://www.bukalapak.com/products?from=omnisearch&from_keyword_history=false&search[keywords]=${search}&search_source=omnisearch_keyword&source=navbar`,
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
          }
        })
      const $ = cheerio.load(data)
      const dat = []
      const b = $("a.slide > img").attr("src")
      $("div.bl-flex-item.mb-8").each((i, u) => {
        const a = $(u).find("observer-tracker > div > div")
        const img = $(a).find("div > a > img").attr("src")
        if (typeof img === "undefined") return

        const link = $(a).find(".bl-thumbnail--slider > div > a").attr("href")
        const title = $(a).find(".bl-product-card__description-name > p > a").text().trim()
        const harga = $(a).find("div.bl-product-card__description-price > p").text().trim()
        const rating = $(a).find("div.bl-product-card__description-rating > p").text().trim()
        const terjual = $(a).find("div.bl-product-card__description-rating-and-sold > p").text().trim()

        const dari = $(a).find("div.bl-product-card__description-store > span:nth-child(1)").text().trim()
        const seller = $(a).find("div.bl-product-card__description-store > span > a").text().trim()
        const link_sel = $(a).find("div.bl-product-card__description-store > span > a").attr("href")

        const res_ = {
          title: title,
          rating: rating ? rating: "No rating yet",
          terjual: terjual ? terjual: "Not yet bought",
          harga: harga,
          image: img,
          link: link,
          store: {
            lokasi: dari,
            nama: seller,
            link: link_sel
          }
        }

        dat.push(res_)
      })
      if (dat.every(x => x === undefined)) return resolve({
        message: "Tidak ada result!"
      })
      resolve(dat)
    } catch (err) {
      console.error(err)
    }
  })
}

function SepakBola() {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data
      } = await axios.get("https://www.jadwaltv.net/jadwal-sepakbola")
      const $ = cheerio.load(data)
      let tv = []
      $("table.table.table-bordered > tbody > tr.jklIv").each((u, i) => {
        let an = $(i).html().replace(/<td>/g, "").replace(/<\/td>/g, " - ")
        tv.push(`${an.substring(0, an.length - 3)}`)
      })
      if (tv.every(x => x === undefined)) return resolve({
        message: "Tidak ada result!"
      })
      resolve(tv)
    } catch (err) {
      console.error(err)
    }
  })
}

async function HariLibur() {
  const {
    data
  } = await axios.get("https://www.liburnasional.com/")
  let libnas_content = []
  let $ = cheerio.load(data)
  let result = {
    nextLibur:
    "Hari libur" +
    $("div.row.row-alert > div").text().split("Hari libur")[1].trim(),
    libnas_content,
  }
  $("tbody > tr > td > span > div").each(function (a, b) {
    summary = $(b).find("span > strong > a").text()
    days = $(b).find("div.libnas-calendar-holiday-weekday").text()
    dateMonth = $(b).find("time.libnas-calendar-holiday-datemonth").text()
    libnas_content.push({
      summary, days, dateMonth
    })
  })
  return result
}

async function growtopiaItems(nameItem) {
  try {
    const itemListResponse = await axios.get("https://growtopia.fandom.com/api/v1/SearchSuggestions/List?query=" + nameItem)
    const itemList = itemListResponse.data.items

    if (itemList.length === 0) {
      return null
    }

    const itemName = itemList[0].title
    const link = `https://growtopia.wikia.com/wiki/${itemName}`

    const getDataResponse = await axios.get(link)
    const $ = cheerio.load(getDataResponse.data)

    const Description = $(".card-text").first().text()
    const Properties = $("#mw-content-text > div > div.gtw-card.item-card > div:nth-child(4)")
    .text()
    .trim()
    .split(/[\.+\!]/)
    .filter((d) => d !== "")

    const Sprite = $("div.card-header .growsprite > img").attr("src")
    const Color = $(".seedColor > div").text().trim().split(" ")
    const Rarity = $(".card-header b > small").text().match(/(\d+)/)
    const Recipe = $(".recipebox table.content")
    .last()
    .text()
    .trim()
    .split(/[\r\n\x0B\x0C\u0085\u2028\u2029]+/)
    .map((el) => el.trim())
    const Splice = $(".bg-splice").text()
    const Info = $("#mw-content-text > div > p:nth-child(3)").text().trim()
    const Type = $("table.card-field tr:nth-child(1) > td")
    .text()
    .split(" ")
    .pop()

    const dataList = {
      Name: itemName,
      URL: link.replace(/ /g, "_"),
      Description,
      Properties: Properties.length > 0 ? Properties: undefined,
      Sprite,
      Color,
      Rarity: Rarity !== null ? parseInt(Rarity[0]): undefined,
      Recipe: Recipe.length > 0
      ? {
        type: Recipe.shift() || "",
        recipe: Recipe,
      }: undefined,
      Splice: Splice.length > 0 ? Splice: undefined,
      Info,
      Type,
    }

    if (itemList.length > 1 && nameItem.toLowerCase() !== itemName.toLowerCase()) {
      const matches = itemList.map((i) => i.title)
      dataList.matches = matches
    }

    return dataList
  } catch (e) {
    console.error(e)
    return null
  }
}

async function chord(query) {
  const search = await axios.get(
    `https://www.gitagram.com/?s=${encodeURIComponent(query).replace(
      /%20/g,
      "+"
    )}`
  )
  const $ = await cheerio.load(search.data)
  const $url = $("table.table > tbody > tr")
  .eq(0)
  .find("td")
  .eq(0)
  .find("a")
  .eq(0)
  const url = $url.attr("href")
  const song = await axios.get(url)
  const $song = await cheerio.load(song.data)
  const $hcontent = $song("div.hcontent")
  const artist = $hcontent.find("div > a > span.subtitle").text().trim()
  const artistUrl = $hcontent.find("div > a").attr("href")
  const title = $hcontent.find("h1.title").text().trim()
  const chord = $song("div.content > pre").text().trim()
  const res = {
    url: url,
    artist,
    artistUrl,
    title,
    chord,
  }
  return res
}

async function remini(url, method) {
  return new Promise(async (resolve, reject) => {
    let Methods = ["enhance", "recolor", "dehaze"]
    Methods.includes(method) ? (method = method): (method = Methods[0])
    let buffer,
    Form = new FormData(),
    scheme = "https" + "://" + "inferenceengine" + ".vyro" + ".ai/" + method
    Form.append("model_version", 1, {
      "Content-Transfer-Encoding": "binary",
      contentType: "multipart/form-data charset=uttf-8",
    })
    Form.append("image", Buffer.from(url), {
      filename: "enhance_image_body.jpg",
      contentType: "image/jpeg",
    })
    Form.submit(
      {
        url: scheme,
        host: "inferenceengine" + ".vyro" + ".ai",
        path: "/" + method,
        protocol: "https:",
        headers: {
          "User-Agent": "okhttp/4.9.3",
          Connection: "Keep-Alive",
          "Accept-Encoding": "gzip",
        },
      },
      function (err, res) {
        if (err) reject()
        let data = []
        res
        .on("data", function (chunk, resp) {
          data.push(chunk)
        })
        .on("end", () => {
          resolve(Buffer.concat(data))
        })
        res.on("error", (e) => {
          reject()
        })
      }
    )
  })
}

async function instagramStory(url) {
  try {
    const urls = "https://instagram.com/stories/" + url
    const response = await axios.post(
      "https://v3.saveig.app/api/ajaxSearch",
      "q=" + encodeURIComponent(urls) + "&t=media&lang=en",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          Accept: "*/*",
        },
      }
    )
    const data = response.data.data
    const $ = cheerio.load(data)
    const downloadBox = $(".download-box")
    const downloadItems = downloadBox.find(".download-items")

    const results = []

    downloadItems.each((i,
      element) => {
      const thumbnail = $(element).find(".download-items__thumb img").attr("src")
      const download = $(element).find(".download-items__btn a").attr("href")

      results.push({
        author: creator,
        thumb: thumbnail,
        url: download,
      })
    })

    return results
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function ngl(username, pesan) {
  try {
    const res = await axios.post(
      "https://ngl.link/api/submit",
      `username=${username}&question=${pesan}&deviceId=18d7b980-ac6a-4878-906e-087dfec6ea1b&gameSlug=&referrer=`
    )
    const response = res.data
    return {
      creator,
      response
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function GoogleBard(prompt, cookies) {
  return new Promise(async (resolve, reject) => {
    try {
      let cf = {
       url: "https://gemini.google.com/_/BardChatUi/data/assistant.lamda.BardFrontendService/StreamGenerate?bl=boq_assistant-bard-web-server_20240617.01_p0&f.sid=-7133274499348542060&hl=id&_reqid=1172215&rt=c",
       data: `f.req=%5Bnull%2C%22%5B%5B%5C%22${encodeURIComponent(prompt)}%5C%22%2C0%2Cnull%2Cnull%2Cnull%2Cnull%2C0%5D%2C%5B%5C%22id%5C%22%5D%2C%5B%5C%22%5C%22%2C%5C%22%5C%22%2C%5C%22%5C%22%5D%2C%5C%22!09Cl0IjNAAbTqBB886hCnceliZu3i-g7ADQBEArZ1JjY03YP3WAoqGtlKZ0O7Stk0icqB42vSz000o7ee4mwEpfDd1-LHDoR48JAyoSoAgAABLJSAAABZGgBB34AOPVB5b3bS8ti9LaoxVvfkPdoSwkXcJS-b9mWS1wBUH3-rOExGzLoLVasHsUepgvkIohv1Jr5VY2VCgAFOftUKDyZAsaUOJgg5cuU5ZivHfBlk4V7_6ALgjpjFXV8J-UajFJhPNW1havFFHm_c2i0nXMXWRQdejmk9xSCU4eDrs423v6BDoz9bEUKQuY4Teri-dic70qhv42GerkSHwCK7m9YHoxTe3NRVDjk99RjZ1vZubK_TIQ3m4tiBEEYckEBkxMpNHw7R5IL-JNELn71ZPFWMV8HRA-BhaTRqsyO64FHT2TdIaXPjc7_bVm3_9Zo8T2WEj9ZIgiQ8BZ1gBMs5iJvsmBEwV3RISjyZCH6aLsK4rAaRn-DbJPfV3Yn4e3FElEuU0Ioa-i_Noz5PZycf_lxlF2_OgheW5Ob-9v1gUIRhdwmtchCUPvpRnO7CIVTbWlJ_eVtFOAaOHkiga1R0S2t34dck85HaJg8IUDLfguyAqPJQnQH9IJt8T0GBSchPUyqyC8en0fW40GtQ5H29zBYILSWgjA3GO5d0qhwriIWlDAXMI3e3LsHCK5gPB4iVGBbyBopoSNEr2KjND4rRGxUpmasLJ2KJ6jymwD0TGTGOZNqWUaV-D2vAsCOWa5cbvYmJiLNL87p81j4qcaH8M4uJ-ZQvqzUnDj6nD8X5w49Mi2jJfEtoZcOZBDWnGQfSoXIXHdjoXT-OrhE8XxfLYidtPQjji1ScYWjScehqUBvEvrqFrqVKqV6en0H7lspWEa7CzussBAQii2ORxkZLW7Paxeqyb3hyqeeo_3_VvkB6_d3B5fvFD_SwecO4rD3EzFsDcUc73N4KJqduVk5-nkwUVccBFxiSxzG6kVJttRNiYjT89Hqp0zObcXZN7mEoXxBq-qaxkngckQTXwsLIKqrknpNkkvwtZhDH2goWOAXBdoSWqZdtpVkVuy2lc6Lg7dIrYGI5S_CWsWqlC3wTTe2jQq2rPcMeEWshDINX_Zg5SAsKHndcjtsgPyBOCznZ2En5UxV6ZtFhw%5C%22%2C%5C%226b3da83b37418203a14307e6be9868f4%5C%22%2Cnull%2C%5B1%5D%2C1%2Cnull%2Cnull%2C1%2C0%2Cnull%2Cnull%2Cnull%2Cnull%2C0%2Cnull%2C1%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2C0%2C1%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2C%5B%5D%5D%22%5D&at=AFQ3XeaEGtInLQONqGLwSva82YLp%3A1718802207209&`,
       cookie: cookies // isi cookie
    }

      const {
        data
      } = await axios({
          url: cf.url,
          headers: {
            Cookie: cf.cookie
          },
          data: cf.data,
          method: "POST"
        })

      data.replace(/\\/g, '\\'.slice(1)).split('",[\"')[1].split('"]')[0].replace(/"rc_9df8b312d145653b\\\\\\\",\\[\\\"(.*?)(?<!\\\\)\\\"\\]/g, '').replace(/null/g, '').replace('nn**', '\n *').replace('nn*', '\n').replace('**nn*', '\n').replace(/\\\\\\/g, '').replace(/\\\\n/g, '\n').replace(/\\\\/g, '').replace(/rnrn/g, '').replace(/"\\"/g, '').replace(/rn/g, '\n').replace(/\\n*/g, '')
      resolve(JSON.stringify(data))
    } catch (error) {
      console.error(error)
      reject(error)
    }
  })
}

function pinterest(query) {
  return new Promise(async(resolve,
    reject) => {
    axios.get("https://id.pinterest.com/search/pins/?autologin=true&q=" + query,
      {
        headers: {
          "Cookie": "_auth=1; _b=\"AVna7S1p7l1C5I9u0+nR3YzijpvXOPc6d09SyCzO+DcwpersQH36SmGiYfymBKhZcGg=\"; _pinterest_sess=TWc9PSZHamJOZ0JobUFiSEpSN3Z4a2NsMk9wZ3gxL1NSc2k2NkFLaUw5bVY5cXR5alZHR0gxY2h2MVZDZlNQalNpUUJFRVR5L3NlYy9JZkthekp3bHo5bXFuaFZzVHJFMnkrR3lTbm56U3YvQXBBTW96VUgzVUhuK1Z4VURGKzczUi9hNHdDeTJ5Y2pBTmxhc2owZ2hkSGlDemtUSnYvVXh5dDNkaDN3TjZCTk8ycTdHRHVsOFg2b2NQWCtpOWxqeDNjNkk3cS85MkhhSklSb0hwTnZvZVFyZmJEUllwbG9UVnpCYVNTRzZxOXNJcmduOVc4aURtM3NtRFo3STlmWjJvSjlWTU5ITzg0VUg1NGhOTEZzME9SNFNhVWJRWjRJK3pGMFA4Q3UvcHBnWHdaYXZpa2FUNkx6Z3RNQjEzTFJEOHZoaHRvazc1c1UrYlRuUmdKcDg3ZEY4cjNtZlBLRTRBZjNYK0lPTXZJTzQ5dU8ybDdVS015bWJKT0tjTWYyRlBzclpiamdsNmtpeUZnRjlwVGJXUmdOMXdTUkFHRWloVjBMR0JlTE5YcmhxVHdoNzFHbDZ0YmFHZ1VLQXU1QnpkM1FqUTNMTnhYb3VKeDVGbnhNSkdkNXFSMXQybjRGL3pyZXRLR0ZTc0xHZ0JvbTJCNnAzQzE0cW1WTndIK0trY05HV1gxS09NRktadnFCSDR2YzBoWmRiUGZiWXFQNjcwWmZhaDZQRm1UbzNxc21pV1p5WDlabm1UWGQzanc1SGlrZXB1bDVDWXQvUis3elN2SVFDbm1DSVE5Z0d4YW1sa2hsSkZJb1h0MTFpck5BdDR0d0lZOW1Pa2RDVzNySWpXWmUwOUFhQmFSVUpaOFQ3WlhOQldNMkExeDIvMjZHeXdnNjdMYWdiQUhUSEFBUlhUVTdBMThRRmh1ekJMYWZ2YTJkNlg0cmFCdnU2WEpwcXlPOVZYcGNhNkZDd051S3lGZmo0eHV0ZE42NW8xRm5aRWpoQnNKNnNlSGFad1MzOHNkdWtER0xQTFN5Z3lmRERsZnZWWE5CZEJneVRlMDd2VmNPMjloK0g5eCswZUVJTS9CRkFweHc5RUh6K1JocGN6clc1JmZtL3JhRE1sc0NMTFlpMVErRGtPcllvTGdldz0=; _ir=0"
        }
      }).then(({
          data
        }) => {
        const $ = cheerio.load(data)
        const result = []
        const hasil = []
        $("div > a").get().map(b => {
          const link = $(b).find("img").attr("src")
          result.push(link)
        });
        result.forEach(v => {
          if (v == undefined) return
          hasil.push(v.replace(/236/g, "736"))
        })
        hasil.shift()
        resolve(hasil)
      })
  })
}

async function xhentai(page) {
  return new Promise((resolve, reject) => {
    axios.get("https://sfmcompile.club/page/"+page)
    .then((data) => {
      const $ = cheerio.load(data.data)
      const hasil = []
      $("#primary > div > div > ul > li > article").each(function (a, b) {
        hasil.push({
          title: $(b).find("header > h2").text(),
          link: $(b).find("header > h2 > a").attr("href"),
          category: $(b).find("header > div.entry-before-title > span > span").text().replace("in ", ""),
          share_count: $(b).find("header > div.entry-after-title > p > span.entry-shares").text(),
          views_count: $(b).find("header > div.entry-after-title > p > span.entry-views").text(),
          type: $(b).find("source").attr("type") || "image/jpeg",
          video_1: $(b).find("source").attr("src") || $(b).find("img").attr("data-src"),
          video_2: $(b).find("video > a").attr("href") || ""
        })
      })
      resolve(hasil)
    })
  })
}

async function getToken() {
  const clientId = "e5cd280b6d064b1ba3c6ef39d1f47a88"
  const clientSecret = "b89672b3fe684e4899495d837b28041a"

  try {
    const response = await axios.post("https://accounts.spotify.com/api/token", null, {
      params: {
        grant_type: "client_credentials"
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + Buffer.from(clientId + ":" + clientSecret).toString("base64")
      }
    })

    return response.data.access_token
  } catch (error) {
    console.error("Terjadi kesalahan:", error)
    throw error
  }
}

async function spotifySearch(query) {
  const accessToken = await getToken()
  try {
    const response = await axios.get("https://api.spotify.com/v1/search", {
      params: {
        q: query,
        type: "track"
      },
      headers: {
        "Authorization": "Bearer " + accessToken
      }
    })

    return response.data.tracks.items
  } catch (error) {
    console.error("Terjadi kesalahan:", error)
    throw error
  }
}

async function spotifyDownload(url) {
  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer"
    })
    return response.data
  } catch (error) {
    console.error("Terjadi kesalahan:", error)
    throw error
  }
}

async function randomGalau() {
  try {
    const response = await axios.get("https://galau.vercel.app/")
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function youtube(url) {
  try {
    const response = await axios.post(
      "https://yt1d.com/mates/en/analyze/ajax?retry=undefined&platform=youtube",
      `url=${encodeURIComponent(url)}&ajax=1&lang=en`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "Accept": "application/json, text/javascript, */*; q=0.01",
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    )

    const $ = cheerio.load(response.data.result)

    $("table.table-bordered.table-hover.table-responsive-sm tr").each((i, element) => {
      const row = $(element)
      const columns = row.find("td")
      if (columns.length > 0) {
        return {
          author: creator,
          quality: columns.eq(0).text().trim(),
          size: columns.eq(1).text().trim(),
          download: columns.eq(2).find("a").attr("href") || columns.eq(2).find("button").attr("onclick")
        }
      }
    })
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function tiktok(url) {
  try {
    const response = await axios.post(
      "https://ttsave.app/download",
      {
        query: url,
        language_id: "1"
      },
      {
        headers: {
          "Accept": "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      }
    )

    const html = response.data
    const $ = cheerio.load(html)

    const uniqueId = $("h2.font-extrabold.text-xl.text-center").text()
    const username = $("a.font-extrabold.text-blue-400").text().trim()
    const thumbnail = $("div.flex.flex-col.justify-center.items-center img").attr("src")
    const usn = "https://tiktok.com/" + username
    const download = []

    $("a[onclick='bdl(this, event)']").each((index, element) => {
      const type = $(element).attr("type")
      const link = $(element).attr("href")
      download.push({
        type, link
      })
    })

    return {
      uniqueId,
      usn,
      thumbnail,
      download,
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function instagram(url) {
  try {
    const response = await axios({
      method: "POST",
      url: "https://v3.igdownloader.app/api/ajaxSearch",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Accept": "/"
      },
      data: qs.stringify({
        recaptchaToken: "",
        q: url,
        t: "media",
        lang: "en"
      })
    })

    const $ = cheerio.load(response.data.data)
    const result = []
    $("ul.download-box li").each((index, element) => {
      const thumbnail = $(element).find(".download-items__thumb img").attr("src")
      const options = []
      $(element).find(".photo-option select option").each((i, opt) => {
        options.push({
          resolution: $(opt).text(),
          url: $(opt).attr("value")
        })
      })
      const download = $(element).find(".download-items__btn a").attr("href")

      result.push({
        thumbnail: thumbnail,
        options: options,
        download: download
      })
    })

    return result
  } catch (error) {
    console.error(error)
  }
}

export {
  tiktoks,
  instagram,
  ssweb,
  tebakGambar,
  BukaLapak,
  SepakBola,
  HariLibur,
  growtopiaItems,
  chord,
  remini,
  instagramStory,
  ngl,
  GoogleBard,
  pinterest,
  xhentai,
  spotifySearch,
  spotifyDownload,
  randomGalau,
  youtube,
  tiktok
}