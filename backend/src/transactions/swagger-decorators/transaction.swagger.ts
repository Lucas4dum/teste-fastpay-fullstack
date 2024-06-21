import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

export class TransactionSwaggerDecorators {
  static ListTransactions() {
    return applyDecorators(
      ApiOperation({
        summary: 'Listar transações.',
        description: 'Rota utilizada para listar transações.\n\n',
      }),
      ApiBearerAuth(), // Indica que a autenticação via Bearer Token
      ApiResponse({
        status: 200,
        description: 'List of transactions',
        schema: {
          type: 'array',
          example: {
            transactions: [
              {
                id: '550e8400-e29b-41d4-a716-446655440000',
                description: 'Grocery shopping',
                amount: 100.0,
                date: '2023-06-18',
                categoryId: '550e8400-e29b-41d4-a716-446655440000',
                userId: '550e8400-e29b-41d4-a716-446655440000',
                createdAt: '2023-06-18T00:00:00Z',
                updatedAt: '2023-06-18T00:00:00Z',
              },
            ],
          },
        },
      }),
      ApiResponse({ status: 401, description: 'Unauthorized.' }),
    );
  }

  static CreateTransaction() {
    return applyDecorators(
      ApiOperation({
        summary: 'Cadastrar transação.',
        description:
          'Rota utilizada para criar transação.<br/><br/><b>CAMPOS NECESSÁRIOS</b>\n\n*description: string\n\n*amount: number\n\n*date: string - **"adendo o formato deve ser ISO-8601"**\n\n*categoryId: string\n\n',
      }),
      ApiBearerAuth(),
      ApiResponse({
        status: 201,
        description: 'Transaction created successfully.',
      }),
      ApiResponse({ status: 400, description: 'Error creating transaction!.' }),
      ApiResponse({ status: 401, description: 'Unauthorized.' }),
      ApiResponse({
        status: 409,
        description: 'The specified category does not exist!',
      }),
    );
  }
}
