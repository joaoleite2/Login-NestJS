import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";

@Injectable()
export class UserService{

    constructor(private readonly prisma:PrismaService){}//toda vez que necessito de outro serviço devo chamar pelo constructor

    async create({email,name,password,bio}:CreateUserDTO){
        return this.prisma.user.create({
            data:{
                email,
                name,
                password,
                bio,
            },
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
        return this.prisma.user.findUnique({
            where:{
                id
            }
        })
    }
    async update(id:number, {email,name,password,bio}:UpdatePutUserDTO){
        if(bio===undefined){
            bio='';
        }
        return this.prisma.user.update({
            data:{email,name,password,bio},
            where:{
                id
            }
        })
    }
    async updatePartial(id:number,data:UpdatePatchUserDTO){
        console.log({data})
        return this.prisma.user.update({
            data,
            where:{
                id
            }
        })
    }
}