import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssociationsService } from 'src/associations/associations.service';
import { UsersService } from 'src/users/users.service';
import { Minute } from './minute.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class MinutesService {
  constructor(
    private userService: UsersService,
    private assoService: AssociationsService,
    @InjectRepository(Minute)
    private repository: Repository<Minute>,
  ) {}

  async getAll(): Promise<Minute[]> {
    let minutes = await this.repository.find();
    return minutes;
  }

  async getMinute(minuteId: number): Promise<Minute> {
    const minute = await this.repository.findOne({
      where: { id: minuteId },
    });
    return minute;
  }

  async setMinute(
    minuteId: number,
    idVoters: number[] | undefined,
    idAssociation: number | undefined,
    content: string | undefined,
    date: string | undefined,
  ): Promise<Minute> {
    var minute = await this.repository.findOne({
      where: { id: minuteId },
    });
    if (idVoters != undefined) {
      let newVoters: User[] = [];
      for (let i of idVoters) {
        newVoters.push(await this.userService.getUser(i));
      }
      minute.voters = newVoters;
    }
    if (idAssociation !== undefined) {
      const newAssociation =
        await this.assoService.getAssociation(idAssociation);
      if (newAssociation !== undefined) {
        minute.association = newAssociation;
      }
    }
    if (content !== undefined) {
      minute.content = content;
    }
    if (date !== undefined) {
      minute.date = date;
    }
    minute = await this.repository.save(minute);
    return minute;
  }

  async deleteMinute(minuteId: number): Promise<boolean> {
    const result = await this.repository.delete(minuteId);
    return result.affected > 0;
  }

  async create(
    date: string,
    content: string,
    associationId: number,
    votersId: number[],
  ) {
    let voters: User[] = [];
    for (let i of votersId) {
      voters.push(await this.userService.getUser(i));
    }
    const association = await this.assoService.getAssociation(associationId);
    const newMinute = await this.repository.save(
      this.repository.create({
        date: date,
        content: content,
        association: association,
        voters: voters,
      }),
    );
    return newMinute;
  }
}
