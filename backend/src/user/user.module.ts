import { Global, Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

@Global()
@Module({
    providers: [UserService],
    controllers: [UserController]
})
export class UserModule{}