import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Association } from './association.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesService } from 'src/roles/roles.service';
import { AssociationsDTO } from './association.dto';
import { Member } from './association.member';

var currentId = 0;

@Injectable()
export class AssociationsService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
    private roleService: RolesService,
    @InjectRepository(Association)
    private repository: Repository<Association>,
  ) {}

  private async userToMember(
    association: Association,
    user: User,
  ): Promise<Member> {
    const role = await this.roleService.get(user.id, association.id);
    const member = new Member(
      user.lastname,
      user.firstname,
      user.age,
      role.role,
    );
    return member;
  }

  private async associationToDTO(
    association: Association,
  ): Promise<AssociationsDTO> {
    let members = [];
    for (let user of association.users) {
      members.push(await this.userToMember(association, user));
    }
    const associationDTO = new AssociationsDTO(association.name, members);
    return associationDTO;
  }

  async getAll(): Promise<Association[]> {
    let associations = await this.repository.find();
    return associations;
  }

  async getAllDTO(): Promise<AssociationsDTO[]> {
    let associations = await this.getAll();
    let associationsDTO = [];
    for (let association of associations) {
      associationsDTO.push(await this.associationToDTO(association));
    }
    return associationsDTO;
  }

  async getAssociation(assocId: number): Promise<Association> {
    const association = await this.repository.findOne({
      where: { id: assocId },
    });
    return association;
  }

  async getAssociationDTO(assocId: number): Promise<AssociationsDTO> {
    return await this.associationToDTO(await this.getAssociation(assocId));
  }

  async getMembers(id: number): Promise<Member[]> {
    let members = (await this.getAssociationDTO(id)).members;
    return members;
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
        newUsers.push(await this.userService.getUser(i));
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
      users.push(await this.userService.getUser(i));
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
