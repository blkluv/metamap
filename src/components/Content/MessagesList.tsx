import { useContext, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import CommunicationContext from "../../context/communicationContext";
import UserContext from "../../context/userContext";
import Message from "../Elements/Message";
import ChatTimeline from "../Elements/ChatTimeline";

const MessagesList = () => {
  const { messages, currentConversation, onGetMessages } =
    useContext(CommunicationContext);
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
        <ChatTimeline />
      )}
    </Box>
  );
};

export default MessagesList;
