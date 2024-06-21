import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  UseGuards,
  Get,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { Response } from 'express';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { UserPayload } from 'src/auth/strategies/jwt.strategy';
import { CreateCategoryService } from './services/create-category.service';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { CategoryControllerSwaggerDecorators } from './swagger-decorators/category.swagger';
import { ListCategoriesService } from './services/list-categories.service';

@Controller('category')
@UseGuards(JwtAuthGuard)
@ApiTags('Category')
export class CategoryController {
  constructor(
    private readonly createService: CreateCategoryService,
    private readonly listCategoriesService: ListCategoriesService,
  ) {}

  @CategoryControllerSwaggerDecorators.CreateCategory()
  @Post()
  async create(
    @CurrentUser() user: UserPayload,
    @Body()
    data: CreateCategoryDTO,
    @Res() res: Response,
  ): Promise<Response> {
    const userId: string = user.sub as string;

    await this.createService.create({ ...data, userId });

    return res
      .status(HttpStatus.CREATED)
      .json('Category created successfully.');
  }

  @CategoryControllerSwaggerDecorators.ListCategories()
  @Get()
  async list(
    @CurrentUser() user: UserPayload,
    @Res() res: Response,
  ): Promise<Response> {
    const userId: string = user.sub as string;

    const categories = await this.listCategoriesService.list(userId);

    return res.status(HttpStatus.OK).send({ categories });
  }
}
