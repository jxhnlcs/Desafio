export class CreateUserDto {
  readonly name: string;
  readonly email: string;
  readonly password: string;
}

export class UserDto {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly createdAt: Date;
}
