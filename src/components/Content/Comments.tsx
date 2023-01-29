import { useContext, useState, useRef } from "react";
import { Box } from "@mui/material";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ThemeContext from "../../context/themeContext";
import UserContext from "../../context/userContext";
import { notify } from "../../utils/notifications";
import { Comment as CommentItem, CommentsProps } from "../../utils/interfaces";
import ConfirmationDialog from "../Elements/ConfirmationDialog";

const Comments = ({
  item,
  onAdd,
  onDelete,
  onLike,
  onDislike,
}: CommentsProps) => {
  const { palette } = useContext(ThemeContext);
  const { currentUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const commentToDelete = useRef<{
    itemId: string | undefined;
    comment: CommentItem;
  } | null>(null);

  const handleOpenDialog = (itemId: string, comment: CommentItem) => {
    commentToDelete.current = { itemId, comment };
    setIsOpen(true);
  };
  const handleCloseDialog = () => {
    setIsOpen(false);
    commentToDelete.current = null;
  };

  const handleConfirmDialog = async () => {
    commentToDelete.current?.itemId &&
      commentToDelete.current?.comment &&
      (await onDelete?.(
        commentToDelete.current.itemId,
        commentToDelete.current.comment
      ));
    commentToDelete.current = null;
    setIsOpen(false);
  };

  const handleAddComment = (itemId: string, comment: CommentItem) => {
    onAdd?.(itemId, comment);
  };

  const handleLikeComment = (itemId: string, comment: CommentItem) => {
    if (comment.creator?._id === currentUser?._id) {
      notify("You can't like your own comment.");
    } else {
      comment._id && onLike?.(itemId, comment._id);
    }
  };

  const handleDislikeComment = (itemId: string, comment: CommentItem) => {
    if (comment.creator?._id === currentUser?._id) {
      notify("You can't dislike your own comment.");
    } else {
      comment._id && onDislike?.(itemId, comment._id);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
      }}
    >
      <Accordion
        elevation={0}
        sx={{
          color: palette?.text.tertiary,
          background: "inherit",
          width: "100%",
          "&:before": {
            display: "none",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: palette?.text.tertiary }} />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          sx={{ margin: "0 !important", padding: "0 !important" }}
        >
          <Typography
            sx={{
              fontWeight: 500,
            }}
          >
            Comments
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{ margin: "0 0 .5rem 0 !important", padding: "0 !important" }}
        >
          {item?.comments?.map((comment: CommentItem) => (
            <Comment
              key={comment._id}
              comment={comment}
              itemId={item._id}
              onDelete={handleOpenDialog}
              onLike={handleLikeComment}
              onDislike={handleDislikeComment}
            />
          ))}
        </AccordionDetails>
        <CommentForm item={item} onAdd={handleAddComment} />
      </Accordion>
      <ConfirmationDialog
        title={"Delete?"}
        confirmLabel={"delete"}
        isOpen={isOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDialog}
      />
    </Box>
  );
};

export default Comments;
