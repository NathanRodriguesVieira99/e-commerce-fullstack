import { Injectable } from '@nestjs/common';

import { ROLES_KEY } from '../decorators/role.decorator';

import type { ROLE } from '@/database/generated/enums';
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import type { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<ROLE[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass,
    ]);

    if (!requiredRoles) return true;

    const user = context.switchToHttp().getRequest();

    return requiredRoles.some((role) => user.role === role);
  }
}
