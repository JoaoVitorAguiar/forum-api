import { prisma } from "@/lib/prisma";
import { Prisma, Question } from "@prisma/client";
import { QuestionRepository } from "../question-repository";

export class PrismaQuestionRepository implements QuestionRepository {
  async create(data: Prisma.QuestionCreateInput): Promise<Question> {
    return prisma.question.create({ data });
  }

  async findById(questionId: string): Promise<Question | null> {
    return prisma.question.findUnique({ where: { id: questionId } });
  }

  async findByIdWithAnswers(questionId: string): Promise<Question | null> {
    return prisma.question.findUnique({
      where: { id: questionId },
      include: { answers: true }, // Inclui as respostas relacionadas
    });
  }
  async findAll(): Promise<Question[]> {
    return prisma.question.findMany();
  }

  async update(
    questionId: string,
    data: Prisma.QuestionUpdateInput
  ): Promise<Question> {
    return prisma.question.update({
      where: { id: questionId },
      data,
    });
  }

  async delete(questionId: string): Promise<Question> {
    return prisma.question.delete({ where: { id: questionId } });
  }
}
