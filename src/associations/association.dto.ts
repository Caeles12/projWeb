import { Member } from './association.member';

export class AssociationsDTO {
  name: string;

  members: Member[];

  id: number;

  constructor(name: string, members: Member[], id: number) {
    this.name = name;
    this.members = members;
    this.id = id;
  }
}
