import { QuestionRepository } from "@/repositories/question-repository";
import { UserRepository } from "@/repositories/user-repository";
import { User, Question } from "@prisma/client";
import { ResourceNotFoundError } from "./erros/resource-not-found-error";

// DTOs
interface CreateQuestionUseCaseRequest {
  userId: string; // ID do usuário logado
  title: string;
  content: string;
  tags: string; // Tags como uma string separada por vírgulas
}

interface CreateQuestionUseCaseResponse {
  question: Question;
}

export class CreateQuestionUseCase {
  constructor(
    private questionRepository: QuestionRepository,
    private userRepository: UserRepository
  ) {}

  async execute({
    userId,
    title,
    content,
    tags,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    // Verifique se o usuário existe
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new ResourceNotFoundError();
    }

    // Crie a nova pergunta
    const question = await this.questionRepository.create({
      title,
      content,
      author: { connect: { id: userId } },
      tags, // Tags como uma string
    });

    return {
      question,
    };
  }
}
