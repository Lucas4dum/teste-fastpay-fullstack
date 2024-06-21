import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDateString,
  IsUUID,
} from 'class-validator';

export class CreateTransactionDTO {
  @IsString({ message: "The 'description' field must be a string." })
  @IsNotEmpty({ message: "The 'description' field cannot be empty." })
  description!: string;

  @IsNumber({}, { message: "The 'amount' field must be a number." })
  @IsNotEmpty({ message: "The 'amount' field cannot be empty." })
  amount!: number;

  @IsDateString(
    {},
    {
      message: "The 'date' field must be a valid date in YYYY-MM-DD format.",
    },
  )
  @IsNotEmpty({ message: "The 'date' field cannot be empty." })
  date!: string;

  @IsUUID('4', { message: "The 'categoryId' field must be a valid UUID." })
  @IsNotEmpty({ message: "The 'categoryId' field cannot be empty." })
  categoryId!: string;

  userId!: string;
}
