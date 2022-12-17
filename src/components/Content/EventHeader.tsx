import { useContext } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { EventHeader as Header } from "../../utils/interfaces";
import EventContext from "../../context/eventContext";
import UserContext from "../../context/userContext";
import { Box, Button, CardMedia } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import GroupIcon from "@mui/icons-material/Group";
import debounce from "../../utils/debounce";
import preview from "../../images/preview.png";
import ThemeContext from "../../context/themeContext";

const EventHeader = ({
  event: { _id, title, start, location, description, participants, logo },
  variant,
}: Header) => {
  const { selectedEvent, onSetSelectedEvent, onJoinEvent, onLeaveEvent } =
    useContext(EventContext);
  const { currentUser } = useContext(UserContext);
  const { palette } = useContext(ThemeContext);

  const ifJoined = participants?.find((user) => user._id === currentUser?._id);

  return (
    <ListItem
      alignItems="flex-start"
      sx={{
        cursor: "pointer",
        borderRadius: "25px",
        background: palette?.background.tertiary,
        marginBottom: "1rem",
        display: "flex",
        flexDirection:
          variant === "list"
            ? { xs: "column", sm: "row" }
            : { xs: "column", sm: "row", md: "column" },
        justifyContent: "center",
        alignItems: "flex-start",
      }}
      selected={_id === selectedEvent?._id}
      onClick={() => onSetSelectedEvent?.(_id)}
    >
      <CardMedia
        component="img"
        sx={{
          height:
            variant === "list"
              ? { xs: "100%", sm: 155 }
              : { xs: "100%", sm: 155, md: "100%" },
          width:
            variant === "list"
              ? { xs: "100%", sm: 155 }
              : { xs: "100%", sm: 155, md: "100%" },
          borderRadius: "10px",
          marginRight: variant === "list" ? "1rem" : { sm: "1rem", md: 0 },
          marginTop: "0.5rem",
          marginBottom: "0.5rem",
        }}
        image={logo ? logo : preview}
        alt="Marker on the map"
      />
      <ListItemText
        primary={
          <Typography
            sx={{ display: "block", fontWeight: "500" }}
            component="span"
            variant="body2"
            color={palette?.text.tertiary}
            fontSize={"1rem"}
          >
            {title}
          </Typography>
        }
        secondary={
          <>
            <Typography
              sx={{ display: "block", marginTop: "0.2rem", fontSize: ".8rem" }}
              component="span"
              variant="body2"
              color={palette?.text.primary}
            >
              {start + " — " + location}
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
                  sx={{ margin: "0 1rem 0 0.3rem", fontSize: ".8rem" }}
                >
                  {participants?.length}
                </Typography>
              </Typography>
              <Button
                onClick={
                  ifJoined
                    ? debounce(() => onLeaveEvent?.(_id), 400)
                    : debounce(() => onJoinEvent?.(_id), 400)
                }
                sx={{
                  color: ifJoined ? palette?.warning : "",
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
          </>
        }
      />
    </ListItem>
  );
};

export default EventHeader;
