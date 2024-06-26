import { IsNotEmpty, IsString } from 'class-validator';

export class ListTransactionsByCategoryDTO {
  @IsString({ message: "The 'name' field must be a string." })
  @IsNotEmpty({ message: "The 'name' field cannot be empty." })
  name!: string;

  page?: string;

  size?: string;
}
