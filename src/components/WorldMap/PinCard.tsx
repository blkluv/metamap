import { useContext } from "react";
import EventContext from "../../context/eventContext";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import BasicDateTimePicker from "../Elements/DateTimePicker";
import { notify } from "../../utils/notifications";
import { PinCardProps } from "../../utils/interfaces";

const PinCard = ({ lng, lat, onClose }: PinCardProps) => {
  const { onAddEvent } = useContext(EventContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const eventData = {
      title: "" + data.get("title"),
      description: "" + data.get("description"),
      start: "" + data.get("start"),
      end: "" + data.get("end"),
      category: "" + data.get("category"),
      location: "" + data.get("location"),
    };

    if (eventData.start < eventData.end) {
      onAddEvent?.({
        title: eventData.title,
        start: eventData.start,
        end: eventData.end,
        category: eventData.category,
        location: eventData.location,
        coordinates: { lng, lat },
        description: eventData.description,
        logo: eventData.category[0],
      });
      onClose?.(null);
    } else {
      notify("The end of the event must be later than its beginning.");
    }
  };

  return (
    <Box sx={{ ml: 1, mr: 1 }}>
      <Typography component="h3" variant="h6">
        New event
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <BasicDateTimePicker label={"start"} />
        <BasicDateTimePicker label={"end"} />
        <FormControl variant="standard" required sx={{ minWidth: 120 }}>
          <InputLabel id="eventCategory">Category</InputLabel>
          <Select
            margin="dense"
            size="small"
            variant="standard"
            id="category"
            labelId="eventCategory"
            name="category"
            autoComplete="category"
          >
            <MenuItem value={"art"}>Art</MenuItem>
            <MenuItem value={"business"}>Business</MenuItem>
            <MenuItem value={"community"}>Community</MenuItem>
            <MenuItem value={"education"}>Education</MenuItem>
            <MenuItem value={"entertainment"}>Entertainment</MenuItem>
            <MenuItem value={"other"}>Other</MenuItem>
            <MenuItem value={"sport"}>Sport</MenuItem>
          </Select>
        </FormControl>
        <TextField
          variant="standard"
          multiline={true}
          margin="dense"
          size="small"
          maxRows={2}
          required
          inputProps={{ maxLength: 45 }}
          fullWidth
          id="title"
          label="Title"
          name="title"
          autoComplete="title"
          autoFocus
        />
        <TextField
          variant="standard"
          margin="dense"
          size="small"
          inputProps={{ maxLength: 25 }}
          required
          fullWidth
          id="location"
          label="Location"
          name="location"
          autoComplete="location"
          autoFocus
        />
        <TextField
          variant="standard"
          multiline={true}
          size="small"
          margin="dense"
          maxRows={5}
          inputProps={{ maxLength: 800 }}
          required
          fullWidth
          id="description"
          label="Description"
          name="description"
          autoComplete="description"
          autoFocus
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 1 }}
        >
          Create
        </Button>
      </Box>
    </Box>
  );
};

export default PinCard;
