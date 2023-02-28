import { Marker } from "react-map-gl";
import StoreIcon from "@mui/icons-material/Store";
import RoomIcon from "@mui/icons-material/Room";
import { ReduxState } from "../../utils/interfaces";
import { useSelector } from "react-redux";
import {
  setSelectedBusiness,
  removeSelectedBusiness,
} from "../../store/businesses";
import { useAppDispatch } from "../../store/store";
import { setSelectedEvent, removeSelectedEvent } from "../../store/events";

const Markers = () => {
  const { events, selectedEvent } = useSelector(
    (state: ReduxState) => state.events.data
  );
  const { businesses, selectedBusiness } = useSelector(
    (state: ReduxState) => state.businesses.data
  );
  const palette = useSelector((state: ReduxState) => state.theme.palette);
  const dispatch = useAppDispatch();
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
                    dispatch(removeSelectedBusiness());
                    dispatch(setSelectedEvent(_id));
                  }
                : () => {
                    dispatch(removeSelectedEvent());
                    dispatch(setSelectedBusiness(_id));
                  }
            }
          >
            {type === "event" ? (
              <RoomIcon
                sx={{
                  fontSize: "2.5rem",
                  color:
                    _id === selectedEvent?._id || _id === selectedBusiness?._id
                      ? palette.warning
                      : palette.text.primary,
                }}
              />
            ) : null}
            {type === "business" ? (
              <StoreIcon
                sx={{
                  fontSize: "2.2rem",
                  color:
                    _id === selectedEvent?._id || _id === selectedBusiness?._id
                      ? palette.warning
                      : palette.text.primary,
                }}
              />
            ) : null}
          </Marker>
        ))}
    </>
  );
};

export default Markers;
