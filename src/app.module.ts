import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'

@Module({
    imports: [
        AuthModule,
        UsersModule,
        ConfigModule.forRoot(),
        MongooseModule.forRoot(
            `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/${process.env.DB_NAME}`,
        ),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
