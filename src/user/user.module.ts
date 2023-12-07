import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";

@Module({
    imports:[],//módulos que eu quero importar
    controllers:[UserController],//o que trata as reqs
    providers:[],//quais são as classes que vão prover um serviço que podem ser injetadas
    exports:[],//recursos que eu posso exportar para outro possível módulo
})


//Module é uma classe js que se exporta
export class UserModule{} //É o mesmo nome do arquivo module porém em PascalCase
//A classe é vazia, que é responsável por colocar conteúdo é o @Module