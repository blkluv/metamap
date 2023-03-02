import type { Middleware } from "@reduxjs/toolkit";

const errorMiddleware: Middleware = () => {
  return (next) => (action) => {
    if (action.type.endsWith("/rejected")) {
      console.log(action.error);
    } else {
      next(action);
    }
  };
};

export default errorMiddleware;
