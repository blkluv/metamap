import { useContext } from "react";
import { Box } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ThemeContext from "../../context/themeContext";
import UsersOnline from "./UsersOnline";
import ChatIcon from "@mui/icons-material/Chat";
import GroupIcon from "@mui/icons-material/Group";
import { OnlineUsersProps } from "../../utils/interfaces";
import ConversationList from "./ConversationList";

const ChatAccordion = ({ onlineUsers }: OnlineUsersProps) => {
  const { palette } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxHeight: "85vh",
        padding: "0 .5rem",
        overflow: "scroll",
        minWidth: { xs: "100%", md: "350px" },
      }}
    >
      <Accordion
        sx={{
          background: palette?.background.tertiary,
          color: palette?.text.tertiary,
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <ChatIcon sx={{ marginRight: ".5rem", width: "1rem" }} />
          <Typography sx={{ fontWeight: 500 }}>Conversations</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ConversationList />
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          background: palette?.background.tertiary,
          color: palette?.text.tertiary,
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <GroupIcon sx={{ marginRight: ".5rem", width: "1.1rem" }} />
          <Typography sx={{ fontWeight: 500 }}>Contacts</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <UsersOnline onlineUsers={onlineUsers} />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ChatAccordion;
