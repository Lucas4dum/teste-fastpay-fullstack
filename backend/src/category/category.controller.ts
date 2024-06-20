import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Response } from 'express';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { UserPayload } from 'src/auth/strategies/jwt.strategy';
import { CreateCategoryService } from './services/create-transaction.service';
import { CreateCategoryDTO } from './dtos/create-category.dto';

@Controller('category')
@UseGuards(JwtAuthGuard)
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly createService: CreateCategoryService) {}
  //configurações do swagger
  @ApiOperation({
    summary: 'Cadastrar categoria.',
    description:
      'Rota utilizada para criar categoria.<br/><br/><b>CAMPOS NECESSÁRIOS</b>\n\n*name: string\n\n',
  })
  @ApiBearerAuth() // Indica que a autenticação via Bearer Token
  @ApiResponse({
    status: 201,
    description: 'Category created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Error creating category!.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 409,
    description: 'The category with that name already exists!',
  })
  @Post()
  async create(
    @CurrentUser() user: UserPayload,
    @Body()
    data: CreateCategoryDTO,
    @Res() res: Response,
  ): Promise<Response> {
    const userId: string = user.sub as string;

    data = { ...data, userId };

    await this.createService.create(data);

    return res
      .status(HttpStatus.CREATED)
      .json('Category created successfully.');
  }
}
