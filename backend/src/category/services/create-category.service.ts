import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface IRequest {
  userId: string;
  name: string;
}

@Injectable()
export class CreateCategoryService {
  constructor(private prisma: PrismaService) {}

  async create({ name, userId }: IRequest): Promise<void> {
    const category = await this.prisma.category.findFirst({
      where: {
        name: {
          contains: `%${name}%`,
          mode: 'insensitive',
        },
        userId: userId,
      },
    });
    if (category) {
      throw new HttpException(
        'The category with that name already exists!',
        HttpStatus.CONFLICT,
      );
    }

    try {
      const data = { name, userId };
      await this.prisma.category.create({ data });
    } catch (error) {
      throw new HttpException(
        'Error creating category!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
