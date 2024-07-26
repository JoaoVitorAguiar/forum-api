import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateAnswerUseCase } from "@/use-cases/factories/make-create-awser-use-case";

const createAnswerBodySchema = z.object({
  questionId: z.string().uuid(),
  content: z.string().min(1, "Content is required"),
});

export async function createAnswer(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const result = createAnswerBodySchema.safeParse(request.body);

  if (!result.success) {
    return reply.status(400).send({
      message: "Invalid input",
      errors: result.error.format(),
    });
  }

  const { questionId, content } = result.data;

  const createAnswerUseCase = makeCreateAnswerUseCase();

  try {
    const { answer } = await createAnswerUseCase.execute({
      userId: request.user.sub,
      questionId,
      content,
    });

    return reply.status(201).send({
      answer,
    });
  } catch (err) {
    throw err;
  }
}
