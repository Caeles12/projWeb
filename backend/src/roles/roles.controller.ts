import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Role } from './role.entity';
import { RoleInput } from './roles.input';
import { RolesService } from './roles.service';
import { RoleUpdate } from './roles.update';
import { User } from 'src/users/user.entity';
import { UserDTO } from 'src/users/user.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private service: RolesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAll(): Promise<Role[]> {
    return await this.service.getAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('users/:name')
  async gettAllUsers(@Param() parameter): Promise<UserDTO[]> {
    const users = await this.service.getAllUsers(parameter.name);
    if (users === null) {
      throw new HttpException(
        `The role ${parameter.name} does not exists.`,
        HttpStatus.NOT_FOUND,
      );
    }
    return users;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':idUser/:idAsso')
  @ApiParam({ name: 'idUser', required: true })
  async getUser(@Param() parameter): Promise<Role> {
    const role = await this.service.get(
      Number(parameter.idUser),
      Number(parameter.idAsso),
    );
    if (role === null) {
      throw new HttpException(
        `Could not find a role for user ${parameter.idUser} in the assocation ${parameter.idAsso}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return role;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':idUser/:idAsso')
  @ApiParam({ name: 'id', required: true })
  async setUser(@Body() input: RoleUpdate, @Param() parameter): Promise<Role> {
    if (
      (await this.service.get(
        Number(parameter.idUser),
        Number(parameter.idAsso),
      )) === null
    ) {
      throw new HttpException(
        `Could not find a role for user ${parameter.idUser} in the assocation ${parameter.idAsso}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.service.update(
      Number(parameter.idUser),
      Number(parameter.idAsso),
      input.name,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':idUser/:idAsso')
  @ApiParam({ name: 'id', required: true })
  async deleteUser(@Param() parameter): Promise<boolean> {
    if (
      (await this.service.get(
        Number(parameter.idUser),
        Number(parameter.idAsso),
      )) === null
    ) {
      throw new HttpException(
        `Could not find a role for user ${parameter.idUser} in the assocation ${parameter.idAsso}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.service.deleteRole(parameter.idUser, parameter.idAsso);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() input: RoleInput): Promise<Role> {
    if (
      input.idAssociation === undefined ||
      input.idUser === undefined ||
      input.name === undefined
    ) {
      throw new HttpException(
        'A role need a idUser, a idAssociation and a name',
        HttpStatus.BAD_REQUEST,
      );
    }
    const currentRoleUser = await this.service.get(
      Number(input.idUser),
      Number(input.idAssociation),
    );
    if (currentRoleUser != null) {
      throw new HttpException(
        `There is already a role ${currentRoleUser.role} for the user ${input.idUser} in the assocation ${input.idAssociation}. Use the PUT method to edit role.`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.service.create(
      input.name,
      input.idUser,
      input.idAssociation,
    );
  }
}
