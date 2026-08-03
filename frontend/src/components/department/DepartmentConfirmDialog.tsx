import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

interface Props {
  open: boolean;
  title: string;
  message: string;
  confirmText: string;
  color?: "error" | "success";
  onClose: () => void;
  onConfirm: () => void;
}

export default function DepartmentConfirmDialog({
  open,
  title,
  message,
  confirmText,
  color = "error",
  onClose,
  onConfirm,
}: Props) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <DialogContentText>
          {message}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          color={color}
          onClick={onConfirm}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}