import { useState, useEffect, createContext, useContext } from "react";
import PostService from "../services/postService";
import { Post, PostsContext } from "../utils/interfaces";
import CommunicationContext from "./communicationContext";
import UserContext from "./userContext";

const INITIAL_STATE: PostsContext = {
  posts: [],
  usersPosts: [],
};

PostService.http.interceptors.request.use((req: any) => {
  if (localStorage.getItem("auth")) {
    req.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("auth") as string
    )}`;
  }
  return req;
});

const PostContext = createContext(INITIAL_STATE);

export const PostProvider = ({ children }: React.PropsWithChildren) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [usersPosts, setUsersPosts] = useState<Post[]>([]);
  const { currentUser } = useContext(UserContext);
  const { socket, onAddNotification, onSendNotification, dataUpdate } =
    useContext(CommunicationContext);

  const handleGetFollowingPosts = async () => {
    const posts = await PostService.getFollowingPosts();
    if (posts) {
      setPosts(posts);
    }
  };

  const handleGetUsersPosts = async (id: string | undefined) => {
    const posts = await PostService.getUsersPosts(id);
    if (posts) {
      setUsersPosts(posts);
    }
  };

  const handleAddPost = async (post: object) => {
    const newPost = await PostService.addPost(post);
    if (newPost) {
      const creatorFollowers = currentUser?.followers;

      if (creatorFollowers) {
        creatorFollowers.forEach((follower) => {
          let notification = {
            receiverId: follower._id,
            text: "created a new post.",
            read: false,
            type: "social",
          };

          onAddNotification?.(notification);
          onSendNotification?.({
            senderId: newPost.creator?._id,
            senderName: newPost.creator?.name,
            receiverId: follower._id,
            text: "created a new post.",
            type: "social",
          });

          socket.current?.emit("dataUpdate", follower._id);
        });
      }

      setPosts((post: any) => [newPost, ...post]);
    }
  };

  const handleDeletePost = async (id: string | undefined) => {
    const deletedPost = await PostService.deletePost(id);
    if (!deletedPost) {
      const updatedPosts = posts.filter((post) => post._id !== id);
      setPosts(updatedPosts);

      const updatedUsersPosts = usersPosts.filter((post) => post._id !== id);
      setUsersPosts(updatedUsersPosts);

      const creatorFollowers = currentUser?.followers;

      if (creatorFollowers) {
        creatorFollowers.forEach((follower) => {
          socket.current?.emit("dataUpdate", follower._id);
        });
      }
    }
  };

  const handleLikePost = async (id: string | undefined) => {
    const updatedPost = await PostService.likePost(id);
    if (updatedPost) {
      if (updatedPost?.likes?.find((user) => user._id === currentUser?._id)) {
        let notification = {
          receiverId: updatedPost.creator?._id,
          text: "liked your post.",
          read: false,
          type: "social",
        };

        onAddNotification?.(notification);
        onSendNotification?.({
          senderId: currentUser?._id,
          senderName: currentUser?.name,
          receiverId: updatedPost.creator?._id,
          text: "liked your post.",
          type: "social",
        });

        socket.current?.emit("dataUpdate", updatedPost.creator?._id);
      }

      const updatedPosts = posts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      );
      setPosts(updatedPosts);

      const updatedUsersPosts = usersPosts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      );
      setUsersPosts(updatedUsersPosts);
    }
  };

  useEffect(() => {
    const loggedUser = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth") as string)
      : null;
    if (loggedUser) {
      handleGetFollowingPosts();
    }
  }, []);

  useEffect(() => {
    dataUpdate && handleGetFollowingPosts?.();
  }, [dataUpdate]);

  return (
    <PostContext.Provider
      value={{
        posts,
        usersPosts,
        onGetFollowingPosts: handleGetFollowingPosts,
        onGetUsersPosts: handleGetUsersPosts,
        onAddPost: handleAddPost,
        onLikePost: handleLikePost,
        onDeletePost: handleDeletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
