import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { HistoricDTO } from './dto/historic.dto';

@Injectable()
export class HistoricService {
  constructor(private prisma: PrismaService) { }

  private toDto(historic): HistoricDTO {
    return {
      userId: historic.userId,
      name: historic.name,
      cep: historic.cep,
      radius: historic.radius,
      createdAt: historic.createdAt,
    };
  }

  async getHistoric(): Promise<HistoricDTO[]> {
    const historics = await this.prisma.historico.findMany();
    return historics.map((historic) => this.toDto(historic));
  }
}