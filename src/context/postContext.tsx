import { useState, useEffect, createContext } from "react";
import PostService from "../services/postService";

const INITIAL_STATE: any = {
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
  const [posts, setPosts] = useState<any>([]);

  const handleGetPosts = async () => {
    const posts = await PostService.getPosts();
    if (posts) {
      setPosts(posts);
    }
  };

  const handleAddPost = async (post: any) => {
    const newPost = await PostService.addPost(post);
    if (newPost) {
      setPosts((post: any) => [newPost, ...post]);
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
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
