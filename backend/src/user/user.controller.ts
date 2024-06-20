import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';

import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateDtoUser } from './dto/create.dto';
import { Response } from 'express';
import { CreateUserService } from './services/create-user.service';

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
    @Body() userData: CreateDtoUser,
    @Res() res: Response,
  ): Promise<Response> {
    await this.createService.createUser(userData);
    return res.status(HttpStatus.CREATED).json();
  }
}
