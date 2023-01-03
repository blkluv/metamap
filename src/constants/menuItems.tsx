import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupIcon from "@mui/icons-material/Group";
import StoreIcon from "@mui/icons-material/Store";
import RoomIcon from "@mui/icons-material/Room";

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
    label: "Settings",
    icon: <SettingsIcon />,
    color: "rgb(120,120,126)",
    link: "settings",
  },
];
