import { useMemo, useState } from "react";

import Typography from "@mui/material/Typography";


import DashboardLayout from "../../layouts/DashboardLayout";

import DepartmentSummaryCards from "../../components/department/DepartmentSummaryCards";
import DepartmentToolbar from "../../components/department/DepartmentToolbar";
import DepartmentTable from "../../components/department/DepartmentTable";
import DepartmentDetailsDrawer from "../../components/department/DepartmentDetailsDrawer";
import DepartmentDialog from "../../components/department/DepartmentDialog";
import DepartmentConfirmDialog from "../../components/department/DepartmentConfirmDialog";
import { exportDepartmentExcel }
from "../../utils/exportDepartmentExcel";
import { exportDepartmentPDF } from "../../utils/exportDepartmentPDF";
import { useNavigate } from "react-router-dom";
import {
  useDepartments,
  useDeleteDepartment,
  useRestoreDepartment,
  useCreateDepartment,
  useUpdateDepartment,
} from "../../hooks/useDepartments";

export default function DepartmentPage() {

  const {
    data: departments = [],
    isLoading,
  } = useDepartments();

  const createDepartment =
    useCreateDepartment();

  const updateDepartment =
    useUpdateDepartment();

  const deleteDepartment =
    useDeleteDepartment();

  const restoreDepartment =
    useRestoreDepartment();

  const [search, setSearch] =
    useState("");

  const [selectedDepartment,
    setSelectedDepartment] =
    useState<any>(null);

  const [drawerOpen,
    setDrawerOpen] =
    useState(false);

  const [dialogOpen,
    setDialogOpen] =
    useState(false);

  const [editingDepartment,
    setEditingDepartment] =
    useState<any>(null);

  const [confirmOpen, setConfirmOpen] =
  useState(false);

const [confirmAction, setConfirmAction] =
  useState<"delete" | "restore">("delete");

const [selectedDepartmentId, setSelectedDepartmentId] =
  useState("");

  const navigate = useNavigate();

  const filteredDepartments =
    useMemo(() => {

      return departments.filter(
        (department: any) =>
          department.name
            .toLowerCase()
            .includes(search.toLowerCase())
      );

    }, [departments, search]);

  const handleEdit = (
    department: any
  ) => {

    setEditingDepartment(
      department
    );

    setDialogOpen(true);

  };

  const handleSubmit = async (data: any) => {

  try {

    if (editingDepartment) {

      await updateDepartment.mutateAsync({
        id: editingDepartment._id,
        data,
      });

    } else {

      await createDepartment.mutateAsync(data);

    }

    setDialogOpen(false);

    setEditingDepartment(null);

  } catch (error) {

    console.error(error);

  }

};

  if (isLoading) {

    return (

      <DashboardLayout>

        Loading...

      </DashboardLayout>

    );

  }

  return (

    <DashboardLayout>

      <Typography
        variant="h4"
        fontWeight={700}
        mb={3}
      >
        Department Management
      </Typography>


      <DepartmentSummaryCards />

      <DepartmentToolbar

        search={search}

        setSearch={setSearch}

        onCreate={() => {

          setEditingDepartment(null);

          setDialogOpen(true);

        }}

        onExportExcel={() =>
  exportDepartmentExcel(filteredDepartments)
}

        onExportPDF={() =>
  exportDepartmentPDF(filteredDepartments)
}

      />

      <DepartmentTable

        departments={filteredDepartments}

        onView={(department) => {

          setSelectedDepartment(
            department
          );

          setDrawerOpen(true);

        }}

        onEdit={handleEdit}

        onDelete={(id) => {

  setSelectedDepartmentId(id);

  setConfirmAction("delete");

  setConfirmOpen(true);

}}

        onRestore={(id) => {

  setSelectedDepartmentId(id);

  setConfirmAction("restore");

  setConfirmOpen(true);

}}

onManagerClick={(id) =>
    navigate(`/employees/${id}`)
  }

      />

      <DepartmentDetailsDrawer

        open={drawerOpen}

        onClose={() =>
          setDrawerOpen(false)
        }

        department={selectedDepartment}

      />

      <DepartmentDialog

        open={dialogOpen}

        onClose={() => {

          setDialogOpen(false);

          setEditingDepartment(null);

        }}

        onSubmit={handleSubmit}

        initialData={editingDepartment}

      />
      <DepartmentConfirmDialog
  open={confirmOpen}
  onClose={() => setConfirmOpen(false)}
  title={
    confirmAction === "delete"
      ? "Deactivate Department"
      : "Restore Department"
  }
  message={
    confirmAction === "delete"
      ? "Are you sure you want to deactivate this department?"
      : "Are you sure you want to restore this department?"
  }
  confirmText={
    confirmAction === "delete"
      ? "Deactivate"
      : "Restore"
  }
  color={
    confirmAction === "delete"
      ? "error"
      : "success"
  }
  onConfirm={async () => {

    if (confirmAction === "delete") {

      await deleteDepartment.mutateAsync(
        selectedDepartmentId
      );

    } else {

      await restoreDepartment.mutateAsync(
        selectedDepartmentId
      );

    }

    setConfirmOpen(false);

  }}
/>

    </DashboardLayout>

  );

}