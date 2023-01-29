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
  const { currentUser, onDeleteUser } = useContext(UserContext);
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
      {!currentUser?.name.startsWith("guest") && !currentUser?.external ? (
        <Accordion
          sx={{
            color: palette?.text.tertiary,
            borderRadius: "25px !important",
            background: palette?.background.primary,
            border: `1px solid ${palette?.background.tertiary}`,
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
              <ExpandMoreIcon sx={{ color: palette?.text.tertiary }} />
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx={{ fontWeight: 500 }}>Change Password</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <UpdatePassword transparent />
          </AccordionDetails>
        </Accordion>
      ) : null}
      <Accordion
        sx={{
          color: palette?.text.tertiary,
          borderRadius: "25px !important",
          background: palette?.background.primary,
          border: `1px solid ${palette?.background.tertiary}`,
          WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
          boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
          marginBottom: "0.5rem",
          "&:before": {
            display: "none",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: palette?.text.tertiary }} />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography sx={{ color: palette?.warning, fontWeight: 500 }}>
            Danger Zone
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              margin: 0,
              color: palette?.warning,
              cursor: "pointer",
              display: "flex",
            }}
            onClick={() => handleOpenDialog()}
          >
            Delete account{" "}
            <CloseIcon sx={{ marginLeft: ".5rem", fontSize: "1.4rem" }} />
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
