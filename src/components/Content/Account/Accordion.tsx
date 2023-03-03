import { Box } from "@mui/material";
import UpdatePassword from "../../Auth/UpdatePassword";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../utils/interfaces";
import DeleteAccount from "./DeleteAccount";
import AccordionContent from "./AccordionContent";

const MenuAccordion = () => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);
  const currentUser = useSelector(
    (state: ReduxState) => state.currentUser.data
  );

  const notExternalOrGuest =
    !currentUser.name.startsWith("guest") && !currentUser.external;

  return (
    <Box>
      <AccordionContent access={notExternalOrGuest} label={"Change Password"}>
        <UpdatePassword transparent />
      </AccordionContent>
      <AccordionContent access label={"Danger Zone"} color={palette.warning}>
        <DeleteAccount />
      </AccordionContent>
    </Box>
  );
};

export default MenuAccordion;
