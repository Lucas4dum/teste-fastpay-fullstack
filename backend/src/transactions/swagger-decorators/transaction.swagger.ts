import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

export class TransactionSwaggerDecorators {
  static ListTransactionsByCategory() {
    return applyDecorators(
      ApiOperation({
        summary: 'Listar transações por categoria',
        description:
          'Rota utilizada para listar transações por categoria.<br/><br/><b>CAMPOS NECESSÁRIOS</b>\n\n*categoryId: string',
      }),
      ApiBearerAuth(), // Indica que a autenticação via Bearer Token
      ApiParam({
        name: 'categoryId',
        type: String,
        required: true,
        description: 'formato UUID',
        example: 'a4a37c4b-42dc-4db8-9d6e-4d3feedfae14',
      }),
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
      ApiBody({
        schema: {
          type: 'object',
          properties: {
            description: {
              type: 'string',
              example: 'Grocery shopping',
              description: 'Description of the transaction',
            },
            amount: {
              type: 'number',
              example: 100.0,
              description: 'Amount of the transaction',
            },
            date: {
              type: 'string',
              example: '2023-06-18',
              description: 'Date of the transaction in YYYY-MM-DD format',
            },
            categoryId: {
              type: 'string',
              example: '550e8400-e29b-41d4-a716-446655440000',
              description: 'UUID of the category the transaction belongs to',
            },
          },
          required: ['description', 'amount', 'date', 'categoryId'],
        },
      }),
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

  static UpdateTransaction() {
    return applyDecorators(
      ApiOperation({
        summary: 'Atualizar transação.',
        description:
          'Rota utilizada para atualizar uma transação.<br/><br/><b>CAMPOS NECESSÁRIOS</b>\n\n*id: string\n\n<b>CAMPOS OPCIONAIS</b>\n\ndescription: string\n\namount: number\n\ndate: string - **"adendo o formato deve ser ISO-8601"**\n\ncategoryId: string\n\n',
      }),
      ApiParam({
        name: 'id',
        type: String,
        required: true,
        description: 'formato UUID',
        example: '80fb7941-8152-42c7-91ef-4ec9f5fae286',
      }),
      ApiBearerAuth(),

      ApiBody({
        schema: {
          type: 'object',
          properties: {
            description: {
              type: 'string',
              example: 'Grocery shopping',
              description: 'Description of the transaction',
            },
            amount: {
              type: 'number',
              example: 100.0,
              description: 'Amount of the transaction',
            },
            date: {
              type: 'string',
              example: '2023-06-18',
              description: 'Date of the transaction in YYYY-MM-DD format',
            },
            categoryId: {
              type: 'string',
              example: '550e8400-e29b-41d4-a716-446655440000',
              description: 'UUID of the category the transaction belongs to',
            },
          },
          required: ['description', 'amount', 'date', 'categoryId'],
        },
      }),
      ApiResponse({
        status: 201,
        description: 'Transaction updated successfully.',
      }),
      ApiResponse({ status: 400, description: 'Error updating transaction!' }),
      ApiResponse({ status: 401, description: 'Unauthorized.' }),
      ApiResponse({
        status: 409,
        description: 'The specified category does not exist!',
      }),
      ApiResponse({
        status: 410,
        description: 'The specified transaction does not exist!',
      }),
    );
  }

  static DeleteTransaction() {
    return applyDecorators(
      ApiOperation({
        summary: 'Deletar transação.',
        description:
          'Rota utilizada para deletar uma transação.<br/><br/><b>CAMPOS NECESSÁRIOS</b>\n\n*id: string\n\n',
      }),
      ApiParam({
        name: 'id',
        type: String,
        required: true,
        description: 'formato UUID',
        example: '80fb7941-8152-42c7-91ef-4ec9f5fae286',
      }),
      ApiBearerAuth(),
      ApiResponse({
        status: 201,
        description: 'Transaction deleted successfully.',
      }),
      ApiResponse({ status: 400, description: 'Error deleting transaction!' }),
      ApiResponse({ status: 401, description: 'Unauthorized.' }),
      ApiResponse({
        status: 409,
        description: 'The specified category does not exist!',
      }),
      ApiResponse({
        status: 410,
        description: 'The specified transaction does not exist!',
      }),
    );
  }
}
