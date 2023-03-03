import { ThumbDown, ThumbDownOffAlt } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { debounce } from "lodash";
import { useSelector } from "react-redux";
import { dislikeComment } from "../../../store/posts";
import { useAppDispatch } from "../../../store/store";
import { Comment, ReduxState } from "../../../utils/interfaces";
import { notify } from "../../../utils/notifications";

interface DislikeProps {
  comment: Comment;
  itemId?: string;
}

const Dislike = ({ comment, itemId }: DislikeProps) => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);
  const { _id } = useSelector((state: ReduxState) => state.currentUser.data);
  const dispatch = useAppDispatch();

  const onDislikeComment = (itemId: string, comment: Comment) => {
    if (comment.creator?._id === _id) {
      notify("You can't dislike your own comment.");
    } else {
      comment._id &&
        dispatch(dislikeComment({ postId: itemId, commentId: comment._id }));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        marginRight: ".5rem",
        alignItems: "center",
      }}
    >
      {comment.dislikes?.find((user) => user._id === _id) ? (
        <ThumbDown
          sx={{
            fontSize: ".9rem",
            cursor: "pointer",
            color: palette.text.primary,
          }}
          onClick={debounce(
            () => itemId && onDislikeComment?.(itemId, comment),
            300
          )}
        />
      ) : (
        <ThumbDownOffAlt
          sx={{ fontSize: "1rem", cursor: "pointer" }}
          onClick={debounce(
            () => itemId && onDislikeComment?.(itemId, comment),
            300
          )}
        />
      )}
      <Typography
        sx={{ display: "block", marginLeft: ".3rem" }}
        component="span"
        variant="body2"
        fontSize={".8rem"}
      >
        {comment.dislikes?.length ? comment.dislikes.length : ""}
      </Typography>
    </Box>
  );
};

export default Dislike;
