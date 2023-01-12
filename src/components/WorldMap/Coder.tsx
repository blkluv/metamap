// @ts-ignore
import MaplibreGeocoder from "@maplibre/maplibre-gl-geocoder";
import { useControl } from "react-map-gl";
import "@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css";
import maplibregl from "maplibre-gl";

const Geocoder = () => {
  const Geo = {
    forwardGeocode: async (cfg: any) => {
      const response = await fetch(
        `https://api.maptiler.com/geocoding/${cfg.query}.json?key=${process.env.REACT_APP_MAP_API_KEY}`
      );
      const result = await response.json();
      return result;
    },

    getSuggestions: async (cfg: any) => {
      const response = await fetch(
        `https://api.maptiler.com/geocoding/${cfg.query}.json?key=${process.env.REACT_APP_MAP_API_KEY}`
      );
      const result = await response.json();
      return result;
    },
  };

  const geocoder = new MaplibreGeocoder(Geo, {
    maplibregl: maplibregl,
    position: "top-left",
    showResultsWhileTyping: true,
    showResultMarkers: true,
    placeholder: "Search...",
  });

  useControl(() => geocoder);

  return null;
};

export default Geocoder;
