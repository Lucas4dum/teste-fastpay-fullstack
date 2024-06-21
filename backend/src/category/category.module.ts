import { Global, Module } from '@nestjs/common';
import { CreateCategoryService } from './services/create-category.service';
import { CategoryController } from './category.controller';
import { ListCategoriesService } from './services/list-categories.service';

@Global()
@Module({
  providers: [CreateCategoryService, ListCategoriesService],
  controllers: [CategoryController],
})
export class CategoryModule {}
