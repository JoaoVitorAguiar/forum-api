import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { createQuestion } from "./create";
import { getQuestionWithAnswers } from "./get";
import { getAllQuestions } from "./getAll";

export async function questionsRoutes(app: FastifyInstance) {
  /** Authenticated */
  app.post("/questions", { onRequest: [verifyJwt] }, createQuestion);
  app.get(
    "/questions/:questionId",
    { onRequest: [verifyJwt] },
    getQuestionWithAnswers
  );

  app.get('/questions', getAllQuestions);

}
