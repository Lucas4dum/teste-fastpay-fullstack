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
  Query,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { Response } from 'express';

import { CreateTransactionDTO } from './dtos/create-transaction.dto';
import { CreateTransactionService } from './services/create-transaction.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserPayload } from 'src/auth/strategies/jwt.strategy';
import { ListTransactionsService } from './services/list-transaction.service';
import { TransactionSwaggerDecorators } from './decorators/transaction.swagger.decorator';
import { ListTransactionsByCategoryService } from './services/list-transactions-by-category.service';
import { UpdateTransactionService } from './services/update-transaction.service';
import { UpdateTransactionDTO } from './dtos/update-transaction.dto';
import { DeleteTransactionService } from './services/delete-transaction.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { ListTransactionsDTO } from './dtos/list-transactions.dto.service';

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
    await this.createService.create({ ...data, userId: user.id });

    return res.status(HttpStatus.CREATED).json();
  }

  @TransactionSwaggerDecorators.ListTransactions()
  @Get()
  async list(
    @Query() data: ListTransactionsDTO,
    @CurrentUser() user: UserPayload,
    @Res() res: Response,
  ): Promise<Response> {
    const pageNumber = parseInt(data.page || '1', 10);
    const pageSize = parseInt(data.size || '7', 10);

    const transactionsData = await this.listTransactionsService.list({
      userId: user.id,
      pageNumber,
      pageSize,
    });

    return res.status(HttpStatus.OK).send({
      ...transactionsData,
    });
  }

  @TransactionSwaggerDecorators.ListTransactionsByCategory()
  @Get('by-category/:name')
  async listByCategory(
    @CurrentUser() user: UserPayload,
    @Param('name') name: string,
    @Query() data: ListTransactionsDTO,
    @Res() res: Response,
  ): Promise<Response> {
    const pageSize = parseInt(data.size || '7', 10);
    const pageNumber = parseInt(data.page || '1', 10);

    const transactionsData = await this.listTransactionsByCategoryService.list({
      userId: user.id,
      name,
      pageNumber,
      pageSize,
    });

    return res.status(HttpStatus.OK).send({ ...transactionsData });
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

    return res.status(HttpStatus.OK).json();
  }

  @TransactionSwaggerDecorators.DeleteTransaction()
  @Delete('/:id')
  async delete(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    await this.deleteTransactionService.delete(id);

    return res.status(HttpStatus.OK).json();
  }
}
