import { Module } from '@nestjs/common';
import { ConsultationService } from './consultation.service';
import { ConsultationController } from './consultation.controller';
import { PrismaService } from '../../database/PrismaService';

@Module({
  controllers: [ConsultationController],
  providers: [ConsultationService, PrismaService],
})
export class ConsultationModule {}
