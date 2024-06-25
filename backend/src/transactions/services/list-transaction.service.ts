import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import ITransactionSummary from '../interfaces/Itransaction-summary';

@Injectable()
export class ListTransactionsService {
  constructor(private prisma: PrismaService) {}

  async list(userId: string): Promise<ITransactionSummary> {
    const transactions = await this.prisma.transaction.findMany({
      where: { userId },
      include: {
        category: true,
      },
    });

    let income = 0;
    let expenses = 0;

    const formattedTransactions = transactions.map(transaction => {
      if (transaction.amount > 0) {
        income += transaction.amount;
      } else {
        expenses += transaction.amount;
      }

      return {
        id: transaction.id,
        description: transaction.description,
        amount: transaction.amount,
        date: transaction.date,
        categoryId: transaction.categoryId,
        categoryName: transaction.category.name,
        userId: transaction.userId,
        createdAt: transaction.createdAt,
        updatedAt: transaction.updatedAt,
      };
    });

    const total = income + expenses;

    return {
      transactions: formattedTransactions,
      income,
      expenses,
      total,
    };
  }
}
