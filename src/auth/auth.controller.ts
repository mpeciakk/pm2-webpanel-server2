import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginUserDto } from './login-user.dto'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDto: LoginUserDto) {
        const user = await this.authService.validateUser(
            loginDto.username,
            loginDto.password,
        )

        return this.authService.login(user)
    }
}
