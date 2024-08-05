import { PrismaAnswerRepository } from "@/repositories/prisma/prisma-answer-repository";
import { UpdateAnswerUseCase } from "../update-answer";

export function makeUpdateAnswerUseCase() {
  const answerRepository = new PrismaAnswerRepository();
  return new UpdateAnswerUseCase(answerRepository);
}
