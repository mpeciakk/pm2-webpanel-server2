import { Controller, Post, Request } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Request() req) {
        const user = await this.authService.validateUser(
            req.query.username,
            req.query.password,
        )

        return this.authService.login(user)
    }
}
