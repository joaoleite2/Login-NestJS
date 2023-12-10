import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService{
    constructor(
        private readonly jwtService:JwtService, 
        private readonly prisma:PrismaService
    ){}

        async createToken(){
            //return this.jwtService.sign();
        }
        async checkToken(token: string){
            //return this.jwtService.verify()
        }

        async login(email:string,password:string){
            const user = await this.prisma.user.findFirst({
                where:{
                    password,
                    email,
                }
            });
            if(!user){
                throw new UnauthorizedException('Email e/ou senha incorretos.');
            }
            return user;
        }
        
        async forget(email:string){
            const user = await this.prisma.user.findFirst({
                where:{
                    email,
                }
            });
            if(!user){
                throw new UnauthorizedException('Email incorreto.');
            }
            //to do: enviar o email para a pessoa que deseja trocar a senha
            return true;
        }
        
        async reset(password:string,token:string){

            //to do: validar token... mudar a senha
            const id = 0;
            
            await this.prisma.user.update({
                where:{
                    id,
                },
                data:{
                    password
                }
            });
            return true;

        }
        
}