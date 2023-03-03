import { useMemo } from "react";
import { Check, Close, Group } from "@mui/icons-material";
import { useAppDispatch } from "../../../store/store";
import { ReduxState, UserHeader } from "../../../utils/interfaces";
import { useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import { debounce } from "lodash";
import { notify } from "../../../utils/notifications";
import { joinEvent, leaveEvent } from "../../../store/events";

interface JoinEvent {
  creator?: UserHeader;
  participants?: UserHeader[];
  eventId?: string;
  end: string | null;
}

const Join = ({ participants, eventId, creator, end }: JoinEvent) => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);
  const { _id, name } = useSelector(
    (state: ReduxState) => state.currentUser.data
  );
  const dispatch = useAppDispatch();

  const ifJoined = useMemo(
    () => participants?.find((user: UserHeader) => user._id === _id),
    [_id, participants]
  );

  const handleJoinEvent = () => {
    //@ts-ignore
    const ended = new Date(end) < new Date();
    if (!ended) {
      if (name.startsWith("guest")) {
        notify("DEMO users cannot join anything.");
        return;
      }
      if (creator?._id === _id) {
        notify("You can't join your own event.");
        return;
      }
      eventId && dispatch(joinEvent(eventId));
    } else {
      notify("This event is ended.");
    }
  };

  const handleLeaveEvent = () => {
    //@ts-ignore
    const ended = new Date(end) < new Date();
    if (!ended) {
      if (name.startsWith("guest")) {
        notify("DEMO users cannot leave anything.");
        return;
      }
      if (creator?._id === _id) {
        notify("You can't leave your own event.");
        return;
      }
      eventId && dispatch(leaveEvent(eventId));
    } else {
      notify("This event is ended.");
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography
        sx={{
          display: "flex",
          color: palette.text.primary,
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
            ? debounce(() => handleLeaveEvent(), 250)
            : debounce(() => handleJoinEvent(), 250)
        }
        sx={{
          color: ifJoined ? palette.warning : palette.blue,
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
  );
};

export default Join;
