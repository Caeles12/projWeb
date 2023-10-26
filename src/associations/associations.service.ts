import { Get, Injectable } from '@nestjs/common';
import { Association } from './association.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';

const associations: Association[] =  [
    {
        id: 0,
        idUsers: [0],
        name: "JohnCorp"
    }
]

var currentId = 0;

@Injectable()
export class AssociationsService {

    constructor (
        private service: UsersService
    ) {}

    getAll(): Association[] {
        return associations
    }

    getAssociation(id: number) {
        const asso = associations.find((x: Association) => x.id === id)
        return asso
    }

    getMembers(id: number): User[] {
        return this.getAssociation(id).idUsers.map((x) => this.service.getUser(x))
    }

    setAssociation(id: number, idUsers: number[] | undefined, name: string | undefined) {
        const assoIndex = associations.findIndex((x: Association) => x.id === id)
        if(idUsers !== undefined){
            associations[assoIndex].idUsers = idUsers
        }
        if(name !== undefined){
            associations[assoIndex].name = name
        }
        return associations[assoIndex]
    }

    deleteAssociation(id: Number): boolean {
        const i = associations.findIndex((x: Association) => x.id === id)
        const removed = associations.splice(i, 1)
        return removed.length === 1;
    }

    create(firstname: string, name: string) {
        currentId++
        const asso = new Association(currentId, name)
        associations.push(asso)
        return asso
    }
}
