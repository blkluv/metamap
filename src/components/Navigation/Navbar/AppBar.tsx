import { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { ReduxState } from "../../../utils/interfaces";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store/store";
import { getNotifications } from "../../../store/communication";
import CurrentDate from "./CurrentDate";
import HamburgerMenu from "./HamburgerMenu";
import UserMenu from "./UserMenu";
import WebsiteLogo from "./WebsiteLogo";
import NotificationsBlock from "./NotificationsBlock";

const ResponsiveAppBar = () => {
  const { _id } = useSelector((state: ReduxState) => state.currentUser.data);
  const palette = useSelector((state: ReduxState) => state.theme.palette);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getNotifications(_id));
  }, [_id, dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        background: palette.background.primary,
      }}
    >
      <AppBar
        elevation={0}
        position="static"
        color="inherit"
        sx={{
          background: palette.background.primary,
          color: palette.text.primary,
        }}
      >
        <Container maxWidth={false} sx={{ padding: { md: "0.5rem 2.5rem" } }}>
          <Toolbar disableGutters>
            <CurrentDate />
            <HamburgerMenu />
            <WebsiteLogo mobile color={"inherit"} fontSize={"1.2rem"} />
            <Box sx={{ flexGrow: 1, display: "flex" }}></Box>
            <NotificationsBlock />
            <UserMenu />
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default ResponsiveAppBar;
