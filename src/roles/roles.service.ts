import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private repository: Repository<Role>,
  ) {}

  async getAll(): Promise<Role[]> {
    let roles = await this.repository.find();
    return roles;
  }

  async getAllRoles(userId: number): Promise<Role[]> {
    let roles = await this.repository.find({ where: { idUser: userId } });
    return roles;
  }

  async get(userId: number, assocationId: number): Promise<Role> {
    const role = await this.repository.findOne({
      where: { idUser: userId, idAssociation: assocationId },
    });
    return role;
  }

  async deleteRole(userId: number, assocationId: number): Promise<boolean> {
    const result = await this.repository.delete({
      idUser: userId,
      idAssociation: assocationId,
    });
    return result.affected > 0;
  }

  async update(
    idUser: number,
    idAssociation: number,
    newRole: string,
  ): Promise<Role> {
    var role = await this.repository.findOne({
      where: { idUser: idUser, idAssociation: idAssociation },
    });
    role.role = newRole;
    role = await this.repository.save(role);
    return role;
  }

  async create(
    role: string,
    idUser: number,
    idAssociation: number,
  ): Promise<Role> {
    const newRole = await this.repository.save(
      this.repository.create({
        role: role,
        idUser: idUser,
        idAssociation: idAssociation,
      }),
    );
    return newRole;
  }
}
