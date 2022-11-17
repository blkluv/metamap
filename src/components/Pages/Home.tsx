import { Box } from "@mui/material";
import mapbg from "../../images/mapbg.png";

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        background: `url(${mapbg})`,
        backgroundSize: "cover",
      }}
    >
      "Home"
    </Box>
  );
};

export default Home;
