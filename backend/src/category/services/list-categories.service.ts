import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Category } from '@prisma/client';

@Injectable()
export class ListCategoriesService {
  constructor(private prisma: PrismaService) {}
  async list(userId: string): Promise<Category[]> {
    return await this.prisma.category.findMany({
      where: { userId },
    });
  }
}
