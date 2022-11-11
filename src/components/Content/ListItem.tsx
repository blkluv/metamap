import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { MenuItemProps } from "../../utils/interfaces";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";

const MenuItem = ({ label, icon, color, link }: MenuItemProps) => {
  return (
    <ListItem
      sx={{
        paddingLeft: "0",
      }}
    >
      <ListItemAvatar>
        <Avatar
          sx={{
            bgcolor: color,
            borderRadius: "10px",
            width: 32,
            height: 32,
            margin: "0.5rem 0",
          }}
          variant="square"
        >
          {icon}
        </Avatar>
      </ListItemAvatar>
      <Link
        component={RouterLink}
        to={`/${link}`}
        color="inherit"
        sx={{
          fontSize: "1rem",
          textDecoration: "none",
        }}
      >
        {label}
      </Link>
    </ListItem>
  );
};

export default MenuItem;
