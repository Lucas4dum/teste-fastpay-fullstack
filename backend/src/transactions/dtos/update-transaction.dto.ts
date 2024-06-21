import { IsNumber, IsString, IsDateString, IsUUID } from 'class-validator';

export class UpdateTransactionDTO {
  @IsString({ message: "The 'description' field must be a string." })
  description?: string;

  @IsNumber({}, { message: "The 'amount' field must be a number." })
  amount?: number;

  @IsDateString(
    {},
    {
      message: "The 'date' field must be a valid date in YYYY-MM-DD format.",
    },
  )
  date?: string;

  @IsUUID('4', { message: "The 'categoryId' field must be a valid UUID." })
  categoryId?: string;

  id!: string;

  userId!: string;
}
