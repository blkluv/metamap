import { Box } from "@mui/material";
import { EventMenuItems } from "../../constants/menuItems";
import MenuItemList from "./MenuItemList";
import Toggler from "../Elements/Switch";

const Sidebar = () => {
  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        minWidth: "220px",
        maxWidth: "220px",
        height: "auto",
        justifyContent: "space-between",
        padding: "1.5rem",
      }}
    >
      <MenuItemList items={EventMenuItems} />
      <Toggler />
    </Box>
  );
};

export default Sidebar;
