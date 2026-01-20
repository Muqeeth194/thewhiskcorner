export const getResetSuccessEmailHtml = (
  userName: string,
  loginUrl: string
) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Updated</title>
  <style>
    body { margin: 0; padding: 0; background-color: #fdf2f8; font-family: 'Arial', sans-serif; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .card { background-color: #ffffff; padding: 40px; border-radius: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #fce7f3; }
    .logo { color: #be185d; font-size: 24px; font-weight: bold; text-decoration: none; display: inline-block; margin-bottom: 24px; }
    h1 { color: #1f2937; margin: 0 0 16px; font-size: 24px; }
    p { color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 20px; }
    .button { background-color: #db2777; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 50px; font-weight: bold; display: inline-block; margin-top: 10px; }
    .footer { text-align: center; margin-top: 32px; color: #9ca3af; font-size: 12px; }
    .alert-box { background-color: #fff1f2; padding: 16px; border-radius: 8px; border: 1px solid #fda4af; color: #881337; font-size: 14px; margin-top: 24px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div style="text-align: center;">
        <span class="logo">🍰 The Whisk Corner</span>
      </div>
      
      <h1>Password Changed Successfully</h1>
      
      <p>Hi <strong>${userName}</strong>,</p>
      
      <p>
        This is a confirmation that the password for your account at <strong>The Whisk Corner</strong> has just been successfully updated.
      </p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${loginUrl}" class="button">
          Login to Your Account
        </a>
      </div>

      <div class="alert-box">
        <strong>Security Notice:</strong> If you did not perform this action, please contact us immediately to secure your account.
      </div>

    </div>

    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} The Whisk Corner Admin System</p>
    </div>
  </div>
</body>
</html>
  `
}
