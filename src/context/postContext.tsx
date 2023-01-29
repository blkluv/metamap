import { useState, useEffect, createContext, useContext } from "react";
import PostService from "../services/postService";
import { Comment, Post, PostsContext } from "../utils/interfaces";
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
  const { arrivalNotification, onAddNotification, onSendNotification } =
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

  const handleAddPost = async (post: Post) => {
    const newPost = await PostService.addPost(post);
    if (newPost) {
      const receivers = currentUser?.followers;
      if (receivers && receivers?.length > 0) {
        receivers.forEach((follower) => {
          let notification = {
            receiverId: follower._id,
            text: "created a new post.",
            silent: false,
            read: false,
            type: "post",
          };

          onAddNotification?.(notification);
          onSendNotification?.({
            ...notification,
            senderId: newPost.creator?._id,
            senderName: newPost.creator?.name,
            payload: { post: newPost },
          });
        });
      }

      setPosts((posts: Post[]) => [newPost, ...posts]);
      if (usersPosts.length > 0) {
        const ifCreatorsPosts = usersPosts.find(
          (post) => post.creator?._id === newPost.creator?._id
        );
        ifCreatorsPosts && setUsersPosts([newPost, ...usersPosts]);
      }
    }
  };

  const handleDeletePost = async (id: string | undefined) => {
    const deletedPost = await PostService.deletePost(id);
    if (!deletedPost) {
      const receivers = currentUser?.followers;
      if (receivers && receivers?.length > 0) {
        receivers.forEach((follower) => {
          let notification = {
            receiverId: follower._id,
            text: "deleted a post.",
            silent: true,
            read: false,
            type: "postDeletion",
          };

          onAddNotification?.(notification);
          onSendNotification?.({
            ...notification,
            senderId: currentUser?._id,
            senderName: currentUser?.name,
            payload: { _id: id },
          });
        });
      }

      const updatedPosts = posts.filter((post) => post._id !== id);
      setPosts(updatedPosts);

      const updatedUsersPosts = usersPosts.filter((post) => post._id !== id);
      setUsersPosts(updatedUsersPosts);
    }
  };

  const handleLikePost = async (id: string | undefined) => {
    const updatedPost = await PostService.likePost(id);
    if (updatedPost) {
      const ifLike = updatedPost.likes?.find(
        (user) => user._id === currentUser?._id
      );

      let notification = {
        receiverId: updatedPost.creator?._id,
        text: ifLike ? "likes your post." : "doesn't like your post anymore.",
        silent: ifLike ? false : true,
        read: false,
        type: "post",
      };

      onAddNotification?.(notification);
      onSendNotification?.({
        ...notification,
        senderId: currentUser?._id,
        senderName: currentUser?.name,
        payload: { post: updatedPost },
      });

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

  const handleAddComment = async (
    postId: string | undefined,
    comment: object
  ) => {
    const updatedPost = await PostService.addComment(postId, comment);
    if (updatedPost) {
      if (currentUser?._id !== updatedPost.creator?._id) {
        const ifComment = updatedPost.comments?.find(
          (comment) => comment.creator?._id === currentUser?._id
        );

        let notification = {
          receiverId: updatedPost.creator?._id,
          text: ifComment
            ? "commented your post."
            : "deleted a comment in your post.",
          silent: ifComment ? false : true,
          read: false,
          type: "post",
        };
        onAddNotification?.(notification);
        setTimeout(() => {
          onSendNotification?.({
            ...notification,
            senderId: currentUser?._id,
            senderName: currentUser?.name,
            payload: { post: updatedPost },
          });
        }, 1000);
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

  const handleLikeComment = async (
    postId: string | undefined,
    commentId: string
  ) => {
    const updatedPost = await PostService.likeComment(postId, commentId);

    if (updatedPost) {
      const targetComment = updatedPost.comments?.find(
        (comment) => comment._id === commentId
      );

      const ifLike = targetComment?.likes?.find(
        (user) => user._id === currentUser?._id
      );

      let notification = {
        receiverId: targetComment?.creator?._id,
        text: ifLike
          ? "likes your comment."
          : "doesn't like your comment anymore.",
        silent: ifLike ? false : true,
        read: false,
        type: "post",
      };

      onAddNotification?.(notification);
      setTimeout(() => {
        onSendNotification?.({
          ...notification,
          senderId: currentUser?._id,
          senderName: currentUser?.name,
          payload: { post: updatedPost },
        });
      }, 1000);

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

  const handleDislikeComment = async (
    postId: string | undefined,
    commentId: string
  ) => {
    const updatedPost = await PostService.dislikeComment(postId, commentId);
    if (updatedPost) {
      const targetComment = updatedPost.comments?.find(
        (comment) => comment._id === commentId
      );

      const ifDislike = targetComment?.dislikes?.find(
        (user) => user._id === currentUser?._id
      );

      let notification = {
        receiverId: targetComment?.creator?._id,
        text: ifDislike
          ? "dislikes your comment."
          : "doesn't dislike your comment anymore.",
        silent: true,
        read: false,
        type: "post",
      };

      onAddNotification?.(notification);
      setTimeout(() => {
        onSendNotification?.({
          ...notification,
          senderId: currentUser?._id,
          senderName: currentUser?.name,
          payload: { post: updatedPost },
        });
      }, 1000);

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

  const handleDeleteComment = async (
    postId: string | undefined,
    { _id }: Comment
  ) => {
    const updatedPost = await PostService.deleteComment(postId, _id);
    if (updatedPost) {
      let notification = {
        receiverId: updatedPost.creator?._id,
        text: "deleted a comment.",
        silent: true,
        read: false,
        type: "post",
      };

      onAddNotification?.(notification);
      setTimeout(() => {
        onSendNotification?.({
          ...notification,
          senderId: currentUser?._id,
          senderName: currentUser?.name,
          payload: { post: updatedPost },
        });
      }, 1000);

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
  }, [currentUser]);

  useEffect(() => {
    if (arrivalNotification?.type === "post") {
      const { post: updatedPost } = arrivalNotification.payload;

      const existingPost = posts.find((post) => post._id === updatedPost._id);

      if (!existingPost) {
        setPosts?.([updatedPost, ...posts]);
        if (usersPosts.length > 0) {
          const ifCreatorsPosts = usersPosts.find(
            (post) => post.creator?._id === updatedPost.creator?._id
          );
          ifCreatorsPosts && setUsersPosts([updatedPost, ...usersPosts]);
        }
      } else {
        const updatedPosts = posts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        );
        setPosts?.(updatedPosts);

        const updatedUsersPosts = usersPosts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        );
        setUsersPosts(updatedUsersPosts);
      }
    }

    if (arrivalNotification?.type === "postDeletion") {
      const { _id } = arrivalNotification.payload;

      const updatedPosts = posts.filter((post) => post._id !== _id);
      setPosts?.(updatedPosts);
      const updatedUsersPosts = usersPosts.filter((post) => post._id !== _id);
      setUsersPosts?.(updatedUsersPosts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrivalNotification]);

  return (
    <PostContext.Provider
      value={{
        posts,
        usersPosts,
        onGetFollowingPosts: handleGetFollowingPosts,
        onGetUsersPosts: handleGetUsersPosts,
        onAddPost: handleAddPost,
        onLikePost: handleLikePost,
        onAddComment: handleAddComment,
        onLikeComment: handleLikeComment,
        onDislikeComment: handleDislikeComment,
        onDeleteComment: handleDeleteComment,
        onDeletePost: handleDeletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
