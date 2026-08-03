export const leaveRejectedEmail = (
  employeeName: string,
  leaveType: string,
  remarks: string
) => {
  return `
<!DOCTYPE html>
<html>
<body style="font-family:Arial;background:#f4f7fb;padding:40px;">

<div style="max-width:650px;background:white;margin:auto;border-radius:10px;overflow:hidden;box-shadow:0 5px 15px rgba(0,0,0,.08)">

<div style="background:#d32f2f;color:white;padding:25px;text-align:center;">
<h2>Leave Request Rejected</h2>
</div>

<div style="padding:30px;">

<p>Hello <b>${employeeName}</b>,</p>

<p>Unfortunately your leave request has not been approved.</p>

<table style="width:100%;background:#f8f9fb;border-collapse:collapse;">
<tr><td style="padding:12px;"><b>Leave Type</b></td><td>${leaveType}</td></tr>
<tr><td style="padding:12px;"><b>Status</b></td><td style="color:#d32f2f;"><b>Rejected</b></td></tr>
<tr><td style="padding:12px;"><b>Reason</b></td><td>${remarks || "No reason provided."}</td></tr>
</table>

<p style="margin-top:25px;">
If you have questions, please contact your HR department.
</p>

</div>

</div>

</body>
</html>
`;
};