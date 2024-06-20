import { Global, Module } from '@nestjs/common';
import { CreateCategoryService } from './services/create-transaction.service';
import { CategoryController } from './category.controller';

@Global()
@Module({
  providers: [CreateCategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
