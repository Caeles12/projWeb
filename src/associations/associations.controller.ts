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
import { ApiBody, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';

export class AssociationInput {

  @ApiProperty({
      description: 'The name of the association',
      example: "FlavienCorp",
      type: String,
  })
  public name: string;

  @ApiProperty({
      description: 'The members of the association',
      type: [Number],
  })
  public users: number[];
}

@ApiTags('associations')
@Controller('associations')
export class AssociationsController {
  constructor(private assoService: AssociationsService) {}

  @Get()
  async getAll(): Promise<Association[]> {
    return await this.assoService.getAll();
  }

  @Get(':id')
  @ApiParam({name: 'id', required: true})
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
  @ApiParam({name: 'id', required: true})
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
  @ApiParam({name: 'id', required: true})
  async setAssociation(
    @Body() input: AssociationInput,
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
      input.users,
      input.name,
    );
  }

  @Delete(':id')
  @ApiParam({name: 'id', required: true})
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
  async create(@Body() input: AssociationInput): Promise<Association> {
    if (input.name === undefined || input.users === undefined) {
      throw new HttpException(
        'An association need a name and a list of users',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.assoService.create(input.users, input.name);
  }
}
