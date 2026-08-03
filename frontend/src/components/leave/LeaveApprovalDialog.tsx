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
  onApprove: () => void;
}

function LeaveApprovalDialog({
  open,
  leave,
  remarks,
  setRemarks,
  onClose,
  onApprove,
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
        Approve Leave Request
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

          <Typography>
            <strong>Duration:</strong>{" "}
            {new Date(
              leave.startDate
            ).toLocaleDateString()}{" "}
            -{" "}
            {new Date(
              leave.endDate
            ).toLocaleDateString()}
          </Typography>

          <TextField
            label="Approval Remarks (Optional)"
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
          color="success"
          onClick={onApprove}
        >
          Approve
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LeaveApprovalDialog;