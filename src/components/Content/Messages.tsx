import { useContext, useEffect, useState } from "react";
import CommunicationContext from "../../context/communicationContext";
import { Box, List, Typography } from "@mui/material";
import { ChatMessage } from "../../utils/interfaces";
import MessageHeader from "./MessageHeader";

const Messages = () => {
  const { userMessages } = useContext(CommunicationContext);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (userMessages) {
      setMessages(userMessages.filter((message: ChatMessage) => !message.read));
    }
  }, [userMessages]);

  return (
    <Box sx={{ width: "100%" }}>
      {messages.length > 0 ? (
        <List sx={{ overflow: "scroll" }}>
          {messages.map((message: ChatMessage) => (
            <MessageHeader key={message.createdAt} message={message} />
          ))}
        </List>
      ) : (
        <Typography
          sx={{
            textTransform: "uppercase",
            marginBottom: ".5rem",
            fontSize: ".7rem",
          }}
        >
          Clear
        </Typography>
      )}
    </Box>
  );
};

export default Messages;
