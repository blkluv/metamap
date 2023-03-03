import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ChatAccordion from "../Content/Chat/ChatAccordion";
import ChatMessageForm from "../Elements/ChatMessageForm";
import MessagesList from "../Content/Chat/MessagesList";
import { ReduxState, UserHeader } from "../../utils/interfaces";
import { useSelector } from "react-redux";
import { getUsers } from "../../store/users";
import {
  setCurrentConversation,
  getUserMessages,
} from "../../store/communication";
import { useAppDispatch } from "../../store/store";

const Chat = () => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);
  const currentUser = useSelector(
    (state: ReduxState) => state.currentUser.data
  );
  const { currentConversation } = useSelector(
    (state: ReduxState) => state.communication.data
  );
  const dispatch = useAppDispatch();
  const [users, setUsers] = useState<UserHeader[]>([]);

  const getAllUsers = async () => {
    const users = await getUsers();
    users && setUsers(users);
  };

  // @ts-ignore
  useEffect(() => {
    getAllUsers();
    dispatch(getUserMessages(currentUser._id));
    return () => dispatch(setCurrentConversation(null));
  }, [currentUser._id, dispatch]);

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
        background: palette.background.primary,
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
        <ChatMessageForm
          users={users}
          currentConversation={currentConversation}
        />
      </Box>
      <ChatAccordion />
    </Box>
  );
};

export default Chat;
