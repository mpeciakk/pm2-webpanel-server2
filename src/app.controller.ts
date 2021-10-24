import { Controller, Get, Param } from '@nestjs/common'
import { HostStatistics } from './interfaces/host-statistics.interface'
import { AppService } from './app.service'
import { Host } from './interfaces/host.interface'
import { Process } from './interfaces/process.interface'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('/list')
    async getAllProcesses(): Promise<Process[]> {
        return await this.appService.getAllProcesses()
    }

    @Get('/list/:name')
    async getProcesses(@Param('name') name: string): Promise<Process[]> {
        return await this.appService.getProcesses(name)
    }

    @Get('/hosts')
    getHosts(): Host[] {
        return this.appService.getHosts()
    }

    @Get('/stats/:name')
    getStats(@Param('name') name: string): Promise<HostStatistics> {
        return this.appService.getStats(name)
    }
}
