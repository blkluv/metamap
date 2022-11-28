import { Box } from "@mui/material";
import ContentWindow from "./ContentWindow";
import Sidebar from "../Navigation/Sidebar";
import { Route, Routes } from "react-router-dom";
import Profile from "../Pages/Profile";
import Settings from "../Pages/Settings";
import User from "../Content/User";
import Users from "../Pages/Users";
import Account from "../Pages/Account";

const MainWindow = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        background: "rgb(31,30,43)",
        height: "auto",
      }}
    >
      <Sidebar />
      <Routes>
        <Route path="/*" element={<ContentWindow />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/account" element={<Account />} />
        <Route path="/users" element={<Users />}>
          <Route path=":id" element={<User />} />
        </Route>
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Box>
  );
};

export default MainWindow;
