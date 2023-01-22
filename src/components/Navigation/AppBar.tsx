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
import { Badge, Link } from "@mui/material";
import UserContext from "../../context/userContext";
import ThemeContext from "../../context/themeContext";
import CommunicationContext from "../../context/communicationContext";
import Toggler from "../Elements/Switch";
import { EventMenuItems } from "../../constants/menuItems";
import NotificationIcon from "../Content/NotificationIcon";
import MessageIcon from "../Content/MessageIcon";
import styled from "@emotion/styled";

const ResponsiveAppBar = () => {
  const { currentUser, onLogout } = useContext(UserContext);
  const { palette } = useContext(ThemeContext);
  const { userMessages, notifications } = useContext(CommunicationContext);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const StyledBadge = styled(Badge)(() => ({
    "& .MuiBadge-badge": {
      backgroundColor: palette?.warning,
      color: "white",
      WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
      boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
    },
  }));

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
        background: palette?.background.primary,
        color: palette?.text.primary,
      }}
    >
      <Container maxWidth={false} sx={{ padding: { md: "0.5rem 2.5rem" } }}>
        <Toolbar disableGutters>
          <Typography
            sx={{ fontSize: 14, display: { xs: "none", md: "flex" } }}
            color={palette?.text.primary}
          >
            {new Date().toLocaleString("en-GB", {
              dateStyle: "short",
              timeStyle: "short",
            })}
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
              MenuListProps={{
                style: {
                  background: palette?.background.primary,
                  color: palette?.text.primary,
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
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <MessageIcon />
            <NotificationIcon />
          </Box>
          {currentUser ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {[...userMessages, ...notifications].length > 0 ? (
                    <StyledBadge
                      badgeContent={
                        [...userMessages, ...notifications].filter(
                          (item) => !item.read
                        ).length
                      }
                      overlap="circular"
                      sx={{
                        display: { xs: "flex", md: "none" },
                        marginRight: "1rem",
                        height: "1.6rem",
                        width: "1.6rem",
                        cursor: "pointer",
                        alignSelf: "center",
                      }}
                    >
                      <Avatar
                        alt="User avatar"
                        src={currentUser?.avatar}
                        sx={{
                          display: { xs: "flex", md: "none" },
                          height: { xs: "1.8rem", md: "2rem" },
                          width: { xs: "1.8rem", md: "2rem" },
                          WebkitBoxShadow:
                            "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
                          boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
                        }}
                      />
                    </StyledBadge>
                  ) : (
                    <Avatar
                      alt="User avatar"
                      src={currentUser?.avatar}
                      sx={{
                        display: { xs: "flex", md: "none" },
                        height: { xs: "1.8rem", md: "2rem" },
                        width: { xs: "1.8rem", md: "2rem" },
                        WebkitBoxShadow:
                          "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
                        boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
                      }}
                    />
                  )}
                  <Avatar
                    alt="User avatar"
                    src={currentUser?.avatar}
                    sx={{
                      display: { xs: "none", md: "flex" },
                      height: { xs: "1.8rem", md: "2rem" },
                      width: { xs: "1.8rem", md: "2rem" },
                      WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
                      boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                MenuListProps={{
                  style: {
                    background: palette?.background.primary,
                    color: palette?.text.primary,
                  },
                }}
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
                <MenuItem
                  sx={{
                    display: { xs: "flex", md: "none" },
                    justifyContent: "space-between",
                  }}
                >
                  <MessageIcon />
                  <NotificationIcon />
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link
                    component={RouterLink}
                    to={`/dashboard/profile/${currentUser?.name}`}
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
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link
                    component={RouterLink}
                    to="account"
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
                    Account
                  </Link>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    onLogout?.();
                  }}
                >
                  <Typography
                    textAlign="center"
                    color={palette?.warning}
                    sx={{ fontWeight: 500 }}
                  >
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
