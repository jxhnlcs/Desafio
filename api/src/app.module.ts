import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ConsultationModule } from './modules/consultation/consultation.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { HistoricModule } from './modules/historic/historic.module';

@Module({
  imports: [UserModule, ConsultationModule, HistoricModule, JwtModule.register({
    secret: 'seu_segredo_aqui',
    signOptions: { expiresIn: '5h' },
  }),
    PassportModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
