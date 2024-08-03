import { PrismaQuestionRepository } from "@/repositories/prisma/prisma-question-repository";
import { ResourceNotFoundError } from "./erros/resource-not-found-error";

export class GetAllQuestionsUseCase {
  constructor(private questionRepository: PrismaQuestionRepository) {}

  async execute(name?: string, tag?: string) {
    const questions = await this.questionRepository.findAll(name, tag);

    if (!questions || questions.length === 0) {
      throw new ResourceNotFoundError();
    }

    return questions;
  }
}
