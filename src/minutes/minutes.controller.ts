import {
  Body,
  Controller,
  Get,
  Put,
  Post,
  HttpException,
  HttpStatus,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { MinutesService } from './minutes.service';
import { Minute } from './minute.entity';
import { MinuteUpdate } from './minutes.update';
import { MinuteInput } from './minutes.input';
import { MinuteDTO } from './minute.dto';

@ApiTags('minutes')
@Controller('minutes')
export class MinutesController {
  constructor(private minuteService: MinutesService) {}

  @Get()
  async getAll(): Promise<MinuteDTO[]> {
    var minutesDTO: MinuteDTO[] = [];
    const minutes = await this.minuteService.getAll();
    for (let m of minutes) {
      minutesDTO.push(await this.minuteService.minuteToDTO(m));
    }
    return minutesDTO;
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true })
  async getAssociation(@Param() parameter): Promise<MinuteDTO> {
    const minute = await this.minuteService.getMinute(Number(parameter.id));
    if (minute === null) {
      throw new HttpException(
        `Could not find a minute with the id ${parameter.id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.minuteService.minuteToDTO(minute);
  }

  @Put(':id')
  @ApiParam({ name: 'id', required: true })
  async setAssociation(
    @Body() input: MinuteUpdate,
    @Param() parameter,
  ): Promise<MinuteDTO> {
    if ((await this.minuteService.getMinute(Number(parameter.id))) === null) {
      throw new HttpException(
        `Could not find a minute with the id ${parameter.id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.minuteService.minuteToDTO(
      await this.minuteService.setMinute(
        Number(parameter.id),
        input.idVoters,
        input.idAssociation,
        input.content,
        input.date,
      ),
    );
  }

  @Delete(':id')
  @ApiParam({ name: 'id', required: true })
  async deleteAssociation(@Param() parameter): Promise<boolean> {
    if ((await this.minuteService.getMinute(Number(parameter.id))) === null) {
      throw new HttpException(
        `Could not find a minute with the id ${parameter.id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.minuteService.deleteMinute(parameter.id);
  }

  @Post()
  async create(@Body() input: MinuteInput): Promise<MinuteDTO> {
    if (
      input.content === undefined ||
      input.idAssociation === undefined ||
      input.date === undefined ||
      input.idVoters === undefined
    ) {
      throw new HttpException(
        'A minute need a name and a list of users',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.minuteService.minuteToDTO(
      await this.minuteService.create(
        input.date,
        input.content,
        input.idAssociation,
        input.idVoters,
      ),
    );
  }
}
