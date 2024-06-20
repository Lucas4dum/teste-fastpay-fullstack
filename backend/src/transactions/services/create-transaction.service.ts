import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransactionDTO } from '../dtos/create-transaction.dto';
import ITransaction from 'src/interfaces/ITransaction';

@Injectable()
export class CreateTransactionService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTransactionDTO): Promise<void> {
    const category = await this.prisma.category.findUnique({
      where: { id: data.categoryId },
    });
    if (!category) {
      throw new HttpException(
        'The specified category does not exist!',
        HttpStatus.CONFLICT,
      );
    }

    let correctedDate: string | undefined;

    if (data.date && typeof data.date === 'string') {
      correctedDate = this.correctDateFormat(data.date);
    }

    const transactionData: ITransaction = {
      ...data,
      date: correctedDate!,
    };

    try {
      await this.prisma.transaction.create({ data: transactionData });
    } catch (error) {
      throw new HttpException(
        'Error creating transaction!',
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
