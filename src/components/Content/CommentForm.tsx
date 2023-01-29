import { useContext } from "react";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import ThemeContext from "../../context/themeContext";
import { Send } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { CommentFormProps } from "../../utils/interfaces";

const CommentForm = ({ item, onAdd }: CommentFormProps) => {
  const { palette } = useContext(ThemeContext);

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
    text && item._id && onAdd?.(item._id, { text });
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
        inputProps={{ style: { color: palette?.text.primary } }}
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
