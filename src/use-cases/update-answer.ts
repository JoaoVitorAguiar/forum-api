import { AnswerRepository } from "@/repositories/answer-repository";
import { ResourceNotFoundError } from "./erros/resource-not-found-error";
import { Answer } from "@prisma/client";

// DTOs
interface UpdateAnswerUseCaseRequest {
  answerId: string; // ID da resposta a ser atualizada
  content?: string; // Novo conteúdo da resposta (opcional)
  votesAmount?: number; // Nova quantidade de votos (opcional)
}

interface UpdateAnswerUseCaseResponse {
  answer: Answer;
}

export class UpdateAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    answerId,
    content,
    votesAmount,
  }: UpdateAnswerUseCaseRequest): Promise<UpdateAnswerUseCaseResponse> {
    // Verifica se a resposta existe
    const answer = await this.answerRepository.findById(answerId);
    if (!answer) {
      throw new ResourceNotFoundError();
    }

    // Atualiza os campos fornecidos
    const updatedAnswer = await this.answerRepository.update(answerId, {
      content: content ?? answer.content, // Mantém o conteúdo atual se não for fornecido um novo
      votesAmount: votesAmount ?? answer.votesAmount, // Mantém a quantidade de votos atual se não for fornecido um novo
      updatedAt: new Date(), // Atualiza o campo updatedAt
    });

    return {
      answer: updatedAnswer,
    };
  }
}
