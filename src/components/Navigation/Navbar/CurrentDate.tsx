import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../utils/interfaces";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const CurrentDate = () => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);

  return (
    <Typography
      sx={{
        fontSize: 14,
        padding: ".5rem 1.5rem",
        borderRadius: "15px",
        display: { xs: "none", md: "flex" },
        color: palette.text.tertiary,
        alignItems: "center",
        border: `1px solid ${palette.background.tertiary}`,
        WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
        boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
      }}
    >
      <AccessTimeIcon
        sx={{
          marginLeft: "-.5rem",
          marginRight: ".5rem",
          width: "1.2rem",
          color: palette.green,
        }}
      />
      {new Date().toLocaleString("en-GB", {
        dateStyle: "short",
        timeStyle: "short",
      })}
    </Typography>
  );
};

export default CurrentDate;
