import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Transaction } from '@prisma/client';

@Injectable()
export class ListTransactionsService {
  constructor(private prisma: PrismaService) {}

  async list(userId: string): Promise<Transaction[]> {
    return this.prisma.transaction.findMany({
      where: { userId },
    });
  }
}
