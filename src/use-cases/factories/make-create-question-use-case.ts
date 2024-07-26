import { PrismaQuestionRepository } from "@/repositories/prisma/prisma-question-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { CreateQuestionUseCase } from "../create-question";

export function makeCreateQuestionUseCase() {
  const questionRepository = new PrismaQuestionRepository();
  const userRepository = new PrismaUserRepository();

  return new CreateQuestionUseCase(questionRepository, userRepository);
}
