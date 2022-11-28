export interface UserHeader {
  _id: string;
  name: string;
  following?: UserHeader[];
  followers?: UserHeader[];
}

export interface Event {
  _id?: string;
  title: string;
  start: string;
  end: string;
  category: string;
  location: string;
  coordinates: { lng: number; lat: number };
  description: string;
  logo: string;
  creator?: UserHeader;
  participants?: UserHeader[];
}

export interface EventsContext {
  events: Event[];
  selectedEvent?: Event;
  onAddEvent?: (event: Event) => Promise<void>;
  onJoinEvent?: (id: string | undefined) => Promise<void>;
  onLeaveEvent?: (id: string | undefined) => Promise<void>;
  onSetSelectedEvent?: (id: string | undefined) => void;
}

export interface EventHeader {
  _id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  logo: string;
}

export interface PinCardProps {
  lng: number;
  lat: number;
  onClose?: React.Dispatch<React.SetStateAction<PinCardProps | null>>;
}

export interface DateTimePickerProps {
  label: string;
}

export interface MenuItemProps {
  id?: number;
  label: string;
  icon?: JSX.Element;
  color?: string;
  link: string;
}

export interface MenuItemListProps {
  items: MenuItemProps[];
}

export interface User {
  _id: string;
  name: string;
  password?: string;
  email: string;
  following?: UserHeader[];
  followers?: UserHeader[];
  newsletter?: boolean;
}

export interface UserResponse {
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    following?: UserHeader[];
    followers?: UserHeader[];
    newsletter?: boolean;
  };
}

export interface UsersContext {
  currentUser: User | null;
  users: UserHeader[] | null;
  onGetUsers?: () => Promise<void>;
  onSignIn?: (user: User) => Promise<void>;
  onSignUp?: (user: User) => Promise<void>;
  onLogout?: () => void;
  onResetPassword?: (email: string) => Promise<void>;
  onChangePassword?: (token: string, data: object) => Promise<void>;
  onDeleteUser?: () => Promise<void>;
  onFollowUser?: (id: string) => Promise<void>;
}

export interface ProtectedRoutesProps {
  logged: boolean;
  redirect: string;
}

export interface SocialListProps {
  data: UserHeader[];
}

export interface FollowResponse {
  activeUser: User;
  userToFollow: User;
}
