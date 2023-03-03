import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import Message from "./Message";
import ChatTimeline from "../../Elements/ChatTimeline";
import { ReduxState } from "../../../utils/interfaces";
import { useSelector } from "react-redux";
import { getMessages } from "../../../store/communication";
import { useAppDispatch } from "../../../store/store";

const MessagesList = () => {
  const currentUser = useSelector(
    (state: ReduxState) => state.currentUser.data
  );
  const { messages, currentConversation } = useSelector(
    (state: ReduxState) => state.communication.data
  );
  const scrollRef = useRef<any>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    currentConversation && dispatch(getMessages(currentConversation._id));
  }, [currentConversation, dispatch]);

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
          {messages.map((message: any) => (
            <Box ref={scrollRef} key={message._id}>
              <Message
                message={message}
                own={message.sender?._id === currentUser?._id}
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
