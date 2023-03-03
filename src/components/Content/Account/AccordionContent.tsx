import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../utils/interfaces";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface AccordionProps {
  access: boolean;
  color?: string;
  children: any;
  label: string;
}

const AccordionContent = ({
  access,
  children,
  color,
  label,
}: AccordionProps) => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);

  return (
    <Accordion
      sx={{
        display: access ? "" : "none",
        color: color ? color : palette.text.tertiary,
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
        expandIcon={
          <ExpandMoreIcon
            sx={{ color: color ? color : palette.text.tertiary }}
          />
        }
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography sx={{ color: color ? color : "inherit", fontWeight: 500 }}>
          {label}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default AccordionContent;
