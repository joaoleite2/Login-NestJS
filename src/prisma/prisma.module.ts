import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Module({
    providers:[PrismaService],//Declarando que o prisma faz parte deste módulo
    exports:[PrismaService],//dando acesso ao PrismaService
})
export class PrismaModule{}