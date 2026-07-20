export const welcomeEmail = (
  employeeName: string,
  email: string,
  password: string
) => {

  return `
    <div style="font-family:Arial;padding:30px">

      <h2>Welcome to Employee Management System 🎉</h2>

      <p>Hello <b>${employeeName}</b>,</p>

      <p>Your employee account has been created successfully.</p>

      <hr>

      <h3>Login Credentials</h3>

      <p><b>Email:</b> ${email}</p>

      <p><b>Temporary Password:</b> ${password}</p>

      <hr>

      <p>
      Please login and change your password immediately.
      </p>

      <br>

      <p>Regards,</p>

      <h4>HR Team</h4>

    </div>
  `;
};