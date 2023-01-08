import { useContext } from "react";
import { Box } from "@mui/material";
import ContentWindow from "./ContentWindow";
import Sidebar from "../Navigation/Sidebar";
import { Route, Routes } from "react-router-dom";
import Profile from "../Pages/Profile";
import Chat from "../Pages/Chat";
import User from "../Content/User";
import Account from "../Pages/Account";
import ThemeContext from "../../context/themeContext";

const MainWindow = () => {
  const { palette } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        background: palette?.background.secondary,
        height: "auto",
      }}
    >
      <Sidebar />
      <Routes>
        <Route path="/*" element={<ContentWindow />} />
        <Route path="/profile" element={<Profile />}>
          <Route path=":id" element={<User />} />
        </Route>
        <Route path="/account" element={<Account />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Box>
  );
};

export default MainWindow;
