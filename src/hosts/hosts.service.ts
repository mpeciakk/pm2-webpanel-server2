import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { HostStatistics } from 'src/interfaces/host-statistics.interface'
import { Host } from 'src/interfaces/host.interface'
import { Process } from 'src/interfaces/process.interface'

@Injectable()
export class HostsService {
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

    async getProcess(name: string): Promise<Process[]> {
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
