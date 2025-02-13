/*
『NOTICE』 Hak cipta dilindungi.
* Script ini dibuat oleh Obscura
* Gunakan dengan bijak.
* Telegram: https://t.me/DelioGalileio
*/

/* 
*/
import fetch from 'node-fetch';
const handler = async (m, { conn, text }) => {
  if (!text) return m.reply('Mana emailnya?');

  const data = {
    token: "7401821515:3QeD3Lvr",
    request: text,
    limit: 100,
    lang: "id"
  };

  const url = 'https://server.leakosint.com/';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const result = await response.json();

    let tek = `*[ Info Leak ]*\n\n`;
    tek += result.NumOfResults ? `> *\`NumOfResults\`:* ${result.NumOfResults}\n` : '';
    tek += result.NumOfDatabase ? `> *\`NumOfDatabase\`:* ${result.NumOfDatabase}\n` : '';
    tek += result['search time'] ? `> *\`Search Time\`:* ${result['search time']}\n` : '';
    tek += result.price ? `> *\`Price\`:* ${result.price}\n` : '';
    tek += result.free_requests_left ? `> *\`Free Requests Left\`:* ${result.free_requests_left}\n` : '';
    tek += '\n';

    if (result.List) {
      for (const [key, value] of Object.entries(result.List)) {
        tek += `*[ ${key} ]*\n\n`;
        tek += value.NumOfResults ? `> *\`NumOfResults\`:* ${value.NumOfResults}\n` : '';
        tek += `> *\`Info Leak\`*\n${value.InfoLeak || 'No information available'}\n\n`;

        value.Data.forEach(dataItem => {
          tek += dataItem.Email ? `  *\`Email\`:* ${dataItem.Email}\n` : '';
          tek += dataItem.Password ? `  *\`Password\`:* ${dataItem.Password}\n` : '';
          tek += dataItem['Password(MD5)'] ? `  *\`Password(MD5)\`:* ${dataItem['Password(MD5)']}\n` : '';
          tek += dataItem.Salt ? `  *\`Salt\`:* ${dataItem.Salt}\n` : '';
          tek += dataItem.NickName ? `  *\`NickName\`:* ${dataItem.NickName}\n` : '';
          tek += dataItem.Phone ? `  *\`Phone\`:* ${dataItem.Phone}\n` : '';
          tek += dataItem.Phone2 ? `  *\`Phone2\`:* ${dataItem.Phone2}\n` : '';
          tek += dataItem.FirstName ? `  *\`FirstName\`:* ${dataItem.FirstName}\n` : '';
          tek += dataItem.LastName ? `  *\`LastName\`:* ${dataItem.LastName}\n` : '';
          tek += dataItem.Address ? `  *\`Address\`:* ${dataItem.Address}\n` : '';
          tek += dataItem.Country ? `  *\`Country\`:* ${dataItem.Country}\n` : '';
          tek += dataItem.State ? `  *\`State\`:* ${dataItem.State}\n` : '';
          tek += dataItem.City ? `  *\`City\`:* ${dataItem.City}\n` : '';
          tek += dataItem.PostCode || dataItem['PostalCode'] ? `  *\`PostCode\`:* ${dataItem.PostCode || dataItem['PostalCode']}\n` : '';
          tek += dataItem.PayMetod ? `  *\`PayMetod\`:* ${dataItem.PayMetod}\n` : '';
          tek += dataItem.Currency ? `  *\`Currency\`:* ${dataItem.Currency}\n` : '';
          tek += dataItem.BillingFirstName ? `  *\`BillingFirstName\`:* ${dataItem.BillingFirstName}\n` : '';
          tek += dataItem.BillingLastName ? `  *\`BillingLastName\`:* ${dataItem.BillingLastName}\n` : '';
          tek += dataItem.ShippingFirstName ? `  *\`ShippingFirstName\`:* ${dataItem.ShippingFirstName}\n` : '';
          tek += dataItem.ShippingLastName ? `  *\`ShippingLastName\`:* ${dataItem.ShippingLastName}\n` : '';
          tek += dataItem.ShippingAddress ? `  *\`ShippingAddress\`:* ${dataItem.ShippingAddress}\n` : '';
          tek += dataItem.ShippingCity ? `  *\`ShippingCity\`:* ${dataItem.ShippingCity}\n` : '';
          tek += dataItem.ShippingState ? `  *\`ShippingState\`:* ${dataItem.ShippingState}\n` : '';
          tek += dataItem.ShippingPostCode ? `  *\`ShippingPostCode\`:* ${dataItem.ShippingPostCode}\n` : '';
          tek += dataItem.CardBin ? `  *\`CardBin\`:* ${dataItem.CardBin}\n` : '';
          tek += dataItem.CartType ? `  *\`CartType\`:* ${dataItem.CartType}\n` : '';
          tek += dataItem['CreditCard(last 4 digits)'] ? `  *\`CreditCard(last 4 digits)\`:* ${dataItem['CreditCard(last 4 digits)']}\n` : '';
          tek += dataItem.CardExpirationMonth ? `  *\`CardExpirationMonth\`:* ${dataItem.CardExpirationMonth}\n` : '';
          tek += dataItem.CardExpirationYear ? `  *\`CardExpirationYear\`:* ${dataItem.CardExpirationYear}\n` : '';
          tek += dataItem.RegDate ? `  *\`RegDate\`:* ${dataItem.RegDate}\n` : '';
          tek += dataItem.Gender ? `  *\`Gender\`:* ${dataItem.Gender === '0' ? 'Female' : dataItem.Gender === '1' ? 'Male' : dataItem.Gender}\n` : '';
          tek += dataItem.BDay ? `  *\`BDay\`:* ${dataItem.BDay}\n` : '';
          tek += dataItem.SuffixName ? `  *\`SuffixName\`:* ${dataItem.SuffixName}\n` : '';
          tek += dataItem.Lang ? `  *\`Lang\`:* ${dataItem.Lang}\n` : '';
          tek += dataItem.Nationality ? `  *\`Nationality\`:* ${dataItem.Nationality}\n` : '';
          tek += dataItem.VehicleYear ? `  *\`VehicleYear\`:* ${dataItem.VehicleYear}\n` : '';
          tek += dataItem.VehicleMake ? `  *\`VehicleMake\`:* ${dataItem.VehicleMake}\n` : '';
          tek += dataItem.VehicleModel ? `  *\`VehicleModel\`:* ${dataItem.VehicleModel}\n` : '';
          tek += dataItem.ExteriorColor ? `  *\`ExteriorColor\`:* ${dataItem.ExteriorColor}\n` : '';
          tek += dataItem.InteriorColor ? `  *\`InteriorColor\`:* ${dataItem.InteriorColor}\n` : '';
          tek += dataItem.AutoType ? `  *\`AutoType\`:* ${dataItem.AutoType}\n` : '';
          tek += dataItem.OwnerCompanyName ? `  *\`OwnerCompanyName\`:* ${dataItem.OwnerCompanyName}\n` : '';
          tek += dataItem.DriverCompanyName ? `  *\`DriverCompanyName\`:* ${dataItem.DriverCompanyName}\n` : '';
          tek += dataItem.skip ? `  *\`skip\`:* ${dataItem.skip}\n` : '';
          tek += dataItem.VIN ? `  *\`VIN\`:* ${dataItem.VIN}\n` : '';
          tek += dataItem.SaleDate ? `  *\`SaleDate\`:* ${dataItem.SaleDate}\n` : '';
          tek += dataItem.Null ? `  *\`Null\`:* ${dataItem.Null}\n` : '';
          tek += dataItem.Passport ? `  *\`Passport\`:* ${dataItem.Passport}\n` : '';
          tek += dataItem.Provider ? `  *\`Provider\`:* ${dataItem.Provider}\n` : '';
          tek += dataItem.FullName ? `  *\`FullName\`:* ${dataItem.FullName}\n` : '';
          tek += dataItem.CompanyName ? `  *\`CompanyName\`:* ${dataItem.CompanyName}\n` : '';
          tek += dataItem.Region ? `  *\`Region\`:* ${dataItem.Region}\n` : '';
          tek += dataItem.Location ? `  *\`Location\`:* ${dataItem.Location}\n` : '';
          tek += dataItem.Company ? `  *\`Company\`:* ${dataItem.Company}\n` : '';
          tek += dataItem.Status ? `  *\`Status\`:* ${dataItem.Status}\n` : '';
          tek += dataItem.Type ? `  *\`Type\`:* ${dataItem.Type}\n` : '';
          tek += dataItem.Date ? `  *\`Date\`:* ${dataItem.Date}\n` : '';
          tek += dataItem.Category ? `  *\`Category\`:* ${dataItem.Category}\n` : '';
          tek += dataItem.Size ? `  *\`Size\`:* ${dataItem.Size}\n` : '';
          tek += dataItem.District ? `  *\`District\`:* ${dataItem.District}\n` : '';
          tek += dataItem.ShippingAddress ? `  *\`ShippingAddress\`:* ${dataItem.ShippingAddress}\n` : '';
          tek += dataItem.Phone2 ? `  *\`Phone2\`:* ${dataItem.Phone2}\n` : '';
          tek += dataItem.Price ? `  *\`Price\`:* ${dataItem.Price}\n` : '';

          tek += '\n'; // Adding a newline for readability between items
        });
      }
    }

    await conn.sendMessage(m.chat, { text: tek }, { quoted: m });
  } catch (error) {
    console.error('Error fetching data:', error);
    await conn.sendMessage(m.chat, { text: 'Terjadi kesalahan saat mengambil data.' }, { quoted: m });
  }
};
handler.command = ['doxing', 'doksli']
handler.tags = ['owner']
handler.help = ['doxing']
handler.owner = true
export default handler;