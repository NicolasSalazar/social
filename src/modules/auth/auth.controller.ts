import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserDto } from '../users/dto/user.dto';
import { TokenDto } from './dto/token.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('register')
    register(@Body() registerInfo: RegisterDto): Promise<UserDto>{
        return this.authService.register(registerInfo)
    }
    @Post('login')
    login(@Body() loginDto: LoginDto): Promise<TokenDto> {
        return  this.authService.login(loginDto);
    }

    @Post('logout')
    logout(@Body() tokenDto: TokenDto): Promise<TokenDto> {
        return  this.authService.logout(tokenDto);
    }

    @Get('refresh')
    refresh(@Request() request: Request): Promise<TokenDto>{
        return this.authService.refresh(request);
    }
}
