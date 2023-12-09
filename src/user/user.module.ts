import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserIdCheckMiddleware } from "src/middlewares/user-id-check.middleware";

@Module({
    imports:[PrismaModule],//módulos que eu quero importar
    controllers:[UserController],//o que trata as reqs
    providers:[UserService],//quais são as classes que vão prover um serviço que podem ser injetadas
    exports:[],//recursos que eu posso exportar para outro possível módulo
})


//Module é uma classe js que se exporta
export class UserModule implements NestModule{
    configure(consumer:MiddlewareConsumer){
        consumer.apply(UserIdCheckMiddleware).forRoutes({
            path:'users/:id',//rota
            method: RequestMethod.ALL//forRoutes precisa saber qual método deve pegar, no caso está pegando de todos
        })
    }
} //É o mesmo nome do arquivo module porém em PascalCase
//A classe é vazia, que é responsável por colocar conteúdo é o @Module