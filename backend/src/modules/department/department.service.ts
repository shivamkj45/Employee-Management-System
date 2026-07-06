import Department, { IDepartment } from "./department.model";

// Create
export const createDepartment = async (
  data: Partial<IDepartment>
): Promise<IDepartment> => {
  return await Department.create(data);
};

// Get All
export const getAllDepartments = async (): Promise<IDepartment[]> => {
  return await Department.find().sort({ createdAt: -1 });
};

// Get By ID
export const getDepartmentById = async (
  id: string
): Promise<IDepartment | null> => {
  return await Department.findById(id);
};

// Update
export const updateDepartment = async (
  id: string,
  data: Partial<IDepartment>
): Promise<IDepartment | null> => {
  return await Department.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

// Delete
export const deleteDepartment = async (
  id: string
): Promise<IDepartment | null> => {
  return await Department.findByIdAndDelete(id);
};