import { Member } from './association.member';

export class AssociationsDTO {
  name: string;

  members: Member[];

  constructor(name: string, members: Member[]) {
    this.name = name;
    this.members = members;
  }
}
