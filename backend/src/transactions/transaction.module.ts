import { Global, Module } from '@nestjs/common';
import { CreateTransactionService } from './services/create-transaction.service';
import { TransactionController } from './transaction.controller';
import { ListTransactionsService } from './services/list-transaction.service';

@Global()
@Module({
  providers: [CreateTransactionService, ListTransactionsService],
  controllers: [TransactionController],
})
export class TransactionModule {}
