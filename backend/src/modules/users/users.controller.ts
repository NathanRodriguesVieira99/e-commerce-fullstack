import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UsersService } from './users.service';

import { JwtAuthGuard } from '@/shared/guards/jwt-auth.guard';
import { RoleGuard } from '@/shared/guards/role.guard';

import { UserResponseDto } from './dtos/user-response.dto';

@Controller('users')
@UseGuards(JwtAuthGuard, RoleGuard)
@ApiTags('users')
@ApiBearerAuth('JWT-auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Current user',
    type: UserResponseDto,
  })
  async getProfile() {}
}
