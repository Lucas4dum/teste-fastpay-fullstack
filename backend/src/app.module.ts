import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';

import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';
import { AuthenticateModule } from './auth/auth.module';
import { TransactionModule } from './transactions/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: env => envSchema.parse(env),
      isGlobal: true,
    }),
    PrismaModule,
    UserModule,
    AuthenticateModule,
    TransactionModule,
  ],
})
export class AppModule {}
