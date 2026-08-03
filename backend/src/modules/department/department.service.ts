import Department, { IDepartment } from "./department.model";
import Employee from "../employee/employee.model";

import ApiError from "../../utils/ApiError";

import { notifyRoles } from "../notification/notification.helper";
import { logAction } from "../audit/audit.helper";

/**
 * Create Department
 */
export const createDepartment = async (
  data: Partial<IDepartment>,
  userId: string
): Promise<IDepartment> => {
  const existingDepartment = await Department.findOne({
    name: data.name,
  });

  if (existingDepartment) {
    throw new ApiError(
      409,
      "Department already exists."
    );
  }

  const department = await Department.create(data);

  await notifyRoles(
    ["admin", "hr"],
    "New Department Created",
    `${department.name} department has been created.`,
    "success"
  );

  await logAction(
    userId,
    "CREATE",
    "Department",
    `Department ${department.name} created.`
  );

  return department;
};

/**
 * Get All Departments
 */
export const getAllDepartments = async () => {
const departments =
  await Department.find()
    .populate(
      "manager",
      "firstName lastName profileImage"
    )
    .sort({
      createdAt: -1,
    });

  const result = await Promise.all(
    departments.map(async (department) => {
      const employeeCount =
        await Employee.countDocuments({
          department: department._id,
          status: "Active",
        });

      return {
        ...department.toObject(),
        employeeCount,
      };
    })
  );

  return result;
};

/**
 * Department Summary Cards
 */
export const getDepartmentStats = async () => {
  const totalDepartments =
    await Department.countDocuments();

  const activeDepartments =
    await Department.countDocuments({
      status: "Active",
    });

  const inactiveDepartments =
    await Department.countDocuments({
      status: "Inactive",
    });

  const totalEmployees =
    await Employee.countDocuments({
      status: "Active",
    });

  return {
    totalDepartments,
    activeDepartments,
    inactiveDepartments,
    totalEmployees,
  };
};

/**
 * Get Department Details
 */
export const getDepartmentById = async (
  id: string
) => {
  const department =
    await Department.findById(id)
      .populate(
        "manager",
        "firstName lastName profileImage email designation"
      );

  if (!department) {
    return null;
  }

  const employees =
    await Employee.find({
      department: id,
    }).select(
      "employeeId firstName lastName designation role status"
    );

  return {
    ...department.toObject(),
    employees,
  };
};

/**
 * Update Department
 */
export const updateDepartment = async (
  id: string,
  data: Partial<IDepartment>,
  userId: string
) => {
  if (data.name) {
    const duplicate =
      await Department.findOne({
        name: data.name,
        _id: { $ne: id },
      });

    if (duplicate) {
      throw new ApiError(
        409,
        "Department name already exists."
      );
    }
  }

  const department =
    await Department.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );

  if (!department) {
    return null;
  }

  await notifyRoles(
    ["admin", "hr"],
    "Department Updated",
    `${department.name} department has been updated.`,
    "info"
  );

  await logAction(
    userId,
    "UPDATE",
    "Department",
    `Department ${department.name} updated.`
  );

  return department;
};

/**
 * Disable Department (Soft Delete)
 */
export const deleteDepartment = async (
  id: string,
  userId: string
) => {
  const employeeCount =
    await Employee.countDocuments({
      department: id,
      status: "Active",
    });

  if (employeeCount > 0) {
    throw new ApiError(
      400,
      "Department cannot be disabled because employees are assigned to it."
    );
  }

  const department =
    await Department.findByIdAndUpdate(
      id,
      {
        status: "Inactive",
      },
      {
        new: true,
      }
    );

  if (!department) {
    return null;
  }

  await notifyRoles(
    ["admin", "hr"],
    "Department Disabled",
    `${department.name} department has been disabled.`,
    "warning"
  );

  await logAction(
    userId,
    "DISABLE",
    "Department",
    `Department ${department.name} disabled.`
  );

  return department;
};

/**
 * Restore Department
 */
export const restoreDepartment = async (
  id: string,
  userId: string
) => {
  const department =
    await Department.findByIdAndUpdate(
      id,
      {
        status: "Active",
      },
      {
        new: true,
      }
    );

  if (!department) {
    return null;
  }

  await notifyRoles(
    ["admin", "hr"],
    "Department Restored",
    `${department.name} department has been restored.`,
    "success"
  );

  await logAction(
    userId,
    "RESTORE",
    "Department",
    `Department ${department.name} restored.`
  );

  return department;
};