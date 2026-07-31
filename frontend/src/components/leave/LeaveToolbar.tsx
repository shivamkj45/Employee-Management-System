import {
  Box,
  Button,
  MenuItem,
  TextField,
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

interface Props {
  search: string;
  setSearch: (value: string) => void;

  department: string;
  setDepartment: (value: string) => void;

  leaveType: string;
  setLeaveType: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  departments: string[];

  onExportExcel: () => void;
  onExportPDF: () => void;
}

export default function LeaveToolbar({
  search,
  setSearch,
  department,
  setDepartment,
  leaveType,
  setLeaveType,
  status,
  setStatus,
  departments,
  onExportExcel,
  onExportPDF,
}: Props) {
  return (
    <Box
      display="flex"
      gap={2}
      flexWrap="wrap"
      mb={3}
    >
      <TextField
        label="Search Employee"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <TextField
        select
        label="Department"
        value={department}
        onChange={(e) =>
          setDepartment(e.target.value)
        }
        sx={{ minWidth: 180 }}
      >
        <MenuItem value="">
          All Departments
        </MenuItem>

        {departments.map((dep) => (
          <MenuItem
            key={dep}
            value={dep}
          >
            {dep}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Leave Type"
        value={leaveType}
        onChange={(e) =>
          setLeaveType(e.target.value)
        }
        sx={{ minWidth: 170 }}
      >
        <MenuItem value="">All</MenuItem>

        <MenuItem value="Annual">
          Annual
        </MenuItem>

        <MenuItem value="Casual">
          Casual
        </MenuItem>

        <MenuItem value="Sick">
          Sick
        </MenuItem>

        <MenuItem value="Maternity">
          Maternity
        </MenuItem>

        <MenuItem value="Paternity">
          Paternity
        </MenuItem>

        <MenuItem value="Unpaid">
          Unpaid
        </MenuItem>
      </TextField>

      <TextField
        select
        label="Status"
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
        sx={{ minWidth: 170 }}
      >
        <MenuItem value="">All</MenuItem>

        <MenuItem value="Pending">
          Pending
        </MenuItem>

        <MenuItem value="Approved">
          Approved
        </MenuItem>

        <MenuItem value="Rejected">
          Rejected
        </MenuItem>
      </TextField>

      <Button
        variant="outlined"
        startIcon={<DownloadIcon />}
        onClick={onExportExcel}
      >
        Excel
      </Button>

      <Button
        variant="contained"
        color="error"
        startIcon={<PictureAsPdfIcon />}
        onClick={onExportPDF}
      >
        PDF
      </Button>
    </Box>
  );
}