import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { createAnswer } from "./create";

export async function answersRoutes(app: FastifyInstance) {
  app.post("/answer", { onRequest: [verifyJwt] }, createAnswer);
}
