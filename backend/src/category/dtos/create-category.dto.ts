import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDTO {
  @ApiProperty({
    example: 'Grocery shopping',
    description: 'Description of the category',
    required: true,
  })
  @IsString({ message: "The 'name' field must be a string." })
  @IsNotEmpty({ message: "The 'name' field cannot be empty." })
  name!: string;

  userId!: string;
}
