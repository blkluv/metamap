import { useState } from "react";
import Wrapper from "./components/Layout/Wrapper";
import CssBaseline from "@mui/material/CssBaseline";
import { EventProvider } from "./context/eventContext";
import { UserProvider } from "./context/userContext";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthRoutes from "./components/Auth/AuthRoutes";
import { UserResponse } from "./utils/interfaces";
import ProtectedRoutes from "./components/Elements/ProtectedRoutes";

const App = () => {
  const [currentUser] = useState<UserResponse | null>(
    localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth") as string)
      : null
  );

  return (
    <UserProvider>
      <EventProvider>
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
            element={
              <ProtectedRoutes logged={false} redirect={"/dashboard/"} />
            }
          >
            <Route path="/account/*" element={<AuthRoutes />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Toaster />
      </EventProvider>
    </UserProvider>
  );
};

export default App;
