// Redux state
export interface ReduxState {
  currentUser: { status: string; data: User };
  users: { status: string; data: { user: User; users: User[] } };
  events: {
    status: string;
    data: { events: Event[]; selectedEvent: Event | null };
  };
  businesses: {
    status: string;
    data: { businesses: Business[]; selectedBusiness: Business | null };
  };
  posts: {
    status: string;
    data: { followingPosts: Post[]; userPosts: Post[] };
  };
  theme: { mode: string; palette: any };
  communication: { status: string; data: CommunicationContext };
}

// Comment
export interface Comment {
  _id?: string;
  creator?: UserHeader;
  likes?: UserHeader[];
  dislikes?: UserHeader[];
  text: string;
  createdAt?: string;
}

// rating
export interface Rate {
  _id: string;
  rating: number;
}

export interface RateProps {
  rating?: {
    rates: [Rate];
    ratesNumber: number;
    average: number;
  };
  _id?: string;
  creator?: UserHeader;
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
  external?: boolean;
  avatar?: any;
  userId?: string;
  type?: string;
  title?: string;
}

export interface User {
  _id: string;
  name: string;
  password?: string;
  email?: string;
  following?: UserHeader[];
  followers?: UserHeader[];
  newsletter?: boolean;
  external?: boolean;
  description?: string;
  avatar?: any;
}

export interface UserForm {
  token?: string;
  username?: string;
  password?: string;
  oldpassword?: string;
  newpassword?: string;
  confirmpassword?: string;
  email?: string;
  external?: boolean;
}

export interface UserHeaderSimpleProps {
  user: UserHeader;
  isOnline: boolean;
  onClick: (user: UserHeader) => void;
  unreadCheck?: boolean;
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
  scrollRef: any;
  loading: boolean;
  users: UserHeader[];
}

export interface UsersContext {
  currentUser: User | null;
  user?: UserHeader | null;
  users: UserHeader[] | null;
  onSetUser?: (user: User | null) => void;
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
  comments?: Comment[];
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
  innerRef?: any;
}

export interface EventsListProps {
  items: Event[];
  scrollRef?: any;
  loading: string;
}

export interface ItemMenuProps {
  items: any;
  handleFilter: (data: any) => void;
  scrollRef?: any;
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
  comments?: Comment[];
}

export interface BusinessHeader {
  business: Business;
  variant: string;
  popup?: boolean;
  innerRef?: any;
}

export interface BusinessesListProps {
  items: Business[];
  scrollRef?: any;
  loading: string;
}

export interface BusinessesContext {
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
  comments?: Comment[];
  file?: any;
  createdAt?: string;
  likes?: UserHeader[];
}

export interface PostHeader {
  post: Post;
  innerRef?: any;
}

export interface PostsListProps {
  items: Post[];
  targetElement: any;
  targetRef: any;
  scrollRef: any;
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
  onAddComment?: (postId: string, comment: Comment) => Promise<void>;
  onLikeComment?: (postId: string, commentId: string) => Promise<void>;
  onDislikeComment?: (postId: string, commentId: string) => Promise<void>;
  onDeleteComment?: (postId: string, comment: Comment) => Promise<void>;
}

// Comment props
export interface CommentProps {
  itemId: string | undefined;
  comment: Comment;
  onLike?: (itemId: string, comment: Comment) => void;
  onDislike?: (itemId: string, comment: Comment) => void;
  onDelete?: (itemId: string, comment: Comment) => void;
}

export interface CommentsProps {
  item: Post | Event | Business;
  onAdd?: (itemId: string, comment: Comment) => Promise<void>;
  onLike?: (itemId: string, commentId: string) => Promise<void>;
  onDislike?: (itemId: string, commentId: string) => Promise<void>;
  onDelete?: (itemId: string, comment: Comment) => Promise<void>;
}

// theme
export interface Palette {
  primary: string;
  divider: string;
  warning: string;
  border: string;
  blue: string;
  green: string;
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
    warning: string;
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
  sender?: { _id: string | undefined; name: string | undefined };
  receiver?: { _id: string | undefined; name: string | undefined };
  conversationId?: string;
  text: string;
  read: boolean;
  createdAt?: string | number;
}

export interface MessageProps {
  message: ChatMessage;
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
  readOnly: boolean;
  createdAt?: string | number;
}

export interface CommunicationContext {
  socket?: any;
  arrivalMessage?: ChatMessage;
  targetElement?: any;
  messages: ChatMessage[];
  userMessages: ChatMessage[];
  onGetMessages?: (id: string | undefined) => Promise<void>;
  onGetUserMessages?: (id: string | undefined) => Promise<void>;
  setMessages?: (messages: ChatMessage[]) => void;
  setUserMessages?: (messages: ChatMessage[]) => void;
  onReadMessage?: (id: string | undefined) => Promise<void>;
  dataUpdate?: number | null;
  onSetTargetElement?: (target: any) => void;
  notifications: Notification[];
  arrivalNotification?: Notification | null;
  onlineUsers?: UserHeader[] | undefined;
  setArrivalMessage?: (message: ChatMessage) => void;
  setNotifications?: (notifications: Notification[]) => void;
  conversations: ChatConversation[];
  currentConversation?: ChatConversation | null;
  onDeleteConversation?: (id: string | undefined) => Promise<void>;
  onSetCurrentConversation?: (conversation: ChatConversation | null) => void;
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

export interface ChatProps {
  onlineUsers: UserHeader[] | undefined;
  userMessages?: ChatMessage[];
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
  onConfirm: any;
  onClose: () => void;
}

export interface SearchFieldProps {
  data: any;
  vertical?: boolean;
  filter: (data: any) => void;
}

export interface ScrollToTheTopProps {
  minLength: number;
  data: any;
  scrollRef?: any;
}
