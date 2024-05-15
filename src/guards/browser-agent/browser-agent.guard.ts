import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BrowserAgentGuard implements CanActivate {
  
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    
    const [req, res] = context.getArgs();
    const userAgent = req.headers['user-agent']
    console.log('userAgent: ', userAgent)
    const isAllowed = userAgent !== 'google/chrome'

    if(!isAllowed) throw new HttpException('BROWSER_AGENT_INVALID',HttpStatus.BAD_REQUEST)
    return isAllowed
  }

}
