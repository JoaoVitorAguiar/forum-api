import { ResourceNotFoundError } from "@/use-cases/erros/resource-not-found-error";
import { makeGetQuestionWithAnswersUseCase } from "@/use-cases/factories/make-get-question-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function getQuestionWithAnswers(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getQuestionWithAnswersParamsSchema = z.object({
    questionId: z.string().uuid(),
  });

  const { questionId } = getQuestionWithAnswersParamsSchema.parse(
    request.params
  );

  try {
    const getQuestionWithAnswersUseCase = makeGetQuestionWithAnswersUseCase();
    const question = await getQuestionWithAnswersUseCase.execute({
      questionId,
    });

    return reply.status(200).send(question);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    throw error;
  }
}
