import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
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

import type { RequestWithUser } from '@/shared/interfaces/request-with-user.interface';

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
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  async getProfile(@Req() req: RequestWithUser): Promise<UserResponseDto> {
    return await this.usersService.getProfile(req.user.id);
  }
}
