export const leaveAppliedEmail = (
  employeeName: string,
  leaveType: string,
  startDate: string,
  endDate: string,
  reason: string
) => {
  return `
<!DOCTYPE html>
<html>
<body style="font-family:Arial;background:#f4f7fb;padding:40px;">

<div style="max-width:650px;background:white;margin:auto;border-radius:10px;overflow:hidden;box-shadow:0 5px 15px rgba(0,0,0,.08)">

<div style="background:#1976d2;color:white;padding:25px;text-align:center;">
<h2>Leave Request Submitted</h2>
</div>

<div style="padding:30px;">

<p>Hello <b>${employeeName}</b>,</p>

<p>Your leave request has been submitted successfully.</p>

<table style="width:100%;border-collapse:collapse;background:#f8f9fb;">
<tr><td style="padding:12px;"><b>Leave Type</b></td><td>${leaveType}</td></tr>
<tr><td style="padding:12px;"><b>Start Date</b></td><td>${startDate}</td></tr>
<tr><td style="padding:12px;"><b>End Date</b></td><td>${endDate}</td></tr>
<tr><td style="padding:12px;"><b>Reason</b></td><td>${reason}</td></tr>
<tr><td style="padding:12px;"><b>Status</b></td><td><b style="color:#ff9800;">Pending Approval</b></td></tr>
</table>

<p style="margin-top:30px;">
You will receive another email once your request has been reviewed.
</p>

</div>

</div>

</body>
</html>
`;
};