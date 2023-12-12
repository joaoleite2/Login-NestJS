import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthService } from "./auth.service";

@Module({
    imports:[JwtModule.register({
        secret:")=|&W{.4?OI&-Kp+ZN_N4pyIxN%(ETwJ7V"
    }),
    forwardRef(() => UserModule),
    PrismaModule,
    ],    
    controllers:[AuthController],
    providers:[AuthService],
    exports:[AuthService]
})
export class AuthModule{}