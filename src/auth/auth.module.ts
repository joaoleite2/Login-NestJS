import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports:[JwtModule.register({
        secret:")=|&W{.4?OI&-Kp+ZN_N4pyIxN%(ETwJ7V"
    }),
    UserModule,
    PrismaModule,
    ],
    
    controllers:[AuthController],

})
export class AuthModule{}