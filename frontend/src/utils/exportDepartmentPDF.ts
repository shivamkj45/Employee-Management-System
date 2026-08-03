import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportDepartmentPDF = (
  departments: any[]
) => {

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(
    "Employee Management System",
    14,
    18
  );

  doc.setFontSize(14);
  doc.text(
    "Department Report",
    14,
    28
  );

  doc.setFontSize(10);

  doc.text(
    `Generated: ${new Date().toLocaleString()}`,
    14,
    36
  );

  autoTable(doc, {

    startY: 45,

    head: [[
      "Department",
      "Manager",
      "Employees",
      "Status",
      "Description",
    ]],

    body: departments.map((department) => [

      department.name,

      department.manager
        ? `${department.manager.firstName} ${department.manager.lastName}`
        : "N/A",

      department.employeeCount,

      department.status,

      department.description || "-",

    ]),

    styles: {
      fontSize: 10,
      cellPadding: 3,
    },

    headStyles: {
      fillColor: [25, 118, 210],
      textColor: 255,
      fontStyle: "bold",
    },

    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },

  });

  doc.save("Departments_Report.pdf");

};