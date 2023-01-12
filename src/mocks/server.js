import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// ... makes
export const server = setupServer(...handlers);
