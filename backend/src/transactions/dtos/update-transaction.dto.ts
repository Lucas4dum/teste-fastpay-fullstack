import {
  IsNumber,
  IsString,
  IsDateString,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class UpdateTransactionDTO {
  @IsOptional()
  @IsString({ message: "The 'description' field must be a string." })
  description?: string;

  @IsOptional()
  @IsNumber({}, { message: "The 'amount' field must be a number." })
  amount?: number;

  @IsOptional()
  @IsDateString(
    {},
    {
      message: "The 'date' field must be a valid date in YYYY-MM-DD format.",
    },
  )
  date?: string;

  @IsOptional()
  @IsUUID('4', { message: "The 'categoryId' field must be a valid UUID." })
  categoryId?: string;

  id!: string;
}
