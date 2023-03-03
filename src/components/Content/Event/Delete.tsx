import { useState } from "react";
import { RemoveCircleOutline } from "@mui/icons-material";
import { deleteEvent } from "../../../store/events";
import { useAppDispatch } from "../../../store/store";
import { ReduxState, UserHeader } from "../../../utils/interfaces";
import ConfirmationDialog from "../../Elements/ConfirmationDialog";
import { useSelector } from "react-redux";

interface DeleteEvent {
  creator?: UserHeader;
  eventId?: string;
}

const Delete = ({ creator, eventId }: DeleteEvent) => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);
  const currentUser = useSelector(
    (state: ReduxState) => state.currentUser.data
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleOpenDialog = () => {
    setIsOpen(true);
  };
  const handleCloseDialog = () => {
    setIsOpen(false);
  };
  const handleConfirmDialog = () => {
    eventId && dispatch(deleteEvent(eventId));
    setIsOpen(false);
  };

  return (
    <>
      {currentUser?._id === creator?._id ? (
        <RemoveCircleOutline
          sx={{
            cursor: "pointer",
            color: palette.text.primary,
            fontSize: "1.2rem",
          }}
          onClick={() => handleOpenDialog()}
        />
      ) : null}
      <ConfirmationDialog
        title={"Delete this event?"}
        confirmLabel={"delete"}
        isOpen={isOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDialog}
      />
    </>
  );
};

export default Delete;
