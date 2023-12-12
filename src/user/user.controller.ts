import { Body, Controller, Get, Post, Put, Patch, Delete, UseInterceptors, UseGuards } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UserService } from "./user.service";
import { LogInterceptor } from "src/interceptors/log.inteceptor";
import { ParamId } from "src/decorators/param-id.decorator";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/role.enums";
import { RoleGuard } from "src/auth/guards/role.guard";
import { AuthGuard } from "src/auth/guards/auth.guard";

@UseGuards(AuthGuard,RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('users')//defino a rota aqui

//clase que vai ser exportada
export class UserController {

    constructor(private readonly userService:UserService){}

    @Roles(Role.Admin)
    @Post()
    async create(@Body() data : CreateUserDTO) {//@Body está recuperando o corpo do request e o body é o que vai ser decorado
        return this.userService.create(data)
    }
    
    @Roles(Role.Admin)
    @Get()
    async list(){
        return this.userService.list();//retorne this.oServiço.métodOlist
        //retornando a lista de usuários
    }

    @Roles(Role.Admin)
    @Get(':id')
    async show(@ParamId() id:number){
        console.log({id})
        return this.userService.show(id)
        //retornando objeto user com o identificador no parâmetro
    }

    @Roles(Role.Admin)
    @Put(':id')
    async update(@Body()data:UpdatePutUserDTO, @ParamId() id:number){
        return this.userService.update(id,data)
    }

    @Roles(Role.Admin)
    @Patch(':id')
        async updatePartial(@Body()data:UpdatePatchUserDTO, @ParamId() id:number){
            return this.userService.updatePartial(id,data)
        }

    @Roles(Role.Admin)
    @Delete(':id')
        async delete(@ParamId() id:number){
            return this.userService.delete(id);
        }
}