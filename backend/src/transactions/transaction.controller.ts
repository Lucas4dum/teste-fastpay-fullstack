import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Response } from 'express';

import { CreateTransactionDTO } from './dtos/create-transaction.dto';
import { CreateTransactionService } from './services/create-transaction.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { UserPayload } from 'src/auth/strategies/jwt.strategy';

@Controller('transaction')
@UseGuards(JwtAuthGuard)
@ApiTags('Transaction')
export class TransactionController {
  constructor(private readonly createService: CreateTransactionService) {}
  //configurações do swagger
  @ApiOperation({
    summary: 'Cadastrar transação.',
    description:
      'Rota utilizada para criar transação.<br/><br/><b>CAMPOS NECESSÁRIOS</b>\n\n*description: string\n\n*amount: number\n\n*date: string - **"adendo o formato deve ser ISO-8601"**\n\n*categoryId: string\n\n',
  })
  @ApiBearerAuth() // Indica que a autenticação via Bearer Token
  @ApiResponse({
    status: 201,
    description: 'Transaction created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Error creating transaction!.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 409,
    description: 'The specified category does not exist!',
  })
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
}
