import { Box } from "@mui/material";
import MainWindow from "./MainWindow";
import TopNavbar from "../Navigation/Navbar";

const AppWrapper = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: "8fr 92fr",
        height: "100%",
      }}
    >
      <TopNavbar />
      <MainWindow />
    </Box>
  );
};

export default AppWrapper;
