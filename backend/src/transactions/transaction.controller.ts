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
import { ListTransactionsByCategoryDTO } from './dtos/list-transactions-by-category.dto';
import { ListTransactionsByCategoryService } from './services/list-transactions-by-category.service';
import { UpdateTransactionService } from './services/update-transaction.service';
import { UpdateTransactionDTO } from './dtos/update-transaction.dto';

@Controller('transaction')
@UseGuards(JwtAuthGuard)
@ApiTags('Transaction')
export class TransactionController {
  constructor(
    private readonly createService: CreateTransactionService,
    private readonly listTransactionsService: ListTransactionsService,
    private readonly listTransactionsByCategoryService: ListTransactionsByCategoryService,
    private readonly updateTransactionService: UpdateTransactionService,
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

  @TransactionSwaggerDecorators.ListTransactionsByCategory()
  @Get('by-category/:categoryId')
  async listByCategory(
    @CurrentUser() user: UserPayload,
    @Param('categoryId') categoryId: string,
    @Res() res: Response,
  ): Promise<Response> {
    const userId: string = user.sub as string;
    const transactions = await this.listTransactionsByCategoryService.list({
      userId,
      categoryId,
    });

    return res.status(HttpStatus.OK).send({ transactions });
  }

  @TransactionSwaggerDecorators.UpdateTransaction()
  @Put('/:id')
  async update(
    @CurrentUser() user: UserPayload,
    @Body() data: UpdateTransactionDTO,
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const userId: string = user.sub as string;
    console.log('teste\n', id);
    data = { ...data, userId, id };

    await this.updateTransactionService.update(data);

    return res.status(HttpStatus.OK).json('Transaction updated successfully.');
  }
}
