import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({
    example: 'lucasadum@gmail.com',
    description: 'field pattern example@example.com',
    required: true,
  })
  @IsEmail({}, { message: "The 'email' field must be in email format." })
  @IsNotEmpty({ message: "The 'email' field cannot be empty." })
  email!: string;

  @ApiProperty({ example: '1Ma345', description: '', required: true })
  @IsStrongPassword(
    {
      minLength: 6,
      minUppercase: 1,
      minNumbers: 1,
      minLowercase: 1,
      minSymbols: 0,
    },
    {
      message:
        'The password must contain at least 6 characters, namely: 1 lowercase letter, 1 number and 1 uppercase letter.',
    },
  )
  @IsNotEmpty({ message: "The 'password' field cannot be empty." })
  password!: string;
}
