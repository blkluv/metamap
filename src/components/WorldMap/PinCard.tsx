import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import EventContext from "../../context/eventContext";
import ThemeContext from "../../context/themeContext";
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
import styled from "@emotion/styled";

const PinCard = ({ lng, lat, onClose }: PinCardProps) => {
  const { palette } = useContext(ThemeContext);
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

  const CssSelect = styled(Select)({
    "& > div": {
      borderBottom: "1px solid rgb(120,120,126)",
    },
    label: { color: palette?.text.tertiary },
    "& .MuiSvgIcon-root": {
      color: palette?.text.tertiary,
    },
    "& .MuiSelect-select": {
      color: palette?.text.tertiary,
    },
  });

  const CssTextField = styled(TextField)({
    input: {
      color: palette?.text.tertiary,
    },
    label: { color: palette?.text.tertiary },
    "& label.Mui-focused": {
      color: palette?.text.tertiary,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: palette?.text.tertiary,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgb(120,120,126)",
      },
      "&:hover fieldset": {
        borderColor: palette?.text.tertiary,
      },
      "&.Mui-focused fieldset": {
        borderColor: palette?.text.tertiary,
      },
    },
  });

  return (
    <Box
      sx={{
        padding: ".8rem",
        background: palette?.background.tertiary,
        color: palette?.text.primary,
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
          <InputLabel id="eventCategory" sx={{ color: palette?.text.tertiary }}>
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
                  bgcolor: palette?.background.tertiary,
                  color: palette?.text.tertiary,
                },
              },
            }}
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
            minLength: 3,
            maxLength: 45,
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

export default PinCard;
