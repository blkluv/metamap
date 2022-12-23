import { useContext, useState } from "react";
import { Box } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UserContext from "../../context/userContext";
import ThemeContext from "../../context/themeContext";
import ConfirmationDialog from "../Elements/ConfirmationDialog";
import CloseIcon from "@mui/icons-material/Close";
import UpdatePassword from "../Auth/UpdatePassword";

const MenuAccordion = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { onDeleteUser } = useContext(UserContext);
  const { palette } = useContext(ThemeContext);

  const handleOpenDialog = () => {
    setIsOpen(true);
  };
  const handleCloseDialog = () => {
    setIsOpen(false);
  };
  const handleConfirmDialog = async () => {
    await onDeleteUser?.();
    setIsOpen(false);
  };

  return (
    <Box>
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
          <Typography sx={{ fontWeight: 700 }}>Change Password</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <UpdatePassword />
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
          <Typography sx={{ color: palette?.warning, fontWeight: 700 }}>
            Danger Zone
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              border: `1px solid ${palette?.background.tertiary}`,
              margin: 0,
              color: palette?.warning,
              cursor: "pointer",
              display: "flex",
            }}
            onClick={() => handleOpenDialog()}
          >
            Delete account <CloseIcon />
          </Box>
        </AccordionDetails>
      </Accordion>
      <ConfirmationDialog
        title={"Delete this account?"}
        confirmLabel={"delete"}
        isOpen={isOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDialog}
      />
    </Box>
  );
};

export default MenuAccordion;
