import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import ITransactionSummary from '../interfaces/Itransaction-summary';

interface IRequest {
  userId: string;
  pageNumber: number;
  pageSize: number;
}

@Injectable()
export class ListTransactionsService {
  constructor(private prisma: PrismaService) {}

  async list({
    userId,
    pageNumber,
    pageSize,
  }: IRequest): Promise<ITransactionSummary> {
    const pages = (pageNumber === 1 ? pageNumber : pageNumber - 1) * pageSize;

    const [transactions, totalTransactions, incomeResult, expensesResult] =
      await Promise.all([
        this.prisma.transaction.findMany({
          where: { userId },
          include: {
            category: true,
          },
          skip: pageNumber === 1 ? 0 : pages,
          take: pageSize,
        }),
        this.prisma.transaction.count({
          where: { userId },
        }),
        this.prisma.transaction.aggregate({
          _sum: {
            amount: true,
          },
          where: {
            userId,
            amount: {
              gt: 0,
            },
          },
        }),
        this.prisma.transaction.aggregate({
          _sum: {
            amount: true,
          },
          where: {
            userId,
            amount: {
              lt: 0,
            },
          },
        }),
      ]);

    const income = incomeResult._sum.amount || 0;
    const expenses = expensesResult._sum.amount || 0;

    const formattedTransactions = transactions.map(transaction => {
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
    const totalPages = Math.ceil(totalTransactions / pageSize);

    return {
      transactions: formattedTransactions,
      income,
      expenses,
      total,
      totalPages,
      currentPage: pageNumber,
    };
  }
}
