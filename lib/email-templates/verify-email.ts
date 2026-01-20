export const getVerificationEmailHtml = (
  verifyUrl: string,
  name: string = "User"
) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Account</title>
  <style>
    body { margin: 0; padding: 0; background-color: #fdf2f8; font-family: 'Arial', sans-serif; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .card { background-color: #ffffff; padding: 40px; border-radius: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #fce7f3; }
    .logo { color: #be185d; font-size: 24px; font-weight: bold; text-decoration: none; display: inline-block; margin-bottom: 24px; }
    h1 { color: #1f2937; margin: 0 0 16px; font-size: 24px; }
    p { color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 24px; }
    .btn { display: inline-block; background-color: #e47fa9ff; color: #ffffff; text-decoration: none; padding: 12px 32px; border-radius: 50px; font-weight: bold; font-size: 16px; transition: background 0.3s; }
    .btn:hover { background-color: #b66083ff; }
    .footer { text-align: center; margin-top: 32px; color: #9ca3af; font-size: 12px; }
    .link-text { color: #be185d; word-break: break-all; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div style="text-align: center;">
        <span class="logo">🍰 The Whisk Corner</span>
      </div>
      
      <h1>Welcome, ${name}!</h1>
      <p>
        We are delighted to have you onboard at <strong>The Whisk Corner</strong>! 
        Before you can start exploring our exclusive cake collections, we just need to verify your email address.
      </p>
      
      <div style="text-align: center; margin: 32px 0;">
        <a href="${verifyUrl}" class="btn">Verify My Account</a>
      </div>

      <p style="font-size: 14px; color: #6b7280;">
        Or copy and paste this link into your browser:<br>
        <a href="${verifyUrl}" class="link-text">${verifyUrl}</a>
      </p>
      
      <hr style="border: none; border-top: 1px solid #f3f4f6; margin: 32px 0;">
      
      <p style="font-size: 13px; color: #9ca3af;">
        If you didn't create an account with The Whisk Corner, you can safely ignore this email.
      </p>
    </div>

    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} The Whisk Corner. All rights reserved.</p>
      <p>Hyderabad, Telangana • Sweetest Cakes in Town</p>
    </div>
  </div>
</body>
</html>
  `
}
