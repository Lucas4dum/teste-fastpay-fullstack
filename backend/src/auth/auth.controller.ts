import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';

import { CreateSessionDTO } from './dto/create-session.dto';
import { AuthService } from './serivces/auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthResponse } from './dto/auth-response.dto';

@Controller('session')
@ApiTags('Session')
export class AuthenticateController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Logar usuário.',
    description:
      'Rota utilizada para logar usuário.<br/><br/><b>CAMPOS NECESSÁRIOS</b>\n\nemail: string\n\npassword: string\n\n',
  })
  @ApiResponse({
    status: 201,
    type: AuthResponse,
  })
  @ApiResponse({ status: 401, description: 'User crendentials do not match.' })
  @Post()
  async auth(
    @Body() data: CreateSessionDTO,
    @Res() res: Response,
  ): Promise<Response> {
    const accessToken = await this.authService.create(data);
    return res.status(HttpStatus.CREATED).send({ access_token: accessToken });
  }
}
