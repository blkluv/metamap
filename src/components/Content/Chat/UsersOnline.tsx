import { ReduxState } from "../../../utils/interfaces";
import { useSelector } from "react-redux";
import { Accordion, AccordionSummary, Typography } from "@mui/material";
import { ExpandMore, Group } from "@mui/icons-material";
import OnlineList from "./OnlineList";

const UsersOnline = () => {
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
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Group sx={{ marginRight: ".5rem", width: "1.1rem" }} />
        <Typography sx={{ fontWeight: 500 }}>Contacts</Typography>
      </AccordionSummary>
      <OnlineList />
    </Accordion>
  );
};

export default UsersOnline;
