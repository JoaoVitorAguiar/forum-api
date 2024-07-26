import { PrismaQuestionRepository } from "@/repositories/prisma/prisma-question-repository";
import { GetQuestionWithAnswersUseCase } from "../get-question";

export function makeGetQuestionWithAnswersUseCase() {
  const questionRepository = new PrismaQuestionRepository();
  const getQuestionWithAnswersUseCase = new GetQuestionWithAnswersUseCase(
    questionRepository
  );

  return getQuestionWithAnswersUseCase;
}
