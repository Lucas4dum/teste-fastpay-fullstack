import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { hash } from 'bcryptjs';
import { CreateUserDTO } from '../dto/create-user.dto';

@Injectable()
export class CreateUserService {
  constructor(private prisma: PrismaService) {}

  async create({ email, password }: CreateUserDTO): Promise<void> {
    const user = await this.prisma.user.count({ where: { email } });
    if (user) {
      throw new HttpException(
        'This email has already been registered!!',
        HttpStatus.CONFLICT,
      );
    }
    try {
      const hashedPassword = await hash(password, 8);

      await this.prisma.user.create({
        data: { email, password: hashedPassword },
      });
    } catch (error) {
      throw new HttpException('Error creating user!', HttpStatus.BAD_REQUEST);
    }
  }
}
