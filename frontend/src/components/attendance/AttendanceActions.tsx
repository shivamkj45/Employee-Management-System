import {
  Button,
  Stack,
} from "@mui/material";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

import {
  useCheckIn,
  useCheckOut,
} from "../../hooks/useAttendanceActions";

interface Props {
  attendance: any;
}

function AttendanceActions({
  attendance,
}: Props) {
  const checkInMutation = useCheckIn();
  const checkOutMutation = useCheckOut();

  const checkedIn =
    attendance?.checkIn;

  const checkedOut =
    attendance?.checkOut;

  return (
    <Stack
      direction="row"
      spacing={2}
      mt={3}
    >
      <Button
        variant="contained"
        startIcon={<LoginIcon />}
        disabled={
          checkedIn ||
          checkInMutation.isPending
        }
        onClick={() =>
          checkInMutation.mutate()
        }
      >
        Check In
      </Button>

      <Button
        variant="outlined"
        color="error"
        startIcon={<LogoutIcon />}
        disabled={
          !checkedIn ||
          checkedOut ||
          checkOutMutation.isPending
        }
        onClick={() =>
          checkOutMutation.mutate()
        }
      >
        Check Out
      </Button>
    </Stack>
  );
}

export default AttendanceActions;