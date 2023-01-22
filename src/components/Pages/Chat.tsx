import { useContext, useEffect } from "react";
import { Box } from "@mui/material";
import ThemeContext from "../../context/themeContext";
import UserContext from "../../context/userContext";
import CommunicationContext from "../../context/communicationContext";
import ChatAccordion from "../Content/ChatAccordion";
import ChatMessageForm from "../Elements/ChatMessageForm";
import MessagesList from "../Content/MessagesList";

const Chat = () => {
  const { palette } = useContext(ThemeContext);
  const { onGetUsers } = useContext(UserContext);
  const { onlineUsers, userMessages, onSetCurrentConversation } =
    useContext(CommunicationContext);

  useEffect(() => {
    onGetUsers?.();

    return () => onSetCurrentConversation?.(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column-reverse", md: "row" },
        width: "100%",
        padding: {
          xs: "1rem",
          md: "1rem 2rem 1.5rem 2rem",
          overflow: "hidden",
        },
        background: palette?.background.primary,
        gridGap: "1rem",
        height: "auto",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: ".5rem .5rem 0 .5rem",
          maxHeight: "85vh",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <MessagesList />
        <ChatMessageForm />
      </Box>
      <ChatAccordion onlineUsers={onlineUsers} userMessages={userMessages} />
    </Box>
  );
};

export default Chat;
