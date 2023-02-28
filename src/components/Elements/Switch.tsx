import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/store";
import { ReduxState } from "../../utils/interfaces";
import { setTheme } from "../../store/theme";

const Toggler = () => {
  const theme = useSelector((state: ReduxState) => state.theme);
  const dispatch = useAppDispatch();

  return (
    <Box
      sx={{ paddingLeft: { xs: "0.8rem", md: 0 } }}
      onClick={() => dispatch(setTheme())}
    >
      {theme.mode === "light" ? (
        <DarkModeIcon
          sx={{
            fontSize: "1.5rem",
            cursor: "pointer",
            color: theme.palette.text.tertiary,
          }}
        />
      ) : (
        <LightModeIcon
          sx={{
            fontSize: "1.5rem",
            cursor: "pointer",
            color: "yellow",
          }}
        />
      )}
    </Box>
  );
};

export default Toggler;
