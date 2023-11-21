export class CreateConsultationDto {
  readonly userId: number;
  readonly cep: string;
  readonly radius: number;
}

export class ConsultationDto {
  readonly id: number;
  readonly userId: number;
  readonly cep: string;
  readonly radius: number;
  readonly createdAt: Date;
}