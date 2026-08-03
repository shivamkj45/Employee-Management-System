import {
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";

import {
  useDeleteNotification,
  useMarkNotificationRead,
} from "../../hooks/useNotification";

interface Props {
  notifications: any[];
}

function NotificationTable({
  notifications,
}: Props) {
  const markRead =
    useMarkNotificationRead();

  const deleteNotification =
    useDeleteNotification();

  return (
    <TableContainer
      component={Paper}
    >
      <Table>

        <TableHead>

          <TableRow>

            <TableCell>
              Title
            </TableCell>

            <TableCell>
              Category
            </TableCell>

            <TableCell>
              Priority
            </TableCell>

            <TableCell>
              Status
            </TableCell>

            <TableCell>
              Date
            </TableCell>

            <TableCell align="center">
              Actions
            </TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {notifications.map(
            (notification) => (

              <TableRow
                key={
                  notification._id
                }
                hover
              >

                <TableCell>

                  <strong>
                    {
                      notification.title
                    }
                  </strong>

                  <br />

                  {
                    notification.message
                  }

                </TableCell>

                <TableCell>
                  <Chip
                    label={
                      notification.category
                    }
                  />
                </TableCell>

                <TableCell>

                  <Chip
                    label={
                      notification.priority
                    }
                    color={
                      notification.priority ===
                        "critical"
                        ? "error"
                        : notification.priority ===
                          "high"
                        ? "warning"
                        : "default"
                    }
                  />

                </TableCell>

                <TableCell>

                  <Chip
                    label={
                      notification.isRead
                        ? "Read"
                        : "Unread"
                    }
                    color={
                      notification.isRead
                        ? "success"
                        : "info"
                    }
                  />

                </TableCell>

                <TableCell>

                  {new Date(
                    notification.createdAt
                  ).toLocaleString()}

                </TableCell>

                <TableCell
                  align="center"
                >

                  {!notification.isRead && (

                    <Tooltip title="Mark Read">

                      <IconButton
                        color="success"
                        onClick={() =>
                          markRead.mutate(
                            notification._id
                          )
                        }
                      >
                        <DoneIcon />
                      </IconButton>

                    </Tooltip>

                  )}

                  <Tooltip title="Delete">

                    <IconButton
                      color="error"
                      onClick={() =>
                        deleteNotification.mutate(
                          notification._id
                        )
                      }
                    >
                      <DeleteIcon />
                    </IconButton>

                  </Tooltip>

                </TableCell>

              </TableRow>

            )
          )}

        </TableBody>

      </Table>
    </TableContainer>
  );
}

export default NotificationTable;