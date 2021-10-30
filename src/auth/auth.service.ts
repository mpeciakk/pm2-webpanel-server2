import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { User } from '../users/user.schema'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, pass: string) {
        const user = await this.usersService.getUser(username)

        if (user && user.password === pass) {
            return user
        }

        return null
    }

    async login(user: User) {
        const payload = { username: user.username, sub: user.id }

        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
