import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()                                  //quando eu quero que alguma classe tenha uma implementação(vai ser chamada quando o módulo iniciar), posso chamar aquela função
export class PrismaService extends PrismaClient implements OnModuleInit{
    
    async onModuleInit() {
        await this.$connect();//<-função para interligar com bd(método do prismaclient)

    }

    async enableShutdownHooks(app:INestApplication){
        process.on('beforeExite', async()=>{
            await app.close;
        });
    }

}