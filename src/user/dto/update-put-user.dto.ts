import { IsEmail, IsString, IsStrongPassword } from "class-validator";
import { CreateUserDTO } from "./create-user.dto";

//o extends é para pegar tudo que já tem na classe CreateUserDTO
export class UpdatePutUserDTO extends CreateUserDTO{
}