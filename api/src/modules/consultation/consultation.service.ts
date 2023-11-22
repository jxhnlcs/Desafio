import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { CreateConsultationDto, ConsultationDto } from './dto/consultation.dto';

@Injectable()
export class ConsultationService {
  constructor(private prisma: PrismaService) { }

  async createConsultation(createConsultationDto: CreateConsultationDto): Promise<ConsultationDto> {
    const createdConsultation = await this.prisma.consultation.create({
      data: createConsultationDto,
    });

    return this.consultationToDto(createdConsultation);
  }

  async getConsultationById(consultationId: string): Promise<ConsultationDto> {
    const numericConsultationId = parseInt(consultationId, 10);

    if (isNaN(numericConsultationId)) {
      throw new NotFoundException(`Invalid user ID: ${consultationId}`);
    }

    const consultation = await this.prisma.consultation.findUnique({
      where: { id: numericConsultationId },
    });

    if (!consultation) {
      throw new NotFoundException(`Consultation with ID ${consultationId} not found`);
    }

    return this.consultationToDto(consultation);
  }

  async getAllConsultations(): Promise<ConsultationDto[]> {
    const consultations = await this.prisma.consultation.findMany();
    return consultations.map((consultation) => this.consultationToDto(consultation));
  }

  async updateConsultation(consultationId: string, updateConsultationDto: CreateConsultationDto): Promise<ConsultationDto> {
    const numericConsultationId = parseInt(consultationId, 10);
    
    if (isNaN(numericConsultationId)) {
      throw new NotFoundException(`Invalid user ID: ${consultationId}`);
    }

    const updatedConsultation = await this.prisma.consultation.update({
      where: { id: numericConsultationId },
      data: updateConsultationDto,
    });

    if (!updatedConsultation) {
      throw new NotFoundException(`Consultation with ID ${consultationId} not found`);
    }

    return this.consultationToDto(updatedConsultation);
  }

  async deleteConsultation(consultationId: string): Promise<void> {
    const numericConsultationId = parseInt(consultationId, 10);

    if (isNaN(numericConsultationId)) {
      throw new NotFoundException(`Invalid user ID: ${consultationId}`);
    }
    
    const deletedConsultation = await this.prisma.consultation.delete({
      where: { id: numericConsultationId },
    });

    if (!deletedConsultation) {
      throw new NotFoundException(`Consultation with ID ${consultationId} not found`);
    }
  }

  async findCepsInRadius(userCep: string, radius: number): Promise<string[]> {
    const allCeps = await this.prisma.consultation.findMany();

    const cepsInRadius = allCeps
      .filter((consultation) => this.isCepInRadius(userCep, consultation.cep, radius))
      .map((consultation) => consultation.cep);

    if (cepsInRadius.length === 0) {
      throw new NotFoundException(`No CEPs found within the specified radius.`);
    }

    return cepsInRadius;
  }

  private isCepInRadius(userCep: string, targetCep: string, radius: number): boolean {
    const numericUserCep = userCep.replace('-', '');
    const numericTargetCep = targetCep.replace('-', '');
    
    return numericUserCep.startsWith(numericTargetCep.substr(0, radius));
  }

  private consultationToDto(consultation: any): ConsultationDto {
    const { id, cep, radius, userId, createdAt } = consultation;
    return { id, cep, radius, userId, createdAt };
  }
}