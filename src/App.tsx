import { useEffect } from "react";
import Wrapper from "./components/Layout/Wrapper";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { Toaster } from "react-hot-toast";
import AuthRoutes from "./components/Auth/AuthRoutes";
import ProtectedRoutes from "./components/Elements/ProtectedRoutes";
import { useSelector } from "react-redux";
import { ReduxState } from "./utils/interfaces";
import jwt_decode from "jwt-decode";
import { useAppDispatch } from "./store/store";
import { logout } from "./store/currentUser";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
  const currentUser = useSelector(
    (state: ReduxState) => state.currentUser.data
  );
  const dispatch = useAppDispatch();
  let location = useLocation();

  const decodeJWT = (token: string): any => {
    try {
      return jwt_decode(token);
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    const currentuser = JSON.parse(localStorage.getItem("auth") as string);

    if (currentuser) {
      const decodedJWT = decodeJWT(currentuser);

      if (decodedJWT.exp * 1000 < Date.now()) {
        dispatch(logout());
      }
    } else {
      dispatch(logout());
    }
  }, [dispatch, location]);

  return (
    <GoogleOAuthProvider
      clientId={
        "546341062149-qn4vdlsiqchh7sav2tcim70frqhc62er.apps.googleusercontent.com"
      }
    >
      <CssBaseline />
      <Routes>
        <Route
          path="/"
          element={
            <Navigate to={currentUser ? "/dashboard/" : "/account/signin"} />
          }
        />
        <Route
          element={
            <ProtectedRoutes logged={true} redirect={"/account/signin"} />
          }
        >
          <Route path="/dashboard/*" element={<Wrapper />} />
        </Route>
        <Route
          element={<ProtectedRoutes logged={false} redirect={"/dashboard/"} />}
        >
          <Route path="/account/*" element={<AuthRoutes />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster />
    </GoogleOAuthProvider>
  );
};

export default App;
