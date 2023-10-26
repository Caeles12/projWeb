import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.entity';

const users : User[] = [
    {
        id: 0,
        lastname: 'Doe',
        firstname: 'John',
        age: 23
    }
]

var currentId = 0;

@Injectable()
export class UsersService {

    getAll(): User[] {
        return users
    }

    getUser(id: Number): User {
        const us = users.find((x: User) => x.id === id)
        return us
    }

    setUser(id: Number, firstname: string | undefined, lastname: string | undefined, age: number): User {
        const i = users.findIndex((x: User) => x.id === id)
        if (firstname !== undefined) {
            users[i].firstname = firstname
        }
        if (lastname !== undefined) {
            users[i].lastname = lastname
        }
        if (age !== undefined) {
            users[i].age = age
        }
        return users[i]
    }

    deleteUser(id: Number): boolean {
        const i = users.findIndex((x: User) => x.id === id)
        const removed = users.splice(i, 1)
        return removed.length === 1;
    }

    create(firstname: string, lastname: string, age: number) {
        currentId++
        const us = new User(currentId, lastname, firstname, age)
        users.push(us)
        return us
    }

}
