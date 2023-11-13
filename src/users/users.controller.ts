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
} from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

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

  @Get()
  async getAll(): Promise<User[]> {
    return await this.service.getAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true })
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
  @ApiParam({ name: 'id', required: true })
  async setUser(@Body() input: UserInput, @Param() parameter): Promise<User> {
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

  @Post()
  async create(@Body() input: UserInput): Promise<User> {
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
