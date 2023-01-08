import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import StoreIcon from "@mui/icons-material/Store";
import RoomIcon from "@mui/icons-material/Room";
import ChatIcon from "@mui/icons-material/Chat";
import { styled } from "@mui/system";
import { Badge } from "@mui/material";

const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    width: ".6rem",
    height: ".6rem",
    borderRadius: "50%",
    WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
    boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
  },
}));

export const EventMenuItems = [
  {
    id: 1,
    label: "Home",
    icon: <HomeIcon />,
    color: "rgb(235, 110, 105)",
    link: "",
  },
  {
    id: 2,
    label: "Events",
    icon: <RoomIcon />,
    color: "rgb(120,120,126)",
    link: "events",
  },
  {
    id: 3,
    label: "Business",
    icon: <StoreIcon />,
    color: "rgb(120,120,126)",
    link: "business",
  },
  {
    id: 4,
    label: "Community",
    icon: <GroupIcon />,
    color: "rgb(120,120,126)",
    link: "social",
  },
  {
    id: 5,
    label: "Chat",
    icon: (
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
      >
        <ChatIcon sx={{ fontSize: "1.2rem" }} />
      </StyledBadge>
    ),
    color: "rgb(120,120,126)",
    link: "chat",
  },
];
