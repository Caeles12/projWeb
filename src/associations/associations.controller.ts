import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { Association } from './association.entity';
import { User } from 'src/users/user.entity';

@Controller('associations')
export class AssociationsController {
  constructor(private assoService: AssociationsService) {}

  @Get()
  async getAll(): Promise<Association[]> {
    return await this.assoService.getAll();
  }

  @Get(':id')
  async getAssociation(@Param() parameter): Promise<Association> {
    const assoc = await this.assoService.getAssociation(Number(parameter.id));
    if (assoc === undefined) {
      throw new HttpException(
        `Could not find an association with the id ${parameter.id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return assoc;
  }

  @Get(':id/members')
  async getMembers(@Param() parameter): Promise<User[]> {
    if (
      (await this.assoService.getAssociation(Number(parameter.id))) ===
      undefined
    ) {
      throw new HttpException(
        `Could not find an association with the id ${parameter.id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.assoService.getMembers(Number(parameter.id));
  }

  @Put(':id')
  async setAssociation(
    @Body() input: any,
    @Param() parameter,
  ): Promise<Association> {
    if (
      (await this.assoService.getAssociation(Number(parameter.id))) ===
      undefined
    ) {
      throw new HttpException(
        `Could not find an association with the id ${parameter.id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.assoService.setAssociation(
      Number(parameter.id),
      input.idUsers,
      input.name,
    );
  }

  @Delete(':id')
  async deleteAssociation(@Param() parameter): Promise<boolean> {
    if (
      (await this.assoService.getAssociation(Number(parameter.id))) ===
      undefined
    ) {
      throw new HttpException(
        `Could not find an association with the id ${parameter.id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.assoService.deleteAssociation(parameter.id);
  }

  @Post()
  async create(@Body() input: any): Promise<Association> {
    if (input.name === undefined || input.idUsers === undefined) {
      throw new HttpException(
        'An association need a name and a list of users',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.assoService.create(input.idUsers, input.name);
  }
}
