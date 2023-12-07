import { Body, Controller, Get, Param, Post, Put, Patch, Delete } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";

@Controller('users')//defino a rota aqui

//clase que vai ser exportada
export class UserController {

    @Post()
    async create(@Body() {email,name,password} : CreateUserDTO) {//@Body está recuperando o corpo do request e o body é o que vai ser decorado
        return {email,name,password};
    }
    @Get()
    async list(){
        return{users:[]};
        //retornando a lista de usuários
    }
    @Get(':id')
    async show(@Param() params){
        return {user:{}, params}
        //retornando objeto user com o identificador no parâmetro
    }
    @Put(':id')
    async update(@Body(){email,name,password}:UpdatePutUserDTO, @Param()params){
        return{
            method:'put',
            email,name,password,
            params
        }
    }
    @Patch(':id')
        async updatePartial(@Body(){email, name, password}:UpdatePatchUserDTO, @Param() params){
            return{
                method:'patch',
                email,name,password,
                params
            }
        }
    @Delete(':id')
    async delete(@Param()params){
        return{
            params 
        }
    }

}