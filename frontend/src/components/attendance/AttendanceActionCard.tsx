import {
  Card,
  CardContent,
  Stack,
  Button,
} from "@mui/material";

interface Props {
  onCheckIn: () => void;
  onCheckOut: () => void;

  checkingIn: boolean;
  checkingOut: boolean;

  checkedIn: boolean;
  checkedOut: boolean;
}

function AttendanceActionCard({
  onCheckIn,
  onCheckOut,
  checkingIn,
  checkingOut,
  checkedIn,
  checkedOut,
}: Props) {
  return (
    <Card elevation={3}>
      <CardContent>
        <Stack
          direction="row"
          spacing={2}
        >
          <Button
            fullWidth
            variant="contained"
            color="success"
            disabled={
              checkedIn || checkingIn
            }
            onClick={onCheckIn}
          >
            Check In
          </Button>

          <Button
            fullWidth
            variant="contained"
            color="warning"
            disabled={
              !checkedIn ||
              checkedOut ||
              checkingOut
            }
            onClick={onCheckOut}
          >
            Check Out
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default AttendanceActionCard;