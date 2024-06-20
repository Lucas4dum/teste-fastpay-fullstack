import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Controller('sessions')
export class AuthenticateController {
  constructor(private jwt: JwtService) {}

  @Post()
  async auth() {
    const token = this.jwt.sign({ sub: 'teste' });

    return token;
  }
}
