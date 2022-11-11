import List from "@mui/material/List";
import { Key } from "react";
// import { MenuItemListProps } from "../../utils/interfaces";
import MenuItem from "../Content/ListItem";

const MenuItemList = ({ items }: any) => {
  return (
    <List
      sx={{
        width: "100%",
        color: "rgb(120,120,126)",
        paddingTop: "2rem",
      }}
    >
      {items.map(
        (item: {
          id: Key | null | undefined;
          label: string;
          icon: string;
          color: string;
          link: string;
        }) => (
          <MenuItem
            key={item.id}
            label={item.label}
            icon={item.icon}
            color={item.color}
            link={item.link}
          />
        )
      )}
    </List>
  );
};

export default MenuItemList;
