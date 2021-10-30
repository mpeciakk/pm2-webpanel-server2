import { Controller, Get, Param } from '@nestjs/common'
import { HostsService } from './hosts.service'

@Controller('hosts')
export class HostsController {
    constructor(private hostsService: HostsService) {}

    @Get('/list')
    async getAllProcesses() {
        return await this.hostsService.getAllProcesses()
    }

    @Get('/list/:name')
    async getProcess(@Param('name') name: string) {
        return await this.hostsService.getProcesses(name)
    }

    @Get('/hosts')
    getHosts() {
        return this.hostsService.getHosts()
    }

    @Get('/stats/:name')
    getStats(@Param('name') name: string) {
        return this.hostsService.getStats(name)
    }
}
