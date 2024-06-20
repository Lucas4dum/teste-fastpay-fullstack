import { Global, Module } from '@nestjs/common';
import { CreateTransactionService } from './services/create-transaction.service';
import { TransactionController } from './transaction.controller';

@Global()
@Module({
  providers: [CreateTransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {}
