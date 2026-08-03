import * as XLSX from "xlsx";

export const exportDepartmentExcel = (
  departments: any[]
) => {

  const rows = departments.map((department) => ({

    Department: department.name,

    Description: department.description,

    Manager:
      department.manager
        ? `${department.manager.firstName} ${department.manager.lastName}`
        : "N/A",

    Employees: department.employeeCount,

    Status: department.status,

    Created: new Date(
      department.createdAt
    ).toLocaleDateString(),

  }));

  const worksheet =
    XLSX.utils.json_to_sheet(rows);

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Departments"
  );

  XLSX.writeFile(
    workbook,
    "Departments.xlsx"
  );

};