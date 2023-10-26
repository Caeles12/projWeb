import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { Association } from './association.entity';
import { User } from 'src/users/user.entity';

@Controller('associations')
export class AssociationsController {
    constructor(
        private service: AssociationsService
    ) {}

    @Get()
    getAll(): Association[] {
        return this.service.getAll();
    }

    @Get(':id')
    getAssociation(@Param() parameter): Association {
        const assoc = this.service.getAssociation(Number(parameter.id))
        if(assoc === undefined) {
            throw new HttpException(`Could not find an association with the id ${parameter.id}`, HttpStatus.NOT_FOUND);
        }
        return assoc
    }

    @Put(':id')
    setAssociation(@Body() input: any, @Param() parameter): Association {
        if (this.service.getAssociation(Number(parameter.id)) === undefined) {
            throw new HttpException(`Could not find an association with the id ${parameter.id}`, HttpStatus.NOT_FOUND);
        }
        return this.service.setAssociation(Number(parameter.id), input.idUsers, input.name)
    }

    @Delete(':id')
    deleteAssociation(@Param() parameter): boolean {
        if (this.service.getAssociation(Number(parameter.id)) === undefined) {
            throw new HttpException(`Could not find an association with the id ${parameter.id}`, HttpStatus.NOT_FOUND);
        }
        return this.service.deleteAssociation(parameter.id)
    }

    @Post()
    create(@Body() input: any): Association {
        if (input.name === undefined || input.idUsers === undefined) {
            throw new HttpException('An association need a name and a list of users', HttpStatus.BAD_REQUEST)
        }
        return this.service.create(input.name, input.idUsers)
    }
}
