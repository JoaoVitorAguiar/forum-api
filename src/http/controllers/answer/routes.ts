import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { createAnswer } from "./create";

export async function answersRoutes(app: FastifyInstance) {
  app.post("/answers/:questionId", { onRequest: [verifyJwt] }, createAnswer);
}
