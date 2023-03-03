import { UserMenuLinks } from "../../../constants/menuItems";
import UserMenuLink from "./UserMenuLink";

interface MenuProps {
  closeMenu?: () => void;
}

const MenuLinks = ({ closeMenu }: MenuProps) => {
  return (
    <>
      {UserMenuLinks.map((item) => (
        <UserMenuLink key={item.id} {...item} closeMenu={closeMenu} />
      ))}
    </>
  );
};

export default MenuLinks;
