import { useContext, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import ChatContext from "../../context/chatContext";
import ThemeContext from "../../context/themeContext";
import UserContext from "../../context/userContext";
import Message from "../Elements/Message";

const MessagesList = () => {
  const { palette } = useContext(ThemeContext);
  const { messages, currentConversation, onGetMessages } =
    useContext(ChatContext);
  const { currentUser } = useContext(UserContext);
  const scrollRef = useRef<any>();

  useEffect(() => {
    onGetMessages?.(currentConversation?._id);
  }, [currentConversation, onGetMessages]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 1,
        width: "100%",
        overflow: "scroll",
      }}
    >
      {currentConversation ? (
        <>
          {messages.map((message) => (
            <Box ref={scrollRef} key={message._id}>
              <Message
                message={message}
                own={message.sender === currentUser?._id}
              />
            </Box>
          ))}
        </>
      ) : (
        <Typography sx={{ color: palette?.text.tertiary }}>
          Open a conversation...
        </Typography>
      )}
    </Box>
  );
};

export default MessagesList;
