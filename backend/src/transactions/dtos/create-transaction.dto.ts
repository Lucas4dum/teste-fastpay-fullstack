import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDateString,
  IsUUID,
} from 'class-validator';

export class CreateTransactionDTO {
  @ApiProperty({
    example: 'Grocery shopping',
    description: 'Description of the transaction',
    required: true,
  })
  @IsString({ message: "The 'description' field must be a string." })
  @IsNotEmpty({ message: "The 'description' field cannot be empty." })
  description!: string;

  @ApiProperty({
    example: 100.0,
    description: 'Amount of the transaction',
    required: true,
  })
  @IsNumber({}, { message: "The 'amount' field must be a number." })
  @IsNotEmpty({ message: "The 'amount' field cannot be empty." })
  amount!: number;

  @ApiProperty({
    example: '2023-06-18',
    description: 'Date of the transaction in YYYY-MM-DD format',
    required: true,
  })
  @IsDateString(
    {},
    {
      message: "The 'date' field must be a valid date in YYYY-MM-DD format.",
    },
  )
  @IsNotEmpty({ message: "The 'date' field cannot be empty." })
  date!: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'UUID of the category the transaction belongs to',
    required: true,
  })
  @IsUUID('4', { message: "The 'categoryId' field must be a valid UUID." })
  @IsNotEmpty({ message: "The 'categoryId' field cannot be empty." })
  categoryId!: string;

  userId!: string;
}
