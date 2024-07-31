// controllers/get.ts
import { makeGetAllQuestionsUseCase } from "@/use-cases/factories/make-get-all-questions-use-case";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getAllQuestions(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const getAllQuestionsUseCase = makeGetAllQuestionsUseCase();
    const questions = await getAllQuestionsUseCase.execute();

    return reply.status(200).send(questions);
  } catch (error) {
    return reply.status(500).send({ message: "An unexpected error occurred." });
  }
}
