import axios from "axios";
import {
  Business,
  ChatConversation,
  ChatMessage,
  Comment,
  Event,
  FollowResponse,
  Notification,
  Post,
  User,
  UserForm,
  UserHeader,
  UserResponse,
  UserUpdateReq,
} from "../utils/interfaces";

export const BASE_URL = "https://geoevents-api-production.up.railway.app";

const http = axios.create({
  baseURL: BASE_URL,
});

http.interceptors.request.use((req: any) => {
  if (localStorage.getItem("auth")) {
    req.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("auth") as string
    )}`;
  }
  return req;
});

// currentUser
export const signIn = (userData: UserForm) =>
  http.post<UserResponse>("/users/signin", userData);
export const externalSignIn = (token: string) =>
  http.post<UserResponse>("/users/externalsignin", token);
export const signUpDemo = () => http.post<UserResponse>("/users/signupdemo");
export const signUp = (userData: UserForm) =>
  http.post<UserResponse>("/users/signup", userData);
export const resetPassword = (email: string) =>
  http.post("/users/resetpassword", { email });
export const changePassword = (data: UserForm) => {
  const { token, password, confirmpassword } = data;
  return http.patch(`/users/changepassword/${token}`, {
    password,
    confirmpassword,
  });
};
export const updatePassword = (data: UserForm) =>
  http.patch("/users/updatepassword", data);
export const deleteUser = () => http.delete(`/users/deleteuser`);
export const updateUser = (data: UserUpdateReq) =>
  http.patch<User>("/users/update", data);

// users
export const getUsers = () => http.get<UserHeader[]>("/users/getusers");
export const getUser = (id: string) =>
  http.get<UserHeader>(`/users/getuser/${id}`);
export const followUser = (id: string) =>
  http.patch<FollowResponse>(`/users/follow/${id}`);

// posts
export const getUserPosts = (id: string) =>
  http.get<Post[]>(`/posts/user/${id}`);
export const getFollowingPosts = () => http.get<Post[]>("/posts/following");
export const addPost = (post: Post) => http.post<Post>("/posts", post);
export const deletePost = (id: string) => http.delete(`/posts/${id}`);
export const likePost = (id: string) => http.patch(`/posts/like/${id}`);

// comments
export const addComment = (commentData: { postId: string; comment: Comment }) =>
  http.patch<Post>(`/posts/comment/${commentData.postId}`, commentData.comment);
export const deleteComment = (commentData: {
  postId: string;
  commentId: string;
}) =>
  http.patch(`/posts/comment/${commentData.postId}/${commentData.commentId}`);
export const likeComment = (commentData: {
  postId: string;
  commentId: string;
}) =>
  http.patch<Post>(
    `/posts/comment/like/${commentData.postId}/${commentData.commentId}`
  );
export const dislikeComment = (commentData: {
  postId: string;
  commentId: string;
}) =>
  http.patch<Post>(
    `/posts/comment/dislike/${commentData.postId}/${commentData.commentId}`
  );

// messages
export const getMessages = (id: string) =>
  http.get<ChatMessage[]>(`/communication/messages/${id}`);
export const getUserMessages = (id: string) =>
  http.get<ChatMessage[]>(`/communication/messages/user/${id}`);
export const addMessage = (message: ChatMessage) =>
  http.post<ChatMessage>("/communication/message/", message);
export const readMessage = (id: string) =>
  http.patch<ChatMessage>(`/communication/message/read/${id}`);

// notifications
export const getNotifications = (id: string) =>
  http.get<Notification[]>(`/communication/notifications/${id}`);
export const addNotification = (notification: Notification) =>
  http.post<Notification>("/communication/notification", notification);
export const readNotification = (id: string) =>
  http.patch<Notification>(`/communication/notification/read/${id}`);
export const deleteNotification = (id: string) =>
  http.delete(`/communication/notification/${id}`);

// conversations
export const getConversations = (id: string) =>
  http.get<ChatConversation[]>(`/communication/conversations/${id}`);
export const getMembersConversation = (membersData: {
  firstUserId: string;
  secondUserId: string;
}) =>
  http.get<ChatConversation>(
    `/communication/conversation/members/${membersData.firstUserId}/${membersData.secondUserId}`
  );
export const addConversation = (conversation: ChatConversation) =>
  http.post<ChatConversation>("/communication/conversation", conversation);
export const deleteConversation = (id: string) =>
  http.delete(`/communication/conversation/${id}`);

// events
export const getEvents = () => http.get<Event[]>("/events");
export const addEvent = (event: Event) => http.post<Event[]>("/events", event);
export const deleteEvent = (id: string) => http.delete<Event>(`/events/${id}`);
export const rateEvent = (rateData: { id: string; rating: number }) =>
  http.patch<Event>(`events/rate/${rateData.id}`, {
    rating: rateData.rating,
  });
export const joinEvent = (id: string) =>
  http.patch<Event>(`/events/join/${id}`);
export const leaveEvent = (id: string) =>
  http.patch<Event>(`/events/leave/${id}`);

// businesses
export const getBusinesses = () => http.get<Business[]>("/businesses");
export const addBusiness = (business: Business) =>
  http.post<Business>("/businesses", business);
export const likeBusiness = (id: string) =>
  http.patch<Business>(`/businesses/like/${id}`);
export const rateBusiness = (rateData: { id: string; rating: number }) =>
  http.patch<Business>(`businesses/rate/${rateData.id}`, {
    rating: rateData.rating,
  });
export const deleteBusiness = (id: string) =>
  http.delete<Business>(`/businesses/${id}`);
