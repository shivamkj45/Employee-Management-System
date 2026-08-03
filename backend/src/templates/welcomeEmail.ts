
export const welcomeEmail = (
  employeeName: string,
  email: string,
  password: string
) => {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Welcome</title>
</head>

<body style="
margin:0;
padding:0;
background:#f4f7fb;
font-family:Arial,sans-serif;
">

<table
width="100%"
cellpadding="0"
cellspacing="0"
style="padding:40px 0;"
>

<tr>
<td align="center">

<table
width="650"
cellpadding="0"
cellspacing="0"
style="
background:white;
border-radius:12px;
overflow:hidden;
box-shadow:0 6px 18px rgba(0,0,0,.08);
"
>

<tr>
<td
style="
background:#1976d2;
padding:28px;
color:white;
text-align:center;
"
>

<h1 style="margin:0;">
Employee Management System
</h1>

<p
style="
margin-top:10px;
font-size:15px;
"
>
Welcome aboard 🎉
</p>

</td>
</tr>

<tr>
<td style="padding:35px;">

<h2 style="margin-top:0;">
Hello ${employeeName},
</h2>

<p
style="
font-size:15px;
line-height:1.8;
color:#555;
"
>

Congratulations!

Your employee account has been successfully created.

You can now access the Employee Management Portal using the credentials below.

</p>

<table
width="100%"
style="
margin:30px 0;
border-collapse:collapse;
background:#f8f9fb;
border:1px solid #eeeeee;
"
>

<tr>

<td
style="
padding:14px;
font-weight:bold;
width:180px;
"
>
Email
</td>

<td style="padding:14px;">
${email}
</td>

</tr>

<tr>

<td
style="
padding:14px;
font-weight:bold;
"
>
Temporary Password
</td>

<td
style="
padding:14px;
color:#d32f2f;
font-weight:bold;
"
>
${password}
</td>

</tr>

</table>

<div
style="
text-align:center;
margin:35px 0;
"
>

<a
href="http://localhost:5173/login"
style="
background:#1976d2;
color:white;
padding:14px 32px;
text-decoration:none;
border-radius:6px;
font-weight:bold;
display:inline-block;
"
>

Login to Portal

</a>

</div>

<div
style="
background:#fff8e1;
border-left:4px solid #ff9800;
padding:18px;
margin-top:30px;
"
>

<b>Security Reminder</b>

<ul
style="
line-height:1.8;
margin-bottom:0;
"
>

<li>Change your temporary password after first login.</li>

<li>Never share your credentials.</li>

<li>Use a strong password.</li>

<li>Contact HR if you face any login issues.</li>

</ul>

</div>

<p
style="
margin-top:40px;
font-size:15px;
color:#555;
line-height:1.8;
"
>

We are excited to have you on our team and wish you great success.

</p>

<p
style="
margin-top:30px;
"
>

Regards,<br>

<b>HR Department</b><br>

Employee Management System

</p>

</td>
</tr>

<tr>

<td
style="
background:#f4f7fb;
padding:18px;
text-align:center;
font-size:13px;
color:#777;
"
>

This is an automated email. Please do not reply.

</td>

</tr>

</table>

</td>
</tr>

</table>

</body>

</html>
`;
};