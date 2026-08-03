import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

import { useProfile } from "../../hooks/useProfile";

interface Props {
  onEdit: () => void;
}

export default function ProfileCard({
  onEdit,
}: Props) {

  const { data } = useProfile();

  if (!data) return null;

  const { user, employee } = data;

  return (

    <Card
      sx={{
        borderRadius: 3,
      }}
    >

      <CardContent>

        <Stack
          spacing={2}
          alignItems="center"
        >

          <Avatar
            src={employee.profileImage}
            sx={{
              width: 120,
              height: 120,
              fontSize: 42,
            }}
          >
            {employee.firstName?.charAt(0)}
          </Avatar>

          <Box textAlign="center">

            <Typography
              variant="h5"
              fontWeight={700}
            >
              {employee.firstName} {employee.lastName}
            </Typography>

            <Typography
              color="text.secondary"
            >
              {employee.designation}
            </Typography>

            <Typography
              color="text.secondary"
            >
              {employee.department?.name}
            </Typography>

          </Box>

          <Chip
            label={employee.status}
            color={
              employee.status === "Active"
                ? "success"
                : "default"
            }
          />

        </Stack>

        <Divider sx={{ my: 3 }} />

        <Stack spacing={2}>

          <Box>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              Employee ID
            </Typography>

            <Typography>
              {employee.employeeId}
            </Typography>

          </Box>

          <Box>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              Email
            </Typography>

            <Typography>
              {user.email}
            </Typography>

          </Box>

          <Box>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              Phone
            </Typography>

            <Typography>
              {employee.phone}
            </Typography>

          </Box>

          <Box>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              Role
            </Typography>

            <Typography
              sx={{
                textTransform: "capitalize",
              }}
            >
              {user.role}
            </Typography>

          </Box>

        </Stack>

        <Button
          variant="contained"
          fullWidth
          startIcon={<EditIcon />}
          sx={{ mt: 4 }}
          onClick={onEdit}
        >
          Edit Profile
        </Button>

      </CardContent>

    </Card>

  );

}