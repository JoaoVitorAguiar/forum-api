import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeUpdateAnswerUseCase } from "@/use-cases/factories/make-update-answer-use-case";
import { ResourceNotFoundError } from "@/use-cases/erros/resource-not-found-error";

// Validação dos parâmetros e do corpo da requisição
const updateAnswerBodySchema = z.object({
  content: z.string().min(1, "Content is required").optional(),
  votesAmount: z.number().min(0).optional(),
});

const updateAnswerParamsSchema = z.object({
  answerId: z.string().uuid("Invalid answer ID"),
});

export async function updateAnswer(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Valida os parâmetros e o corpo da requisição
  const { content, votesAmount } = updateAnswerBodySchema.parse(request.body);
  const { answerId } = updateAnswerParamsSchema.parse(request.params);

  const updateAnswerUseCase = makeUpdateAnswerUseCase();

  try {
    const { answer } = await updateAnswerUseCase.execute({
      answerId,
      content,
      votesAmount,
    });

    return reply.status(200).send({
      id: answer.id,
      content: answer.content,
      votesAmount: answer.votesAmount,
      updatedAt: answer.updatedAt,
    });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: "Answer not found" });
    }
    throw error;
  }
}
