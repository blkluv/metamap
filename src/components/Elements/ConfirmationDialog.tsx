import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ConfirmationDialogProps } from "../../utils/interfaces";

const ConfirmationDialog = ({
  isOpen,
  title,
  onClose,
  onConfirm,
  confirmLabel,
}: ConfirmationDialogProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box sx={{ background: "rgb(53,51,64)" }}>
        <DialogTitle sx={{ color: "white" }} id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogActions>
          <Button
            variant="outlined"
            sx={{
              border: "1px solid rgb(68,68,80)",
            }}
            onClick={onClose}
          >
            No
          </Button>
          <Button
            onClick={onConfirm}
            variant="outlined"
            startIcon={<DeleteForeverIcon />}
            sx={{
              border: "1px solid rgb(68,68,80)",
              color: "rgb(235, 110, 105)",
            }}
          >
            {confirmLabel}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ConfirmationDialog;
