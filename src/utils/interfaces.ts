export interface UserHeader {
  _id: string;
  name: string;
  description?: string;
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
  event: Event;
  variant: string;
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
    description?: string;
    newsletter?: boolean;
  };
}

export interface UsersContext {
  currentUser: User | null;
  user?: UserHeader | null;
  users: UserHeader[] | null;
  onGetUser?: (id: string | undefined) => Promise<void>;
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

export interface Post {
  _id?: string;
  creator?: UserHeader;
  description: string;
  file?: any;
  createdAt?: string;
  likes?: UserHeader[];
}

export interface PostsContext {
  posts: Post[];
  usersPosts: Post[];
  onGetFollowingPosts?: () => Promise<void>;
  onGetUsersPosts?: (id: string | undefined) => Promise<void>;
  onAddPost?: (post: Post) => Promise<void>;
  onLikePost?: (id: string | undefined) => Promise<void>;
  onDeletePost?: (id: string | undefined) => Promise<void>;
}

export interface ConfirmationDialogProps {
  title: string;
  confirmLabel: string;
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
}
