import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Association } from './association.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesService } from 'src/roles/roles.service';
import { AssociationsDTO } from './association.dto';
import { Member } from './association.member';
import { Minute } from 'src/minutes/minute.entity';
import { MinutesService } from 'src/minutes/minutes.service';
import { MinuteDTO } from 'src/minutes/minute.dto';

@Injectable()
export class AssociationsService {
  constructor(
    private minuteService: MinutesService,
    private roleService: RolesService,
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
    @InjectRepository(Association)
    private repository: Repository<Association>,
  ) {}

  private async userToMember(
    association: Association,
    user: User,
  ): Promise<Member> {
    const role = await this.roleService.get(user.id, association.id);
    var userRole = null;
    if (role !== null) {
      userRole = role.role;
    }

    const member = new Member(
      user.lastname,
      user.firstname,
      user.age,
      userRole,
      user.id,
    );

    return member;
  }

  async associationToDTO(association: Association): Promise<AssociationsDTO> {
    let members = [];
    for (let user of association.users) {
      members.push(await this.userToMember(association, user));
    }
    const associationDTO = new AssociationsDTO(
      association.name,
      members,
      association.id,
    );
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

  async getMinutes(
    id: number,
    sort?: string,
    order?: string,
  ): Promise<MinuteDTO[]> {
    const minutes = await this.minuteService.getAssociationMinutes(
      await this.getAssociation(id),
      sort,
      order,
    );

    var minutesDTO: MinuteDTO[] = [];
    for (let m of minutes) {
      minutesDTO.push(await this.minuteService.minuteToDTO(m));
    }
    return minutesDTO;
  }

  async setAssociation(
    assocId: number,
    idUsers: number[] | undefined,
    name: string | undefined,
  ): Promise<AssociationsDTO> {
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
    return this.associationToDTO(association);
  }

  async deleteAssociation(assocId: number): Promise<boolean> {
    const result = await this.repository.delete(assocId);
    return result.affected > 0;
  }

  async create(idUsers: number[], assocName: string): Promise<AssociationsDTO> {
    let users: User[] = [];
    for (let i of idUsers) {
      users.push(await this.userService.getUser(i));
    }
    const newAssociation = await this.repository.save(
      this.repository.create({
        users: users,
        name: assocName,
      }),
    );
    return this.associationToDTO(newAssociation);
  }
}
