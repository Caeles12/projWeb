import { Injectable } from '@nestjs/common';
import { Association } from './association.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

var currentId = 0;

@Injectable()
export class AssociationsService {
  constructor(
    private service: UsersService,
    @InjectRepository(Association)
    private repository: Repository<Association>,
  ) {}

  async getAll(): Promise<Association[]> {
    let associations = await this.repository.find();
    return associations;
  }

  async getAssociation(assocId: number): Promise<Association> {
    const association = await this.repository.findOne({
      where: { id: assocId },
    });
    return association;
  }

  async getMembers(id: number): Promise<User[]> {
    let users = (await this.getAssociation(id)).users;
    return users;
  }

  async setAssociation(
    assocId: number,
    idUsers: number[] | undefined,
    name: string | undefined,
  ): Promise<Association> {
    var association = await this.repository.findOne({
      where: { id: assocId },
    });
    if (idUsers !== undefined) {
      let newUsers: User[] = [];
      for (let i of idUsers) {
        newUsers.push(await this.service.getUser(i));
      }
      association.users = newUsers;
    }
    if (name !== undefined) {
      association.name = name;
    }
    association = await this.repository.save(association);
    return association;
  }

  async deleteAssociation(assocId: number): Promise<boolean> {
    const result = await this.repository.delete(assocId);
    return result.affected > 0;
  }

  async create(idUsers: number[], assocName: string) {
    currentId++;
    let users: User[] = [];
    for (let i of idUsers) {
      users.push(await this.service.getUser(i));
    }
    const newAssociation = await this.repository.save(
      this.repository.create({
        id: currentId,
        users: users,
        name: assocName,
      }),
    );
    return newAssociation;
  }
}
