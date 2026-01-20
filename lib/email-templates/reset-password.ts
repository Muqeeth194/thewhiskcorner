export const getPasswordResetEmailHtml = (
  resetUrl: string,
  name: string = "User"
) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
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
    .warning { background-color: #fff1f2; border-left: 4px solid #f43f5e; padding: 12px 16px; border-radius: 4px; color: #9f1239; font-size: 14px; margin-bottom: 24px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div style="text-align: center;">
        <span class="logo">🍰 The Whisk Corner</span>
      </div>
      
      <h1>Reset Your Password</h1>
      <p>
        Hi ${name},<br>
        We received a request to reset the password for your account. If you made this request, please click the button below.
      </p>

      <div class="warning">
        <strong>Note:</strong> This link will expire in <strong>1 hour</strong> for your security.
      </div>
      
      <div style="text-align: center; margin: 32px 0;">
        <a href="${resetUrl}" class="btn">Reset Password</a>
      </div>

      <p style="font-size: 14px; color: #6b7280;">
        Or copy and paste this link into your browser:<br>
        <a href="${resetUrl}" class="link-text">${resetUrl}</a>
      </p>
      
      <hr style="border: none; border-top: 1px solid #f3f4f6; margin: 32px 0;">
      
      <p style="font-size: 13px; color: #9ca3af;">
        If you did not ask to reset your password, you can safely ignore this email. Your password will not be changed.
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
