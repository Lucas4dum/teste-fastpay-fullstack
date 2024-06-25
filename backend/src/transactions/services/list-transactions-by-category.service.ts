import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ListTransactionsByCategoryDTO } from '../dtos/list-transactions-by-category.dto';
import ITransactionSummary from '../interfaces/Itransaction-summary';

@Injectable()
export class ListTransactionsByCategoryService {
  constructor(private prisma: PrismaService) {}

  async list({
    userId,
    categoryId,
  }: ListTransactionsByCategoryDTO): Promise<ITransactionSummary> {
    const transactions = await this.prisma.transaction.findMany({
      where: { userId, categoryId },
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
