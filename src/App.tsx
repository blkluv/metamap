import { useState } from "react";
import Wrapper from "./components/Layout/Wrapper";
import { Navigate, Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { EventProvider } from "./context/eventContext";
import { BusinessProvider } from "./context/businessContext";
import { UserProvider } from "./context/userContext";
import { PostProvider } from "./context/postContext";
import { ThemeProvider } from "./context/themeContext";
import { ChatProvider } from "./context/chatContext";
import { Toaster } from "react-hot-toast";
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
    <ThemeProvider>
      <UserProvider>
        <PostProvider>
          <BusinessProvider>
            <EventProvider>
              <ChatProvider>
                <CssBaseline />
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Navigate
                        to={currentUser ? "/dashboard/" : "/account/signin"}
                      />
                    }
                  />
                  <Route
                    element={
                      <ProtectedRoutes
                        logged={true}
                        redirect={"/account/signin"}
                      />
                    }
                  >
                    <Route path="/dashboard/*" element={<Wrapper />} />
                  </Route>
                  <Route
                    element={
                      <ProtectedRoutes
                        logged={false}
                        redirect={"/dashboard/"}
                      />
                    }
                  >
                    <Route path="/account/*" element={<AuthRoutes />} />
                  </Route>
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </ChatProvider>
              <Toaster />
            </EventProvider>
          </BusinessProvider>
        </PostProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
