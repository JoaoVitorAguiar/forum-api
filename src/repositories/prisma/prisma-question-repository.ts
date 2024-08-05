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
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        answers: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
              },
            },
          },
        },
      },
    });
  }

  async findAll(
    name?: string,
    tag?: string,
    page?: number,
    pageSize?: number,
    authorId?: string
  ): Promise<{ questions: Question[]; total: number }> {
    const currentPage = page ?? 1;
    const currentPageSize = pageSize ?? 5;

    const skip = (currentPage - 1) * currentPageSize;
    const take = currentPageSize;

    const where: Prisma.QuestionWhereInput = {
      ...(name && {
        title: {
          contains: name,
        },
      }),
      ...(tag && {
        tags: {
          contains: tag,
        },
      }),
      ...(authorId && {
        authorId: authorId,
      }),
    };

    const questions = await prisma.question.findMany({
      skip,
      take,
      where,
      include: {
        author: {
          select: {
            name: true,
          },
        },
        answers: {
          select: {
            id: true,
          },
        },
      },
    });

    const total = await prisma.question.count({ where });

    return { questions, total };
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
