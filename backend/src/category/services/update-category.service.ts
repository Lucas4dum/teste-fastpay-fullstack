import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateCategoryDTO } from '../dtos/update-category.dto';

@Injectable()
export class UpdateCategoryService {
  constructor(private prisma: PrismaService) {}

  async update({ id, name }: UpdateCategoryDTO): Promise<void> {
    let category = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!category) {
      throw new HttpException('The specified category does not exist!', 410);
    }

    category = await this.prisma.category.findFirst({
      where: {
        name: {
          contains: `%${name}%`,
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
      await this.prisma.category.update({
        where: { id },
        data: {
          name,
        },
      });
    } catch (error) {
      throw new HttpException(
        'Error updating category!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
