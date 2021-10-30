import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import axios from 'axios'
import { Model } from 'mongoose'
import { HostStatistics } from './interfaces/host-statistics.interface'
import { Process } from './interfaces/process.interface'
import { Host } from './host.schema'
import { RawProcess } from './interfaces/raw-process.interface'

@Injectable()
export class HostsService {
    constructor(@InjectModel(Host.name) private hostModel: Model<Host>) {}

    private parseProcess(data: RawProcess) {
        return {
            name: data.name,
            id: data.pm2_env.pm_id,
            pid: data.pid,
        }
    }

    async getAllProcesses() {
        const processes = [] as Process[]
        const hosts = await this.getHosts()

        for (const host of hosts) {
            const response = await axios.get(host.url)

            const data = response.data as RawProcess[]

            for (const process of data) {
                processes.push(this.parseProcess(process))
            }
        }

        return processes
    }

    async getProcesses(name: string) {
        const processes = [] as Process[]

        const host = await this.getHost(name)

        if (host) {
            const response = await axios.get(host.url)

            const data = response.data as RawProcess[]

            for (const process of data) {
                processes.push(this.parseProcess(process))
            }
        }

        return processes
    }

    async getStats(name: string) {
        const host = await this.getHost(name)

        const response = await axios.get(`${host.url}/stats`)
        return response.data as HostStatistics
    }

    async getHosts() {
        return await this.hostModel.find().exec()
    }

    async getHost(name: string) {
        return await this.hostModel.findOne({ name }).exec()
    }
}
