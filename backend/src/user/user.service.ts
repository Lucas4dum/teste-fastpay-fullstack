import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { CreateDtoUser } from './dto/create.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser({ email, password }: CreateDtoUser): Promise<void> {
    const user = await this.prisma.user.count({ where: { email } });
    if (user) {
      throw new HttpException('Email já existente!', HttpStatus.CONFLICT);
    }
    try {
      await this.prisma.user.create({
        data: { email, password },
      });
    } catch (error) {
      throw new HttpException('Erro ao criar usuário!', HttpStatus.BAD_REQUEST);
    }
  }
}
