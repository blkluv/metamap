import { Box } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SearchField from "../Elements/SearchField";
import { Event, ItemMenuProps, ReduxState } from "../../utils/interfaces";
import { TravelExplore, Check, DoNotDisturb } from "@mui/icons-material";
import { useSelector } from "react-redux";

export const EventMenu = ({
  items,
  handleFilter,
  scrollRef,
}: ItemMenuProps) => {
  const currentUser = useSelector(
    (state: ReduxState) => state.currentUser.data
  );
  const palette = useSelector((state: ReduxState) => state.theme.palette);

  const handleJoinedEvents = (data: Event[] | null | undefined) => {
    const joined = data?.filter((item: Event | null) => {
      return item?.participants?.find((user) => user._id === currentUser?._id);
    });
    handleFilter(joined);
  };

  const handlePastEvents = (data: Event[] | null | undefined) => {
    const currentMoment = new Date();
    const ended = data?.filter((item: Event | null) => {
      return (
        //@ts-ignore
        new Date(item?.end) < currentMoment
      );
    });
    handleFilter(ended);
  };

  return (
    <Box
      ref={scrollRef}
      sx={{
        width: "100%",
        background: palette.background.primary,
        color: palette.text.tertiary,
        marginBottom: "1rem",
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
          startIcon={<TravelExplore />}
          disableElevation
          sx={{
            color: palette.text.primary,
            background: palette.background.tertiary,
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
          startIcon={<Check />}
          sx={{
            border: `1px solid ${palette.background.tertiary}`,
            marginLeft: "0 !important",
            marginRight: "0.5rem !important",
            marginTop: "0.5rem !important",
            color: palette.blue,
          }}
          onClick={() => handleJoinedEvents(items)}
        >
          Joined
        </Button>
        <Button
          variant="outlined"
          startIcon={<DoNotDisturb />}
          sx={{
            border: `1px solid ${palette.background.tertiary}`,
            marginLeft: "0 !important",
            marginRight: "0.5rem !important",
            marginTop: "0.5rem !important",
            color: palette.warning,
          }}
          onClick={() => handlePastEvents(items)}
        >
          Past
        </Button>
      </CardActions>
    </Box>
  );
};

export default EventMenu;
