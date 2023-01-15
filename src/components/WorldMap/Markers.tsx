import { useContext } from "react";
import { Marker } from "react-map-gl";
import BusinessContext from "../../context/businessContext";
import EventContext from "../../context/eventContext";
import ThemeContext from "../../context/themeContext";
import StoreIcon from "@mui/icons-material/Store";
import RoomIcon from "@mui/icons-material/Room";

const Markers = ({ setPopup }: any) => {
  const { events, selectedEvent, onSetSelectedEvent, onRemoveSelectedEvent } =
    useContext(EventContext);
  const {
    businesses,
    selectedBusiness,
    onSetSelectedBusiness,
    onRemoveSelectedBusiness,
  } = useContext(BusinessContext);
  const { palette } = useContext(ThemeContext);

  const markers = [...events, ...businesses];

  return (
    <>
      {markers.length > 0 &&
        markers.map(({ coordinates, _id, type }) => (
          <Marker
            key={_id}
            longitude={coordinates?.lng}
            latitude={coordinates?.lat}
            onClick={
              type === "event"
                ? () => {
                    onRemoveSelectedBusiness?.();
                    onSetSelectedEvent?.(_id);
                    setPopup(true);
                  }
                : () => {
                    onRemoveSelectedEvent?.();
                    onSetSelectedBusiness?.(_id);
                    setPopup(true);
                  }
            }
          >
            {type === "event" ? (
              <RoomIcon
                sx={{
                  fontSize: "2.5rem",
                  color:
                    _id === selectedEvent?._id || _id === selectedBusiness?._id
                      ? palette?.warning
                      : palette?.text.primary,
                }}
              />
            ) : null}
            {type === "business" ? (
              <StoreIcon
                sx={{
                  fontSize: "2.2rem",
                  color:
                    _id === selectedEvent?._id || _id === selectedBusiness?._id
                      ? palette?.warning
                      : palette?.text.primary,
                }}
              />
            ) : null}
          </Marker>
        ))}
    </>
  );
};

export default Markers;
