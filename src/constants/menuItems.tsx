import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupsIcon from "@mui/icons-material/Groups";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
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
    icon: <EmojiEventsIcon />,
    color: "rgb(120,120,126)",
    link: "events",
  },
  {
    id: 3,
    label: "Places",
    icon: <RoomIcon />,
    color: "rgb(120,120,126)",
    link: "places",
  },
  {
    id: 4,
    label: "Users",
    icon: <GroupsIcon />,
    color: "rgb(120,120,126)",
    link: "users",
  },
  {
    id: 5,
    label: "Settings",
    icon: <SettingsIcon />,
    color: "rgb(120,120,126)",
    link: "settings",
  },
];

export const UserLinks = [
  {
    id: 1,
    label: "Profile",
    link: "profile",
  },
  {
    id: 2,
    label: "Account",
    link: "account",
  },
];
