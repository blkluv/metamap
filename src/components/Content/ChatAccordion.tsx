import { Box } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import ConversationList from "./ConversationList";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import UsersOnline from "./UsersOnline";
import { ReduxState } from "../../utils/interfaces";
import Messages from "./Messages";
import {
  ExpandMore,
  Markunread,
  Circle,
  Chat,
  Group,
} from "@mui/icons-material";
import { useSelector } from "react-redux";

const ChatAccordion = () => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);
  const { userMessages } = useSelector(
    (state: ReduxState) => state.communication.data
  );

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
      <Accordion
        sx={{
          color: palette.text.tertiary,
          borderRadius: "25px !important",
          background: palette.background.primary,
          border: `1px solid ${palette.background.tertiary}`,
          WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
          boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
          marginBottom: "0.5rem",
          "&:before": {
            display: "none",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore sx={{ color: palette.text.tertiary }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Markunread sx={{ marginRight: ".5rem", width: "1rem" }} />
          <Typography sx={{ fontWeight: 500 }}>Unread</Typography>
          {userMessages?.find((message) => !message.read) ? (
            <Circle
              sx={{
                color: palette.green,
                marginLeft: ".5rem",
                width: ".8rem",
              }}
            />
          ) : null}
        </AccordionSummary>
        <AccordionDetails>
          <Messages />
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          color: palette.text.tertiary,
          borderRadius: "25px !important",
          background: palette.background.primary,
          border: `1px solid ${palette.background.tertiary}`,
          WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
          boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
          marginBottom: "0.5rem",
          "&:before": {
            display: "none",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore sx={{ color: palette.text.tertiary }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Chat sx={{ marginRight: ".5rem", width: "1rem" }} />
          <Typography sx={{ fontWeight: 500 }}>Conversations</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ConversationList />
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          color: palette.text.tertiary,
          borderRadius: "25px !important",
          background: palette.background.primary,
          border: `1px solid ${palette.background.tertiary}`,
          WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
          boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
          marginBottom: "0.5rem",
          "&:before": {
            display: "none",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore sx={{ color: palette.text.tertiary }} />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Group sx={{ marginRight: ".5rem", width: "1.1rem" }} />
          <Typography sx={{ fontWeight: 500 }}>Contacts</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <UsersOnline />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ChatAccordion;
