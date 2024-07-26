import { PrismaQuestionRepository } from "@/repositories/prisma/prisma-question-repository";
import { ResourceNotFoundError } from "./erros/resource-not-found-error";

interface GetQuestionWithAnswersUseCaseRequest {
  questionId: string;
}

export class GetQuestionWithAnswersUseCase {
  constructor(private questionRepository: PrismaQuestionRepository) {
    questionRepository;
  }

  async execute({ questionId }: GetQuestionWithAnswersUseCaseRequest) {
    const question = await this.questionRepository.findByIdWithAnswers(
      questionId
    );

    if (!question) {
      throw new ResourceNotFoundError();
    }

    return question;
  }
}
