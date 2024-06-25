import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';

import { Response } from 'express';
import { CreateUserService } from './services/create-user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserControllerSwaggerDecorators } from './decorators/user.swagger.decorator';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly createService: CreateUserService) {}

  @UserControllerSwaggerDecorators.CreateUser()
  @Post()
  async signupUser(
    @Body() data: CreateUserDTO,
    @Res() res: Response,
  ): Promise<Response> {
    const access_token = await this.createService.create(data);
    return res
      .status(HttpStatus.CREATED)
      .send({ message: 'User created successfully.', access_token });
  }
}
