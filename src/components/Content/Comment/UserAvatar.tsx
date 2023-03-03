import { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { NavLink } from "react-router-dom";
import { getUser } from "../../../store/users";

interface AvatarProps {
  name?: string;
}

const UserAvatar = ({ name }: AvatarProps) => {
  const [avatar, setAvatar] = useState<any>(null);

  useEffect(() => {
    name && getAvatar(name);
  }, [name]);

  const getAvatar = async (id: string) => {
    const user = await getUser(id);
    return setAvatar(user?.avatar);
  };

  return (
    <NavLink
      to={`/dashboard/profile/${name}`}
      style={{ textDecoration: "none" }}
    >
      <Avatar
        alt={name}
        src={avatar}
        sx={{
          margin: ".2rem .5rem .2rem 0",
          height: "2rem",
          width: "2rem",
          cursor: "pointer",
        }}
      />
    </NavLink>
  );
};

export default UserAvatar;
