import { AnswerRepository } from "@/repositories/answer-repository";
import { QuestionRepository } from "@/repositories/question-repository";
import { UserRepository } from "@/repositories/user-repository";
import { Answer, User, Question } from "@prisma/client";
import { ResourceNotFoundError } from "./erros/resource-not-found-error";

// DTOs
interface CreateAnswerUseCaseRequest {
  userId: string; // ID do usuário logado
  questionId: string; // ID da pergunta que está sendo respondida
  content: string; // Conteúdo da resposta
}

interface CreateAnswerUseCaseResponse {
  answer: Answer;
}

export class CreateAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private questionRepository: QuestionRepository,
    private userRepository: UserRepository
  ) {}

  async execute({
    userId,
    questionId,
    content,
  }: CreateAnswerUseCaseRequest): Promise<CreateAnswerUseCaseResponse> {
    // Verifica se o usuário existe
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new ResourceNotFoundError();
    }

    // Verifica se a pergunta existe
    const question = await this.questionRepository.findById(questionId);
    if (!question) {
      throw new ResourceNotFoundError();
    }

    // Cria a nova resposta usando AnswerCreateInput
    const answerCreateInput = {
      content,
      author: {
        connect: { id: userId },
      },
      question: {
        connect: { id: questionId },
      },
    };

    const answer = await this.answerRepository.create(answerCreateInput);

    return {
      answer,
    };
  }
}
