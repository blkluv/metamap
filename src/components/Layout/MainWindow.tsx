import { Box } from "@mui/material";
import ContentWindow from "./ContentWindow";
import Sidebar from "../Navigation/Sidebar";

const MainWindow = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        background: "rgb(31,30,43)",
        height: "auto",
      }}
    >
      <Sidebar />
      <ContentWindow />
    </Box>
  );
};

export default MainWindow;
