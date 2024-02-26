import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import { decrypt, encrypt, encryptPassword } from 'src/shared/utils/encryptTool';
import { ReadEnvService } from 'src/shared/configs/read.env.service';
import { EnvKeys } from 'src/shared/configs/env.keys';
import { LoginDto } from './dto/login.dto';
import { UserDto } from '../users/dto/user.dto';
import { TokenDto } from './dto/token.dto';
import { extractTokenFromHeader } from 'src/shared/utils/functions';
import { EmailService } from 'src/shared/email/email.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        protected readonly userService: UsersService,
        protected readonly readEnvService: ReadEnvService,
        protected readonly emailService: EmailService
    ){}

    async register(registerDto: RegisterDto): Promise<UserDto> {
        try {
            const isExistsUser = await this.userService.getByIds({ email: registerDto.email });
            if (isExistsUser) {
                throw new Error(`El usuario ${registerDto.email} ya se encuentra registrado en el sistema.`);
            };

            registerDto.password = encryptPassword(registerDto.password, this.readEnvService.getEnv(EnvKeys.secretStringEncrypt));
            const userCreated = await this.userService.create(registerDto);
            await this.emailService.sendEmail(registerDto.email, "Registro exitoso")
            return userCreated;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async login(loginDto: LoginDto): Promise<TokenDto> {
        try {
            const isExistsUser = await this.userService.getByIds({ email: loginDto.email });
            if (!isExistsUser) {
                throw new Error(`El email del usuario no existe en el sistema`);
            };

            if (isExistsUser.deletedAt) {
                throw new Error(`El usuario no puede acceder al sistema`);
            }

            loginDto.password = encryptPassword(loginDto.password, this.readEnvService.getEnv(EnvKeys.secretStringEncrypt));
            if (loginDto.password != isExistsUser.password) {
                throw new Error(`La contraseña del usuario no es correcta.`);
            };

            const token = await this.jwtService.signAsync(
                {
                    subToken: await encrypt(
                        { userCode: isExistsUser.userCode }, 
                        this.readEnvService.getEnv(EnvKeys.secretStringEncrypt)
                    )
                }
            );
            return { token };
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async logout(tokenDto: TokenDto): Promise<TokenDto> {
        try {
            await this.jwtService.verifyAsync(tokenDto.token);
            const corruptToken = await this.jwtService.signAsync({ "token": "token roto automaticamente." })
            return { token: corruptToken }
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async refresh(request: Request): Promise<TokenDto>{
        try {
            const getUserValid = await this.validateToken(request);

            const token = await this.jwtService.signAsync(
                {
                    subToken: await encrypt(
                        { userCode: getUserValid.userCode }, 
                        this.readEnvService.getEnv(EnvKeys.secretStringEncrypt)
                    )
                }
            );
            return { token }
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async validateToken (request: Request): Promise<UserDto> {
        try {
            const isExistsToken = await extractTokenFromHeader(request);
            if (!isExistsToken) {
                throw new Error("El token es requerido");
            }

            const verifyToken = await this.jwtService.decode(isExistsToken)
            if (!verifyToken?.subToken) {
                throw new Error("El token no es valido en la plataforma")
            }

            const decryptSubToken = await decrypt(verifyToken.subToken, this.readEnvService.getEnv(EnvKeys.secretStringEncrypt));
            if (!decryptSubToken.userCode) {
                throw new Error("El token esta corrupto para la plataforma")
            }

            const getUser = await this.userService.getByIds({ userCode: decryptSubToken.userCode });
            if (!getUser) {
                throw new Error("El usuario del token no existe en la plataforma")
            }

            if (getUser.deletedAt) {
                throw new Error(`El usuario no puede acceder al sistema`);
            }

            return getUser;
        } catch (error) {
            throw error;
        }
    }
}
