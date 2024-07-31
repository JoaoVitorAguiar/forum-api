// use-cases/factories/make-get-all-questions-use-case.ts
import { PrismaQuestionRepository } from "@/repositories/prisma/prisma-question-repository";
import { GetAllQuestionsUseCase } from "../get-all-questions";

export function makeGetAllQuestionsUseCase() {
  const questionRepository = new PrismaQuestionRepository();
  const getAllQuestionsUseCase = new GetAllQuestionsUseCase(questionRepository);

  return getAllQuestionsUseCase;
}
