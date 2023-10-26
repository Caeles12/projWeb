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
} from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return await this.service.getAll();
  }

  @Get(':id')
  async getUser(@Param() parameter): Promise<User> {
    const us = await this.service.getUser(Number(parameter.id));
    if (us === undefined) {
      throw new HttpException(
        `Could not find a user with the id ${parameter.id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return us;
  }

  @Put(':id')
  async setUser(@Body() input: any, @Param() parameter): Promise<User> {
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
    );
  }

  @Delete(':id')
  async deleteUser(@Param() parameter): Promise<boolean> {
    if ((await this.service.getUser(Number(parameter.id))) === undefined) {
      throw new HttpException(
        `Could not find a user with the id ${parameter.id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.service.deleteUser(parameter.id);
  }

  @Post()
  async create(@Body() input: any): Promise<User> {
    if (
      input.firstname === undefined ||
      input.lastname === undefined ||
      input.age === undefined
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
    );
  }
}
