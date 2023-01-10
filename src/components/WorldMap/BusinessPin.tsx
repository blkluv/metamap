import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import BusinessContext from "../../context/businessContext";
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
import { Business, PinCardProps } from "../../utils/interfaces";
import convertImage from "../../utils/imageConverter";
import { Cancel } from "@mui/icons-material";
import debounce from "../../utils/debounce";
import styled from "@emotion/styled";

const BusinessPin = ({ lng, lat, onClose }: PinCardProps) => {
  const { palette } = useContext(ThemeContext);
  const { onAddBusiness } = useContext(BusinessContext);
  const [logo, setLogo] = useState<File | null>(null);

  const {
    register: registerBusiness,
    handleSubmit: handleRegisterBusiness,
    reset: resetBusinessForm,
  } = useForm({
    defaultValues: {
      name: null,
      description: null,
      category: null,
      address: null,
      openingtime: null,
      phone: null,
      email: null,
      website: null,
    },
  });

  const handleAddBusiness = async (data: Business) => {
    const name = data.name?.trim();
    const description = data.description?.trim();
    const category = data.category?.trim();
    const address = data.address?.trim();
    const openingtime = data.openingtime?.trim();
    const phone = data.phone?.trim();
    const email = data.email?.trim();
    const website = data.website?.trim();

    if (
      !description ||
      !name ||
      !openingtime ||
      !address ||
      !category ||
      !phone ||
      !email ||
      !website
    ) {
      return notify("Please complete all fields.");
    }

    const businessData: Business = {
      name,
      category,
      address,
      openingtime,
      contact: {
        phone,
        email,
        website,
      },
      description,
      coordinates: { lng, lat },
    };

    if (logo) {
      businessData.logo = await convertImage(logo, 320, 320);
    }

    try {
      onAddBusiness?.(businessData);
      setLogo(null);
      onClose?.(null);
      resetBusinessForm();
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
    textarea: {
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
        New business
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
            alt={"Business image"}
          />
          <Cancel
            sx={{
              position: "absolute",
              top: "5px",
              right: "5px",
              cursor: "pointer",
              opacity: "0.8",
              borderRadius: "50%",
              background: palette?.background.tertiary,
              color: palette?.text.tertiary,
            }}
            onClick={() => setLogo(null)}
          />
        </Box>
      )}
      <Box
        component="form"
        onSubmit={handleRegisterBusiness(debounce(handleAddBusiness, 400))}
      >
        <FormControl variant="standard" sx={{ width: "100%" }}>
          <InputLabel
            id="businessCategory"
            sx={{ color: palette?.text.tertiary }}
          >
            Category
          </InputLabel>
          <CssSelect
            margin="dense"
            size="small"
            variant="standard"
            id="category"
            labelId="businessCategory"
            autoComplete="category"
            MenuProps={{
              PaperProps: {
                sx: {
                  bgcolor: palette?.background.tertiary,
                  color: palette?.text.tertiary,
                },
              },
            }}
            {...registerBusiness("category", {
              required: true,
            })}
          >
            <MenuItem value={"community"}>Community</MenuItem>
            <MenuItem value={"education"}>Education</MenuItem>
            <MenuItem value={"entertainment"}>Entertainment</MenuItem>
            <MenuItem value={"finance"}>Finance</MenuItem>
            <MenuItem value={"food"}>Food</MenuItem>
            <MenuItem value={"health"}>Health</MenuItem>
            <MenuItem value={"other"}>Other</MenuItem>
            <MenuItem value={"sport"}>Sport</MenuItem>
            <MenuItem value={"tech"}>Tech</MenuItem>
            <MenuItem value={"trade"}>Trade</MenuItem>
            <MenuItem value={"travel"}>Travel</MenuItem>
          </CssSelect>
        </FormControl>
        <CssTextField
          multiline={true}
          margin="dense"
          size="small"
          maxRows={2}
          fullWidth
          id="name"
          label="Name"
          autoComplete="name"
          {...registerBusiness("name", {
            required: true,
            minLength: 5,
            maxLength: 40,
          })}
        />
        <CssTextField
          margin="dense"
          size="small"
          fullWidth
          id="address"
          label="Address"
          autoComplete="address"
          {...registerBusiness("address", {
            required: true,
            minLength: 3,
            maxLength: 25,
          })}
        />
        <CssTextField
          size="small"
          margin="dense"
          fullWidth
          id="openingtime"
          label="Opening time"
          autoComplete="openingtime"
          {...registerBusiness("openingtime", {
            required: true,
            minLength: 3,
            maxLength: 25,
          })}
        />
        <CssTextField
          margin="dense"
          size="small"
          fullWidth
          id="phone"
          label="Phone"
          autoComplete="phone"
          {...registerBusiness("phone", {
            required: true,
            minLength: 3,
            maxLength: 25,
          })}
        />
        <CssTextField
          margin="dense"
          size="small"
          fullWidth
          id="email"
          label="Email"
          autoComplete="email"
          {...registerBusiness("email", {
            required: true,
            minLength: 3,
            maxLength: 25,
          })}
        />
        <CssTextField
          margin="dense"
          size="small"
          fullWidth
          id="website"
          label="Website"
          autoComplete="website"
          {...registerBusiness("website", {
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
          {...registerBusiness("description", {
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

export default BusinessPin;
