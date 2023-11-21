import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ConsultationModule } from './modules/consultation/consultation.module';

@Module({
  imports: [UserModule, ConsultationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
