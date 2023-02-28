import List from "@mui/material/List";
import { MenuItemListProps, ReduxState } from "../../utils/interfaces";
import MenuItem from "../Content/ListItem";
import { useSelector } from "react-redux";

const MenuItemList = ({ items }: MenuItemListProps) => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);

  return (
    <List
      sx={{
        width: "100%",
        color: palette.text.secondary,
        paddingTop: "0",
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
