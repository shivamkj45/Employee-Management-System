import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { saveAs } from "file-saver";

export const exportLeaveToExcel = (
  leaves: any[]
) => {
  const rows = leaves.map((leave) => ({
    Employee:
      `${leave.employee.firstName} ${leave.employee.lastName}`,

    Department:
      leave.employee.department?.name,

    "Leave Type":
      leave.leaveType,

    "Start Date":
      new Date(
        leave.startDate
      ).toLocaleDateString(),

    "End Date":
      new Date(
        leave.endDate
      ).toLocaleDateString(),

    Status:
      leave.status,

    Reason:
      leave.reason,
  }));

  const worksheet =
    XLSX.utils.json_to_sheet(rows);

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Leave Report"
  );

  const excelBuffer =
    XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

  const blob = new Blob(
    [excelBuffer],
    {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }
  );

  saveAs(blob, "Leave_Report.xlsx");
};

export const exportLeaveToPDF = (
  leaves: any[]
) => {
  const doc = new jsPDF();

  doc.setFontSize(18);

  doc.text(
    "Leave Report",
    14,
    18
  );

  autoTable(doc, {
    startY: 28,

    head: [[
      "Employee",
      "Department",
      "Type",
      "Start",
      "End",
      "Status",
    ]],

    body: leaves.map((leave) => [
      `${leave.employee.firstName} ${leave.employee.lastName}`,

      leave.employee.department?.name,

      leave.leaveType,

      new Date(
        leave.startDate
      ).toLocaleDateString(),

      new Date(
        leave.endDate
      ).toLocaleDateString(),

      leave.status,
    ]),
  });

  doc.save("Leave_Report.pdf");
};