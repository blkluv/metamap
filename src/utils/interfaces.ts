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
  creator?: string;
}

export interface EventsContext {
  events: Event[];
  selectedEvent?: Event;
  onAddEvent?: (event: Event) => Promise<void>;
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
  username: string;
  password: string;
  email: string;
  friends?: [];
}

export interface UserResponse {
  token: string;
  user: {
    name: string;
    email: string;
    friends: [];
    newsletter: boolean;
  };
}

export interface UsersContext {
  currentUser: UserResponse | null;
  onSignIn?: (user: User) => Promise<void>;
  onSignUp?: (user: User) => Promise<void>;
  onLogout?: () => void;
  onResetPassword?: (email: string) => Promise<void>;
  onChangePassword?: (token: string, data: object) => Promise<void>;
}
