import { useContext } from "react";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import ThemeContext from "../../context/themeContext";
import SendIcon from "@mui/icons-material/Send";
import { useForm } from "react-hook-form";
import CommunicationContext from "../../context/communicationContext";
import UserContext from "../../context/userContext";
import { notify } from "../../utils/notifications";

const ChatMessageForm = () => {
  const { palette } = useContext(ThemeContext);
  const { currentUser, users } = useContext(UserContext);
  const { onAddMessage, currentConversation } =
    useContext(CommunicationContext);

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
      const receiverId = currentConversation?.members.find(
        (member: string | undefined) => member !== currentUser?._id
      );
      const receiver = users?.find((user) => user._id === receiverId);

      if (receiver) {
        const message = {
          conversationId: currentConversation?._id,
          sender: { _id: currentUser?._id, name: currentUser?.name },
          receiver: { _id: receiverId, name: receiver?.name },
          read: false,
          text,
        };
        onAddMessage?.(message);
      } else {
        notify("Message receiver doesn't exist.");
      }
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
