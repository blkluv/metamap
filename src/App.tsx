import AppWrapper from "./components/Layout/AppWrapper";
import CssBaseline from "@mui/material/CssBaseline";
import { EventProvider } from "./context/eventContext";
import { UserProvider } from "./context/userContext";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <UserProvider>
      <EventProvider>
        <CssBaseline />
        <AppWrapper />
        <Toaster />
      </EventProvider>
    </UserProvider>
  );
};

export default App;
