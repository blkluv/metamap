import {
  AlternateEmail,
  Home,
  Language,
  PhoneAndroid,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../utils/interfaces";

interface ContactProps {
  contact?: {
    phone: string | null;
    email: string | null;
    website: string | null;
  };
  address?: string | null;
  openingtime?: string | null;
}

const Contact = ({ contact, address, openingtime }: ContactProps) => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);

  return (
    <>
      <Typography
        sx={{
          display: "block",
          marginTop: "0.2rem",
          fontSize: ".8rem",
          mb: ".8rem",
        }}
        component="span"
        variant="body2"
        color={palette.text.primary}
      >
        {`Opening time: ${openingtime}`}
      </Typography>
      <Box
        sx={{
          display: "flex",
          marginTop: "0.2rem",
          marginBottom: ".8rem",
          fontSize: ".8rem",
          flexWrap: "wrap",
        }}
        color={palette.text.primary}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: ".1rem .7rem .3rem 0",
          }}
        >
          <Home
            sx={{
              fontSize: "1.2rem",
              marginRight: ".2rem",
            }}
          />
          {`${address}`}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: ".1rem .7rem .3rem 0",
          }}
        >
          <PhoneAndroid
            sx={{
              fontSize: "1.2rem",
              marginRight: ".2rem",
            }}
          />{" "}
          {`${contact?.phone}`}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: ".1rem .7rem .3rem 0",
          }}
        >
          <AlternateEmail
            sx={{
              fontSize: "1.2rem",
              marginRight: ".2rem",
            }}
          />{" "}
          {`${contact?.email}`}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: ".1rem .7rem .3rem 0",
          }}
        >
          <Language
            sx={{
              fontSize: "1.2rem",
              marginRight: ".2rem",
            }}
          />{" "}
          {`${contact?.website}`}
        </Box>
      </Box>
    </>
  );
};

export default Contact;
