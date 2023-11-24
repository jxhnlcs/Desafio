import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { CreateUserDto, UserDto } from './dto/user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) { }

  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const createdUser = await this.prisma.user.create({
      data: createUserDto,
    });
    return this.userToDto(createdUser);
  }

  async updateUser(userId: string, updateUserDto: CreateUserDto): Promise<UserDto> {
    const numericUserId = parseInt(userId, 10);

    if (isNaN(numericUserId)) {
      throw new NotFoundException(`Invalid user ID: ${userId}`);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: numericUserId },
      data: updateUserDto,
    });

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${numericUserId} not found`);
    }

    return this.userToDto(updatedUser);
  }


  async deleteUser(userId: string): Promise<void> {
    const numericUserId = parseInt(userId, 10);

    if (isNaN(numericUserId)) {
      throw new NotFoundException(`Invalid user ID: ${userId}`);
    }

    const deletedUser = await this.prisma.user.delete({
      where: { id: numericUserId },
    });

    if (!deletedUser) {
      throw new NotFoundException(`User with ID ${numericUserId} not found`);
    }
  }

  async getUserById(userId: string): Promise<UserDto> {
    const numericUserId = parseInt(userId, 10);

    if (isNaN(numericUserId)) {
      throw new NotFoundException(`Invalid user ID: ${userId}`);
    }

    const user = await this.prisma.user.findUnique({
      where: { id: numericUserId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${numericUserId} not found`);
    }

    return this.userToDto(user);
  }

  async getAllUsers(): Promise<UserDto[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => this.userToDto(user));
  }

  private userToDto(user: any): UserDto {
    const { id, name, email, createdAt } = user;
    return { id, name, email, createdAt };
  }

  async loginUser(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user || user.password !== loginDto.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.generateAccessToken(user.id, user.name);
    return { accessToken };
  }

  private generateAccessToken(userId: number, name: string): string {
    const payload = { userId, name };
    return this.jwtService.sign(payload);
  }
}