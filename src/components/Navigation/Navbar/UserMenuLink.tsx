import { Link, MenuItem } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { capitalize } from "lodash";

interface LinkProps {
  closeMenu?: () => void;
  link: string;
  label: string;
}

const UserMenuLink = ({ closeMenu, link, label }: LinkProps) => {
  return (
    <MenuItem onClick={closeMenu}>
      <Link
        component={RouterLink}
        to={link}
        color="inherit"
        sx={{
          mr: 2,
          fontWeight: 500,
          fontSize: "1.1rem",
          letterSpacing: ".1rem",
          color: "inherit",
          textDecoration: "none",
          textTransform: "capitalize",
        }}
      >
        {capitalize(label)}
      </Link>
    </MenuItem>
  );
};

export default UserMenuLink;
