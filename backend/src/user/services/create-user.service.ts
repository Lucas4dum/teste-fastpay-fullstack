import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcryptjs';
interface IRequest {
  email: string;
  password: string;
}

@Injectable()
export class CreateUserService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async create({ email, password }: IRequest): Promise<string> {
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

      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });

      const accessToken = this.jwt.sign({ id: user?.id });

      return accessToken;
    } catch (error) {
      throw new HttpException('Error creating user!', HttpStatus.BAD_REQUEST);
    }
  }
}
