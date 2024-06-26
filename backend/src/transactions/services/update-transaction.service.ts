import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface IRequest {
  description?: string;
  amount?: number;
  date?: string;
  categoryId?: string;
  id: string;
}
@Injectable()
export class UpdateTransactionService {
  constructor(private prisma: PrismaService) {}

  async update({
    description,
    amount,
    date,
    categoryId,
    id,
  }: IRequest): Promise<void> {
    if (categoryId) {
      const category = await this.prisma.category.findUnique({
        where: { id: categoryId },
      });
      if (!category) {
        throw new HttpException(
          'The specified category does not exist!',
          HttpStatus.CONFLICT,
        );
      }
    }

    const transaction = await this.prisma.transaction.findUnique({
      where: { id: id },
    });
    if (!transaction) {
      throw new HttpException('The specified transaction does not exist!', 410);
    }

    let correctedDate: string | undefined;

    if (date && typeof date === 'string') {
      correctedDate = this.correctDateFormat(date);
    }

    const transactionData = {
      ...(description !== undefined && { description: description }),
      ...(amount !== undefined && { amount: amount }),
      ...(correctedDate !== undefined && { date: correctedDate }),
      ...(categoryId !== undefined && { categoryId: categoryId }),
    };

    try {
      await this.prisma.transaction.update({
        data: transactionData,
        where: { id: id },
      });
    } catch (error) {
      throw new HttpException(
        'Error updating transaction!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Função para corrigir o formato da data para ISO-8601 completo
  private correctDateFormat(dateString: string): string | undefined {
    if (!dateString) {
      return undefined; // Retorna undefined se a string da data estiver vazia
    }

    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      // Se for uma data válida, retorna a data no formato ISO-8601 completo
      return date.toISOString();
    } else {
      throw new HttpException(
        'Invalid date format. Please provide a valid date (YYYY-MM-DD).',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
