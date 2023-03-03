import { ThumbUp, ThumbUpOffAlt } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { debounce } from "lodash";
import { useSelector } from "react-redux";
import { likeComment } from "../../../store/posts";
import { useAppDispatch } from "../../../store/store";
import { Comment, ReduxState } from "../../../utils/interfaces";
import { notify } from "../../../utils/notifications";

interface LikeProps {
  comment: Comment;
  itemId?: string;
}

const Like = ({ comment, itemId }: LikeProps) => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);
  const { _id } = useSelector((state: ReduxState) => state.currentUser.data);
  const dispatch = useAppDispatch();

  const onLikeComment = (itemId: string, comment: Comment) => {
    if (comment.creator?._id === _id) {
      notify("You can't like your own comment.");
    } else {
      comment._id &&
        dispatch(likeComment({ postId: itemId, commentId: comment._id }));
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
      {comment.likes?.find((user) => user._id === _id) ? (
        <ThumbUp
          sx={{
            fontSize: ".9rem",
            cursor: "pointer",
            color: palette.text.primary,
          }}
          onClick={debounce(
            () => itemId && onLikeComment?.(itemId, comment),
            300
          )}
        />
      ) : (
        <ThumbUpOffAlt
          sx={{ fontSize: "1rem", cursor: "pointer" }}
          onClick={debounce(
            () => itemId && onLikeComment?.(itemId, comment),
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
        {comment.likes?.length ? comment.likes.length : ""}
      </Typography>
    </Box>
  );
};

export default Like;
