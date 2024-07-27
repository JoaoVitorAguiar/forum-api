import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { refresh } from "./refresh";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/users/sign-in", authenticate);

  app.patch("/users/refresh", refresh);
  /** Authenticated */
  app.get("/users/me", { onRequest: [verifyJwt] }, profile);
}
