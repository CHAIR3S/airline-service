import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/role.decorator';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class RolGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true;

    const { role }: User = context.switchToHttp().getRequest();
    if (!requiredRoles.includes(role)) {
      throw new ForbiddenException(`No tienes permiso (${role})`);
    }

    return true;
  }
}