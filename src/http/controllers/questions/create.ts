import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateQuestionUseCase } from "@/use-cases/factories/make-create-question-use-case";

const createQuestionBodySchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  tags: z.array(z.string()),
});

export async function createQuestion(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { title, content, tags } = createQuestionBodySchema.parse(request.body);

  const createQuestionUseCase = makeCreateQuestionUseCase();

  try {
    const { question } = await createQuestionUseCase.execute({
      userId: request.user.sub,
      title,
      content,
      tags,
    });

    return reply.status(201).send({
      id: question.id,
    });
  } catch (error) {
    throw error;
  }
}
