import { Box } from "@mui/material";
import ResponsiveAppBar from "./AppBar";
import { ReduxState } from "../../../utils/interfaces";
import { useSelector } from "react-redux";
import WebsiteLogo from "./WebsiteLogo";

const TopNavbar = () => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        background: palette.background.secondary,
      }}
    >
      <WebsiteLogo color={"white"} fontSize={"1.3rem"} />
      <ResponsiveAppBar />
    </Box>
  );
};

export default TopNavbar;
