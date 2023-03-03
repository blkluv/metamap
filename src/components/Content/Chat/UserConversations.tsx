import { ReduxState } from "../../../utils/interfaces";
import { useSelector } from "react-redux";
import { Accordion, AccordionSummary, Typography } from "@mui/material";
import { Chat, ExpandMore } from "@mui/icons-material";
import ConversationList from "./ConversationList";

const UserConversations = () => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);

  return (
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
      <ConversationList />
    </Accordion>
  );
};

export default UserConversations;
