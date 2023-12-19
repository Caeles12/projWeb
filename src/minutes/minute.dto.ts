import { AssociationsDTO } from 'src/associations/association.dto';
import { Association } from 'src/associations/association.entity';
import { Voter } from './minutes.voter';

export class MinuteDTO {
  id: number;

  date: Date;

  content: string;

  association: AssociationsDTO;

  voters: Voter[];

  constructor(
    id: number,
    date: Date,
    content: string,
    association: AssociationsDTO,
    voters: Voter[],
  ) {
    this.id = id;
    this.date = date;
    this.content = content;
    this.association = association;
    this.voters = voters;
  }
}
