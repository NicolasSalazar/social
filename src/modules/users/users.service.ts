import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { AbstractService } from 'src/shared/utils/Abstract.service';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { encryptPassword } from 'src/shared/utils/encryptTool';
import { ReadEnvService } from 'src/shared/configs/read.env.service';
import { EnvKeys } from 'src/shared/configs/env.keys';

@Injectable()
export class UsersService extends AbstractService<UserDto>{
  constructor(
    protected readonly prismaService: PrismaService,
    private readonly readEnvService: ReadEnvService
  ) {
    const prismaServiceImplements = prismaService;
    const module = 'users';
    super(prismaServiceImplements, module);
  }

  async updateUser(userCode: number,updateUserDto: UpdateUserDto){
    try {
      const getUser = await this.getByIds({userCode});
      if (!getUser) {
        throw new Error("No se a podido encontrar el usuario.");
      }

      if (updateUserDto.password) {

        if (updateUserDto.password != getUser.password) {

          const getEncryptPassword = encryptPassword(updateUserDto.password, this.readEnvService.getEnv(EnvKeys.secretStringEncrypt) );
          if (getEncryptPassword != getUser.password) {

            updateUserDto.password = getEncryptPassword;

          } else {
            delete updateUserDto.password;
          }
        } else {
          delete updateUserDto.password;
        }
      }

      updateUserDto.updatedAt = new Date();
      
      return this.update({userCode}, updateUserDto);
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
