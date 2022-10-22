import { useRef, useEffect, useState, MutableRefObject } from "react";
import maplibregl, { Map } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Box } from "@mui/material";

const WorldMap = () => {
  const mapContainer = useRef<HTMLBRElement | null>(
    null
  ) as MutableRefObject<HTMLBRElement>;
  const map = useRef<Map | null>(null);
  const [lng] = useState<number>(139.753);
  const [lat] = useState<number>(35.6844);
  const [zoom] = useState<number>(14);

  useEffect(() => {
    if (map.current) return;
    map.current = new Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${process.env.REACT_APP_MAP_API_KEY}`,
      center: [lng, lat],
      zoom: zoom,
    });
    map.current.addControl(new maplibregl.NavigationControl({}), "top-right");
  });

  return (
    <Box width="100%" height="100vh" position="relative">
      <Box width="100%" height="100%" position="absolute" ref={mapContainer} />
    </Box>
  );
};

export default WorldMap;
