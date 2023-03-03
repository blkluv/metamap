import { Box } from "@mui/material";
import UserConversations from "./UserConversations";
import UserMessages from "./UserMessages";
import UsersOnline from "./UsersOnline";

const ChatAccordion = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxHeight: "85vh",
        padding: ".5rem",
        overflow: "scroll",
        minWidth: { xs: "100%", md: "400px" },
      }}
    >
      <UserMessages />
      <UserConversations />
      <UsersOnline />
    </Box>
  );
};

export default ChatAccordion;
