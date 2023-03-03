import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { MenuItemProps, ReduxState } from "../../../utils/interfaces";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import { useSelector } from "react-redux";

const MenuItem = ({ label, icon, color, link }: MenuItemProps) => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);

  return (
    <ListItem
      sx={{
        cursor: "pointer",
        paddingLeft: "0",
        paddingRight: "0",
        "&:first-of-type": {
          paddingTop: "0",
        },
      }}
    >
      <ListItemAvatar sx={{ minWidth: "45px" }}>
        <Avatar
          sx={{
            color,
            bgcolor: "transparent",
            borderRadius: "10px",
            border: `1px solid ${palette.border}`,
            WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
            boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
            width: 32,
            height: 32,
            margin: "0.5rem 0",
            padding: "1rem",
          }}
          variant="square"
        >
          {icon}
        </Avatar>
      </ListItemAvatar>
      <Link
        component={RouterLink}
        to={`/dashboard/${link}`}
        color="inherit"
        sx={{
          transition: "color .1s",
          fontSize: "1rem",
          textDecoration: "none",
          fontWeight: 500,
          "&:hover": {
            color: palette.text.primary,
          },
        }}
      >
        {label}
      </Link>
    </ListItem>
  );
};

export default MenuItem;
