import { ReduxState } from "../../../utils/interfaces";
import { useSelector } from "react-redux";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { Circle, ExpandMore, Markunread } from "@mui/icons-material";
import Messages from "./Messages";

const UserMessages = () => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);
  const { userMessages } = useSelector(
    (state: ReduxState) => state.communication.data
  );

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
  );
};

export default UserMessages;
