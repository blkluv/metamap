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
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Box } from "@mui/material";
import { PinCardProps } from "../../utils/interfaces";

const WorldMap = () => {
  const { selectedEvent } = useContext(EventContext);
  const [newMarker, setNewMarker] = useState<PinCardProps | null>(null);
  const [key, setKey] = useState<number>(Math.random());

  const handleDoubleClick = (e: MapLayerMouseEvent) => {
    const { lng, lat } = e.lngLat;
    setNewMarker({ lng, lat });
  };

  useEffect(() => {
    setKey(Math.random());
  }, [selectedEvent]);

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "45%" },
        minHeight: { xs: "90vh", md: "600px" },
        maxHeight: "fit-content",
        background: "rgb(36,35,48)",
      }}
    >
      <Map
        mapLib={maplibregl}
        initialViewState={{
          longitude: 24,
          latitude: 50,
          zoom: 4,
        }}
        style={{ width: "100%", height: "100%", borderRadius: "25px" }}
        mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${process.env.REACT_APP_MAP_API_KEY}`}
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
            longitude={newMarker.lng}
            latitude={newMarker.lat}
            anchor="top-left"
            onClose={() => setNewMarker(null)}
          >
            <PinCard {...newMarker} />
          </Popup>
        )}
      </Map>
    </Box>
  );
};

export default WorldMap;
