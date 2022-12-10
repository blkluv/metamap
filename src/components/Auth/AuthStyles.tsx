import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

export const CssTextField = styled(TextField)({
  input: {
    color: "white",
  },
  label: { color: "white" },
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgb(120,120,126)",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});
