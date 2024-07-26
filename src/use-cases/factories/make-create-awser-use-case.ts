import { PrismaAnswerRepository } from "@/repositories/prisma/prisma-answer-repository";
import { PrismaQuestionRepository } from "@/repositories/prisma/prisma-question-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { CreateAnswerUseCase } from "../create-answer";
export function makeCreateAnswerUseCase() {
  const answerRepository = new PrismaAnswerRepository();
  const questionRepository = new PrismaQuestionRepository();
  const userRepository = new PrismaUserRepository();

  return new CreateAnswerUseCase(
    answerRepository,
    questionRepository,
    userRepository
  );
}
