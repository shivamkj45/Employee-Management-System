import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import UserMenu from "./UserMenu";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user } = useAuth();

  return (
    <AppBar
      position="fixed"
      sx={{
        width: "calc(100% - 260px)",
        ml: "260px",
        bgcolor: "#1976d2",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
        >
          Employee Management System
        </Typography>

        <IconButton color="inherit">
          <NotificationsIcon />
        </IconButton>

        <Box
  sx={{
    display: "flex",
    alignItems: "center",
    gap: 2,
  }}
>
  <Typography>
    {user?.employee.firstName}
  </Typography>

  <UserMenu />
</Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;