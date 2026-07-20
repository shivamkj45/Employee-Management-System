export const resetPasswordEmail = (
  employeeName: string,
  resetLink: string
) => {

  return `
    <div style="font-family:Arial;padding:30px">

      <h2>Password Reset Request</h2>

      <p>Hello <b>${employeeName}</b>,</p>

      <p>
      Click the button below to reset your password.
      </p>

      <br>

      <a
        href="${resetLink}"
        style="
          background:#1976d2;
          color:white;
          padding:12px 25px;
          text-decoration:none;
          border-radius:5px;
        "
      >
        Reset Password
      </a>

      <br><br>

      <p>
      If you didn't request this, ignore this email.
      </p>

    </div>
  `;
};