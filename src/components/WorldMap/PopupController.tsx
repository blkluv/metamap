import { useContext } from "react";
import { Box, Button } from "@mui/material";
import { Popup } from "react-map-gl";
import EventPin from "./EventPin";
import BusinessPin from "./BusinessPin";
import ThemeContext from "../../context/themeContext";
import "./popupStyles.css";

const PopupController = ({ newMarker, setNewMarker }: any) => {
  const { palette } = useContext(ThemeContext);

  return (
    <>
      {newMarker ? (
        <Popup
          style={{ padding: 0, margin: 0 }}
          longitude={newMarker.lng}
          latitude={newMarker.lat}
          anchor="top-left"
          onClose={() => setNewMarker(null)}
        >
          {!newMarker.type ? (
            <Box
              sx={{
                padding: ".8rem",
                background: palette?.background.tertiary,
                color: palette?.text.primary,
              }}
            >
              <Button
                fullWidth
                variant="contained"
                sx={{ mb: 0.5 }}
                onClick={() =>
                  setNewMarker({
                    lng: newMarker.lng,
                    lat: newMarker.lat,
                    type: "event",
                  })
                }
              >
                Event
              </Button>
              <Button
                fullWidth
                variant="contained"
                sx={{ mb: 0.5 }}
                onClick={() =>
                  setNewMarker({
                    lng: newMarker.lng,
                    lat: newMarker.lat,
                    type: "business",
                  })
                }
              >
                Business
              </Button>
            </Box>
          ) : null}
          {newMarker.type === "event" ? (
            <EventPin {...newMarker} onClose={setNewMarker} />
          ) : null}
          {newMarker.type === "business" ? (
            <BusinessPin {...newMarker} onClose={setNewMarker} />
          ) : null}
        </Popup>
      ) : null}
    </>
  );
};

export default PopupController;
