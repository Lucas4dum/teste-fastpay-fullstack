import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class CreateDtoUser{
    @ApiProperty({example: "lucasadum@gmail.com", description: "padrão do campo example@example.com", required: true})
    @IsEmail({}, {message: "O campo 'email' deve ser no formato de email."})
    @IsNotEmpty({message: "O campo 'email' não pode estar vazio."})
    email: string;

    @ApiProperty({example: "12345", description: "", required: true})
    @IsStrongPassword({minLength: 6, minUppercase: 1, minNumbers: 1, minLowercase: 1, minSymbols: 0}, {message: "A senha deve conter no minímo 6 caracteres, sendo eles: 1 letra minúscula, 1 número e 1 letra maiúscula."})
    @IsNotEmpty({message: "O campo 'password' não pode estar vazio."})
    password: string;
}