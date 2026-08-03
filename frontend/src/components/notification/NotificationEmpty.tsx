import {
  Box,
  Typography,
} from "@mui/material";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

function NotificationEmpty() {
  return (
    <Box
      sx={{
        py: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <NotificationsNoneIcon
        sx={{
          fontSize: 60,
          color: "grey.400",
        }}
      />

      <Typography
        mt={2}
        color="text.secondary"
      >
        No notifications yet
      </Typography>
    </Box>
  );
}

export default NotificationEmpty;