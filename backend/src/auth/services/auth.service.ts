import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

import { compare } from 'bcryptjs';

interface IRequest {
  email: string;
  password: string;
}
@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService,
  ) {}

  async create({ email, password }: IRequest): Promise<string> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User crendentials do not match.');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('User crendentials do not match.');
    }

    const accessToken = this.jwt.sign({ id: user.id });

    return accessToken;
  }
}
