import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { EventHeader as Header, ReduxState } from "../../../utils/interfaces";
import { Box, CardMedia } from "@mui/material";
import { Home } from "@mui/icons-material";
import preview from "../../../images/preview.png";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store/store";
import { removeSelectedBusiness } from "../../../store/businesses";
import { setSelectedEvent } from "../../../store/events";
import Delete from "./Delete";
import Duration from "./Duration";
import Join from "./Join";
import Rate from "./Rate";
import Lock from "./Lock";
import Author from "./Author";

const EventHeader = ({
  event: {
    _id,
    title,
    creator,
    start,
    end,
    location,
    description,
    participants,
    logo,
    rating,
  },
  variant,
  popup,
  innerRef,
}: Header) => {
  const { selectedEvent } = useSelector(
    (state: ReduxState) => state.events.data
  );
  const palette = useSelector((state: ReduxState) => state.theme.palette);
  const dispatch = useAppDispatch();

  const handleSelect = () => {
    dispatch(removeSelectedBusiness());
    dispatch(setSelectedEvent(_id));
  };

  return (
    <ListItem
      ref={innerRef}
      alignItems="flex-start"
      sx={{
        width: variant === "list" ? "100%" : "fit-content",
        cursor: "pointer",
        borderRadius: "15px",
        background: popup
          ? `${palette.background.tertiary} !important`
          : palette.background.tertiary,
        marginBottom: popup ? 0 : "1rem",
        display: "flex",
        flexDirection:
          variant === "list" ? { xs: "column", sm: "row" } : { xs: "column" },
        justifyContent: "center",
        alignItems: "flex-start",
        WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
        boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
        "&:last-child": {
          marginBottom: variant === "list" ? "2.5rem" : "0",
        },
      }}
      selected={_id === selectedEvent?._id}
      onClick={() => (variant === "list" ? handleSelect() : null)}
    >
      {variant === "masonry" ? <Lock end={end} /> : null}
      {variant === "masonry" ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography component="h3" variant="h6" color={palette.text.tertiary}>
            Event
          </Typography>
          <Delete creator={creator} eventId={_id} />
        </Box>
      ) : null}
      <CardMedia
        component="img"
        sx={{
          height:
            variant === "list"
              ? { xs: "100%", sm: 155 }
              : { xs: "100%", sm: "100%", md: "100%" },
          width: variant === "list" ? { xs: "100%", sm: 155 } : { xs: "100%" },
          borderRadius: "10px",
          marginRight: variant === "list" ? "1rem" : { sm: "1rem", md: 0 },
          marginTop: "0.5rem",
          marginBottom: "0.5rem",
        }}
        image={logo ? logo : preview}
        alt="Event logo"
      />
      <ListItemText
        disableTypography
        primary={
          <>
            {variant === "list" ? <Lock end={end} /> : null}
            <Typography
              sx={{ display: "block", fontWeight: "500", mb: ".5rem" }}
              component="span"
              variant="body2"
              color={palette.text.tertiary}
              fontSize={"1rem"}
            >
              {title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                marginTop: "0.2rem",
                marginBottom: ".5rem",
                fontSize: ".8rem",
                flexWrap: "wrap",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: ".1rem .7rem .3rem 0",
                }}
                component="span"
                color={palette.text.primary}
              >
                <Home
                  sx={{
                    fontSize: "1.2rem",
                    marginRight: ".2rem",
                  }}
                />
                {location}
              </Box>
              <Author creator={creator} />
            </Box>
          </>
        }
        secondary={
          <>
            <Duration start={start} end={end} />
            <Typography
              sx={{
                display: "block",
                color: palette.text.tertiary,
                margin: "0.8rem 0",
                fontSize: ".9rem",
              }}
              component="span"
              variant="body2"
            >
              {description}
            </Typography>
            <Join
              participants={participants}
              eventId={_id}
              creator={creator}
              end={end}
            />
            <Rate rating={rating} creator={creator} _id={_id} />
          </>
        }
      />
    </ListItem>
  );
};

export default EventHeader;
