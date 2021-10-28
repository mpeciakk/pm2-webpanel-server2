import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { HostsModule } from './hosts/hosts.module'

@Module({
    imports: [
        ConfigModule.forRoot(),
        AuthModule,
        UsersModule,
        HostsModule,
        MongooseModule.forRoot(
            `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/${process.env.DB_NAME}`,
        ),
    ],
})
export class AppModule {}
