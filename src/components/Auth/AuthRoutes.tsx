import { Box } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import ChangePassword from "./ChangePassword";
import ResetPassword from "./ResetPassword";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import mapbg from "../../images/mapbg.png";

const AuthRoutes = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        alignItems: "center",
        background: `url(${mapbg})`,
        backgroundSize: "cover",
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
