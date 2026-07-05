import Employee, { IEmployee } from "../models/employee.model";

export const createEmployee = async (
  employeeData: Partial<IEmployee>
): Promise<IEmployee> => {
  const employee = await Employee.create(employeeData);

  return employee;
};