import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector){ }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

    const allowedRoles = this.reflector.get<string[]>('allowed-roles', context.getHandler())
    if(!allowedRoles) return true; // Si no hay roles permitidos definidos, se permite el acceso
  
    const [req, _] = context.getArgs();
    const { roles: userRoles } = req.user;

    const isAllowed = allowedRoles.some(role => userRoles.includes(role))
    return isAllowed;
  }
}
