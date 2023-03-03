import { useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Send } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { Business, Event, Post, ReduxState } from "../../../utils/interfaces";
import { useAppDispatch } from "../../../store/store";
import { addComment } from "../../../store/posts";

export interface CommentFormProps {
  item: Post | Event | Business;
}

const CommentForm = ({ item }: CommentFormProps) => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);
  const dispatch = useAppDispatch();

  const {
    register: registerComment,
    handleSubmit: handleRegisterComment,
    reset: resetComment,
  } = useForm({
    defaultValues: {
      comment: "",
    },
  });

  const handleSubmitComment = (data: { comment: string }) => {
    const text = data.comment.trim();
    if (text && item._id) {
      const comment = { text };
      dispatch(addComment({ postId: item._id, comment }));
    }
    resetComment();
  };

  return (
    <Box
      component="form"
      onSubmit={handleRegisterComment(handleSubmitComment)}
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <TextField
        placeholder="Write a comment..."
        variant="standard"
        size="small"
        margin="dense"
        required
        InputProps={{ disableUnderline: true }}
        inputProps={{ style: { color: palette.text.primary } }}
        fullWidth
        id="comment"
        autoComplete="comment"
        {...registerComment("comment", {
          required: true,
          minLength: 1,
          maxLength: 250,
        })}
      />
      <Button type="submit" sx={{ cursor: "pointer", minWidth: "0" }}>
        <Send />
      </Button>
    </Box>
  );
};

export default CommentForm;
