import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class ConsultationService {

  constructor(prisma: PrismaService) {}

}
