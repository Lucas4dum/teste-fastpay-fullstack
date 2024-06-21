import { IsNotEmpty, IsUUID } from 'class-validator';

export class ListTransactionsByCategoryDTO {
  @IsUUID('4', { message: "The 'categoryId' field must be a valid UUID." })
  @IsNotEmpty({ message: "The 'categoryId' field cannot be empty." })
  categoryId!: string;

  userId?: string;
}
