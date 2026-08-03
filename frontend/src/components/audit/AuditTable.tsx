import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  DataGrid,
  type GridColDef,
} from "@mui/x-data-grid";

import VisibilityIcon from "@mui/icons-material/Visibility";

interface Props {

  logs: any[];

  onView: (log: any) => void;

}

export default function AuditTable({

  logs,

  onView,

}: Props) {

  const getActionColor = (action: string) => {

    switch (action) {

      case "CREATE":
        return "success";

      case "UPDATE":
        return "info";

      case "DELETE":
      case "DISABLE":
        return "error";

      case "RESTORE":
        return "warning";

      case "LOGIN":
        return "primary";

      case "LOGOUT":
        return "secondary";

      default:
        return "default";

    }

  };

  const columns: GridColDef[] = [

    {
      field: "user",
      headerName: "User",
      flex: 1.7,

      renderCell: (params) => {

        const employee =
          params.row.user?.employee;

        return (

          <Box
            display="flex"
            alignItems="center"
            gap={1}
          >

            <Avatar
              src={employee?.profileImage}
            >
              {employee?.firstName?.charAt(0)}
            </Avatar>

            <Box>

              <Typography
                fontWeight={600}
                fontSize={14}
              >
                {employee?.firstName}{" "}
                {employee?.lastName}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
              >
                {params.row.user?.email}
              </Typography>

            </Box>

          </Box>

        );

      },

    },

    {
      field: "role",
      headerName: "Role",
      width: 120,

      valueGetter: (_, row) =>
        row.user?.role,
    },

    {
      field: "module",
      headerName: "Module",
      width: 150,
    },

    {
      field: "action",
      headerName: "Action",
      width: 140,

      renderCell: (params) => (

        <Chip
          label={params.value}
          color={
            getActionColor(params.value) as any
          }
          size="small"
        />

      ),

    },

    {
      field: "description",
      headerName: "Description",
      flex: 2,
    },

    {
      field: "ipAddress",
      headerName: "IP Address",
      width: 150,
    },

    {
      field: "createdAt",
      headerName: "Time",
      width: 190,

      valueFormatter: (value) =>
        new Date(value).toLocaleString(),
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      sortable: false,

      renderCell: (params) => (

        <Tooltip title="View">

          <IconButton
            onClick={() =>
              onView(params.row)
            }
          >

            <VisibilityIcon />

          </IconButton>

        </Tooltip>

      ),

    },

  ];

  return (

    <Paper>

      <DataGrid

        rows={logs}

        columns={columns}

        getRowId={(row) => row._id}

        autoHeight

        pageSizeOptions={[10, 25, 50]}

        disableRowSelectionOnClick

      />

    </Paper>

  );

}