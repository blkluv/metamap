import { useState } from "react";
import { RemoveCircleOutline } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { deletePost } from "../../../store/posts";
import { useAppDispatch } from "../../../store/store";
import { Post, ReduxState } from "../../../utils/interfaces";
import ConfirmationDialog from "../../Elements/ConfirmationDialog";

interface RemoveProps {
  post: Post;
}

const Delete = ({ post }: RemoveProps) => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);
  const { _id } = useSelector((state: ReduxState) => state.currentUser.data);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };
  const handleConfirmDialog = async () => {
    if (post._id) {
      dispatch(deletePost(post._id));
      setIsOpen(false);
    }
  };

  return (
    <>
      {_id === post.creator?._id ? (
        <RemoveCircleOutline
          sx={{
            cursor: "pointer",
            color: palette.text.primary,
            fontSize: "1.2rem",
            marginLeft: ".8rem",
          }}
          onClick={() => handleOpenDialog()}
        />
      ) : null}
      <ConfirmationDialog
        title={"Delete this post?"}
        confirmLabel={"delete"}
        isOpen={isOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDialog}
      />
    </>
  );
};

export default Delete;
