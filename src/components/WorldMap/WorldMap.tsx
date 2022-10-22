import { useRef, useEffect, useState, MutableRefObject } from "react";
import maplibregl, { Map } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./map.css";

const WorldMap = () => {
  const mapContainer = useRef<HTMLDivElement | null>(
    null
  ) as MutableRefObject<HTMLDivElement>;
  const map = useRef<Map | null>(null);
  const [lng] = useState<number>(139.753);
  const [lat] = useState<number>(35.6844);
  const [zoom] = useState<number>(14);

  useEffect(() => {
    if (map.current) return;
    map.current = new Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${process.env.MAP_API_KEY}`,
      center: [lng, lat],
      zoom: zoom,
    });
    map.current.addControl(new maplibregl.NavigationControl({}), "top-right");
  });

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
};

export default WorldMap;
