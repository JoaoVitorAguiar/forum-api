import { PrismaQuestionRepository } from "@/repositories/prisma/prisma-question-repository";

export class GetAllQuestionsUseCase {
  constructor(private questionRepository: PrismaQuestionRepository) {}

  async execute({ name, tag, page, perPage }: { name?: string, tag?: string, page: number, perPage: number }) {
    if (page < 1) page = 1;
    if (perPage < 1) perPage = 5;

    const { questions, total } = await this.questionRepository.findAll(name, tag, page, perPage);

    const totalPages = Math.ceil(total / perPage);

    return { questions, totalPages };
  }
}
