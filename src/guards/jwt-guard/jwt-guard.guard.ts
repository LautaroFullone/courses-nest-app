import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuardGuard extends AuthGuard('jwt') {
    //funciona sin hacer mas nada gracias al jwt.strategy
}
