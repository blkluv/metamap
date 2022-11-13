import { Box } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import ChangePassword from "../components/Auth/ChangePassword";
import ResetPassword from "../components/Auth/ResetPassword";
import SignIn from "../components/Auth/SignIn";
import SignUp from "../components/Auth/SignUp";

const AuthRoutes = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        alignItems: "center",
        background: "rgb(31,30,43)",
      }}
    >
      <Routes>
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="resetpassword" element={<ResetPassword />} />
        <Route path="changepassword" element={<ChangePassword />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Box>
  );
};

export default AuthRoutes;
