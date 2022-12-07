import List from "@mui/material/List";
import { MenuItemListProps } from "../../utils/interfaces";
import MenuItem from "../Content/ListItem";

const MenuItemList = ({ items }: MenuItemListProps) => {
  return (
    <List
      sx={{
        width: "100%",
        color: "rgb(120,120,126)",
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
