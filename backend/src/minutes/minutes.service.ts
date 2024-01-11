import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssociationsService } from 'src/associations/associations.service';
import { UsersService } from 'src/users/users.service';
import { Minute } from './minute.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Association } from 'src/associations/association.entity';
import { MinuteDTO } from './minute.dto';
import { Voter } from './minutes.voter';
import { ProducerService } from 'src/producer/producer.service';

@Injectable()
export class MinutesService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
    @Inject(forwardRef(() => AssociationsService))
    private assoService: AssociationsService,
    @InjectRepository(Minute)
    private repository: Repository<Minute>,
    private producerService: ProducerService,
  ) {}

  async usersToVoters(users: User[]): Promise<Voter[]> {
    var voters: Voter[] = [];
    for (let u of users) {
      voters.push(new Voter(u.lastname, u.firstname, u.age, u.id));
    }
    return voters;
  }

  async minuteToDTO(minute: Minute): Promise<MinuteDTO> {
    return new MinuteDTO(
      minute.id,
      minute.date,
      minute.content,
      await this.assoService.associationToDTO(minute.association),
      await this.usersToVoters(minute.voters),
    );
  }

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

  async getAssociationMinutes(
    association: Association,
    sort?: string,
    order?: string,
  ): Promise<Minute[]> {
    let sort_order: 'ASC' | 'DESC' = 'ASC';
    if (order === 'DESC') {
      sort_order = 'DESC';
    }
    const order_param = {};
    if (sort !== undefined) {
      order_param[sort] = sort_order;
    }
    const minute = await this.repository.find({
      where: { association: association },
      order: order_param,
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
      let d = date.split('/');
      let jour = parseInt(d[0]);
      let mois = parseInt(d[1]) - 1;
      let annee = parseInt(d[2]);
      minute.date = new Date(annee, mois, jour);
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
    let d = date.split('/');
    let jour = parseInt(d[0]);
    let mois = parseInt(d[1]) - 1;
    let annee = parseInt(d[2]);
    let newDate = new Date(annee, mois, jour);

    const association = await this.assoService.getAssociation(associationId);
    const newMinute = await this.repository.save(
      this.repository.create({
        date: newDate,
        content: content,
        association: association,
        voters: voters,
      }),
    );

    const emailData = {
      email: 'test@test.test',
      subject: `Nouveau Procès Verbal du ${date}`,
      html: `<p>${content}<\p>`,
    };
    await this.producerService.addToEmailQueue(emailData);

    return newMinute;
  }
}
