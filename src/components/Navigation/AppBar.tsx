import { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import PublicIcon from "@mui/icons-material/Public";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import UserContext from "../../context/userContext";
import Toggler from "../Elements/Switch";
import { EventMenuItems, UserLinks } from "../../constants/menuItems";

const ResponsiveAppBar = () => {
  const { currentUser, onLogout } = useContext(UserContext);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      elevation={0}
      position="static"
      color="inherit"
      sx={{
        background: "rgb(35,35,48)",
        color: "rgb(120,120,126)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            sx={{ fontSize: 14, display: { xs: "none", md: "flex" } }}
            color="rgb(120,120,126)"
          >
            {new Date().toLocaleString("en-GB")}
          </Typography>
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
            >
              {EventMenuItems.map((item) => (
                <MenuItem key={item.id} onClick={handleCloseNavMenu}>
                  <Link
                    component={RouterLink}
                    to={item.link}
                    color="inherit"
                    sx={{
                      mr: 2,
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
          <PublicIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Link
            component={RouterLink}
            to="/"
            color="inherit"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".1rem",
              fontSize: "1.2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            GeoEvents
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
          {currentUser ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Guest" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {UserLinks.map((item) => (
                  <MenuItem key={item.id} onClick={handleCloseUserMenu}>
                    <Link
                      component={RouterLink}
                      to={item.link}
                      color="inherit"
                      sx={{
                        mr: 2,
                        textDecoration: "none",
                      }}
                    >
                      {item.label}
                    </Link>
                  </MenuItem>
                ))}
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    onLogout?.();
                  }}
                >
                  <Typography textAlign="center" color={"rgb(235, 110, 105)"}>
                    {"Logout"}
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button component={RouterLink} to="/account/signin" color="inherit">
              Sign In
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
