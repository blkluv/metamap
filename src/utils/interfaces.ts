// rating
export interface Rate {
  _id: string;
  rating: number;
}

export interface RatingProps {
  rating: {
    rates: [Rate];
    ratesNumber: number;
    average: number;
  };
  handleRate?: (data: number) => void;
  readOnly?: boolean;
  margin?: string;
}

// user
export interface UserHeader {
  _id: string;
  name: string;
  description?: string;
  following?: UserHeader[];
  followers?: UserHeader[];
  avatar?: any;
  userId?: string;
  type?: string;
  title?: string;
}

export interface User {
  _id: string;
  name: string;
  password?: string;
  email: string;
  following?: UserHeader[];
  followers?: UserHeader[];
  newsletter?: boolean;
  description?: string;
  avatar?: any;
}

export interface UserHeaderSimpleProps {
  user: UserHeader;
  isOnline: boolean;
  onClick: (user: UserHeader) => void;
}

export interface UserUpdateReq {
  dataType: string;
  data: string | [];
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
    avatar?: any;
  };
}

export interface FollowResponse {
  activeUser: User;
  userToFollow: User;
}

export interface SocialListProps {
  data: UserHeader[];
}

export interface UsersContext {
  currentUser: User | null;
  user?: UserHeader | null;
  users: UserHeader[] | null;
  onSetCurrentUser?: (user: User | null) => void;
  onGetUser?: (id: string | undefined) => Promise<void>;
  onGetSingleUser?: (id: string | undefined) => Promise<UserHeader | undefined>;
  onGetAvatar?: (id: string | undefined) => Promise<string | null>;
  onGetUsers?: () => Promise<void>;
  onSignIn?: (user: User) => Promise<void>;
  onExternalSignIn?: (token: string) => Promise<void>;
  onSignUp?: (user: User) => Promise<void>;
  onSignUpDemo?: () => Promise<void>;
  onLogout?: () => void;
  onResetPassword?: (email: string) => Promise<void>;
  onChangePassword?: (token: string, data: object) => Promise<void>;
  onUpdatePassword?: (data: object) => Promise<void>;
  onDeleteUser?: () => Promise<void>;
  onFollowUser?: (id: string | undefined) => Promise<void>;
  onUpdateUser?: (data: UserUpdateReq) => Promise<void>;
}

// event
export interface Event {
  _id?: string;
  type?: string;
  name?: string;
  title: string | null;
  start: string | null;
  end: string | null;
  category: string | null;
  location: string | null;
  coordinates?: { lng: number; lat: number };
  description: string | null;
  logo?: any;
  creator?: UserHeader;
  participants?: UserHeader[];
  rating?: {
    rates: [Rate];
    ratesNumber: number;
    average: number;
  };
}

export interface EventsContext {
  events: Event[];
  selectedEvent?: Event;
  onSetEvents?: (events: Event[]) => void;
  onAddEvent?: (event: Event) => Promise<void>;
  onGetEvents?: () => Promise<void>;
  onJoinEvent?: (id: string | undefined) => Promise<void>;
  onRateEvent?: (id: string | undefined, rating: number) => Promise<void>;
  onLeaveEvent?: (id: string | undefined) => Promise<void>;
  onSetSelectedEvent?: (id: string | undefined) => void;
  onRemoveSelectedEvent?: () => void;
  onDeleteEvent?: (id: string | undefined) => Promise<void>;
}

export interface EventHeader {
  event: Event;
  variant: string;
  popup?: boolean;
}

export interface EventsListProps {
  items: Event[];
}

export interface ItemMenuProps {
  items: any;
  handleFilter: (data: any) => void;
}

// business
export interface Business {
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  _id?: string;
  type?: string;
  name: string | null;
  category: string | null;
  address: string | null;
  openingtime: string | null;
  contact?: {
    phone: string | null;
    email: string | null;
    website: string | null;
  };
  coordinates?: { lng: number; lat: number };
  description: string | null;
  logo?: any;
  likes?: UserHeader[];
  rating?: {
    rates: [Rate];
    ratesNumber: number;
    average: number;
  };
  creator?: UserHeader;
  owners?: UserHeader[];
  comments?: [];
}

