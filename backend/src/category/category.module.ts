import { Global, Module } from '@nestjs/common';
import { CreateCategoryService } from './services/create-category.service';
import { CategoryController } from './category.controller';
import { ListCategoriesService } from './services/list-categories.service';
import { UpdateCategoryService } from './services/update-category.service';
import { DeleteCategoryService } from './services/delete-category.service';
import { ListSummaryOfTransactionsByCategoryService } from './services/list-summary-of-transactions-by-category.service';

@Global()
@Module({
  providers: [
    CreateCategoryService,
    ListCategoriesService,
    UpdateCategoryService,
    DeleteCategoryService,
    ListSummaryOfTransactionsByCategoryService,
  ],
  controllers: [CategoryController],
})
export class CategoryModule {}
