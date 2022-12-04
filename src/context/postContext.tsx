import { useState, useEffect, createContext } from "react";
import PostService from "../services/postService";
import { Post, PostsContext } from "../utils/interfaces";

const INITIAL_STATE: PostsContext = {
  posts: [],
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

  const handleGetPosts = async () => {
    const posts = await PostService.getPosts();
    if (posts) {
      setPosts(posts);
    }
  };

  const handleAddPost = async (post: object) => {
    const newPost = await PostService.addPost(post);
    if (newPost) {
      setPosts((post: any) => [newPost, ...post]);
    }
  };

  const handleLikePost = async (id: string | undefined) => {
    const updatedPost = await PostService.likePost(id);
    if (updatedPost) {
      const updatedPosts = posts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      );
      setPosts(updatedPosts);
    }
  };

  useEffect(() => {
    handleGetPosts();
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts,
        onGetPosts: handleGetPosts,
        onAddPost: handleAddPost,
        onLikePost: handleLikePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
