import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { RolesService } from 'src/roles/roles.service';
import { AssociationsService } from 'src/associations/associations.service';
import { UserRole } from './user.role';
import { UserDTO } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    private rolesService: RolesService,
    private associationService: AssociationsService,
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  private async userToDTO(user: User): Promise<UserDTO> {
    return new UserDTO(user.firstname, user.lastname, user.age, user.id);
  }

  async getAll(): Promise<User[]> {
    let users = await this.repository.find();
    return users;
  }
  async getAllDTO(): Promise<UserDTO[]> {
    let users = await this.getAll();
    let usersDTO = [];
    for (let user of users) {
      usersDTO.push(await this.userToDTO(user));
    }
    return usersDTO;
  }

  async getUser(userId: number): Promise<User> {
    const user = await this.repository.findOne({
      where: { id: userId },
    });
    return user;
  }

  async getUserDTO(userId: number): Promise<UserDTO> {
    const user = await this.repository.findOne({
      where: { id: userId },
    });
    return this.userToDTO(user);
  }

  async getUserRoles(userId: number): Promise<UserRole[]> {
    const user = await this.repository.findOne({
      where: { id: userId },
    });
    const roles = await this.rolesService.getAllRoles(userId);
    let userRoles: UserRole[] = [];
    for (let role of roles) {
      let assocName = (
        await this.associationService.getAssociation(role.idAssociation)
      ).name;
      userRoles.push(new UserRole(assocName, role.role));
    }
    return userRoles;
  }

  async setUser(
    userId: number,
    firstname: string | undefined,
    lastname: string | undefined,
    age: number,
    password: string,
  ): Promise<UserDTO> {
    var user = await this.repository.findOne({
      where: { id: userId },
    });
    if (firstname !== undefined) {
      user.firstname = firstname;
    }
    if (lastname !== undefined) {
      user.lastname = lastname;
    }
    if (age !== undefined && !Number.isNaN(age)) {
      user.age = age;
    }
    if (password !== undefined) {
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(password, saltOrRounds);
      user.password = hash;
    }
    user = await this.repository.save(user);
    return this.userToDTO(user);
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
  ): Promise<UserDTO> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);

    const newUser = await this.repository.save(
      this.repository.create({
        lastname: lastname,
        firstname: firstname,
        age: age,
        password: hash,
      }),
    );
    return this.userToDTO(newUser);
  }
}
