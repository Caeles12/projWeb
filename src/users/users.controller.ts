import { Controller, Get, Body, Post, Param, Put, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(
        private service: UsersService
    ) {}

    @Get()
    getAll(): User[] {
        return this.service.getAll();
    }

    @Get(':id')
    getUser(@Param() parameter): User {
        const us = this.service.getUser(Number(parameter.id))
        if (us === undefined) {
            throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND);
        }
        return us
    }

    @Put(':id')
    setUser(@Body() input: any, @Param() parameter): User {
        if (this.service.getUser(Number(parameter.id)) === undefined) {
            throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND);
        }
        return this.service.setUser(Number(parameter.id), input.firstname, input.lastname, Number(input.age))
    }

    @Delete(':id')
    deleteUser(@Param() parameter): boolean {
        if (this.service.getUser(Number(parameter.id)) === undefined) {
            throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND);
        }
        return this.service.deleteUser(parameter.id)
    }

    @Post()
    create(@Body() input: any): User {
        if (input.firstname === undefined || input.lastname === undefined || input.age === undefined) {
            throw new HttpException('A user need a firstname, a lastname and an age', HttpStatus.BAD_REQUEST)
        }
        return this.service.create(input.firstname, input.lastname, Number(input.age))
    }
    
}
