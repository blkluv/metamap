import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DateTimePickerProps } from "../../utils/interfaces";

const BasicDateTimePicker = ({ label }: DateTimePickerProps) => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs(new Date()));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        renderInput={(props) => (
          <TextField
            {...props}
            sx={{ mt: 1, mb: 1, textTransform: "capitalize" }}
            size="small"
            variant="standard"
            id={label}
            name={label}
            autoComplete={label}
            required
          />
        )}
        label={label}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      />
    </LocalizationProvider>
  );
};

export default BasicDateTimePicker;
