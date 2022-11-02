import { useState } from "react";
import Map, {
  NavigationControl,
  GeolocateControl,
  FullscreenControl,
  Marker,
  Popup,
} from "react-map-gl";
import PinCard from "../PinCard/PinCard";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

type NewMarker = {
  lng: number;
  lat: number;
};

const WorldMap = () => {
  const [newMarker, setNewMarker] = useState<NewMarker | null>(null);

  const handleDoubleClick = (e: any) => {
    const { lng, lat } = e.lngLat;
    setNewMarker({ lng, lat });
  };

  return (
    <Map
      mapLib={maplibregl}
      initialViewState={{
        longitude: 24,
        latitude: 50,
        zoom: 4,
      }}
      style={{ width: "100%", height: "92vh" }}
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
      <Marker longitude={20} latitude={50} />
      {newMarker && (
        <Popup
          longitude={newMarker.lng}
          latitude={newMarker.lat}
          anchor="top-left"
          onClose={() => setNewMarker(null)}
        >
          <PinCard coordinates={newMarker} />
        </Popup>
      )}
    </Map>
  );
};

export default WorldMap;
