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

  async findCepsInRadius(loggedUserId: number, userCep: string, radius: number): Promise<any[]> {
    const allCeps = await this.prisma.consultation.findMany();
  
    const cepsInRadius = await Promise.all(
      allCeps
        .filter((consultation) => consultation.radius <= radius)
        .map(async (consultation) => {
          const user = await this.prisma.user.findUnique({
            where: { id: consultation.userId },
          });
  
          await this.prisma.historico.create({
            data: {
              userId: loggedUserId,
              name: user?.name,
              cep: userCep,
              radius: radius,
            },
          });
  
          return {
            id: consultation.id,
            cep: consultation.cep,
            radius: consultation.radius,
            userId: loggedUserId,
            name: user.name,
          };
        })
    );
  
    if (cepsInRadius.length === 0) {
      throw new NotFoundException(`Não existe`);
    }
  
    return cepsInRadius;
  }

  private consultationToDto(consultation: any): ConsultationDto {
    const { id, cep, radius, userId, createdAt } = consultation;
    return { id, cep, radius, userId, createdAt };
  }
}