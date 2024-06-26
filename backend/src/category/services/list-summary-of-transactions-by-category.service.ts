import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface IResponse {
  categoryName: string;
  totalAmount: number;
}

@Injectable()
export class ListSummaryOfTransactionsByCategoryService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string): Promise<IResponse> {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        transactions: {
          select: {
            amount: true,
          },
        },
      },
    });

    if (!category) {
      throw new HttpException(
        'The specified category does not exist!',
        HttpStatus.CONFLICT,
      );
    }

    const totalAmount = category.transactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0,
    );

    return { categoryName: category.name, totalAmount };
  }
}
