import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
  @ApiProperty({ example: 'your_access_token' })
  access_token!: string;
}
