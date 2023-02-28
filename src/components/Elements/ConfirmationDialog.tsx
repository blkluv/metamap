import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ConfirmationDialogProps, ReduxState } from "../../utils/interfaces";
import { useSelector } from "react-redux";

const ConfirmationDialog = ({
  isOpen,
  title,
  onClose,
  onConfirm,
  confirmLabel,
}: ConfirmationDialogProps) => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box
        sx={{
          background: palette.background.primary,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DialogTitle
          sx={{ color: palette.text.primary }}
          id="alert-dialog-title"
        >
          {title}
        </DialogTitle>
        <DialogActions>
          <Button
            variant="outlined"
            sx={{
              border: `1px solid ${palette.background.tertiary}`,
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
              border: `1px solid ${palette.background.tertiary}`,
              color: palette.warning,
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
