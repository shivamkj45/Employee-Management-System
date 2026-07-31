import {
  Box,
  Button,
  TextField,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

interface Props {
  search: string;
  setSearch: (value: string) => void;
}

function EmployeeToolbar({
  search,
  setSearch,
}: Props) {

  const navigate = useNavigate();
  return (
    <Box
      mb={3}
      display="flex"
      justifyContent="space-between"
      gap={2}
    >
      <TextField
        label="Search employee"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        sx={{ width: 350 }}
      />

      <Button
        variant="contained"
        startIcon={<AddIcon />}
         onClick={() =>
    navigate("/employees/add")
         }
      >
        Add Employee
      </Button>
    </Box>
  );
}

export default EmployeeToolbar;