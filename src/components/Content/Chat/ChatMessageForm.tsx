import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { RemoveCircleOutline, Send } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { notify } from "../../../utils/notifications";
import { ReduxState, UserHeader } from "../../../utils/interfaces";
import { useSelector } from "react-redux";
import { addMessage, deleteConversation } from "../../../store/communication";
import { useAppDispatch } from "../../../store/store";

const ChatMessageForm = ({ users, currentConversation }: any) => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);
  const currentUser = useSelector(
    (state: ReduxState) => state.currentUser.data
  );

  const dispatch = useAppDispatch();

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
      const receiver = users?.find(
        (user: UserHeader) => user._id === receiverId
      );

      if (receiver) {
        const message = {
          conversationId: currentConversation?._id,
          sender: { _id: currentUser?._id, name: currentUser?.name },
          receiver: { _id: receiverId, name: receiver?.name },
          read: false,
          text,
        };
        dispatch(addMessage(message));
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
            background: palette.background.tertiary,
            WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
            boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
          }}
        >
          {currentConversation.readOnly ? (
            <Box
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                color: palette.text.primary,
              }}
            >
              <Typography>
                Message receiver doesn't exist, this conversation is now
                archived.
              </Typography>
              <Button type="submit" sx={{ cursor: "pointer" }}>
                <RemoveCircleOutline
                  sx={{
                    cursor: "pointer",
                    color: palette.text.primary,
                    fontSize: "1.2rem",
                  }}
                  onClick={() =>
                    dispatch(deleteConversation(currentConversation._id))
                  }
                />
              </Button>
            </Box>
          ) : (
            <>
              <TextField
                placeholder="Write a message..."
                variant="standard"
                size="small"
                margin="dense"
                required
                InputProps={{ disableUnderline: true }}
                inputProps={{ style: { color: palette.text.primary } }}
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
                <Send />
              </Button>
            </>
          )}
        </Box>
      ) : null}
    </>
  );
};

export default ChatMessageForm;
