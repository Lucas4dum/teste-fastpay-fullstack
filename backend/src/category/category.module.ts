import { Global, Module } from '@nestjs/common';
import { CreateCategoryService } from './services/create-category.service';
import { CategoryController } from './category.controller';
import { ListCategoriesService } from './services/list-categories.service';
import { UpdateCategoryService } from './services/update-category.service';

@Global()
@Module({
  providers: [
    CreateCategoryService,
    ListCategoriesService,
    UpdateCategoryService,
  ],
  controllers: [CategoryController],
})
export class CategoryModule {}
