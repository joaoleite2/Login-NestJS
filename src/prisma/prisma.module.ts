import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Module({
    providers:[PrismaService],//tudo que importar este módulo precisa ter acesso ao meu service
    exports:[PrismaService]
})
export class PrismaModule{}