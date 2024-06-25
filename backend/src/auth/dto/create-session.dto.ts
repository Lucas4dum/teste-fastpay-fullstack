import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateSessionDTO {
  @ApiProperty({
    required: true,
  })
  @IsEmail({}, { message: "The 'email' field must be in email format." })
  @IsNotEmpty({ message: "The 'email' field cannot be empty." })
  email!: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty({ message: "The 'password' field cannot be empty." })
  password!: string;
}
