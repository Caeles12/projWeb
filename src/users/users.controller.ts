import { Controller, Get, Body, Post, Param, Put, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { User } from './user.entity';

const users : User[] = [
    {
        id: 0,
        lastname: 'Doe',
        firstname: 'John'
    }
]

var currentId = 0;

@Controller('users')
export class UsersController {

    @Get()
    getAll(): User[] {
        return users;
    }

    @Get(':id')
    getUser(@Param() parameter): User {
        const us = users.find((x: User) => x.id === Number(parameter.id))
        if (us === undefined) {
            throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND);
        }
        return us
    }

    @Put(':id')
    setUser(@Body() input: any, @Param() parameter): User {
        const i = users.findIndex((x: User) => x.id === Number(parameter.id))
        if (i === undefined) {
            throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND);
        }
        if (input.firstname !== undefined) {
            users[i].firstname = input.firstname
        }
        if (input.lastname !== undefined) {
            users[i].lastname = input.lastname
        }
        return users[i];
    }

    @Delete(':id')
    deleteUser(@Param() parameter): boolean {
        const i = users.findIndex((x: User) => x.id === Number(parameter.id))
        if (i === undefined) {
            throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND);
        }
        const removed = users.splice(i, 1)
        return removed.length === 1;
    }

    @Post()
    create(@Body() input: any): User {
        currentId++
        const us = new User(currentId, input.lastname, input.firstname)
        users.push(us)
        return us
    }
    
}
