import { Injectable } from '@nestjs/common'
import { Process } from './interfaces/process.interface'
import axios from 'axios'
import { Host } from './interfaces/host.interface'
import { HostStatistics } from './interfaces/host-statistics.interface'

@Injectable()
export class AppService {
    private hosts: Host[] = [
        {
            name: 'Server1',
            url: 'http://localhost:3030',
        },
    ]

    private parseProcess(data): Process {
        return {
            name: data.name,
            id: data.pm2_env.pm_id,
            pid: data.pid,
        }
    }

    async getAllProcesses(): Promise<Process[]> {
        const processes = []

        for (const host of this.hosts) {
            const response = await axios.get(host.url)

            const data = response.data as Process[]

            for (const process of data) {
                processes.push(this.parseProcess(process))
            }
        }

        return processes
    }

    async getProcesses(name: string): Promise<Process[]> {
        const processes = []

        const host = this.hosts.find((host) => host.name === name)

        if (host) {
            const response = await axios.get(host.url)

            const data = response.data as Process[]

            for (const process of data) {
                processes.push(this.parseProcess(process))
            }
        }

        return processes
    }

    getHosts(): Host[] {
        return this.hosts
    }

    async getStats(name: string): Promise<HostStatistics> {
        const host = this.hosts.find((host) => host.name === name)

        const response = await axios.get(`${host.url}/stats`)
        return response.data as HostStatistics
    }
}
