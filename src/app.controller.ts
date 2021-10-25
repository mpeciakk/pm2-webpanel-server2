import {
    Controller,
    Get,
    Param,
    Post,
    UseGuards,
    Request,
} from '@nestjs/common'
import { HostStatistics } from './interfaces/host-statistics.interface'
import { AppService } from './app.service'
import { Host } from './interfaces/host.interface'
import { Process } from './interfaces/process.interface'
import { LocalAuthGuard } from './auth/local-auth.guard'
import { AuthService } from './auth/auth.service'
import { JwtAuthGuard } from './auth/jwt-auth.guard'

@Controller()
export class AppController {
    constructor(
        private appService: AppService,
        private authService: AuthService,
    ) {}

    @Get('/list')
    async getAllProcesses(): Promise<Process[]> {
        return await this.appService.getAllProcesses()
    }

    @Get('/list/:name')
    async getProcess(@Param('name') name: string): Promise<Process[]> {
        return await this.appService.getProcess(name)
    }

    @Get('/hosts')
    getHosts(): Host[] {
        return this.appService.getHosts()
    }

    @Get('/stats/:name')
    getStats(@Param('name') name: string): Promise<HostStatistics> {
        return this.appService.getStats(name)
    }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user
    }
}
