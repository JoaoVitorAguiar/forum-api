import { Prisma, Question } from "@prisma/client";

export interface QuestionRepository {
  create(data: Prisma.QuestionCreateInput): Promise<Question>;
  findById(questionId: string): Promise<Question | null>;
  findByIdWithAnswers(questionId: string): Promise<Question | null>;
  findAll(name?: string, tag?: string): Promise<Question[]>; 
  update(
    questionId: string,
    data: Prisma.QuestionUpdateInput
  ): Promise<Question>;
  delete(questionId: string): Promise<Question>;
}

