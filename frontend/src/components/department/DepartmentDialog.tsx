import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  TextField,
  MenuItem,
} from "@mui/material";

import { useEffect, useState } from "react";


import { useManagers } from "../../hooks/useEmployees";
interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
}

export default function DepartmentDialog({
  open,
  onClose,
  onSubmit,
  initialData,
}: Props) {
const { data } = useManagers();

const employees = data?.employees ?? [];

  const [form, setForm] = useState({
    name: "",
    description: "",
    manager: "",
    status: "Active",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        description: initialData.description || "",
        manager:
          initialData.manager?._id ||
          initialData.manager ||
          "",
        status: initialData.status || "Active",
      });
    } else {
      setForm({
        name: "",
        description: "",
        manager: "",
        status: "Active",
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {initialData
          ? "Edit Department"
          : "Add Department"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Department Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
          />

          <TextField
            select
            label="Manager"
            name="manager"
            value={form.manager}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="">
              None
            </MenuItem>

            {employees.map((emp: any) => (
              <MenuItem
                key={emp._id}
                value={emp._id}
              >
                {emp.firstName} {emp.lastName}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="Active">
              Active
            </MenuItem>

            <MenuItem value="Inactive">
              Inactive
            </MenuItem>
          </TextField>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={() => onSubmit(form)}
        >
          {initialData
            ? "Update"
            : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}