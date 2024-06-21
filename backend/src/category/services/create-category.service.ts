import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDTO } from '../dtos/create-category.dto';

@Injectable()
export class CreateCategoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCategoryDTO): Promise<void> {
    const category = await this.prisma.category.findFirst({
      where: {
        name: {
          contains: `%${data.name}%`,
          mode: 'insensitive',
        },
      },
    });
    if (category) {
      throw new HttpException(
        'The category with that name already exists!',
        HttpStatus.CONFLICT,
      );
    }

    try {
      await this.prisma.category.create({ data });
    } catch (error) {
      throw new HttpException(
        'Error creating category!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
