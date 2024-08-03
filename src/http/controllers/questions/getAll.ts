import { makeGetAllQuestionsUseCase } from "@/use-cases/factories/make-get-all-questions-use-case";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getAllQuestions(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { name, tag } = request.query as { name?: string, tag?: string };
    const getAllQuestionsUseCase = makeGetAllQuestionsUseCase();
    const questions = await getAllQuestionsUseCase.execute(name, tag);

    return reply.status(200).send(questions);
  } catch (error) {
    return reply.status(500).send({ message: "An unexpected error occurred." });
  }
}

