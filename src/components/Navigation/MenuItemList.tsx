import { useContext } from "react";
import List from "@mui/material/List";
import ThemeContext from "../../context/themeContext";
import { MenuItemListProps } from "../../utils/interfaces";
import MenuItem from "../Content/ListItem";

const MenuItemList = ({ items }: MenuItemListProps) => {
  const { palette } = useContext(ThemeContext);

  return (
    <List
      sx={{
        width: "100%",
        color: palette?.text.secondary,
      }}
    >
      {items.map((item) => (
        <MenuItem
          key={item.id}
          label={item.label}
          icon={item.icon}
          color={item.color}
          link={item.link}
        />
      ))}
    </List>
  );
};

export default MenuItemList;
