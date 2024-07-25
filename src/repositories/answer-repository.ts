import { Answer, Prisma } from "@prisma/client";

export interface AnswerRepository {
  create(data: Prisma.AnswerCreateInput): Promise<Answer>;
  findById(answerId: string): Promise<Answer | null>;
  findByQuestionId(questionId: string): Promise<Answer[]>;
  update(answerId: string, data: Prisma.AnswerUpdateInput): Promise<Answer>;
  delete(answerId: string): Promise<Answer>;
}
