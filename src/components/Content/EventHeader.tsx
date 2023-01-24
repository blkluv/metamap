import { useContext, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import EventContext from "../../context/eventContext";
import UserContext from "../../context/userContext";
import ThemeContext from "../../context/themeContext";
import { EventHeader as Header } from "../../utils/interfaces";
import { Box, Button, CardMedia } from "@mui/material";
import {
  Check,
  Close,
  Group,
  RemoveCircleOutline,
  Home,
  Person,
} from "@mui/icons-material";
import debounce from "../../utils/debounce";
import preview from "../../images/preview.png";
import BusinessContext from "../../context/businessContext";
import Rating from "../Elements/Rating";
import { notify } from "../../utils/notifications";
import ConfirmationDialog from "../Elements/ConfirmationDialog";

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
    onDeleteEvent,
  } = useContext(EventContext);
  const { onRemoveSelectedBusiness } = useContext(BusinessContext);
  const { currentUser } = useContext(UserContext);
  const { palette } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);

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

  const handleOpenDialog = () => {
    setIsOpen(true);
  };
  const handleCloseDialog = () => {
    setIsOpen(false);
  };
  const handleConfirmDialog = async () => {
    await onDeleteEvent?.(_id);
    setIsOpen(false);
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
        "&:last-child": {
          marginBottom: variant === "list" ? "2.5rem" : "0",
        },
      }}
      selected={_id === selectedEvent?._id}
      onClick={() => (variant === "list" ? handleSelect() : null)}
    >
      {variant === "masonry" ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            component="h3"
            variant="h6"
            color={palette?.text.tertiary}
          >
            Event
          </Typography>
          {currentUser?._id === creator?._id ? (
            <RemoveCircleOutline
              sx={{
                cursor: "pointer",
                color: palette?.text.primary,
                fontSize: "1.2rem",
              }}
              onClick={() => handleOpenDialog()}
            />
          ) : null}
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
            <Typography
              sx={{ display: "block", fontWeight: "500", mb: ".5rem" }}
              component="span"
              variant="body2"
              color={palette?.text.tertiary}
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
                color={palette?.text.primary}
              >
                <Home
                  sx={{
                    fontSize: "1.2rem",
                    marginRight: ".2rem",
                  }}
                />
                {location}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: ".1rem .7rem .3rem 0",
                }}
                component="span"
                color={palette?.text.primary}
                fontSize={".8rem"}
              >
                <Person
                  sx={{
                    fontSize: "1.2rem",
                    marginRight: ".2rem",
                  }}
                />
                <NavLink
                  to={`/dashboard/profile/${creator?.name}`}
                  style={{
                    textDecoration: "none",
                    color: palette?.text.tertiary,
                    fontWeight: "bold",
                  }}
                >
                  {creator?.name}
                </NavLink>
              </Box>
            </Box>
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
              sx={{
                display: "block",
                color: palette?.text.tertiary,
                margin: "0.8rem 0",
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
                <Group sx={{ fontSize: "1.2rem" }} />
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
                  <Close fontSize="small" sx={{ width: "1.5rem" }} />
                ) : (
                  <Check fontSize="small" sx={{ width: "1.5rem" }} />
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
      <ConfirmationDialog
        title={"Delete this event?"}
        confirmLabel={"delete"}
        isOpen={isOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDialog}
      />
    </ListItem>
  );
};

export default EventHeader;
