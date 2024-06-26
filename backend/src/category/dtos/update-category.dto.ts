import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCategoryDTO {
  @IsString({ message: "The 'name' field must be a string." })
  @IsNotEmpty({ message: "The 'name' field cannot be empty." })
  name!: string;
}
