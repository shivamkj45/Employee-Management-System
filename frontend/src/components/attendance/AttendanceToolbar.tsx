import {
  Box,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

interface Props {
  search: string;
  setSearch: (value: string) => void;

  department: string;
  setDepartment: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  departments: string[];

  onExportExcel: () => void;
  onExportPDF: () => void;
}

export default function AttendanceToolbar({
  search,
  setSearch,
  department,
  setDepartment,
  status,
  setStatus,
  departments,
  onExportExcel,
  onExportPDF,
}: Props) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
      gap={2}
      mb={3}
    >
      {/* Left Side Filters */}
      <Box
        display="flex"
        gap={2}
        flexWrap="wrap"
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
          label="Status"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          sx={{ minWidth: 160 }}
        >
          <MenuItem value="">
            All
          </MenuItem>

          <MenuItem value="Present">
            Present
          </MenuItem>

          <MenuItem value="Absent">
            Absent
          </MenuItem>

          <MenuItem value="Leave">
            Leave
          </MenuItem>

          <MenuItem value="Half Day">
            Half Day
          </MenuItem>
        </TextField>
      </Box>

      {/* Right Side Export Buttons */}
      <Box
        display="flex"
        gap={2}
      >
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={onExportExcel}
        >
          Export Excel
        </Button>

        <Button
          variant="contained"
          color="error"
          startIcon={<PictureAsPdfIcon />}
          onClick={onExportPDF}
        >
          Export PDF
        </Button>
      </Box>
    </Box>
  );
}