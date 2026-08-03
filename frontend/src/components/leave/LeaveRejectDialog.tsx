import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

interface Props {
  open: boolean;
  leave: any;
  remarks: string;
  setRemarks: (value: string) => void;
  onClose: () => void;
  onReject: () => void;
}

function LeaveRejectDialog({
  open,
  leave,
  remarks,
  setRemarks,
  onClose,
  onReject,
}: Props) {
  if (!leave) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Reject Leave Request
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <Typography>
            <strong>Employee:</strong>{" "}
            {leave.employee.firstName}{" "}
            {leave.employee.lastName}
          </Typography>

          <Typography>
            <strong>Leave Type:</strong>{" "}
            {leave.leaveType}
          </Typography>

          <TextField
            required
            label="Rejection Reason"
            multiline
            rows={4}
            value={remarks}
            onChange={(e) =>
              setRemarks(e.target.value)
            }
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          color="error"
          disabled={!remarks.trim()}
          onClick={onReject}
        >
          Reject
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LeaveRejectDialog;