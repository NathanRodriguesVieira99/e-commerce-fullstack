import { SetMetadata } from '@nestjs/common';

import type { ROLE } from '@/database/generated/enums';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ROLE[]) => SetMetadata(ROLES_KEY, roles);
