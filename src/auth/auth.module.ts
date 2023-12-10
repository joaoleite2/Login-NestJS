import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports:[JwtModule.register({
        secret:")=|&W{.4?OI&-Kp+ZN_N4pyIxN%(ETwJ7V"
    })],

})
export class AuthModule{}