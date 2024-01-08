import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  Put,
  Delete,
  HttpStatus,
  HttpException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from './user.role';
import { UserDTO } from './user.dto';

export class UserInput {
  @ApiProperty({
    description: 'The firstname of the user',
    example: 'John',
    type: String,
  })
  public firstname: string;

  @ApiProperty({
    description: 'The lastname of the user',
    example: 'Doe',
    type: String,
  })
  public lastname: string;

  @ApiProperty({
    description: 'The age of the user',
    minimum: 18,
    default: 18,
    type: Number,
  })
  public age: number;

  @ApiProperty({
    description: 'The password of the user',
    type: String,
  })
  public password: string;
}

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAll(): Promise<UserDTO[]> {
    return await this.service.getAllDTO();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/self')
  async getSelf(@Req() req): Promise<UserDTO> {
    const user = req.user;
    return this.service.getUserDTO(user.username);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiParam({ name: 'id', required: true })
  async getUser(@Param() parameter): Promise<UserDTO> {
    const us = await this.service.getUserDTO(Number(parameter.id));
    if (us === undefined) {
      throw new HttpException(
        `Could not find a user with the id ${parameter.id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return us;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id/roles')
  @ApiParam({ name: 'id', required: true })
  async getUserRoles(@Param() parameter): Promise<UserRole[]> {
    const userRoles = await this.service.getUserRoles(Number(parameter.id));
    if (userRoles === undefined) {
      throw new HttpException(
        `Could not find a user with the id ${parameter.id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return userRoles;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @ApiParam({ name: 'id', required: true })
  async setUser(
    @Body() input: UserInput,
    @Param() parameter,
    @Req() req,
  ): Promise<UserDTO> {
    if (parameter.id != req.user.username) {
      throw new HttpException(
        `You can't edit other users account!`,
        HttpStatus.FORBIDDEN,
      );
    }
    if ((await this.service.getUser(Number(parameter.id))) === undefined) {
      throw new HttpException(
        `Could not find a user with the id ${parameter.id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.service.setUser(
      Number(parameter.id),
      input.firstname,
      input.lastname,
      Number(input.age),
      input.password,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiParam({ name: 'id', required: true })
  async deleteUser(@Param() parameter): Promise<boolean> {
    if ((await this.service.getUser(Number(parameter.id))) === undefined) {
      throw new HttpException(
        `Could not find a user with the id ${parameter.id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.service.deleteUser(parameter.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() input: UserInput): Promise<UserDTO> {
    if (
      input.firstname === undefined ||
      input.lastname === undefined ||
      input.age === undefined ||
      input.password === undefined
    ) {
      throw new HttpException(
        'A user need a firstname, a lastname and an age',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.service.create(
      input.firstname,
      input.lastname,
      Number(input.age),
      input.password,
    );
  }
}
