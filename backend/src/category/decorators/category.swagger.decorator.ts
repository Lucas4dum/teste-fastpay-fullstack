import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

export class CategoryControllerSwaggerDecorators {
  static ListCategories() {
    return applyDecorators(
      ApiOperation({
        summary: 'Listar categorias.',
        description: 'Rota utilizada para listar categorias.\n\n',
      }),
      ApiBearerAuth(), // Indica que a autenticação via Bearer Token
      ApiResponse({
        status: 200,
        schema: {
          type: 'array',
          example: {
            categories: [
              {
                id: '726c2d72-d630-4ee3-8476-147866157573',
                name: 'teste1',
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

  static CreateCategory() {
    return applyDecorators(
      ApiOperation({
        summary: 'Cadastrar categoria.',
        description:
          'Rota utilizada para criar categoria.<br/><br/><b>CAMPOS NECESSÁRIOS</b>\n\n*name: string - **"Nome da categoria não deve se repetir"**\n\n',
      }),
      ApiBody({
        schema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'Categoria teste',
              description: 'Descrição de uma categoria',
            },
          },
          required: ['name'],
        },
      }),
      //configurações do swagger

      ApiBearerAuth(), // Indica que a autenticação via Bearer Token
      ApiResponse({
        status: 201,
        description: 'Category created successfully.',
      }),
      ApiResponse({ status: 400, description: 'Error creating category!' }),
      ApiResponse({ status: 401, description: 'Unauthorized.' }),
      ApiResponse({
        status: 409,
        description: 'The category with that name already exists!',
      }),
    );
  }

  static UpdateCategory() {
    return applyDecorators(
      ApiOperation({
        summary: 'Atualizar categoria.',
        description:
          'Rota utilizada para atualizar uma categoria.<br/><br/><b>CAMPOS NECESSÁRIOS</b>\n\n*id: string\n\n*name: string\n\n',
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
            name: {
              type: 'string',
              example: 'Categoria teste',
              description: 'Descrição de uma categoria',
            },
          },
          required: ['name'],
        },
      }),
      ApiResponse({
        status: 201,
        description: 'Category updated successfully.',
      }),
      ApiResponse({ status: 400, description: 'Error updating category!' }),
      ApiResponse({ status: 401, description: 'Unauthorized.' }),
      ApiResponse({
        status: 409,
        description: 'The specified category does not exist!',
      }),
    );
  }

  static DeleteCategory() {
    return applyDecorators(
      ApiOperation({
        summary: 'Deletar categoria.',
        description:
          'Rota utilizada para deletar uma categoria.<br/><br/><b>CAMPOS NECESSÁRIOS</b>\n\n*id: string\n\n',
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
        description: 'Category deleted successfully.',
      }),
      ApiResponse({ status: 400, description: 'Error deleting category!' }),
      ApiResponse({ status: 401, description: 'Unauthorized.' }),
      ApiResponse({
        status: 409,
        description: 'The specified category does not exist!',
      }),
      ApiResponse({
        status: 410,
        description:
          'The specified category is associated with one or more transactions!',
      }),
    );
  }
}
