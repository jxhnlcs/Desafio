import { Controller, Get } from '@nestjs/common';
import { HistoricService } from './historic.service';
import { HistoricDTO } from './dto/historic.dto';

@Controller('historic')
export class HistoricController {
  constructor(private readonly historicService: HistoricService) {}

  @Get()
  async getHistoric(): Promise<HistoricDTO[]> {
    return this.historicService.getHistoric();
  }
}