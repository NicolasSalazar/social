import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ReadEnvService } from '../configs/read.env.service';
import { EnvKeys } from '../configs/env.keys';
import { extractTokenFromHeader } from '../utils/functions';
import { decrypt } from '../utils/encryptTool';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly readEnvService: ReadEnvService,
  ){}
  async canActivate( context: ExecutionContext): Promise<boolean>{
    try {
      const request = context.switchToHttp().getRequest();

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
      request.user = decryptSubToken;
      return true;      
    } catch (error) {
      throw new UnauthorizedException(error.message ?? '' );
    }
  }
  
}
