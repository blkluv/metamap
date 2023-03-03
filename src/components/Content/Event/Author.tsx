import { Person } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ReduxState, UserHeader } from "../../../utils/interfaces";

interface AuthorProps {
  creator?: UserHeader;
}

const Author = ({ creator }: AuthorProps) => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: ".1rem .7rem .3rem 0",
      }}
      component="span"
      color={palette.text.primary}
      fontSize={".8rem"}
    >
      <Person
        sx={{
          fontSize: "1.2rem",
          marginRight: ".2rem",
        }}
      />
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
    </Box>
  );
};

export default Author;
