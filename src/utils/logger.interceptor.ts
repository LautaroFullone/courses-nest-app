import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const [req,res] = context.getArgs()
    console.log('intercept..', req.params)
    return next.handle()
    .pipe(
      tap(value => console.log('La respuesta es: ', value))
    );
  }
}
