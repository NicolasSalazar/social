import { Controller, Get, UseGuards, Request, Put, Body, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@UseGuards(AuthGuard)
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  myProfile(@Request() request: Request): Promise<UserDto> {
    return this.usersService.getByIds(request["user"])
  }

  @Put()
  updateProfile(
    @Body() userUpdate: UpdateUserDto,
    @Request() request: Request
  ): Promise<UserDto> {
      return this.usersService.updateUser(request["user"].userCode, userUpdate);
  }

  @Delete()
  deleteProfile(
    @Request() request: Request
  ): Promise<UserDto> {
    return this.usersService.update(request["user"], { deletedAt: new Date() })
  }
}
