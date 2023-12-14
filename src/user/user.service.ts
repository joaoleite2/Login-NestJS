import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService{

    constructor(private readonly prisma:PrismaService){}//toda vez que necessito de outro serviço devo chamar pelo constructor

    async create(data:CreateUserDTO){

        await this.existsEmail(data.email);

        const salt = await bcrypt.genSalt();

        data.password = await bcrypt.hash(data.password, salt);
        
        return this.prisma.user.create({
            data,
    //poderia também fazer desta forma:
    // async create(data:CreateUserDTO){
    //     return this.prisma.user.create({
    //         data;
    //     }};
    /*select:{
        id:true,
        name:true,    isso aquie é o jeito de dar um select depois que criar
    }*/
        });
    }
    async list(){
        return this.prisma.user.findMany({})
    }
    async show(id:number){
        await this.exists(id);
        return this.prisma.user.findUnique({
            where:{
                id
            }
        })
    }
    async update(id:number, {email,name,password,bio,role}:UpdatePutUserDTO){
        await this.exists(id);

        const salt = await bcrypt.genSalt();

        password = await bcrypt.hash(password, salt);
        

        if(bio===undefined){
            bio='';
        }
        return this.prisma.user.update({
            data:{email,name,password,bio,role},
            where:{
                id
            }
        })
    }
    async updatePartial(id:number,data:UpdatePatchUserDTO){
        await this.exists(id);

        if(data.password){
            const salt = await bcrypt.genSalt();

            data.password = await bcrypt.hash(data.password, salt);    
        }
        
        return this.prisma.user.update({
            data,
            where:{
                id
            }
        })
    }
    async delete(id:number){
        await this.exists(id);

        return this.prisma.user.delete({
            where:{
                id
            }
        })
    }

    async exists (id:number){
        //isso aqui é uma exceção para caso o usuário não exista
        if(!(await this.prisma.user.count({//count retorna se existe algum id daquele, ou não
            where:{
                id
            }
        }))){
            //Reporta a exceção
            throw new NotFoundException(`O usuário ${id} não existe.`)
        }
    }

    async existsEmail (email:string){
        if((await this.prisma.user.count({
            where:{
                email
            }
        }))){
            throw new BadRequestException(`Email já cadastrado`)
        }
    }
}