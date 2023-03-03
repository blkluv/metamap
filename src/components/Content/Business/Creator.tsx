import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { ReduxState, UserHeader } from "../../../utils/interfaces";

interface CreatorProps {
  creator?: UserHeader;
}

const Creator = ({ creator }: CreatorProps) => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);

  return (
    <Typography
      sx={{ display: "block" }}
      component="span"
      variant="body2"
      color={palette.text.primary}
      fontSize={".8rem"}
    >
      Owners:{" "}
      <NavLink
        to={`/dashboard/profile/${creator?.name}`}
        style={{
          textDecoration: "underlined",
          color: palette.text.tertiary,
          fontWeight: "bold",
        }}
      >
        {creator?.name}
      </NavLink>
    </Typography>
  );
};

export default Creator;
