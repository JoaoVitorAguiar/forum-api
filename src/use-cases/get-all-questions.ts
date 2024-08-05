import { PrismaQuestionRepository } from "@/repositories/prisma/prisma-question-repository";

export class GetAllQuestionsUseCase {
  constructor(private questionRepository: PrismaQuestionRepository) {}

  async execute({
    name,
    tag,
    page,
    perPage,
    authorId,
  }: {
    name?: string;
    tag?: string;
    page?: number;
    perPage?: number;
    authorId?: string;
  }) {
    const currentPage = page && page >= 1 ? page : 1;
    const currentPerPage = perPage && perPage >= 1 ? perPage : 5;

    const { questions, total } = await this.questionRepository.findAll(
      name,
      tag,
      currentPage,
      currentPerPage,
      authorId
    );

    const totalPages = Math.ceil(total / currentPerPage);

    return { questions, totalPages };
  }
}
