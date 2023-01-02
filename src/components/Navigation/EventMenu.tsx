import { useContext } from "react";
import { Box } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import ThemeContext from "../../context/themeContext";
import UserContext from "../../context/userContext";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import CheckIcon from "@mui/icons-material/Check";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchField from "../Elements/SearchField";
import { Event, ItemMenuProps } from "../../utils/interfaces";

export const EventMenu = ({ items, handleFilter }: ItemMenuProps) => {
  const { currentUser } = useContext(UserContext);
  const { palette } = useContext(ThemeContext);

  const handleJoinedEvents = (data: Event[]) => {
    const joined = data.filter((item: Event | null) => {
      return item?.participants?.find((user) => user._id === currentUser?._id);
    });
    handleFilter(joined);
  };

  const handleEndingEvents = (data: Event[]) => {
    const currentMoment = new Date();
    const ending = data.filter((item: Event | null) => {
      return (
        //@ts-ignore
        new Date(item?.end) - 86400000 <= currentMoment &&
        //@ts-ignore
        new Date(item?.end) >= currentMoment
      );
    });
    handleFilter(ending);
  };

  return (
    <Box
      sx={{
        width: "100%",
        background: palette?.background.primary,
        color: palette?.text.tertiary,
      }}
    >
      <CardContent
        sx={{
          padding: "8px 8px 0 8px",
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", mb: 1.5 }}
        >
          Events
        </Typography>
        <Typography
          variant="body2"
          sx={{
            paddingTop: "0.5rem",
            marginBottom: "-0.5rem",
            fontWeight: "bold",
          }}
        >
          Filters
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <SearchField data={items} filter={handleFilter} />
        <Button
          variant="contained"
          startIcon={<TravelExploreIcon />}
          disableElevation
          sx={{
            color: palette?.text.primary,
            background: palette?.background.tertiary,
            marginLeft: "0 !important",
            marginRight: "0.5rem !important",
            marginTop: "0.5rem !important",
          }}
          onClick={() => handleFilter(items)}
        >
          All
        </Button>
        <Button
          variant="outlined"
          startIcon={<CheckIcon />}
          sx={{
            border: `1px solid ${palette?.background.tertiary}`,
            marginLeft: "0 !important",
            marginRight: "0.5rem !important",
            marginTop: "0.5rem !important",
          }}
          onClick={() => handleJoinedEvents(items)}
        >
          Joined
        </Button>
        <Button
          variant="outlined"
          startIcon={<AccessTimeIcon />}
          sx={{
            border: `1px solid ${palette?.background.tertiary}`,
            marginLeft: "0 !important",
            marginRight: "0.5rem !important",
            marginTop: "0.5rem !important",
            color: palette?.warning,
          }}
          onClick={() => handleEndingEvents(items)}
        >
          Ending
        </Button>
      </CardActions>
    </Box>
  );
};

export default EventMenu;
