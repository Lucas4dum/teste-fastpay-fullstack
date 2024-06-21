import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  UseGuards,
  Get,
  Put,
  Param,
  Delete,
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
import { UpdateCategoryService } from './services/update-category.service';
import { DeleteCategoryService } from './services/delete-category.service';

@Controller('category')
@UseGuards(JwtAuthGuard)
@ApiTags('Category')
export class CategoryController {
  constructor(
    private readonly createService: CreateCategoryService,
    private readonly listCategoriesService: ListCategoriesService,
    private readonly updateCategoryService: UpdateCategoryService,
    private readonly deleteCategoryService: DeleteCategoryService,
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

  @CategoryControllerSwaggerDecorators.UpdateCategory()
  @Put('/:id')
  async update(
    @Body() data: { name: string },
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    await this.updateCategoryService.update({ id, name: data.name });

    return res.status(HttpStatus.OK).json('Category updated successfully.');
  }

  @CategoryControllerSwaggerDecorators.DeleteCategory()
  @Delete('/:id')
  async delete(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    await this.deleteCategoryService.delete(id);

    return res.status(HttpStatus.OK).json('Transaction deleted successfully.');
  }
}
