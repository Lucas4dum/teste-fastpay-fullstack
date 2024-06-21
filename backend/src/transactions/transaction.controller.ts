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

import { CreateTransactionDTO } from './dtos/create-transaction.dto';
import { CreateTransactionService } from './services/create-transaction.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { UserPayload } from 'src/auth/strategies/jwt.strategy';
import { ListTransactionsService } from './services/list-transaction.service';
import { TransactionSwaggerDecorators } from './swagger-decorators/transaction.swagger';

@Controller('transaction')
@UseGuards(JwtAuthGuard)
@ApiTags('Transaction')
export class TransactionController {
  constructor(
    private readonly createService: CreateTransactionService,
    private readonly listTransactionsService: ListTransactionsService,
  ) {}
  @TransactionSwaggerDecorators.CreateTransaction()
  @Post()
  async create(
    @CurrentUser() user: UserPayload,
    @Body()
    data: CreateTransactionDTO,
    @Res() res: Response,
  ): Promise<Response> {
    const userId: string = user.sub as string;

    data = { ...data, userId };

    await this.createService.create(data);

    return res
      .status(HttpStatus.CREATED)
      .json('Transaction created successfully.');
  }

  @TransactionSwaggerDecorators.ListTransactions()
  @Get()
  async list(
    @CurrentUser() user: UserPayload,
    @Res() res: Response,
  ): Promise<Response> {
    const userId: string = user.sub as string;

    const transactions = await this.listTransactionsService.list(userId);

    return res.status(HttpStatus.OK).send({ transactions });
  }
}
