import { Body, Controller, Get, Post, Put, Patch, Delete, UseInterceptors } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UserService } from "./user.service";
import { LogInterceptor } from "src/interceptors/log.inteceptor";
import { ParamId } from "src/decorators/param-id.decorator";

@UseInterceptors(LogInterceptor)
@Controller('users')//defino a rota aqui

//clase que vai ser exportada
export class UserController {

    constructor(private readonly userService:UserService){}

    @Post()
    async create(@Body() data : CreateUserDTO) {//@Body está recuperando o corpo do request e o body é o que vai ser decorado
        return this.userService.create(data)
    }
    @Get()
    async list(){
        return this.userService.list();//retorne this.oServiço.métodOlist
        //retornando a lista de usuários
    }
    @Get(':id')
    async show(@ParamId() id:number){
        console.log({id})
        return this.userService.show(id)
        //retornando objeto user com o identificador no parâmetro
    }
    @Put(':id')
    async update(@Body()data:UpdatePutUserDTO, @ParamId() id:number){
        return this.userService.update(id,data)
    }
    @Patch(':id')
        async updatePartial(@Body()data:UpdatePatchUserDTO, @ParamId() id:number){
            return this.userService.updatePartial(id,data)
        }
    @Delete(':id')
        async delete(@ParamId() id:number){
            return this.userService.delete(id);
        }
}