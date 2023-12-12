import { IsEmail, IsEnum, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { Role } from "src/enums/role.enums";

export class CreateUserDTO{
    @IsString()
    name:string;

    @IsEmail()
    email:string;

    @IsStrongPassword({
        minLength:6,
        minUppercase:1,
        minNumbers:0,
        minLowercase:0,
        minSymbols:0,
    })
    /*
        versão na unha
        @IsString()
        @MinLength(6)
        password:string
    */
    password:string;

    @IsOptional()
    @IsString()
    bio:string;

    @IsOptional()
    @IsEnum(Role)
    role:number;
}