import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { createAnswer } from "./create";
import { updateAnswer } from "./update";

export async function answersRoutes(app: FastifyInstance) {
  app.post("/answers/:questionId", { onRequest: [verifyJwt] }, createAnswer);
  app.put("/answers/:answerId", { onRequest: [verifyJwt] }, updateAnswer);
}
