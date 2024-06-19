import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateDtoUser } from './dto/create.dto';
import { Response } from 'express';

@Controller()
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiOperation({
    summary: 'Rota para cadastrar um usuário.',
    description:
      'Rota utilizada para criar usuários.<br/><br/><b>campos necessários</b>\n\nemail: string\n\npassword: string\n\n',
  })
  @Post('user')
  async signupUser(
    @Body() userData: CreateDtoUser,
    @Res() res: Response,
  ): Promise<Response> {
    await this.userService.createUser(userData);
    return res.status(HttpStatus.CREATED).json();
  }
}
