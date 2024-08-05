import { makeGetAllQuestionsUseCase } from "@/use-cases/factories/make-get-all-questions-use-case";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getAllQuestions(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { name, tag, page = 1, perPage = 5, authorId } = request.query as any;
    ``;
    const getAllQuestionsUseCase = makeGetAllQuestionsUseCase();
    const { questions, totalPages } = await getAllQuestionsUseCase.execute({
      name,
      tag,
      page,
      perPage,
      authorId,
    });

    return reply.status(200).send({ questions, totalPages });
  } catch (error) {
    return reply.status(500).send({ message: "An unexpected error occurred." });
  }
}
