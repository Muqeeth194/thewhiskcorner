import { QuoteEmailData } from "@/types/contents"

export const getQuoteEmailHtml = (data: QuoteEmailData) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Quote Request</title>
  <style>
    body { margin: 0; padding: 0; background-color: #fdf2f8; font-family: 'Arial', sans-serif; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .card { background-color: #ffffff; padding: 40px; border-radius: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #fce7f3; }
    .logo { color: #be185d; font-size: 24px; font-weight: bold; text-decoration: none; display: inline-block; margin-bottom: 24px; }
    h1 { color: #1f2937; margin: 0 0 16px; font-size: 24px; }
    .data-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    .data-table td { padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #4b5563; font-size: 15px; vertical-align: top;}
    .label { font-weight: bold; color: #be185d; width: 140px; }
    .footer { text-align: center; margin-top: 32px; color: #9ca3af; font-size: 12px; }
    .cake-badge { background-color: #fce7f3; color: #be185d; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 12px; text-transform: uppercase; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div style="text-align: center;">
        <span class="logo">🍰 The Whisk Corner</span>
      </div>
      
      <h1>New Quote Request Received</h1>
      <p style="color: #6b7280; margin-bottom: 24px;">
        You have received a new inquiry from the website. Here are the details:
      </p>

      ${
        data.selectedCakeName
          ? `
      <div style="background-color: #fff1f2; padding: 16px; border-radius: 8px; margin-bottom: 24px; border: 1px solid #fda4af;">
        <span class="cake-badge">Inquiring About</span>
        <p style="margin: 8px 0 0 0; font-weight: bold; color: #881337;">${data.selectedCakeName} (ID: ${data.selectedCakeId})</p>
      </div>
      `
          : ""
      }

      <table class="data-table">
        <tr>
          <td class="label">Customer Name</td>
          <td>${data.userName}</td>
        </tr>
        <tr>
          <td class="label">Contact</td>
          <td>${data.userContact}</td>
        </tr>
        <tr>
          <td class="label">Instagram</td>
          <td>${data.instagram || '<span style="color:#9ca3af; font-style:italic;">Not provided</span>'}</td>
        </tr>
        <tr>
          <td class="label">Event Type</td>
          <td>${data.cakeType}</td>
        </tr>
        <tr>
          <td class="label">Flavor</td>
          <td>${data.flavour}</td>
        </tr>
        <tr>
          <td class="label">Guests/Servings</td>
          <td>${data.servings}</td>
        </tr>
        <tr>
          <td class="label">Budget</td>
          <td>${data.budget || '<span style="color:#9ca3af; font-style:italic;">Not provided</span>'}</td>
        </tr>
        <tr>
          <td class="label">Custom Details</td>
          <td style="white-space: pre-wrap;">${data.message}</td>
        </tr>
      </table>

    </div>

    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} The Whisk Corner Admin System</p>
    </div>
  </div>
</body>
</html>
  `
}
