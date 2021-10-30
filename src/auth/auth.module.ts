import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy'
import { AuthController } from './auth.controller'
import { UsersModule } from '../users/users.module'
import * as dotenv from 'dotenv'

// it's required, otherwise process.env.JWT_SECRET wouldn't be accessible in @Module decorator
dotenv.config()

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
        }),
        PassportModule,
        UsersModule,
    ],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
