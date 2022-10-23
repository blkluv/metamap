import { useRef, useEffect, useState, MutableRefObject } from "react";
import { Map, NavigationControl, GeolocateControl, Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Box } from "@mui/material";

const WorldMap = () => {
  const mapContainer = useRef<HTMLBRElement | null>(
    null
  ) as MutableRefObject<HTMLBRElement>;
  const map = useRef<Map | null>(null);
  const [lng] = useState<number>(24);
  const [lat] = useState<number>(50);
  const [zoom] = useState<number>(4);

  const addMarker = ({ coordinates, map }: any) => {
    return new Marker().setLngLat(coordinates).addTo(map);
  };

  useEffect(() => {
    if (map.current) return;
    map.current = new Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${process.env.REACT_APP_MAP_API_KEY}`,
      center: [lng, lat],
      zoom: zoom,
    });
    map.current.addControl(new NavigationControl({}), "top-right");
    map.current.addControl(
      new GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );
    map.current.on("click", (e) => {
      const coordinates = e.lngLat;
      addMarker({ coordinates, map: map.current });
    });
  });

  return (
    <Box
      ref={mapContainer}
      sx={{
        width: "100%",
        height: "92vh",
      }}
    />
  );
};

export default WorldMap;
