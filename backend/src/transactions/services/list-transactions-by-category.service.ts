import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Transaction } from '@prisma/client';
import { ListTransactionsByCategoryDTO } from '../dtos/list-transactions-by-category.dto';

@Injectable()
export class ListTransactionsByCategoryService {
  constructor(private prisma: PrismaService) {}

  async list({
    userId,
    categoryId,
  }: ListTransactionsByCategoryDTO): Promise<Transaction[]> {
    return await this.prisma.transaction.findMany({
      where: { userId, categoryId },
    });
  }
}
