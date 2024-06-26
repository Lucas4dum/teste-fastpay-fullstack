import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

export class TransactionSwaggerDecorators {
  static ListTransactionsByCategory() {
    return applyDecorators(
      ApiOperation({
        summary: 'Listar transações por categoria',
        description:
          'Rota utilizada para listar transações por categoria.<br/><br/><b>CAMPOS NECESSÁRIOS</b>\n\n*name: string\n\n<b>CAMPOS OPCIONAIS</b>\n\npage: string - "É uma string, mas passe apenas números inteiros"\n\nsize: string - "É uma string, mas passe apenas números inteiros"\n\n',
      }),
      ApiBearerAuth(), // Indica que a autenticação via Bearer Token
      ApiParam({
        name: 'name',
        type: String,
        required: true,
        description: 'Nome de uma categoria',
        example: 'Comida',
      }),
      ApiQuery({
        name: 'page',
        type: String,
        required: false,
        description: 'Página em qual quer que retorne',
        example: '1',
      }),
      ApiQuery({
        name: 'size',
        type: String,
        required: false,
        description: 'Nome de uma categoria',
        example: '7',
      }),
      ApiResponse({
        status: 200,
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
                categoryName: 'teste2',
                userId: '550e8400-e29b-41d4-a716-446655440000',
                createdAt: '2023-06-18T00:00:00Z',
                updatedAt: '2023-06-18T00:00:00Z',
              },
            ],
            income: 100,
            expenses: 0,
            total: 100,
            currentPage: 1,
            totalPages: 1,
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
        description:
          'Rota utilizada para listar transações.\n\n<b>CAMPOS OPCIONAIS</b>\n\npage: string - "É uma string, mas passe apenas números inteiros"\n\nsize: string - "É uma string, mas passe apenas números inteiros"\n\n',
      }),
      ApiBearerAuth(), // Indica que a autenticação via Bearer Token
      ApiQuery({
        name: 'page',
        type: String,
        required: false,
        description: 'Página em qual quer que retorne',
        example: '1',
      }),
      ApiQuery({
        name: 'size',
        type: String,
        required: false,
        description: 'Nome de uma categoria',
        example: '7',
      }),
      ApiResponse({
        status: 200,
        schema: {
          type: 'array',
          example: {
            transactions: [
              {
                id: '550e8400-e29b-41d4-a716-446655440000',
                description: 'Grocery shopping',
                amount: 100.0,
                date: '2023-06-18',
                categoryId: 'b44bf09f-4111-4672-88b3-9da349168f3d',
                categoryName: 'teste2',
                userId: '550e8400-e29b-41d4-a716-446655440000',
                createdAt: '2023-06-18T00:00:00Z',
                updatedAt: '2023-06-18T00:00:00Z',
              },
            ],
            income: 100,
            expenses: 0,
            total: 100,
            currentPage: 1,
            totalPages: 2,
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
          'Rota utilizada para criar transação.<br/><br/><b>CAMPOS NECESSÁRIOS</b>\n\n*description: string\n\n*amount: number\n\n*date: string - **"Data da transação no formato AAAA-MM-DD."**\n\n*categoryId: string\n\n',
      }),
      ApiBearerAuth(),
      ApiBody({
        schema: {
          type: 'object',
          properties: {
            description: {
              type: 'string',
              example: 'Grocery shopping',
            },
            amount: {
              type: 'number',
              example: 100.0,
            },
            date: {
              type: 'string',
              example: '2023-06-18',
              description: 'Data da transação no formato AAAA-MM-DD',
            },
            categoryId: {
              type: 'string',
              example: '550e8400-e29b-41d4-a716-446655440000',
              description: 'UUID da categoria à qual a transação pertence',
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
          'Rota utilizada para atualizar uma transação.<br/><br/><b>CAMPOS NECESSÁRIOS</b>\n\n*id: string\n\n<b>CAMPOS OPCIONAIS</b>\n\ndescription: string\n\namount: number\n\ndate: string - **"Data da transação no formato AAAA-MM-DD"**\n\ncategoryId: string\n\n',
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
            },
            amount: {
              type: 'number',
              example: 100.0,
            },
            date: {
              type: 'string',
              example: '2023-06-18',
              description: 'Data da transação no formato AAAA-MM-DD',
            },
            categoryId: {
              type: 'string',
              example: '550e8400-e29b-41d4-a716-446655440000',
              description: 'UUID da categoria à qual a transação pertence',
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
