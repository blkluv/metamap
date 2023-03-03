import { Box } from "@mui/material";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { deleteComment } from "../../../store/posts";
import { useAppDispatch } from "../../../store/store";
import { Comment, ReduxState } from "../../../utils/interfaces";
import ConfirmationDialog from "../../Elements/ConfirmationDialog";

interface DeleteProps {
  comment: Comment;
  itemId?: string;
}

const Delete = ({ comment, itemId }: DeleteProps) => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);
  const { _id } = useSelector((state: ReduxState) => state.currentUser.data);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const commentToDelete = useRef<{
    itemId: string | undefined;
    comment: Comment;
  } | null>(null);

  const handleOpenDialog = (itemId: string, comment: Comment) => {
    commentToDelete.current = { itemId, comment };
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    commentToDelete.current = null;
  };

  const handleConfirmDialog = async () => {
    commentToDelete.current?.itemId &&
      commentToDelete.current?.comment._id &&
      (await dispatch(
        deleteComment({
          postId: commentToDelete.current.itemId,
          commentId: commentToDelete.current.comment._id,
        })
      ));
    commentToDelete.current = null;
    setIsOpen(false);
  };

  return (
    <>
      {_id === comment.creator?._id ? (
        <Box
          sx={{
            margin: 0,
            color: palette.warning,
            marginRight: ".5rem",
            fontWeight: 500,
            fontSize: ".8rem",
            cursor: "pointer",
            display: "flex",
          }}
          onClick={() => itemId && handleOpenDialog?.(itemId, comment)}
        >
          Delete
        </Box>
      ) : null}
      <ConfirmationDialog
        title={"Delete?"}
        confirmLabel={"delete"}
        isOpen={isOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDialog}
      />
    </>
  );
};

export default Delete;
