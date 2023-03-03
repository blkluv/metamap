import { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Menu } from "@mui/material";
import { ReduxState } from "../../../utils/interfaces";
import LogoutButton from "./LogoutButton";
import MenuLinks from "./MenuLinks";
import UserAvatar from "./UserAvatar";
import NotificationsBlock from "./NotificationsBlock";

const UserMenu = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const palette = useSelector((state: ReduxState) => state.theme.palette);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <UserAvatar openMenu={handleOpenUserMenu} />
      <Menu
        MenuListProps={{
          style: {
            background: palette.background.primary,
            color: palette.text.primary,
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
        <NotificationsBlock mobile />
        <MenuLinks closeMenu={handleCloseUserMenu} />
        <LogoutButton closeMenu={handleCloseUserMenu} />
      </Menu>
    </Box>
  );
};

export default UserMenu;
