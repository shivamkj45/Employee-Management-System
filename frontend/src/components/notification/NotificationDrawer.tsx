import {
  Drawer,
  Box,
  Typography,
  Button,
  Divider,
  List,
} from "@mui/material";

import NotificationItem from "./NotificationItem";
import NotificationEmpty from "./NotificationEmpty";

import {
  useNotifications,
  useDeleteNotification,
  useMarkAllRead,
  useMarkNotificationRead,
} from "../../hooks/useNotification";

interface Props {
  open: boolean;

  onClose: () => void;
}

function NotificationDrawer({
  open,
  onClose,
}: Props) {
  const { data } =
    useNotifications();

  const notifications =
    data?.notifications ?? [];

  const markRead =
    useMarkNotificationRead();

  const deleteNotification =
    useDeleteNotification();

  const markAll =
    useMarkAllRead();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
    >
      <Box
        sx={{
          width: 420,
        }}
      >
        <Box
          p={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="h6"
            fontWeight={700}
          >
            Notifications
          </Typography>

          <Button
            onClick={() =>
              markAll.mutate()
            }
          >
            Mark All Read
          </Button>
        </Box>

        <Divider />

        <List>
          {notifications.length === 0 ? (
            <NotificationEmpty />
          ) : (
            notifications.map(
              (notification: any) => (
                <NotificationItem
                  key={notification._id}
                  notification={
                    notification
                  }
                  onRead={() =>
                    markRead.mutate(
                      notification._id
                    )
                  }
                  onDelete={() =>
                    deleteNotification.mutate(
                      notification._id
                    )
                  }
                />
              )
            )
          )}
        </List>
      </Box>
    </Drawer>
  );
}

export default NotificationDrawer;