import {
  Badge,
  IconButton,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";

import { useState } from "react";

import NotificationDrawer from "./NotificationDrawer";

import { useUnreadCount } from "../../hooks/useNotification";

function NotificationBell() {
  const [open, setOpen] =
    useState(false);

  const { data } =
    useUnreadCount();

  return (
    <>
      <IconButton
        color="inherit"
        onClick={() =>
          setOpen(true)
        }
      >
        <Badge
          badgeContent={data ?? 0}
          color="error"
        >
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <NotificationDrawer
        open={open}
        onClose={() =>
          setOpen(false)
        }
      />
    </>
  );
}

export default NotificationBell;