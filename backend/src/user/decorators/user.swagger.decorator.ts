import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

export class UserControllerSwaggerDecorators {
  static CreateUser() {
    return applyDecorators(
      ApiOperation({
        summary: 'Cadastrar usuário.',
        description:
          'Rota utilizada para criar usuários.<br/><br/><b>CAMPOS NECESSÁRIOS</b>\n\nemail: string\n\npassword: string\n\n',
      }),
      ApiBody({
        schema: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              example: 'lucasadum@gmail.com',
              description: 'field pattern example@example.com',
            },
            password: {
              type: 'string',
              example: '1Ma345',
              description: 'User password',
            },
          },
          required: ['email', 'password'],
        },
      }),
      ApiResponse({
        status: 201,
        schema: {
          type: 'object',
          example: {
            access_token:
              'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0NWNhYjFjNy03Mjk0LTQ3ZTAtYjZhMi1hMjEyMGE0MzY0YjkiLCJpYXQiOjE3MTkyNzQ1NjZ9.FZYkH-kl3A_jJJ2ycCD1B79wTR7Vk3UsuAY_w6RUzlcIK8yCzCXS8dzELnmT7X3SfGTjdJcUEl6GSnRPDIssIDC5P2ejjEgkQHbikovTg0upnG8ORJ_m4JqF-z_TIcxKRUMDtXgqvbAN7Bn8fOlcfHYlUxeFem4KyVX9XUImENuSpUAZStQszkz2EaEx0CVSsVskKO6ULuOh-KBm5O3_1ra-zN0fHx2r9XYT_Wo14vhRolIoSb2XEG4WBFPWxDwkRKhMjf7lP7cQ1nCxKiPEk5jXtS4vcDftaS5uDkq0X0MmRn-X6YsW0RPZM9_mGJk0jjObdhnd89KRsU5L5e0m2A',
            message: 'User created successfully.',
          },
        },
      }),
      ApiResponse({ status: 400, description: 'Error creating user!.' }),
      ApiResponse({
        status: 409,
        description: 'This email has already been registered!!',
      }),
    );
  }
}
