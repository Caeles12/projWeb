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
  Query,
  UseGuards,
} from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { Association } from './association.entity';
import { ApiParam, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AssociationsDTO } from './association.dto';
import { Member } from './association.member';
import { Minute } from 'src/minutes/minute.entity';
import { MinuteDTO } from 'src/minutes/minute.dto';
import { AuthGuard } from '@nestjs/passport';

export class SortInput {
  @ApiProperty({
    description: '',
    example: 'date',
    type: String,
  })
  public sort: string;

  @ApiProperty({
    description: '',
    example: 'ASC',
    type: String,
  })
  public order: string;
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum SortType {
  Date = 'date',
}

export class AssociationInput {
  @ApiProperty({
    description: 'The name of the association',
    example: 'FlavienCorp',
    type: String,
  })
  public name: string;

  @ApiProperty({
    description: 'The members of the association',
    type: [Number],
  })
  public idUsers: number[];
}

@ApiTags('associations')
@Controller('associations')
export class AssociationsController {
  constructor(private assoService: AssociationsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAll(): Promise<AssociationsDTO[]> {
    return await this.assoService.getAllDTO();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiParam({ name: 'id', required: true })
  async getAssociation(@Param() parameter): Promise<AssociationsDTO> {
    const assoc = await this.assoService.getAssociationDTO(
      Number(parameter.id),
    );
    if (assoc === undefined) {
      throw new HttpException(
        `Could not find an association with the id ${parameter.id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return assoc;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id/members')
  @ApiParam({ name: 'id', required: true })
  async getMembers(@Param() parameter): Promise<Member[]> {
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

  @UseGuards(AuthGuard('jwt'))
  @Get(':id/minutes')
  @ApiQuery({
    name: 'sort',
    required: false,
    description: 'Sort order for items',
    enum: SortType,
  })
  @ApiQuery({
    name: 'order',
    required: false,
    description: 'Order direction for sort',
    enum: SortOrder,
  })
  @ApiParam({ name: 'id', required: true })
  async getMinutes(@Query() query, @Param() parameter): Promise<MinuteDTO[]> {
    if (
      (await this.assoService.getAssociation(Number(parameter.id))) ===
      undefined
    ) {
      throw new HttpException(
        `Could not find an association with the id ${parameter.id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.assoService.getMinutes(
      Number(parameter.id),
      query.sort,
      query.order,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @ApiParam({ name: 'id', required: true })
  async setAssociation(
    @Body() input: AssociationInput,
    @Param() parameter,
  ): Promise<AssociationsDTO> {
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

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiParam({ name: 'id', required: true })
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

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() input: AssociationInput): Promise<AssociationsDTO> {
    if (input.name === undefined || input.idUsers === undefined) {
      throw new HttpException(
        'An association need a name and a list of users',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.assoService.create(input.idUsers, input.name);
  }
}
