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
  Delete,
  BadRequestException,
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
import { ListTransactionsByCategoryService } from './services/list-transactions-by-category.service';
import { UpdateTransactionService } from './services/update-transaction.service';
import { UpdateTransactionDTO } from './dtos/update-transaction.dto';
import { DeleteTransactionService } from './services/delete-transaction.service';

@Controller('transaction')
@UseGuards(JwtAuthGuard)
@ApiTags('Transaction')
export class TransactionController {
  constructor(
    private readonly createService: CreateTransactionService,
    private readonly listTransactionsService: ListTransactionsService,
    private readonly listTransactionsByCategoryService: ListTransactionsByCategoryService,
    private readonly updateTransactionService: UpdateTransactionService,
    private readonly deleteTransactionService: DeleteTransactionService,
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

    await this.createService.create({ ...data, userId });

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
    @Body() data: UpdateTransactionDTO,
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const { description, amount, date, categoryId } = data;

    if (!(description || amount || date || categoryId)) {
      throw new BadRequestException(
        'At least one of description, amount, date, or categoryId must be provided.',
      );
    }

    await this.updateTransactionService.update({ ...data, id });

    return res.status(HttpStatus.OK).json('Transaction updated successfully.');
  }

  @TransactionSwaggerDecorators.DeleteTransaction()
  @Delete('/:id')
  async delete(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    await this.deleteTransactionService.delete(id);

    return res.status(HttpStatus.OK).json('Transaction deleted successfully.');
  }
}
