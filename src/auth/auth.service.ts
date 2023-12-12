import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService{
    constructor(
        private readonly jwtService:JwtService, 
        private readonly prisma:PrismaService,
        private readonly userService:UserService
    ){}

        async createToken(user:User){
            return{
                acessToken:this.jwtService.sign({//conteúdo que vai dentro do token
                    id:user.id,
                    email:user.email,
                    bio:user.bio
                },{
                    expiresIn:'7 days',
                    subject: String(user.id),
                    issuer:'Login',
                    audience:'users'
                })
            }
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
            return this.createToken(user);
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
            
            const user = await this.prisma.user.update({
                where:{
                    id,
                },
                data:{
                    password
                }
            });
            return this.createToken(user);

        }

        async register(data:AuthRegisterDTO){
           const user = await this.userService.create(data)
           
           return this.createToken(user)
        }
        
}