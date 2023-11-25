import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ConsultationService } from './consultation.service';
import { CreateConsultationDto, ConsultationDto } from './dto/consultation.dto';
import { FindCepsDto } from './dto/find-ceps.dto';

@Controller('consultation')
export class ConsultationController {
  constructor(private readonly consultationService: ConsultationService) {}

  @Post()
  async createConsultation(@Body() createConsultationDto: CreateConsultationDto): Promise<ConsultationDto> {
    return this.consultationService.createConsultation(createConsultationDto);
  }

  @Get(':id')
  async getConsultationById(@Param('id') consultationId: string): Promise<ConsultationDto> {
    return this.consultationService.getConsultationById(consultationId);
  }

  @Get()
  async getAllConsultations(): Promise<ConsultationDto[]> {
    return this.consultationService.getAllConsultations();
  }

  @Put(':id')
  async updateConsultation(@Param('id') consultationId: string, @Body() updateConsultationDto: CreateConsultationDto): Promise<ConsultationDto> {
    return this.consultationService.updateConsultation(consultationId, updateConsultationDto);
  }

  @Delete(':id')
  async deleteConsultation(@Param('id') consultationId: string): Promise<void> {
    return this.consultationService.deleteConsultation(consultationId);
  }

  @Post('find-ceps-in-radius')
  async findCepsInRadius(@Body() findCepsDto: FindCepsDto): Promise<string[]> {
    const { loggedUserId, userCep, radius } = findCepsDto;
    return this.consultationService.findCepsInRadius(loggedUserId, userCep, radius);
  }
}