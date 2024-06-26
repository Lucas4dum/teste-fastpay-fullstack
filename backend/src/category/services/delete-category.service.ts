import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DeleteCategoryService {
  constructor(private prisma: PrismaService) {}

  async delete(id: string): Promise<void> {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!category) {
      throw new HttpException(
        'The specified category does not exist!',
        HttpStatus.CONFLICT,
      );
    }

    const transactions = await this.prisma.transaction.findMany({
      where: { categoryId: id },
    });

    if (transactions.length !== 0) {
      throw new HttpException(
        'The specified category is associated with one or more transactions!',
        410,
      );
    }
    try {
      await this.prisma.category.delete({ where: { id } });
    } catch (error) {
      throw new HttpException(
        'Error deleting category!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
