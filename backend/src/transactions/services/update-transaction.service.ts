import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTransactionDTO } from '../dtos/update-transaction.dto';

@Injectable()
export class UpdateTransactionService {
  constructor(private prisma: PrismaService) {}

  async update(data: UpdateTransactionDTO): Promise<void> {
    const category = await this.prisma.category.findUnique({
      where: { id: data.categoryId },
    });
    if (!category) {
      throw new HttpException(
        'The specified category does not exist!',
        HttpStatus.CONFLICT,
      );
    }

    const transaction = await this.prisma.category.findUnique({
      where: { id: data.id },
    });
    if (!transaction) {
      throw new HttpException('The specified transaction does not exist!', 410);
    }

    let correctedDate: string | undefined;

    if (data.date && typeof data.date === 'string') {
      correctedDate = this.correctDateFormat(data.date);
    }

    const transactionData = {
      description: data?.description,
      amount: data?.amount,
      date: correctedDate,
      categoryId: data?.categoryId,
    };

    try {
      await this.prisma.transaction.update({
        data: transactionData,
        where: { id: data.id },
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
