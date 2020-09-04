import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}

export const validateRequest = (request: any) => {
  /**
   * implement logic for determining whether permission for the request should be granted or not here
   * return true for valid requests
   * return false for denying access
   */
  return true;
};
