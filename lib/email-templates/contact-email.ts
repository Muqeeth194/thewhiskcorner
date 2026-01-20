import { ContactEmailData } from "@/types/contents"

export const getContactEmailHtml = (data: ContactEmailData) => {
  const { userName, userContact, message, subject } = data

  // Convert newlines to <br> for HTML display
  const formattedMessage = message.replace(/\n/g, "<br>")

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Message</title>
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
    .message-box { background-color: #fff1f2; padding: 16px; border-radius: 8px; border: 1px solid #fda4af; color: #881337; margin-top: 8px; font-size: 15px; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div style="text-align: center;">
        <span class="logo">🍰 The Whisk Corner</span>
      </div>
      
      <h1>New Contact Message Received</h1>
      <p style="color: #6b7280; margin-bottom: 24px;">
        You have received a new message from the website contact form.
      </p>

      <table class="data-table">
        <tr>
          <td class="label">Sender Name</td>
          <td>${userName}</td>
        </tr>
        <tr>
          <td class="label">Contact Email</td>
          <td>
            <a href="mailto:${userContact}" style="color: #be185d; text-decoration: none;">${userContact}</a>
          </td>
        </tr>
        ${
          subject
            ? `
        <tr>
          <td class="label">Subject</td>
          <td>${subject}</td>
        </tr>`
            : ""
        }
        <tr>
          <td class="label" style="padding-top: 20px;">Message</td>
          <td style="padding-top: 20px;">
             <div class="message-box">
               ${formattedMessage}
             </div>
          </td>
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
