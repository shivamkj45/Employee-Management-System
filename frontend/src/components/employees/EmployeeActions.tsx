import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  IconButton,
  Stack,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

import DeleteEmployeeDialog from "./DeleteEmployeeDialog";
import { useDeleteEmployee } from "../../hooks/useDeleteEmployee";

interface Props {
  id: string;
}

function EmployeeActions({
  id,
}: Props) {
  const navigate = useNavigate();

  const [open, setOpen] =
    useState(false);

  const deleteMutation =
    useDeleteEmployee();

  const handleDelete =
    async () => {
      await deleteMutation.mutateAsync(id);

      setOpen(false);
    };

  return (
    <>
      <Stack
        direction="row"
        spacing={1}
      >
        <IconButton
          color="primary"
          onClick={() =>
            navigate(`/employees/${id}`)
          }
        >
          <VisibilityIcon />
        </IconButton>

        <IconButton
          color="warning"
          onClick={() =>
            navigate(`/employees/edit/${id}`)
          }
        >
          <EditIcon />
        </IconButton>

        <IconButton
          color="error"
          onClick={() =>
            setOpen(true)
          }
        >
          <DeleteIcon />
        </IconButton>
      </Stack>

      <DeleteEmployeeDialog
        open={open}
        onClose={() =>
          setOpen(false)
        }
        onDelete={handleDelete}
        loading={
          deleteMutation.isPending
        }
      />
    </>
  );
}

export default EmployeeActions;