// use-cases/get-all-questions-use-case.ts

import { PrismaQuestionRepository } from "@/repositories/prisma/prisma-question-repository";
import { ResourceNotFoundError } from "./erros/resource-not-found-error";

export class GetAllQuestionsUseCase {
  constructor(private questionRepository: PrismaQuestionRepository) {}

  async execute() {
    const questions = await this.questionRepository.findAll();

    if (!questions || questions.length === 0) {
      throw new ResourceNotFoundError();
    }

    return questions;
  }
}
