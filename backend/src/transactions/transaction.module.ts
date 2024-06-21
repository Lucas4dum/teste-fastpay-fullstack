import { Global, Module } from '@nestjs/common';
import { CreateTransactionService } from './services/create-transaction.service';
import { TransactionController } from './transaction.controller';
import { ListTransactionsService } from './services/list-transaction.service';
import { ListTransactionsByCategoryService } from './services/list-transactions-by-category.service';

@Global()
@Module({
  providers: [
    CreateTransactionService,
    ListTransactionsService,
    ListTransactionsByCategoryService,
  ],
  controllers: [TransactionController],
})
export class TransactionModule {}
