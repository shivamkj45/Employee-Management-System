import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TableViewIcon from "@mui/icons-material/TableView";

interface Props {

  search: string;

  setSearch: (value: string) => void;

  action: string;

  setAction: (value: string) => void;

  module: string;

  setModule: (value: string) => void;

  onExportPDF: () => void;

  onExportExcel: () => void;

}

export default function AuditToolbar({

  search,

  setSearch,

  action,

  setAction,

  module,

  setModule,

  onExportPDF,

  onExportExcel,

}: Props) {

  return (

    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
      mb={3}
      gap={2}
    >

      <Stack
        direction="row"
        spacing={2}
        flexWrap="wrap"
      >

        <TextField
          size="small"
          placeholder="Search..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
        />

        <TextField
          select
          size="small"
          label="Action"
          value={action}
          onChange={(e) =>
            setAction(e.target.value)
          }
          sx={{ minWidth: 170 }}
        >

          <MenuItem value="">
            All Actions
          </MenuItem>

          <MenuItem value="CREATE">
            CREATE
          </MenuItem>

          <MenuItem value="UPDATE">
            UPDATE
          </MenuItem>

          <MenuItem value="DELETE">
            DELETE
          </MenuItem>

          <MenuItem value="RESTORE">
            RESTORE
          </MenuItem>

          <MenuItem value="DISABLE">
            DISABLE
          </MenuItem>

          <MenuItem value="LOGIN">
            LOGIN
          </MenuItem>

          <MenuItem value="LOGOUT">
            LOGOUT
          </MenuItem>

        </TextField>

        <TextField
          select
          size="small"
          label="Module"
          value={module}
          onChange={(e) =>
            setModule(e.target.value)
          }
          sx={{ minWidth: 170 }}
        >

          <MenuItem value="">
            All Modules
          </MenuItem>

          <MenuItem value="Employee">
            Employee
          </MenuItem>

          <MenuItem value="Department">
            Department
          </MenuItem>

          <MenuItem value="Attendance">
            Attendance
          </MenuItem>

          <MenuItem value="Leave">
            Leave
          </MenuItem>

          <MenuItem value="Payroll">
            Payroll
          </MenuItem>

          <MenuItem value="User">
            User
          </MenuItem>

        </TextField>

      </Stack>

      <Stack direction="row" spacing={2}>

        <Button
          variant="outlined"
          startIcon={<PictureAsPdfIcon />}
          onClick={onExportPDF}
        >
          PDF
        </Button>

        <Button
          variant="outlined"
          startIcon={<TableViewIcon />}
          onClick={onExportExcel}
        >
          Excel
        </Button>

      </Stack>

    </Box>

  );

}