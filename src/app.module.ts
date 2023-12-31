import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),//dependência dos comando para acessar variáveis de ambient + forRoot(da raiz)
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    ThrottlerModule.forRoot({
      ttl:50,
      limit:10,
    })
  ],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
  exports:[AppService]
})
export class AppModule {}
