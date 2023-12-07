import { Body, Controller, Get, Param, Post, Put, Patch, Delete } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";

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
    async update(@Body()body, @Param()params){
        return{
            method:'put',
            body,
            params
        }
    }
    @Patch(':id')
        async updatePartial(@Body()body, @Param() params){
            return{
                method:'patch',
                body,
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