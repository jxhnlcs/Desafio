import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { CreateUserDto, UserDto } from './dto/user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  async updateUser(@Param('id') userId: string, @Body() updateUserDto: CreateUserDto): Promise<UserDto> {
    return this.userService.updateUser(userId, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string): Promise<void> {
    return this.userService.deleteUser(userId);
  }

  @Get(':id')
  async getUserById(@Param('id') userId: string): Promise<UserDto> {
    return this.userService.getUserById(userId);
  }

  @Get()
  async getAllUsers(): Promise<UserDto[]> {
    return this.userService.getAllUsers();
  }

  @Post('login')
  async loginUser(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    return this.userService.loginUser(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(): Promise<UserDto> {
    return { id: 1, name: 'Usuário Autenticado', email: 'usuario@dominio.com', createdAt: new Date() };
  }
}