import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

var currentId = 0;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    let users = await this.repository.find();
    return users;
  }

  async getUser(userId: number): Promise<User> {
    const user = await this.repository.findOne({
      where: { id: userId },
    });
    return user;
  }

  async setUser(
    userId: number,
    firstname: string | undefined,
    lastname: string | undefined,
    age: number,
  ): Promise<User> {
    var user = await this.repository.findOne({
      where: { id: userId },
    });
    if (firstname !== undefined) {
      user.firstname = firstname;
    }
    if (lastname !== undefined) {
      user.lastname = lastname;
    }
    if (age !== undefined) {
      user.age = age;
    }
    user = await this.repository.save(user);
    return user;
  }

  async deleteUser(userId: number): Promise<boolean> {
    const result = await this.repository.delete(userId);
    return result.affected > 0;
  }

  async create(
    firstname: string,
    lastname: string,
    age: number,
    password: string,
  ): Promise<User> {
    currentId++;

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);

    const newUser = await this.repository.save(
      this.repository.create({
        id: currentId,
        lastname: lastname,
        firstname: firstname,
        age: age,
        password: hash,
      }),
    );
    return newUser;
  }
}
