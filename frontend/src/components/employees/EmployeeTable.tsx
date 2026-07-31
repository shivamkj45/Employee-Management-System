import {
  Avatar,
  Chip,
  Box,
} from "@mui/material";

import {
  DataGrid,
  type GridColDef,
} from "@mui/x-data-grid";

import type { Employee } from "../../types/employee.types";

import EmployeeActions from "./EmployeeActions";

interface Props {
  employees: Employee[];
}

function EmployeeTable({
  employees,
}: Props) {
  const columns: GridColDef[] = [
    {
      field: "profileImage",
      headerName: "",
      width: 80,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Avatar src={params.value} />
      ),
    },

    {
      field: "employeeId",
      headerName: "Employee ID",
      width: 140,
    },

    {
      field: "firstName",
      headerName: "Employee Name",
      flex: 1,
      minWidth: 220,
      valueGetter: (_, row) =>
        `${row.firstName} ${row.lastName}`,
    },

    {
      field: "department",
      headerName: "Department",
      width: 170,
      valueGetter: (_, row) =>
        row.department.name,
    },

    {
      field: "designation",
      headerName: "Designation",
      width: 190,
    },

    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === "Active"
              ? "success"
              : "default"
          }
          size="small"
        />
      ),
    },

    {
      field: "role",
      headerName: "Role",
      width: 120,
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 170,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <EmployeeActions
          id={params.row._id}
        />
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        autoHeight
        rows={employees}
        columns={columns}
        getRowId={(row) => row._id}
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
              page: 0,
            },
          },
        }}
        disableRowSelectionOnClick
        sx={{
          border: 0,
          borderRadius: 2,

          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f5f5f5",
            fontWeight: 700,
            fontSize: 15,
          },

          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: 700,
          },

          "& .MuiDataGrid-cell": {
            display: "flex",
            alignItems: "center",
          },

          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#f8fbff",
          },

          "& .MuiDataGrid-footerContainer": {
            borderTop: "1px solid #e0e0e0",
          },
        }}
      />
    </Box>
  );
}

export default EmployeeTable;