import { useState, useEffect, useContext } from "react";
import Map, {
  NavigationControl,
  GeolocateControl,
  FullscreenControl,
  Popup,
  MapLayerMouseEvent,
} from "react-map-gl";
import PinCard from "./PinCard";
import Markers from "./Markers";
import EventContext from "../../context/eventContext";
import UserContext from "../../context/userContext";
import ThemeContext from "../../context/themeContext";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Box } from "@mui/material";
import { PinCardProps } from "../../utils/interfaces";
import { notify } from "../../utils/notifications";

const WorldMap = () => {
  const { selectedEvent, onGetEvents } = useContext(EventContext);
  const { currentUser } = useContext(UserContext);
  const { palette } = useContext(ThemeContext);
  const [newMarker, setNewMarker] = useState<PinCardProps | null>(null);
  const [key, setKey] = useState<number>(Math.random());

  const handleDoubleClick = (e: MapLayerMouseEvent) => {
    if (currentUser) {
      const { lng, lat } = e.lngLat;
      setNewMarker({ lng, lat });
    } else {
      notify("Only registered users can add events.");
    }
  };

  useEffect(() => {
    setKey(Math.random());
  }, [selectedEvent]);

  useEffect(() => {
    const loggedUser = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth") as string)
      : null;
    if (loggedUser) {
      onGetEvents?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "45%" },
        minHeight: { xs: "90vh", md: "600px" },
        maxHeight: "fit-content",
        background: palette?.background.primary,
      }}
    >
      <Map
        mapLib={maplibregl}
        initialViewState={{
          longitude: 24,
          latitude: 50,
          zoom: 4,
        }}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "25px",
        }}
        mapStyle={`https://api.maptiler.com/maps/${palette?.map.style}/style.json?key=${process.env.REACT_APP_MAP_API_KEY}`}
        doubleClickZoom={false}
        onDblClick={handleDoubleClick}
      >
        <NavigationControl />
        <GeolocateControl
          trackUserLocation={true}
          positionOptions={{
            enableHighAccuracy: true,
          }}
        />

        <FullscreenControl />
        <Markers key={key} />
        {newMarker && (
          <Popup
            style={{ padding: 0, margin: 0 }}
            longitude={newMarker.lng}
            latitude={newMarker.lat}
            anchor="top-left"
            onClose={() => setNewMarker(null)}
          >
            <PinCard {...newMarker} onClose={setNewMarker} />
          </Popup>
        )}
      </Map>
    </Box>
  );
};

export default WorldMap;
