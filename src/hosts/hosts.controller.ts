import { Controller, Get, Param } from '@nestjs/common'
import { HostStatistics } from 'src/interfaces/host-statistics.interface'
import { Host } from 'src/interfaces/host.interface'
import { Process } from 'src/interfaces/process.interface'
import { HostsService } from './hosts.service'

@Controller('hosts')
export class HostsController {
    constructor(private hostsService: HostsService) {}

    @Get('/list')
    async getAllProcesses(): Promise<Process[]> {
        return await this.hostsService.getAllProcesses()
    }

    @Get('/list/:name')
    async getProcess(@Param('name') name: string): Promise<Process[]> {
        return await this.hostsService.getProcess(name)
    }

    @Get('/hosts')
    getHosts(): Host[] {
        return this.hostsService.getHosts()
    }

    @Get('/stats/:name')
    getStats(@Param('name') name: string): Promise<HostStatistics> {
        return this.hostsService.getStats(name)
    }
}
