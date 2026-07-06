import Employee, { IEmployee } from "../models/employee.model";

// Create Employee
export const createEmployee = async (
  employeeData: Partial<IEmployee>
): Promise<IEmployee> => {
  const employee = await Employee.create(employeeData);
  return employee;
};

// Get All Employees
export const getAllEmployees = async (): Promise<IEmployee[]> => {
  const employees = await Employee.find().sort({ createdAt: -1 });
  return employees;
};

// Get Employee By ID
export const getEmployeeById = async (
  id: string
): Promise<IEmployee | null> => {
  const employee = await Employee.findById(id);
  return employee;
};

// Update Employee
export const updateEmployee = async (
  id: string,
  employeeData: Partial<IEmployee>
): Promise<IEmployee | null> => {
  const updatedEmployee = await Employee.findByIdAndUpdate(
    id,
    employeeData,
    {
      new: true,          // Return updated document
      runValidators: true // Validate updated fields
    }
  );

  return updatedEmployee;
};

// Delete Employee
export const deleteEmployee = async (
  id: string
): Promise<IEmployee | null> => {
  const deletedEmployee = await Employee.findByIdAndDelete(id);
  return deletedEmployee;
};