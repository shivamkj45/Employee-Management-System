import {
  Box,
  MenuItem,
  TextField,
} from "@mui/material";

interface Props {
  search: string;

  setSearch: (
    value: string
  ) => void;

  status: string;

  setStatus: (
    value: string
  ) => void;

  category: string;

  setCategory: (
    value: string
  ) => void;
}

function NotificationToolbar({
  search,
  setSearch,
  status,
  setStatus,
  category,
  setCategory,
}: Props) {
  return (
    <Box
      display="flex"
      gap={2}
      my={3}
      flexWrap="wrap"
    >
      <TextField
        label="Search"
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
      />

      <TextField
        select
        label="Status"
        value={status}
        onChange={(e) =>
          setStatus(
            e.target.value
          )
        }
        sx={{
          width: 180,
        }}
      >
        <MenuItem value="">
          All
        </MenuItem>

        <MenuItem value="Unread">
          Unread
        </MenuItem>

        <MenuItem value="Read">
          Read
        </MenuItem>
      </TextField>

      <TextField
        select
        label="Category"
        value={category}
        onChange={(e) =>
          setCategory(
            e.target.value
          )
        }
        sx={{
          width: 220,
        }}
      >
        <MenuItem value="">
          All
        </MenuItem>

        <MenuItem value="leave">
          Leave
        </MenuItem>

        <MenuItem value="attendance">
          Attendance
        </MenuItem>

        <MenuItem value="employee">
          Employee
        </MenuItem>

        <MenuItem value="payroll">
          Payroll
        </MenuItem>

        <MenuItem value="system">
          System
        </MenuItem>
      </TextField>
    </Box>
  );
}

export default NotificationToolbar;