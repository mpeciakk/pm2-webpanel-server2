import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Host, HostSchema } from './host.schema'
import { HostsController } from './hosts.controller'
import { HostsService } from './hosts.service'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Host.name, schema: HostSchema }]),
    ],
    providers: [HostsService],
    controllers: [HostsController],
})
export class HostsModule {}
