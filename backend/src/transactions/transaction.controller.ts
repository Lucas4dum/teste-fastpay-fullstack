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
    summary: 'Rota para cadastrar um transação.',
    description:
      'Rota utilizada para criar transação.<br/><br/><b>campos necessários</b>\n\nemail: string\n\npassword: string\n\n',
  })
  @ApiBearerAuth() // Indica que a autenticação via Bearer Token
  @ApiResponse({
    status: 201,
    description: 'Transaction created successfully.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
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

    return res.status(HttpStatus.CREATED).json();
  }
}
