import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { deleteUser } from "../../../store/currentUser";
import { useAppDispatch } from "../../../store/store";
import { ReduxState } from "../../../utils/interfaces";
import ConfirmationDialog from "../../Elements/ConfirmationDialog";

const DeleteAccount = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const palette = useSelector((state: ReduxState) => state.theme.palette);
  const dispatch = useAppDispatch();

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };
  const handleConfirmDialog = async () => {
    await dispatch(deleteUser());
    setIsOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          margin: 0,
          color: palette.warning,
          cursor: "pointer",
          display: "flex",
        }}
        onClick={() => handleOpenDialog()}
      >
        Delete account{" "}
        <CloseIcon sx={{ marginLeft: ".5rem", fontSize: "1.4rem" }} />
      </Box>
      <ConfirmationDialog
        title={"Delete this account?"}
        confirmLabel={"delete"}
        isOpen={isOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDialog}
      />
    </>
  );
};

export default DeleteAccount;
