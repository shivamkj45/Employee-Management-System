import {
  Avatar,
  Box,
  Chip,
  Divider,
  Drawer,
  Stack,
  Typography,
} from "@mui/material";

interface Props {
  open: boolean;

  onClose: () => void;

  log: any;
}

export default function AuditDetailsDrawer({
  open,
  onClose,
  log,
}: Props) {

  if (!log) return null;

  const employee =
    log.user?.employee;

  return (

    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
    >

      <Box
        width={420}
        p={3}
      >

        <Typography
          variant="h5"
          fontWeight={700}
          mb={3}
        >
          Audit Details
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          mb={3}
        >

          <Avatar
            src={employee?.profileImage}
            sx={{
              width: 72,
              height: 72,
            }}
          >
            {employee?.firstName?.charAt(0)}
          </Avatar>

          <Box>

            <Typography
              variant="h6"
              fontWeight={700}
            >
              {employee?.firstName}{" "}
              {employee?.lastName}
            </Typography>

            <Typography color="text.secondary">
              {log.user?.email}
            </Typography>

            <Chip
              size="small"
              label={log.user?.role}
              sx={{ mt: 1 }}
            />

          </Box>

        </Stack>

        <Divider sx={{ mb: 3 }} />

        <Stack spacing={2}>

          <Box>

            <Typography
              fontWeight={700}
            >
              Module
            </Typography>

            <Typography>
              {log.module}
            </Typography>

          </Box>

          <Box>

            <Typography
              fontWeight={700}
            >
              Action
            </Typography>

            <Chip
              label={log.action}
              color="primary"
            />

          </Box>

          <Box>

            <Typography
              fontWeight={700}
            >
              Description
            </Typography>

            <Typography>
              {log.description}
            </Typography>

          </Box>

          <Box>

            <Typography
              fontWeight={700}
            >
              IP Address
            </Typography>

            <Typography>
              {log.ipAddress || "N/A"}
            </Typography>

          </Box>

          <Box>

            <Typography
              fontWeight={700}
            >
              Browser
            </Typography>

            <Typography
              sx={{
                wordBreak: "break-word",
              }}
            >
              {log.userAgent || "N/A"}
            </Typography>

          </Box>

          <Box>

            <Typography
              fontWeight={700}
            >
              Time
            </Typography>

            <Typography>
              {new Date(
                log.createdAt
              ).toLocaleString()}
            </Typography>

          </Box>

        </Stack>

      </Box>

    </Drawer>

  );

}