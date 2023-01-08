import { useContext } from "react";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import ThemeContext from "../../context/themeContext";
import SendIcon from "@mui/icons-material/Send";
import { useForm } from "react-hook-form";
import ChatContext from "../../context/chatContext";
import UserContext from "../../context/userContext";

const ChatMessageForm = () => {
  const { palette } = useContext(ThemeContext);
  const { currentUser } = useContext(UserContext);
  const { socket, onAddMessage, currentConversation } = useContext(ChatContext);

  const {
    register: registerMessage,
    handleSubmit: handleRegisterMessage,
    reset: resetMessage,
  } = useForm({
    defaultValues: {
      message: "",
    },
  });

  const handleSubmitMessage = (data: { message: string }) => {
    const text = data.message.trim();

    if (text) {
      const message = {
        sender: currentUser?._id,
        text,
        conversationId: currentConversation._id,
      };

      const receiverId = currentConversation.members.find(
        (member: string) => member !== currentUser?._id
      );
      socket.current?.emit("sendMessage", {
        senderId: currentUser?._id,
        receiverId,
        text,
      });
      onAddMessage?.(message);
    }
    resetMessage();
  };

  return (
    <>
      {currentConversation ? (
        <Box
          component="form"
          onSubmit={handleRegisterMessage(handleSubmitMessage)}
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "1rem 1.5rem",
            borderRadius: "25px",
            background: palette?.background.tertiary,
            WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
            boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
          }}
        >
          <TextField
            placeholder="Write a message..."
            variant="standard"
            size="small"
            margin="dense"
            required
            InputProps={{ disableUnderline: true }}
            inputProps={{ style: { color: palette?.text.primary } }}
            fullWidth
            id="message"
            autoComplete="message"
            {...registerMessage("message", {
              required: true,
              minLength: 1,
              maxLength: 250,
            })}
          />
          <Button type="submit" sx={{ cursor: "pointer" }}>
            <SendIcon />
          </Button>
        </Box>
      ) : null}
    </>
  );
};

export default ChatMessageForm;
