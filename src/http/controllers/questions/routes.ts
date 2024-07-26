import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { createQuestion } from "./create";
import { getQuestionWithAnswers } from "./get";

export async function questionsRoutes(app: FastifyInstance) {
  /** Authenticated */
  app.post("/question", { onRequest: [verifyJwt] }, createQuestion);
  app.get(
    "/question/:questionId",
    { onRequest: [verifyJwt] },
    getQuestionWithAnswers
  );
}
