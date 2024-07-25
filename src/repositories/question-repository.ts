import { Prisma, Question } from "@prisma/client";

export interface QuestionRepository {
  create(data: Prisma.QuestionCreateInput): Promise<Question>;
  findById(questionId: string): Promise<Question | null>;
  findAll(): Promise<Question[]>;
  update(
    questionId: string,
    data: Prisma.QuestionUpdateInput
  ): Promise<Question>;
  delete(questionId: string): Promise<Question>;
}
