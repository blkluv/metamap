import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, IconButton, Menu, MenuItem, Link } from "@mui/material";
import Toggler from "../../Elements/Switch";
import MenuIcon from "@mui/icons-material/Menu";
import { EventMenuItems } from "../../../constants/menuItems";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../utils/interfaces";

const HamburgerMenu = () => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  return (
    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: "block", md: "none" },
        }}
        MenuListProps={{
          style: {
            background: palette.background.primary,
            color: palette.text.primary,
          },
        }}
      >
        {EventMenuItems.map((item) => (
          <MenuItem key={item.id} onClick={handleCloseNavMenu}>
            <Link
              component={RouterLink}
              to={item.link}
              color="inherit"
              sx={{
                mr: 2,
                mb: 1.5,
                fontWeight: 700,
                fontSize: "1.1rem",
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
                textTransform: "capitalize",
              }}
            >
              {item.label}
            </Link>
          </MenuItem>
        ))}
        <Toggler />
      </Menu>
    </Box>
  );
};

export default HamburgerMenu;
