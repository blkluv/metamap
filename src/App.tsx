import Wrapper from "./components/Layout/Wrapper";
import CssBaseline from "@mui/material/CssBaseline";
import { EventProvider } from "./context/eventContext";
import { UserProvider } from "./context/userContext";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthRoutes from "./utils/AuthRoutes";

const App = () => {
  return (
    <UserProvider>
      <EventProvider>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<h1>Home "/"</h1>} />
          <Route path="/dashboard/*" element={<Wrapper />} />
          <Route path="/account/*" element={<AuthRoutes />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Toaster />
      </EventProvider>
    </UserProvider>
  );
};

export default App;
