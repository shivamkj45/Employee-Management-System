import Employee from "../modules/employee/employee.model";
import Department from "../modules/department/department.model";
import { createEmployee } from "../modules/employee/employee.service";
import ApiError from "../utils/ApiError";

const departments = [
  {
    name: "Human Resources",
    description: "HR Department",
  },
  {
    name: "Engineering",
    description: "Engineering Department",
  },
  {
    name: "Finance",
    description: "Finance Department",
  },
  {
    name: "Sales",
    description: "Sales Department",
  },
];

const defaultEmployees = [
  {
    employeeId: "EMP001",
    firstName: "System",
    lastName: "Administrator",
    email: "admin@company.com",
    phone: "9999999999",
    designation: "System Administrator",
    department: "Engineering",
    salary: 100000,
    role: "admin" as const,
    password: "Admin@123",
  },
  {
    employeeId: "EMP002",
    firstName: "HR",
    lastName: "Manager",
    email: "hr@company.com",
    phone: "9999999998",
    designation: "HR Manager",
    department: "Human Resources",
    salary: 80000,
    role: "hr" as const,
    password: "Hr@123",
  },
  {
    employeeId: "EMP003",
    firstName: "Project",
    lastName: "Manager",
    email: "manager@company.com",
    phone: "9999999997",
    designation: "Project Manager",
    department: "Engineering",
    salary: 90000,
    role: "manager" as const,
    password: "Manager@123",
  },
];

export const seedDatabase = async () => {
  try {
    console.log("🌱 Running database seeder...");

    // ==========================
    // Seed Departments
    // ==========================
    for (const department of departments) {
      const exists = await Department.findOne({
        name: department.name,
      });

      if (!exists) {
        await Department.create(department);
        console.log(`✅ Department created: ${department.name}`);
      }
    }

    // ==========================
    // Seed Default Employees
    // ==========================
    for (const emp of defaultEmployees) {
      const employeeExists = await Employee.findOne({
        employeeId: emp.employeeId,
      });

      if (employeeExists) {
        console.log(`ℹ️ ${emp.employeeId} already exists.`);
        continue;
      }

      const department = await Department.findOne({
        name: emp.department,
      });

      if (!department) {
        throw new ApiError(
          500,
          `Department '${emp.department}' not found.`
        );
      }

      const { temporaryPassword } = await createEmployee(
        {
          employeeId: emp.employeeId,
          firstName: emp.firstName,
          lastName: emp.lastName,
          email: emp.email,
          phone: emp.phone,
          designation: emp.designation,
          department: department._id,
          salary: emp.salary,
          joiningDate: new Date(),
          status: "Active",
          role: emp.role,
          address: "Head Office",
        },
        emp.password
      );

      console.log(
        `✅ ${emp.role.toUpperCase()} created | Email: ${emp.email} | Password: ${temporaryPassword}`
      );
    }

    console.log("🎉 Database seeding completed.");
  } catch (error) {
    console.error("❌ Seeder Error:", error);
  }
};