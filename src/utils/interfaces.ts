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
  _id?: string;
  username?: string;
  password: string;
  email: string;
  lastLogged?: string;
  external?: boolean;
  newsletter?: boolean;
  admin?: boolean;
  friends?: string[];
  createdAt?: Date;
}

export interface UsersContext {
  currentUser: User | null;
  onSignIn?: (user: User) => Promise<void>;
  onSignUp?: (user: User) => Promise<void>;
  onResetPassword?: (email: string) => Promise<void>;
  onChangePassword?: (token: string, data: object) => Promise<void>;
}
