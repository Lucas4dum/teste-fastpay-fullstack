import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Response } from 'express';
import { CreateUserService } from './services/create-user.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly createService: CreateUserService) {}
  @ApiOperation({
    summary: 'Cadastrar usuário.',
    description:
      'Rota utilizada para criar usuários.<br/><br/><b>CAMPOS NECESSÁRIOS</b>\n\nemail: string\n\npassword: string\n\n',
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully.',
  })
  @Post()
  async signupUser(
    @Body() data: CreateUserDTO,
    @Res() res: Response,
  ): Promise<Response> {
    await this.createService.create(data);
    return res.status(HttpStatus.CREATED).json('User created successfully.');
  }
}
