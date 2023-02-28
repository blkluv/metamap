import { Box, Typography } from "@mui/material";
import "./popupStyles.css";
import { ReduxState } from "../../utils/interfaces";
import { useSelector } from "react-redux";

const Legend = () => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: ".2rem .5rem",
        alignItems: "flex-start",
        justifyContent: "center",
        position: "absolute",
        flexWrap: "wrap",
        zIndex: 100,
        bottom: "10px",
        left: "10px",
        background: palette.background.primary,
        color: palette.text.primary,
        WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
        boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
        borderRadius: "5px",
      }}
    >
      <Box sx={{ display: "flex", fontWeight: "bold", fontSize: ".8rem" }}>
        Add marker:
        <Typography
          sx={{
            fontWeight: "normal",
            fontSize: ".8rem",
            marginLeft: ".2rem",
          }}
        >
          Double Click
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          fontWeight: "bold",
          fontSize: ".8rem",
        }}
      >
        Rotate:
        <Typography
          sx={{
            fontWeight: "normal",
            fontSize: ".8rem",
            marginLeft: ".2rem",
          }}
        >
          Ctrl + Drag
        </Typography>
      </Box>
    </Box>
  );
};

export default Legend;
