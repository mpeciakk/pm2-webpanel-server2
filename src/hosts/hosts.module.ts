import { Module } from '@nestjs/common'
import { HostsController } from './hosts.controller'
import { HostsService } from './hosts.service'

@Module({
    providers: [HostsService],
    controllers: [HostsController],
})
export class HostsModule {}
