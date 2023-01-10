import { useContext, useMemo } from "react";
import { NavLink } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import EventContext from "../../context/eventContext";
import UserContext from "../../context/userContext";
import ThemeContext from "../../context/themeContext";
import { EventHeader as Header } from "../../utils/interfaces";
import { Box, Button, CardMedia } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import GroupIcon from "@mui/icons-material/Group";
import debounce from "../../utils/debounce";
import preview from "../../images/preview.png";
import BusinessContext from "../../context/businessContext";
import Rating from "../Elements/Rating";
import { notify } from "../../utils/notifications";

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
}: Header) => {
  const {
    selectedEvent,
    onSetSelectedEvent,
    onJoinEvent,
    onLeaveEvent,
    onRateEvent,
  } = useContext(EventContext);
  const { onRemoveSelectedBusiness } = useContext(BusinessContext);
  const { currentUser } = useContext(UserContext);
  const { palette } = useContext(ThemeContext);

  const ifJoined = useMemo(
    () => participants?.find((user) => user._id === currentUser?._id),
    [currentUser?._id, participants]
  );

  const displayDate = (date: string | null) => {
    if (date) {
      return new Date(date).toLocaleString("en-GB", {
        dateStyle: "short",
        timeStyle: "short",
      });
    }
    return null;
  };

  const handleSelect = () => {
    onRemoveSelectedBusiness?.();
    onSetSelectedEvent?.(_id);
  };

  const handleRate = (newRating: number) => {
    if (creator?._id === currentUser?._id) {
      notify("You can't rate your own event.");
    } else {
      onRateEvent?.(_id, newRating);
    }
  };

  const handleJoinEvent = () => {
    if (currentUser?.name.startsWith("guest")) {
      notify("DEMO users cannot join anything.");
      return;
    }
    if (creator?._id === currentUser?._id) {
      notify("You can't join your own event.");
      return;
    }
    onJoinEvent?.(_id);
  };

  const handleLeaveEvent = () => {
    if (currentUser?.name.startsWith("guest")) {
      notify("DEMO users cannot leave anything.");
      return;
    }
    if (creator?._id === currentUser?._id) {
      notify("You can't join your own event.");
      return;
    }
    onLeaveEvent?.(_id);
  };

  return (
    <ListItem
      alignItems="flex-start"
      sx={{
        cursor: "pointer",
        borderRadius: "15px",
        background: popup
          ? `${palette?.background.tertiary} !important`
          : palette?.background.tertiary,
        marginBottom: popup ? 0 : "1rem",
        display: "flex",
        flexDirection:
          variant === "list" ? { xs: "column", sm: "row" } : { xs: "column" },
        justifyContent: "center",
        alignItems: "flex-start",
        WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
        boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
      }}
      selected={_id === selectedEvent?._id}
      onClick={() => (variant === "list" ? handleSelect() : null)}
    >
      {variant === "masonry" ? (
        <Typography component="h3" variant="h6" color={palette?.text.tertiary}>
          Event
        </Typography>
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
            <Typography
              sx={{ display: "block", fontWeight: "500", mb: ".5rem" }}
              component="span"
              variant="body2"
              color={palette?.text.tertiary}
              fontSize={"1rem"}
            >
              {title}
            </Typography>
            <Typography
              sx={{ display: "block" }}
              component="span"
              variant="body2"
              color={palette?.text.primary}
              fontSize={".8rem"}
            >
              Hosted by:{" "}
              <NavLink
                to={`/dashboard/profile/${creator?.name}`}
                style={{
                  textDecoration: "none",
                  color: palette?.text.tertiary,
                }}
              >
                {creator?.name}
              </NavLink>
            </Typography>
          </>
        }
        secondary={
          <>
            <Typography
              sx={{ display: "block", marginTop: "0.4rem", fontSize: ".8rem" }}
              component="span"
              variant="body2"
              color={palette?.text.primary}
            >
              {`Starts: ${displayDate(start)}`}
            </Typography>
            <Typography
              sx={{ display: "block", marginTop: "0.2rem", fontSize: ".8rem" }}
              component="span"
              variant="body2"
              color={palette?.text.primary}
            >
              {`Ends: ${displayDate(end)}`}
            </Typography>
            <Typography
              sx={{ display: "block", marginTop: "0.2rem", fontSize: ".8rem" }}
              component="span"
              variant="body2"
              color={palette?.text.primary}
            >
              {`Location: ${location}`}
            </Typography>
            <Typography
              sx={{
                display: "block",
                color: palette?.text.tertiary,
                margin: "0.5rem 0 0.8rem 0",
                fontSize: ".9rem",
              }}
              component="span"
              variant="body2"
            >
              {description}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{
                  display: "flex",
                  color: palette?.text.primary,
                }}
                component="div"
                variant="body2"
              >
                <GroupIcon sx={{ fontSize: "1.2rem" }} />
                <Typography
                  component="div"
                  sx={{ margin: "0 .5rem 0 0.3rem", fontSize: ".8rem" }}
                >
                  {participants?.length}
                </Typography>
              </Typography>
              <Button
                onClick={
                  ifJoined
                    ? debounce(handleLeaveEvent, 400)
                    : debounce(handleJoinEvent, 400)
                }
                sx={{
                  color: ifJoined ? palette?.warning : palette?.blue,
                  paddingLeft: 0,
                  borderRadius: "15px",
                  fontSize: ".8rem",
                }}
              >
                {ifJoined ? (
                  <CloseIcon fontSize="small" sx={{ width: "1.5rem" }} />
                ) : (
                  <CheckIcon fontSize="small" sx={{ width: "1.5rem" }} />
                )}
                {ifJoined ? "Leave" : "Join"}
              </Button>
            </Box>
            {rating ? (
              <Rating
                rating={rating}
                margin={".5rem 0 0 0"}
                handleRate={handleRate}
              />
            ) : null}
          </>
        }
      />
    </ListItem>
  );
};

export default EventHeader;
