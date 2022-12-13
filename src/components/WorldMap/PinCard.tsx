import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import EventContext from "../../context/eventContext";
import {
  Box,
  Button,
  CardMedia,
  FormControl,
  FormLabel,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { notify } from "../../utils/notifications";
import { Event, PinCardProps } from "../../utils/interfaces";
import convertImage from "../../utils/imageConverter";
import { Cancel } from "@mui/icons-material";
import debounce from "../../utils/debounce";

const PinCard = ({ lng, lat, onClose }: PinCardProps) => {
  const { onAddEvent } = useContext(EventContext);
  const [logo, setLogo] = useState<File | null>(null);

  const {
    register: registerEvent,
    handleSubmit: handleRegisterEvent,
    reset: resetEventForm,
  } = useForm({
    defaultValues: {
      title: null,
      description: null,
      start: null,
      end: null,
      category: null,
      location: null,
    },
  });

  const handleAddEvent = async (data: Event) => {
    const title = data.title?.trim();
    const start = data.start?.trim();
    const end = data.end?.trim();
    const description = data.description?.trim();
    const category = data.category?.trim();
    const location = data.location?.trim();

    if (!description || !title || !start || !end || !category || !location) {
      return notify("Please complete all fields.");
    }

    const eventData: Event = {
      title,
      description,
      start,
      end,
      category,
      location,
      coordinates: { lng, lat },
    };

    if (
      eventData.start &&
      eventData.end &&
      eventData?.start >= eventData?.end
    ) {
      return notify("The end of the event must be later than its beginning.");
    }

    if (logo) {
      eventData.logo = await convertImage(logo, 320, 320);
    }

    try {
      onAddEvent?.(eventData);
      setLogo(null);
      onClose?.(null);
      resetEventForm();
    } catch (err) {}
  };

  // inny datetime w headerze eventu
  // usememo ?

  return (
    <Box sx={{ ml: 1, mr: 1 }}>
      <Typography component="h3" variant="h6">
        New event
      </Typography>
      {logo && (
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            src={URL.createObjectURL(logo)}
            sx={{
              width: "100%",
              height: "100%",
              maxHeight: "200px",
              borderRadius: "10px",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
            alt={"Event image"}
          />
          <Cancel
            sx={{
              position: "absolute",
              top: "5px",
              right: "5px",
              cursor: "pointer",
              opacity: "0.8",
              background: "white",
              borderRadius: "50%",
            }}
            onClick={() => setLogo(null)}
          />
        </Box>
      )}

      <Box
        component="form"
        onSubmit={handleRegisterEvent(debounce(handleAddEvent, 400))}
      >
        <TextField
          sx={{ mt: 1, mb: 1, textTransform: "capitalize" }}
          size="small"
          variant="standard"
          id={"start"}
          autoComplete={"start"}
          type="datetime-local"
          {...registerEvent("start", {
            required: true,
          })}
        />
        <TextField
          sx={{ mt: 1, mb: 1, textTransform: "capitalize" }}
          size="small"
          variant="standard"
          id={"end"}
          autoComplete={"end"}
          type="datetime-local"
          {...registerEvent("end", {
            required: true,
          })}
        />
        <FormControl variant="standard" required sx={{ minWidth: 120 }}>
          <InputLabel id="eventCategory">Category</InputLabel>
          <Select
            margin="dense"
            size="small"
            variant="standard"
            id="category"
            labelId="eventCategory"
            autoComplete="category"
            {...registerEvent("category", {
              required: true,
            })}
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
          fullWidth
          id="title"
          label="Title"
          autoComplete="title"
          autoFocus
          {...registerEvent("title", {
            required: true,
            minLength: 3,
            maxLength: 45,
          })}
        />
        <TextField
          variant="standard"
          margin="dense"
          size="small"
          fullWidth
          id="location"
          label="Location"
          autoComplete="location"
          autoFocus
          {...registerEvent("location", {
            required: true,
            minLength: 3,
            maxLength: 25,
          })}
        />
        <TextField
          variant="standard"
          multiline={true}
          size="small"
          margin="dense"
          maxRows={5}
          fullWidth
          id="description"
          label="Description"
          autoComplete="description"
          autoFocus
          {...registerEvent("description", {
            required: true,
            minLength: 5,
            maxLength: 800,
          })}
        />
        <FormLabel
          htmlFor="logo"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "0.5rem",
            marginBottom: "0.5rem",
            cursor: "pointer",
            color: "inherit",
          }}
        >
          <Button
            component="span"
            fullWidth
            sx={{ fontSize: "0.9rem", fontWeight: "500", mt: 1, mb: 0.5 }}
          >
            Photo
          </Button>
          <Input
            type="file"
            inputProps={{ accept: ".png,.jpeg,.jpg,.webp" }}
            sx={{ display: "none" }}
            id="logo"
            onChange={(e: any) => setLogo(e.target.files[0])}
          />
        </FormLabel>
        <Button type="submit" fullWidth variant="contained" sx={{ mb: 0.5 }}>
          Create
        </Button>
      </Box>
    </Box>
  );
};

export default PinCard;
