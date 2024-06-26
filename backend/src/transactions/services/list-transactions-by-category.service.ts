import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import ITransactionSummary from '../interfaces/Itransaction-summary';

interface IRequest {
  name: string;
  userId: string;
  pageNumber: number;
  pageSize: number;
}

@Injectable()
export class ListTransactionsByCategoryService {
  constructor(private prisma: PrismaService) {}

  async list({
    name,
    pageNumber,
    pageSize,
    userId,
  }: IRequest): Promise<ITransactionSummary> {
    const pages = (pageNumber === 1 ? pageNumber : pageNumber - 1) * pageSize;

    const category = await this.prisma.category.findFirst({
      where: {
        name: {
          contains: `${name}%`,
          mode: 'insensitive',
        },
      },
    });
    console.log(category);

    const [transactions, totalTransactions, incomeResult, expensesResult] =
      await Promise.all([
        this.prisma.transaction.findMany({
          where: {
            userId,
            ...(category?.id !== undefined && { categoryId: category.id }),
          },
          include: {
            category: true,
          },
          skip: pageNumber === 1 ? 0 : pages,
          take: pages,
        }),
        this.prisma.transaction.count({
          where: {
            userId,
            ...(category?.id !== undefined && { categoryId: category.id }),
          },
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
            ...(category?.id !== undefined && { categoryId: category.id }),
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
            ...(category?.id !== undefined && { categoryId: category.id }),
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
