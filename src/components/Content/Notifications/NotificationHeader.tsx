import { memo } from "react";
import ListItem from "@mui/material/ListItem";
import { NavLink } from "react-router-dom";
import { NotificationProps, ReduxState } from "../../../utils/interfaces";
import { Box, Typography } from "@mui/material";
import moment from "moment";
import { useSelector } from "react-redux";
import TypeIcon from "./TypeIcon";
import TypeText from "./TypeText";
import Read from "./Read";
import Delete from "./Delete";

const NotificationHeader = ({
  notification: { _id, text, read, type, senderName, createdAt, payload },
}: NotificationProps) => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);

  return (
    <ListItem
      sx={{
        borderRadius: "15px",
        background: palette.background.tertiary,
        marginBottom: "1rem",
        display: "flex",
        alignItems: "center",
        flex: "wrap",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          color: palette.text.tertiary,
        }}
      >
        <TypeIcon type={type} />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ fontSize: ".9rem", display: "flex", flexWrap: "wrap" }}>
            <NavLink
              to={`/dashboard/profile/${senderName}`}
              style={{
                textDecoration: "none",
                color: palette.text.tertiary,
                fontWeight: 700,
                marginRight: ".2rem",
              }}
            >
              {senderName}
            </NavLink>
            <TypeText type={type} text={text} payload={payload} />
          </Box>
          <Typography
            sx={{ display: "block" }}
            component="span"
            variant="body2"
            color="grey"
            fontSize={".8rem"}
          >
            {moment(createdAt).fromNow()}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Read _id={_id} read={read} />
        <Delete _id={_id} />
      </Box>
    </ListItem>
  );
};

const MemoizedNotificationHeader = memo(NotificationHeader);

export default MemoizedNotificationHeader;
