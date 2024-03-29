import { useState } from "react";
import { useForm } from "react-hook-form";
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
import { Event, PinCardProps, ReduxState } from "../../utils/interfaces";
import convertImage from "../../utils/imageConverter";
import { Cancel } from "@mui/icons-material";
import debounce from "../../utils/debounce";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { addEvent } from "../../store/events";
import { useAppDispatch } from "../../store/store";

const EventPin = ({ lng, lat, onClose }: PinCardProps) => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);
  const [logo, setLogo] = useState<File | null>(null);
  const dispatch = useAppDispatch();

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

    if (!category) {
      return notify("Please select a category.");
    }

    if (!description || !title || !start || !end || !location) {
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
      dispatch(addEvent(eventData));
      setLogo(null);
      onClose?.(null);
      resetEventForm();
    } catch (err) {}
  };

  const CssSelect = styled(Select)({
    "& > div": {
      borderBottom: "1px solid rgb(120,120,126)",
    },
    label: { color: palette.text.tertiary },
    "& .MuiSvgIcon-root": {
      color: palette.text.tertiary,
    },
    "& .MuiSelect-select": {
      color: palette.text.tertiary,
    },
  });

  const CssTextField = styled(TextField)({
    input: {
      color: palette.text.tertiary,
    },
    textarea: {
      color: palette.text.tertiary,
    },
    label: { color: palette.text.tertiary },
    "& label.Mui-focused": {
      color: palette.text.tertiary,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: palette.text.tertiary,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgb(120,120,126)",
      },
      "&:hover fieldset": {
        borderColor: palette.text.tertiary,
      },
      "&.Mui-focused fieldset": {
        borderColor: palette.text.tertiary,
      },
    },
  });

  return (
    <Box
      sx={{
        padding: ".8rem",
        background: palette.background.tertiary,
        color: palette.text.primary,
      }}
    >
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
              background: palette.background.tertiary,
              color: palette.text.tertiary,
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
        <CssTextField
          sx={{
            mt: 1,
            mb: 1,
            textTransform: "capitalize",
          }}
          size="small"
          id={"start"}
          autoComplete={"start"}
          type="datetime-local"
          {...registerEvent("start", {
            required: true,
          })}
        />
        <CssTextField
          sx={{ mt: 1, mb: 1, textTransform: "capitalize" }}
          size="small"
          id={"end"}
          autoComplete={"end"}
          type="datetime-local"
          {...registerEvent("end", {
            required: true,
          })}
        />
        <FormControl variant="standard" sx={{ width: "100%" }}>
          <InputLabel id="eventCategory" sx={{ color: palette.text.tertiary }}>
            Category
          </InputLabel>
          <CssSelect
            margin="dense"
            size="small"
            variant="standard"
            id="category"
            labelId="eventCategory"
            autoComplete="category"
            MenuProps={{
              PaperProps: {
                sx: {
                  bgcolor: palette.background.tertiary,
                  color: palette.text.tertiary,
                },
              },
            }}
            {...registerEvent("category", {})}
          >
            <MenuItem value={"art"}>Art</MenuItem>
            <MenuItem value={"business"}>Business</MenuItem>
            <MenuItem value={"community"}>Community</MenuItem>
            <MenuItem value={"education"}>Education</MenuItem>
            <MenuItem value={"entertainment"}>Entertainment</MenuItem>
            <MenuItem value={"other"}>Other</MenuItem>
            <MenuItem value={"sport"}>Sport</MenuItem>
          </CssSelect>
        </FormControl>
        <CssTextField
          multiline={true}
          margin="dense"
          size="small"
          maxRows={2}
          fullWidth
          id="title"
          label="Title"
          autoComplete="title"
          {...registerEvent("title", {
            required: true,
            minLength: 5,
            maxLength: 40,
          })}
        />
        <CssTextField
          margin="dense"
          size="small"
          fullWidth
          id="location"
          label="Location"
          autoComplete="location"
          {...registerEvent("location", {
            required: true,
            minLength: 3,
            maxLength: 25,
          })}
        />
        <CssTextField
          multiline={true}
          size="small"
          margin="dense"
          maxRows={5}
          fullWidth
          id="description"
          label="Description"
          autoComplete="description"
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
            marginBottom: "0.5rem",
            cursor: "pointer",
            color: "inherit",
          }}
        >
          <Button
            variant="outlined"
            component="span"
            fullWidth
            sx={{
              fontSize: "0.9rem",
              fontWeight: "500",
              mt: 1,
              mb: 0.5,
            }}
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

export default EventPin;
