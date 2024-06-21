import { Global, Module } from '@nestjs/common';
import { CreateTransactionService } from './services/create-transaction.service';
import { TransactionController } from './transaction.controller';
import { ListTransactionsService } from './services/list-transaction.service';
import { ListTransactionsByCategoryService } from './services/list-transactions-by-category.service';
import { UpdateTransactionService } from './services/update-transaction.service';

@Global()
@Module({
  providers: [
    CreateTransactionService,
    ListTransactionsService,
    ListTransactionsByCategoryService,
    UpdateTransactionService,
  ],
  controllers: [TransactionController],
})
export class TransactionModule {}
