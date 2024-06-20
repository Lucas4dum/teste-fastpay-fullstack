import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateSessionDTO {
  @ApiProperty({
    example: 'lucasadum@gmail.com',
    description: 'User email address',
    required: true,
  })
  @IsEmail({}, { message: "The 'email' field must be in email format." })
  @IsNotEmpty({ message: "The 'email' field cannot be empty." })
  email!: string;

  @ApiProperty({
    example: '1Ma345',
    description: 'User password',
    required: true,
  })
  @IsNotEmpty({ message: "The 'password' field cannot be empty." })
  password!: string;
}
