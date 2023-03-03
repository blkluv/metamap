import { useSelector } from "react-redux";
import { UserMenuLinks } from "../../../constants/menuItems";
import { ReduxState } from "../../../utils/interfaces";
import UserMenuLink from "./UserMenuLink";

interface MenuProps {
  closeMenu?: () => void;
}

const MenuLinks = ({ closeMenu }: MenuProps) => {
  const { name } = useSelector((state: ReduxState) => state.currentUser.data);

  return (
    <>
      <UserMenuLink
        key={1}
        link={`/dashboard/profile/${name}`}
        label={"profile"}
        closeMenu={closeMenu}
      />
      {UserMenuLinks.map((item) => (
        <UserMenuLink key={item.id} {...item} closeMenu={closeMenu} />
      ))}
    </>
  );
};

export default MenuLinks;
