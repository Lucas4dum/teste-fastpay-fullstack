import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDtoUser } from '../dto/create.dto';
import { hash } from 'bcryptjs';

@Injectable()
export class CreateUserService {
  constructor(private prisma: PrismaService) {}

  async createUser({ email, password }: CreateDtoUser): Promise<void> {
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