export interface BusinessHeader {
  business: Business;
  variant: string;
  popup?: boolean;
}

export interface BusinessesListProps {
  items: Business[];
}

export interface BusinessesContext {
  businesses: Business[];
  selectedBusiness?: Business;
  onAddBusiness?: (business: Business) => Promise<void>;
  onGetBusinesses?: () => Promise<void>;
  onLikeBusiness?: (id: string | undefined) => Promise<void>;
  onRateBusiness?: (id: string | undefined, rating: number) => Promise<void>;
  onDeleteBusiness?: (id: string | undefined) => Promise<void>;
  onSetSelectedBusiness?: (id: string | undefined) => void;
  onRemoveSelectedBusiness?: () => void;
}

// post
export interface Post {
  _id?: string;
  creator?: UserHeader;
  description: string;
  file?: any;
  createdAt?: string;
  likes?: UserHeader[];
}

export interface PinCardProps {
  lng: number;
  lat: number;
  type?: string | null;
  onClose?: React.Dispatch<React.SetStateAction<PinCardProps | null>>;
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

// theme
export interface Palette {
  primary: string;
  divider: string;
  warning: string;
  blue: string;
  green: string;
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  map: {
    style: string;
  };
}

export interface ThemesContext {
  theme: string;
  palette?: Palette;
  onChangeTheme?: () => void;
}

// communication
export interface ChatMessage {
  _id?: string;
  sender?: string;
  senderId?: string;
  text: string;
  createdAt?: string | number;
}

export interface Notification {
  _id?: string;
  senderId?: string;
  senderName?: string;
  receiverId?: string;
  silent?: boolean;
  read?: boolean;
  type?: string;
  text: string;
  createdAt?: string | number;
  payload?: any;
}

export interface NotificationProps {
  notification: Notification;
}

export interface ChatConversation {
  _id: string;
  members: (string | undefined)[];
  createdAt?: string | number;
}

export interface CommunicationContext {
  socket?: any;
  messages: ChatMessage[];
  dataUpdate?: number | null;
  notifications: Notification[];
  arrivalNotification?: Notification | null;
  onlineUsers?: UserHeader[] | undefined;
  setArrivalMessage?: (message: ChatMessage) => void;
  setMessages?: (messages: ChatMessage[]) => void;
  setNotifications?: (notifications: Notification[]) => void;
  conversations: ChatConversation[];
  currentConversation?: ChatConversation | null;
  onSetCurrentConversation?: (conversation: ChatConversation | null) => void;
  onGetMessages?: (id: string | undefined) => Promise<void>;
  onGetConversations?: (id: string | undefined) => Promise<void>;
  onGetNotifications?: (id: string | undefined) => Promise<void>;
  onSendNotification?: (notification: Notification) => void;
  onGetMembersConversation?: (
    firstUserId: string | undefined,
    secondUserId: string | undefined
  ) => Promise<void>;
  onAddConversation?: (conversation: ChatConversation) => Promise<void>;
  onAddMessage?: (message: ChatMessage) => Promise<void>;
  onAddNotification?: (notification: Notification) => Promise<void>;
  onReadNotification?: (id: string | undefined) => Promise<void>;
  onDeleteNotification?: (id: string | undefined) => Promise<void>;
}

export interface ChatMessageProps {
  message: ChatMessage;
  own: boolean;
}

export interface ChatConversationProps {
  conversation: ChatConversation;
}

export interface OnlineUsersProps {
  onlineUsers: UserHeader[] | undefined;
}

// other
export interface UserItems {
  items: any;
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

export interface ProtectedRoutesProps {
  logged: boolean;
  redirect: string;
}

export interface ConfirmationDialogProps {
  title: string;
  confirmLabel: string;
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export interface SearchFieldProps {
  data: any;
  vertical?: boolean;
  filter: (data: any) => void;
}
