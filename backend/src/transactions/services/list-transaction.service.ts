import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import IFormattedTransaction from '../interfaces/Iformatted-transactions';

@Injectable()
export class ListTransactionsService {
  constructor(private prisma: PrismaService) {}
  async list(userId: string): Promise<IFormattedTransaction[]> {
    const transactions = await this.prisma.transaction.findMany({
      where: { userId },
      include: {
        category: true,
      },
    });

    const formattedTransactions = transactions.map(transaction => ({
      id: transaction.id,
      description: transaction.description,
      amount: transaction.amount,
      date: transaction.date,
      categoryId: transaction.categoryId,
      categoryName: transaction.category.name,
      userId: transaction.userId,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    }));

    return formattedTransactions;
  }
}
