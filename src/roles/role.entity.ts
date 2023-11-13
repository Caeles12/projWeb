import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryColumn()
  idUser: number;

  @PrimaryColumn()
  idAssociation: number;

  @Column()
  role: string;

  constructor(
    role: string,
    idUser: number,
    idAssociation:number
  ) {
    this.role = role;
    this.idUser = idUser;
    this.idAssociation = idAssociation;
  }
}