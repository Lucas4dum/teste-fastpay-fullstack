import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';

import { CreateSessionDTO } from './dto/create-session.dto';
import { AuthService } from './services/auth.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { AuthrControllerSwaggerDecorators } from './decorators/auth.swagger.decorator';

@Controller('session')
@ApiTags('Session')
export class AuthenticateController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @AuthrControllerSwaggerDecorators.CreateSession()
  async auth(
    @Body() data: CreateSessionDTO,
    @Res() res: Response,
  ): Promise<Response> {
    const accessToken = await this.authService.create(data);
    return res.status(HttpStatus.CREATED).send({ access_token: accessToken });
  }
}
