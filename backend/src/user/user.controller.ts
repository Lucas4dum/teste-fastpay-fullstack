import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';

import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Response } from 'express';
import { CreateUserService } from './services/create-user.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly createService: CreateUserService) {}
  @ApiOperation({
    summary: 'Rota para cadastrar um usuário.',
    description:
      'Rota utilizada para criar usuários.<br/><br/><b>campos necessários</b>\n\nemail: string\n\npassword: string\n\n',
  })
  @Post()
  async signupUser(
    @Body() data: CreateUserDTO,
    @Res() res: Response,
  ): Promise<Response> {
    await this.createService.create(data);
    return res.status(HttpStatus.CREATED).json();
  }
}
