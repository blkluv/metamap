import { setupServer } from "msw/node";
import { endpoints } from "./endpoints";

export const server = setupServer(...endpoints);
