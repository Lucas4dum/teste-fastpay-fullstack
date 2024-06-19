import { Global, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserService } from './services/create-user.service';

@Global()
@Module({
  providers: [CreateUserService],
  controllers: [UserController],
})
export class UserModule {}
