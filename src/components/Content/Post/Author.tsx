import { useEffect, useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ReduxState } from "../../../utils/interfaces";
import moment from "moment";
import { getUser } from "../../../store/users";

interface AuthorProps {
  name?: string;
  date?: string;
}

const Author = ({ name, date }: AuthorProps) => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);
  const [avatar, setAvatar] = useState<any>(null);

  useEffect(() => {
    name && getAvatar(name);
  }, [name]);

  const getAvatar = async (id: string) => {
    const user = await getUser(id);
    return setAvatar(user?.avatar);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <NavLink
        to={`/dashboard/profile/${name}`}
        style={{ textDecoration: "none" }}
      >
        <Avatar
          alt={name}
          src={avatar}
          sx={{
            margin: ".2rem .5rem .2rem 0",
            height: "2.2rem",
            width: "2.2rem",
            cursor: "pointer",
          }}
        />
      </NavLink>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <NavLink
          to={`/dashboard/profile/${name}`}
          style={{ textDecoration: "none" }}
        >
          <Typography
            sx={{
              display: "block",
              cursor: "pointer",
            }}
            component="span"
            variant="body2"
            color={palette.text.tertiary}
            fontSize={".9rem"}
            fontWeight={500}
          >
            {name}
          </Typography>
        </NavLink>
        <Typography
          sx={{ display: "block" }}
          component="span"
          variant="body2"
          color="grey"
          fontSize={".8rem"}
        >
          {moment(date).fromNow()}
        </Typography>
      </Box>
    </Box>
  );
};

export default Author;
