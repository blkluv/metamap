import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Link as RouterLink } from "react-router-dom";
import { MenuItemListProps, ReduxState } from "../../utils/interfaces";
import { useSelector } from "react-redux";

const HorizontalMenu = ({ items }: MenuItemListProps) => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100vw",
        bgcolor: palette.background.primary,
        padding: "0.5rem 1rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        TabIndicatorProps={{
          sx: {
            display: "none",
          },
        }}
      >
        {items.map(({ label, link }) => (
          <Tab
            key={label}
            label={label}
            component={RouterLink}
            to={`/${link}`}
            sx={{
              border: "1px solid rgb(53,51,64)",
              borderRadius: "10px",
              color: "white",
              margin: "1.5rem 0.5rem 0 0",
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default HorizontalMenu;
