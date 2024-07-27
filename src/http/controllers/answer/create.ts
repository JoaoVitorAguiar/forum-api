import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateAnswerUseCase } from "@/use-cases/factories/make-create-awser-use-case";

const createAnswerBodySchema = z.object({
  content: z.string().min(1, "Content is required"),
});

const createAnswerParamsSchema = z.object({
  questionId: z.string().uuid("Invalid question ID"),
});

export async function createAnswer(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { content } = createAnswerBodySchema.parse(request.body);
  const { questionId } = createAnswerParamsSchema.parse(request.params);

  const createAnswerUseCase = makeCreateAnswerUseCase();

  try {
    const { answer } = await createAnswerUseCase.execute({
      userId: request.user.sub,
      questionId,
      content,
    });

    return reply.status(201).send({
      id: answer.id,
    });
  } catch (error) {
    throw error;
  }
}
