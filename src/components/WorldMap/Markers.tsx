import { useContext } from "react";
import { Marker } from "react-map-gl";
import EventContext from "../../context/eventContext";

const Markers = () => {
  const { events, selectedEvent, onSetSelectedEvent } =
    useContext(EventContext);

  return (
    <>
      {events.length > 0 &&
        events.map(({ coordinates, _id }) => (
          <Marker
            key={_id}
            longitude={coordinates.lng}
            latitude={coordinates.lat}
            color={
              _id === selectedEvent?._id ? "rgb(235, 110, 105)" : "#3FB1CE"
            }
            onClick={() => onSetSelectedEvent?.(_id)}
          />
        ))}
    </>
  );
};

export default Markers;
