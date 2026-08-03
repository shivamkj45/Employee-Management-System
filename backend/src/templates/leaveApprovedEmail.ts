export const leaveApprovedEmail = (
  employeeName: string,
  leaveType: string,
  remarks: string
) => {
  return `
<!DOCTYPE html>
<html>
<body style="font-family:Arial;background:#f4f7fb;padding:40px;">

<div style="max-width:650px;background:white;margin:auto;border-radius:10px;overflow:hidden;box-shadow:0 5px 15px rgba(0,0,0,.08)">

<div style="background:#2e7d32;color:white;padding:25px;text-align:center;">
<h2>Leave Approved</h2>
</div>

<div style="padding:30px;">

<p>Hello <b>${employeeName}</b>,</p>

<p>Your leave request has been approved.</p>

<table style="width:100%;background:#f8f9fb;border-collapse:collapse;">
<tr><td style="padding:12px;"><b>Leave Type</b></td><td>${leaveType}</td></tr>
<tr><td style="padding:12px;"><b>Status</b></td><td style="color:#2e7d32;"><b>Approved</b></td></tr>
<tr><td style="padding:12px;"><b>Remarks</b></td><td>${remarks || "No remarks provided."}</td></tr>
</table>

<p style="margin-top:25px;">
Have a pleasant leave.
</p>

</div>

</div>

</body>
</html>
`;
};