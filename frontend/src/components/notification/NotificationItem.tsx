import {
  ListItem,
  ListItemText,
  Chip,
  IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  notification: any;

  onRead: () => void;

  onDelete: () => void;
}

function NotificationItem({
  notification,
  onRead,
  onDelete,
}: Props) {
  return (
    <ListItem
      divider
      sx={{
        bgcolor: notification.isRead
          ? "inherit"
          : "#E3F2FD",
        cursor: "pointer",
      }}
      onClick={onRead}
      secondaryAction={
        <IconButton
          edge="end"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemText
        primary={notification.title}
        secondary={
          <>
            {notification.message}

            <br />

            {new Date(
              notification.createdAt
            ).toLocaleString()}
          </>
        }
      />

      <Chip
        size="small"
        label={notification.type}
        color={
          notification.type === "success"
            ? "success"
            : notification.type === "warning"
            ? "warning"
            : notification.type === "error"
            ? "error"
            : "info"
        }
      />
    </ListItem>
  );
}

export default NotificationItem;