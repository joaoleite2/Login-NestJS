import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()//por isso que @decorator afeta tudo dentro dele, seu mexer na rota dele aqui
//todos os métodos ali embaixo precisam estar nesta rota.
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  setHello(): string {
    return 'POST: Hello Richard Oliveira';
  }
}
