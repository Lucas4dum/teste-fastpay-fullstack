import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';

import { CreateSessionDTO } from './dto/create-session.dto';
import { AuthService } from './serivces/auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('session')
@ApiTags('Session')
export class AuthenticateController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Rota para logar usuário.',
    description:
      'Rota utilizada para criar transação.<br/><br/><b>campos necessários</b>\n\nemail: string\n\npassword: string\n\n',
  })
  @ApiResponse({
    status: 200,
    description: 'Access token generated successfully.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Post()
  async auth(
    @Body() data: CreateSessionDTO,
    @Res() res: Response,
  ): Promise<Response> {
    const accessToken = await this.authService.create(data);
    return res.status(HttpStatus.CREATED).send({ access_token: accessToken });
  }
}
