import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DeleteTransactionService {
  constructor(private prisma: PrismaService) {}

  async delete(id: string): Promise<void> {
    const transaction = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!transaction) {
      throw new HttpException('The specified transaction does not exist!', 410);
    }
    try {
      await this.prisma.transaction.delete({ where: { id } });
    } catch (error) {
      throw new HttpException(
        'Error deleting transaction!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
