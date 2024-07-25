import { prisma } from "@/lib/prisma";
import { Answer, Prisma } from "@prisma/client";
import { AnswerRepository } from "../answer-repository";

export class PrismaAnswerRepository implements AnswerRepository {
  async create(data: Prisma.AnswerCreateInput): Promise<Answer> {
    return prisma.answer.create({ data });
  }

  async findById(answerId: string): Promise<Answer | null> {
    return prisma.answer.findUnique({ where: { id: answerId } });
  }

  async findByQuestionId(questionId: string): Promise<Answer[]> {
    return prisma.answer.findMany({ where: { questionId } });
  }

  async update(
    answerId: string,
    data: Prisma.AnswerUpdateInput
  ): Promise<Answer> {
    return prisma.answer.update({
      where: { id: answerId },
      data,
    });
  }

  async delete(answerId: string): Promise<Answer> {
    return prisma.answer.delete({ where: { id: answerId } });
  }
}
