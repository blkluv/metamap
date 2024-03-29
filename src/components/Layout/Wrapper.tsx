import { Box } from "@mui/material";
import TopNavbar from "../Navigation/Navbar/Navbar";
import MainWindow from "./MainWindow";

const Wrapper = () => {
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

export default Wrapper;
