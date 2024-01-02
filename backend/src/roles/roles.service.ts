import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { UserDTO } from 'src/users/user.dto';

@Injectable()
export class RolesService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    @InjectRepository(Role)
    private repository: Repository<Role>,
  ) {}

  async getAll(): Promise<Role[]> {
    let roles = await this.repository.find();
    return roles;
  }

  async getAllRolesOfUser(userId: number): Promise<Role[]> {
    let roles = await this.repository.find({ where: { idUser: userId } });
    return roles;
  }

  async getAllRolesOfAssociation(assocId: number): Promise<Role[]> {
    let roles = await this.repository.find({
      where: { idAssociation: assocId },
    });
    return roles;
  }

  async getAllUsers(roleName: string): Promise<UserDTO[]> {
    let roles = await this.repository.find({ where: { role: roleName } });
    var userList = [];
    for (let r of roles) {
      let u = await this.usersService.getUserDTO(r.idUser);
      userList.push(u);
    }
    return userList;
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
