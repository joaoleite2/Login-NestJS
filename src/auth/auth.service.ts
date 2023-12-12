import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService{

    private issuer = 'login';
    private audience = 'users';

    constructor(
        private readonly jwtService:JwtService, 
        private readonly prisma:PrismaService,
        private readonly userService:UserService
    ){}

        createToken(user:User){//criar token
            return{
                acessToken:this.jwtService.sign({//conteúdo que vai dentro do token
                    id:user.id,
                    email:user.email,
                    bio:user.bio,
                    name:user.name
                    //campos que eu quero que permaneça no payload
                },{
                    //coisas que eu desejo verificar no payload
                    expiresIn:'5 days',//quando expira
                    subject: String(user.id),//conteúdo do token
                    issuer: this.issuer,//objetivo desse token
                    audience:this.audience,//público desse token gerado
                    //notBefore: usado para fazer com que o token seja liberado depois
                })
            }
        }
        checkToken(token: string){//checar token

        try{
            const data = this.jwtService.verify(token,{
                audience: this.audience,
                issuer: this.issuer,
            })
            return data;
        } catch (e){
            throw new BadRequestException(e)
        }
        }

        isValidToken(token:string){
            try{
                this.checkToken(token);
                return true;
            } catch(e){
                return false;
            }
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